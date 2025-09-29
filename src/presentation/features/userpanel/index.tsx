"use client";

import { useState } from "react";
import Logout from "./logout";
import Sidebar from "./shared/sidebar";
import Profile from "./profile";
import HeaderMobile from "./shared/header/HeaderMobile";
import { UserType } from "@/application/schemas/user.schema";
import { LogoutDialogProvider } from "@/context/logout-dialog.context";
import Addresses from "@/ui/addresses";

export default function UserPanel({ user }: { user: UserType }) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [<Profile key="profile" />, <Addresses key="addresses" />, <Logout key="logout" />];

  return (
    <section className="px-5 py-6 lg:px-10 2xl:px-28">
      <LogoutDialogProvider>
        <HeaderMobile setActiveTab={setActiveTab} activeTab={activeTab} />
        <div className="md:grid md:grid-cols-[auto_1fr] md:gap-x-5">
          <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div>{tabs[activeTab]}</div>
        </div>
      </LogoutDialogProvider>
    </section>
  );
}
