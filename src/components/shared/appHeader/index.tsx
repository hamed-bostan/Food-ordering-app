"use client";

import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import Navbar from "./navbar";
import { navigationItems } from "@/presentation/constants/app-header";

export default function AppHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleOpen() {
    setIsDrawerOpen((prev) => true);
  }

  function handleClose() {
    setIsDrawerOpen((prev) => false);
  }

  return (
    <>
      <MobileDrawer isDrawerOpen={isDrawerOpen} handleClose={handleClose} navigationItems={navigationItems} />
      <Navbar navigationItems={navigationItems} handleOpen={handleOpen} />
    </>
  );
}
