import AppHeader from "@/presentation/features/public/shared/appHeader";
import { ReactNode } from "react";

type UserLayoutProps = {
  children: ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <AppHeader />
      <main className="flex-1 p-4">{children}</main>
    </>
  );
}
