import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../logo";
import ActionButton from "./ActionButton";
import DesktopNavigation from "./DesktopNavigation";
import { NavigationItem, VoidHandler } from "@/types/app-header.types";

type NavbarProps = {
  navigationItems: NavigationItem[];
  handleOpen: VoidHandler;
};

export default function Navbar({ navigationItems, handleOpen }: NavbarProps) {
  return (
    <div className="flex items-center justify-between px-5 py-4 md:py-9 lg:px-10 2xl:px-28">
      <Menu handleOpen={handleOpen} />
      <Logo />

      <DesktopNavigation navigationItems={navigationItems} />
      <ActionButton />
    </div>
  );
}

type MenuProps = {
  handleOpen: VoidHandler;
};

function Menu({ handleOpen }: MenuProps) {
  return (
    <MenuIcon
      onClick={handleOpen}
      sx={{
        color: "#417F56",
        width: "24px",
        height: "24px",
        display: { md: "none" },
        cursor: "pointer",
      }}
    />
  );
}
