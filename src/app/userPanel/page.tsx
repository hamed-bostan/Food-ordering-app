"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserPanel from "./components";

export default function UserPanelPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/api/auth/signin?callbackUrl=/userPanel");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  if (!session) return <div>Redirecting...</div>;

  return <UserPanel />;
}
