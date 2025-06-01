import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } },
      profile(profile) {
        // Explicitly assert the user role type in the return
        return {
          ...profile,
          id: profile.id,
          image: profile.avatar_url,
          role: "GitHub User", // Add role
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "Google User",
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt", // <-- important for middleware token
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add role to JWT, with type assertion
        token.role = user.role as string; // Ensure `role` is assigned as string
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        // Explicitly assert session.user to have a role
        session.user.role = token.role as string; // Assign `role` to session
      }
      return session;
    },
  },
};
