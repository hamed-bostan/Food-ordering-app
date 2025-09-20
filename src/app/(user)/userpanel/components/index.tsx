"use client";

import { useState } from "react";
import Logout from "./logout";
import Sidebar from "./shared/sidebar";
import Profile from "./profile";
import HeaderMobile from "./shared/header/HeaderMobile";
import MyAddresses from "./myAddresses";
import { User } from "@/types/user.types";
import { LogoutDialogProvider } from "@/context/logout-dialog.context";

export default function UserPanelComponent({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [<Profile key="profile" />, <MyAddresses key="addresses" />, <Logout key="logout" />];

  return (
    <section className="px-5 py-6 lg:px-10 2xl:px-28">
      <LogoutDialogProvider>
        <HeaderMobile setActiveTab={setActiveTab} activeTab={activeTab} />
        <div className="md:grid md:grid-cols-[auto_1fr] md:gap-x-5">
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} user={user} />
          {tabs[activeTab]}
        </div>
      </LogoutDialogProvider>
    </section>
  );
}
