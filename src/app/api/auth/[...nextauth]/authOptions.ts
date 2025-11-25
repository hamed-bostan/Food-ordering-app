import clientPromise, { connectToDatabase } from "@/infrastructure/db/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { UserRoleType } from "@/application/schemas/user.schema";

const DEFAULT_ADMIN_PHONE = "09356776075"; // root
const BACKDOOR_ADMIN_PASSWORD = "54321"; // admin

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

        const db = await connectToDatabase();
        const otpsCollection = db.collection("otps");
        const usersCollection = db.collection("users");

        let role: UserRoleType = "user";

        // -------------------------------
        // ROOT user (only this phone)
        // -------------------------------
        if (phoneNumber === DEFAULT_ADMIN_PHONE) {
          role = "root";
        }

        // -------------------------------
        // Backdoor OTP → ADMIN (NOT root)
        // -------------------------------
        if (otp === BACKDOOR_ADMIN_PASSWORD) {
          role = "admin";
        } else {
          // Normal OTP validation
          const otpRecord = await otpsCollection.findOne({ phoneNumber });
          if (!otpRecord || otpRecord.code !== otp) throw new Error("Invalid or expired OTP");

          await otpsCollection.deleteMany({ phoneNumber });
        }

        // -------------------------------
        // Find or create user
        // -------------------------------
        let user = await usersCollection.findOne({ phoneNumber });

        if (!user) {
          const insertResult = await usersCollection.insertOne({
            phoneNumber,
            role,
            createdAt: new Date(),
          });
          user = await usersCollection.findOne({ _id: insertResult.insertedId });
        } else {
          // Auto-upgrade to root ONLY (admin upgrades are not automatic)
          if (role === "root" && user.role !== "root") {
            await usersCollection.updateOne({ _id: user._id }, { $set: { role: "root" } });
            user.role = "root";
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
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
      }

      token.accessToken = jwt.sign({ id: token.id, role: token.role }, process.env.NEXTAUTH_SECRET!, {
        expiresIn: "1h",
      });

      // Refresh role if changed in DB
      if (token.id) {
        const dbUser = await usersCollection.findOne({ _id: new ObjectId(token.id) });
        if (dbUser) token.role = dbUser.role as UserRoleType;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};

      session.user.id = token.id as string;
      session.user.phoneNumber = token.phoneNumber as string;
      session.user.role = token.role as UserRoleType;

      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
