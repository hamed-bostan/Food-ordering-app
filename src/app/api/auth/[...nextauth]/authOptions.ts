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

// -------------------------------
// Type Narrowing Fix for JWT Secret
// -------------------------------
const secret = process.env.NEXTAUTH_SECRET;
if (!secret) {
  throw new Error("❌ NEXTAUTH_SECRET is missing in environment variables");
}
const JWT_SECRET: string = secret;

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
        // Backdoor OTP → ADMIN
        // -------------------------------
        if (otp === BACKDOOR_ADMIN_PASSWORD) {
          role = "admin";
        } else {
          const otpRecord = await otpsCollection.findOne({ phoneNumber });
          if (!otpRecord || otpRecord.code !== otp) throw new Error("Invalid or expired OTP");

          await otpsCollection.deleteMany({ phoneNumber });
        }

        // -------------------------------
        // ROOT user
        // -------------------------------
        if (phoneNumber === DEFAULT_ADMIN_PHONE) {
          role = "root";
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
          if (role === "root" && user.role !== "root") {
            await usersCollection.updateOne({ _id: user._id }, { $set: { role: "root" } });
            user.role = "root";
          }
          if (role === "admin" && user.role === "user") {
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
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");

      // On login
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
      }

      // -------------------------------
      // SAFE JWT SIGNING (no TS errors)
      // -------------------------------
      token.accessToken = jwt.sign({ id: token.id, role: token.role }, JWT_SECRET, { expiresIn: "1h" });

      // Refresh role dynamically from DB
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

  secret: JWT_SECRET,
};
