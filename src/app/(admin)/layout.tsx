import AdminHeader from "@/presentation/features/admin/shared/AdminHeader";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className="flex-1 p-6">{children}</main>
    </>
  );
}
