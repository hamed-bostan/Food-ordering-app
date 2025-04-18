import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub: ", profile);

        // Explicitly assert the user role type in the return
        return {
          id: profile.id,
          ...profile,
          role: "GitHub User", // Add role
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        // Explicitly assert the user role type in the return
        return {
          id: profile.sub,
          ...profile,
          role: "Google User", // Add role
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === "development",
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
