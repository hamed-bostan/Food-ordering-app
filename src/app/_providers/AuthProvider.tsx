"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type SessionProviderWrapperProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: SessionProviderWrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
