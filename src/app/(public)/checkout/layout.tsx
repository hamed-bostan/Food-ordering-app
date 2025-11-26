import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ClientInnerLayout from "./ClientInnerLayout";

export default async function CheckoutLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user.phoneNumber || !session.accessToken) {
    redirect("/auth/otp");
  }

  const phoneNumber = session.user.phoneNumber;

  return <ClientInnerLayout phoneNumber={phoneNumber}>{children}</ClientInnerLayout>;
}
