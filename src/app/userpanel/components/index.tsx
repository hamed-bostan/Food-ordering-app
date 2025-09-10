"use client";

import { ComponentType, useState } from "react";
import Logout from "./logout";
import Sidebar from "./shared/sidebar";
import Profile from "./profile";
import HeaderMobile from "./shared/header/HeaderMobile";
import MyAddresses from "./myAddresses";
import { LogoutDialogProvider } from "../context/LogoutContext";

export default function UserPanel() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs: ComponentType[] = [Profile, MyAddresses, Logout];

  const ActiveTabComponent = tabs[activeTab];

  return (
    <section className="px-5 py-6 lg:px-10 2xl:px-28">
      <LogoutDialogProvider>
        <HeaderMobile setActiveTab={setActiveTab} activeTab={activeTab} />
        <div className="md:grid md:grid-cols-[auto_1fr] md:gap-x-5">
          <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
          <ActiveTabComponent />
        </div>
      </LogoutDialogProvider>
    </section>
  );
}
