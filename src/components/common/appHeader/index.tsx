"use client";

import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import Navbar from "./navbar";
import { NavigationItem } from "./types";

const navigationItems: NavigationItem[] = [
  {
    id: 1,
    text: "صفحه اصلی",
    path: "/",
    image: "/assets/images/icons/home.svg",
  },
  {
    id: 2,
    text: "شعبه",
    icon: "/assets/images/icons/arrow-down.svg",
    path: "/branch",
    image: "/assets/images/icons/menu-board.svg",
  },
  {
    id: 3,
    text: "منو",
    icon: "/assets/images/icons/arrow-down.svg",
    path: "/menu",
    image: "/assets/images/icons/home-hashtag.svg",
  },
  {
    id: 4,
    text: "اعطای نمایندگی",
    path: "/franchise",
  },
  {
    id: 5,
    text: "درباره ما",
    path: "/about-us",
    image: "/assets/images/icons/profile-2user.svg",
  },
  {
    id: 6,
    text: "تماس با ما",
    path: "/contact-us",
    image: "/assets/images/icons/call-calling.svg",
  },
];

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
      <MobileDrawer
        isDrawerOpen={isDrawerOpen}
        handleClose={handleClose}
        navigationItems={navigationItems}
      />
      <Navbar navigationItems={navigationItems} handleOpen={handleOpen} />
    </>
  );
}
