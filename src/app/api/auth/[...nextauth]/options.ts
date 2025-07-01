import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { verifyOtp } from "@/lib/otpStore";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile) {
        return {
          id: profile.id,
          ...profile,
          role: "GitHub User",
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile) {
        return {
          id: profile.sub,
          ...profile,
          role: "Google User",
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const { phone, otp } = credentials as { phone: string; otp: string };
        const isValid = verifyOtp(phone, otp);

        if (isValid) {
          return {
            id: phone,
            name: phone,
            role: "Phone User",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/otp", // 👈 Custom sign-in page for OTP or others
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
