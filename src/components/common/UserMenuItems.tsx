import {
  Person2Outlined,
  LocationOnOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import { ComponentType } from "react";

type MenuItem = {
  label: string;
  icon: ComponentType<SvgIconProps>;
  tabIndex: number;
  href: string;
};

export const userMenuItems: MenuItem[] = [
  { label: "پروفایل", icon: Person2Outlined, tabIndex: 0, href: "/userPanel" },
  {
    label: "آدرس‌های من",
    icon: LocationOnOutlined,
    tabIndex: 1,
    href: "/userPanel",
  },
  {
    label: "خروج",
    icon: LogoutOutlined,
    tabIndex: 2,
    href: "/api/auth/signout?callbackUrl=/",
  },
];
