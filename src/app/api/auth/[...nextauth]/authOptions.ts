import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } },
      profile(profile) {
        console.log(profile);
        // Explicitly assert the user role type in the return
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login, // Fallback if name is null
          email: profile.email ?? null,
          image: profile.avatar_url ?? null,
          role: "GitHub User",
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
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.name = profile.name ?? null;
        token.email = profile.email ?? null;
        token.image = profile.image ?? (profile as any).avatar_url ?? null;
      }
      // ✅ Add user ID to token if available (on first sign-in)
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.name = token.name ?? null;
      session.user.email = token.email ?? null;
      session.user.image = typeof token.image === "string" ? token.image : null;

      // ✅ Attach user ID from token to session
      if (token.id) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};
