import {
  Person2Outlined,
  PaymentOutlined,
  FavoriteBorderOutlined,
  LocationOnOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import { ComponentType } from "react";

type MenuItem = {
  label: string;
  icon: ComponentType<SvgIconProps>;
  tabIndex: number;
  href?: string;
  action?: () => void;
};

export const userMenuItems: MenuItem[] = [
  { label: "پروفایل", icon: Person2Outlined, tabIndex: 0, href: "/userPanel" },
  {
    label: "پیگیری سفارشات",
    icon: PaymentOutlined,
    tabIndex: 1,
    href: "/userPanel",
  },
  {
    label: "علاقه مندی‌ها",
    icon: FavoriteBorderOutlined,
    tabIndex: 2,
    href: "/userPanel",
  },
  {
    label: "آدرس‌های من",
    icon: LocationOnOutlined,
    tabIndex: 3,
    href: "/userPanel",
  },
  {
    label: "خروج",
    icon: LogoutOutlined,
    tabIndex: 4,
    action: () => {
      const { signOut } = require("next-auth/react");
      signOut({ callbackUrl: "/" });
    },
  },
];
