import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "@/types/user.types";

declare module "next-auth" {
  // Strongly typed user object for session
  export type SessionUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
    phoneNumber?: string;
    token?: string;
  };

  export interface Session {
    user: SessionUser;
    accessToken?: string;
  }

  export interface User extends DefaultUser {
    role?: UserRole;
    phoneNumber?: string;
  }
}

declare module "next-auth/jwt" {
  import { UserRole } from "@/lib/user/user.types";

  export interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
    phoneNumber?: string;
    accessToken?: string;
  }
}
