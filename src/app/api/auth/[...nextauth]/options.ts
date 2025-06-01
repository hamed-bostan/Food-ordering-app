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
          id: profile.id,
          image: profile.avatar_url,
          ...profile,
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
    async signIn({ user, account, profile }) {
      if (
        !user.email &&
        account?.provider === "github" &&
        account.access_token
      ) {
        try {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${account.access_token}`,
              Accept: "application/vnd.github.v3+json",
            },
          });

          const emails = await res.json();
          const primary = emails.find(
            (email: any) => email.primary && email.verified
          );
          if (primary) {
            user.email = primary.email;
          }
        } catch (error) {
          console.error("Failed to fetch GitHub user email:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user";
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
