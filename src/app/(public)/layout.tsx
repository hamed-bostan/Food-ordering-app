import AppHeader from "@/presentation/features/public/shared/appHeader";
import Footer from "@/presentation/features/public/shared/footer";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
