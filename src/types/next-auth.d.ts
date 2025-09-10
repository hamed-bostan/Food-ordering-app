import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultUser } from "next-auth";

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@/lib/user/user.types";

declare module "next-auth" {
  // Strongly typed user object for session
  export type SessionUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
    phoneNumber?: string;
  };

  export interface Session {
    user: SessionUser;
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
  }
}
