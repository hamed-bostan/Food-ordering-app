import homeIcon from "@/assets/images/icons/home.svg";
import arrowDownIcon from "@/assets/images/icons/arrow-down.svg";
import menuBoardIcon from "@/assets/images/icons/menu-board.svg";
import homeHashtagIcon from "@/assets/images/icons/home-hashtag.svg";
import profileUserIcon from "@/assets/images/icons/profile-2user.svg";
import callCallingIcon from "@/assets/images/icons/call-calling.svg";
import { NavigationItem } from "@/types/app-header.types";

export const navigationItems: NavigationItem[] = [
  {
    id: 1,
    text: "صفحه اصلی",
    path: "/",
    image: homeIcon,
  },
  {
    id: 2,
    text: "شعبه",
    icon: arrowDownIcon,
    path: "/branch",
    image: menuBoardIcon,
  },
  {
    id: 3,
    text: "منو",
    icon: arrowDownIcon,
    path: "/menu",
    image: homeHashtagIcon,
  },
  {
    id: 4,
    text: "اعطای نمایندگی",
    path: "/franchise",
  },
  {
    id: 5,
    text: "درباره ما",
    path: "/about",
    image: profileUserIcon,
  },
  {
    id: 6,
    text: "تماس با ما",
    path: "/contact",
    image: callCallingIcon,
  },
];
