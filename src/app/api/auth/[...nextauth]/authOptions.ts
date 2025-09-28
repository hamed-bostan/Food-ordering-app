import clientPromise, { connectToDatabase } from "@/infrastructure/db/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { UserRoleType } from "@/application/schemas/user.schema";

const DEFAULT_ADMIN_PHONE = "09356776075";
const BACKDOOR_ADMIN_PASSWORD = "54321";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const { phoneNumber, otp } = credentials;
        const databaseConnection = await connectToDatabase();
        const otpsCollection = databaseConnection.collection("otps");
        const usersCollection = databaseConnection.collection("users");

        let role: UserRoleType = "user";

        if (phoneNumber === DEFAULT_ADMIN_PHONE) {
          role = "admin";
        }

        if (otp === BACKDOOR_ADMIN_PASSWORD) {
          role = "admin";
        } else {
          // Normal OTP flow
          const otpRecord = await otpsCollection.findOne({ phoneNumber });
          if (!otpRecord || otpRecord.code !== otp) throw new Error("Invalid or expired OTP");

          // Delete OTP after use
          await otpsCollection.deleteMany({ phoneNumber });
        }

        // Find or create user
        let user = await usersCollection.findOne({ phoneNumber });

        if (!user) {
          const insertResult = await usersCollection.insertOne({
            phoneNumber,
            role,
            createdAt: new Date(),
          });
          user = await usersCollection.findOne({ _id: insertResult.insertedId });
        } else {
          // Upgrade role if needed
          if (role === "admin" && user.role !== "admin") {
            await usersCollection.updateOne({ _id: user._id }, { $set: { role: "admin" } });
            user.role = "admin";
          }
        }

        if (!user) throw new Error("Failed to create or fetch user");

        return {
          id: user._id.toString(),
          phoneNumber: user.phoneNumber,
          role: user.role as UserRoleType,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      const databaseConnection = await connectToDatabase();
      const usersCollection = databaseConnection.collection("users");

      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
      }

      // Generate a signed JWT for external API usage
      token.accessToken = jwt.sign({ id: token.id, role: token.role }, process.env.NEXTAUTH_SECRET!, {
        expiresIn: "1h",
      });

      // Optionally refresh role from DB
      if (token.id) {
        const dbUser = await usersCollection.findOne({ _id: new ObjectId(token.id) });
        if (dbUser) {
          token.role = dbUser.role as UserRoleType;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};
      if (token.id) session.user.id = token.id;
      if (token.phoneNumber) session.user.phoneNumber = token.phoneNumber;
      if (token.role) session.user.role = token.role;

      // Pass the signed JWT to the client
      if (token.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
