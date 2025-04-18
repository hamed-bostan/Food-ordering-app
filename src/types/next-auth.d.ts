import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; // Add 'role' property to User interface
  }

  interface Session {
    user: User; // Ensure the Session includes the extended User interface
  }

  interface JWT {
    role?: string; // Add 'role' to JWT as well
  }
}
