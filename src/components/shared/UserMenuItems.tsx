import { Person2Outlined, LocationOnOutlined, LogoutOutlined } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";
import { ComponentType } from "react";

type BaseMenuItem = {
  label: string;
  icon: ComponentType<SvgIconProps>;
  tabIndex?: number;
};

export type LinkMenuItem = BaseMenuItem & { href: string };
export type ActionMenuItem = BaseMenuItem & { action: "logout" };

export type MenuItem = LinkMenuItem | ActionMenuItem;

export const userMenuItems: MenuItem[] = [
  { label: "پروفایل", icon: Person2Outlined, href: "/userpanel" },
  { label: "آدرس‌های من", icon: LocationOnOutlined, href: "/userpanel" },
  { label: "خروج", icon: LogoutOutlined, action: "logout" },
];
