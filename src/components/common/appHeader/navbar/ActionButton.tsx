"use client";

import Link from "next/link";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  Person2Outlined,
  ArrowDownwardOutlined,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { userMenuItems } from "../../UserMenuItems";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import { Divider } from "@mui/material";
import Popover from "@mui/material/Popover";
import { RootState } from "@/redux/store";

export default function ActionButton() {
  const pathname = usePathname();
  const itemsCounter = useSelector(
    (state: RootState) => state.cart.itemsCounter
  );

  return (
    <div className="flex items-center gap-x-1">
      <div className="bg-[#E5F2E9] flex justify-center items-center rounded-sm cursor-pointer w-8 h-8">
        <SearchOutlined fontSize="small" sx={{ color: "#417F56" }} />
      </div>
      <div className="relative">
        <Link href="/checkout">
          <div
            className={`w-8 h-8 flex justify-center items-center rounded-sm  ${
              pathname === "/checkout"
                ? "bg-[#417F56] text-[#fff]"
                : "bg-[#E5F2E9] text-[#417F56]"
            }`}
          >
            <ShoppingCartOutlined fontSize="small" />
          </div>
        </Link>
        {itemsCounter > 0 && (
          <span className="text-xs text-[#fff] bg-[#61AE7B] rounded-full absolute top-1 right-0 w-3 h-3 p-2 flex justify-center items-center">
            {itemsCounter}
          </span>
        )}
      </div>
      <UserMenuPopover />
    </div>
  );
}

function UserMenuPopover() {
  const { data: session } = useSession(); // Client-side session retrieval
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  return (
    <>
      {session ? (
        <div
          onClick={handleClick}
          className={`w-12 h-8 rounded-sm cursor-pointer flex justify-center items-center ${
            pathname === "/userPanel"
              ? "bg-[#417F56] text-[#fff]"
              : "bg-[#E5F2E9] text-[#417F56]"
          }`}
        >
          <Person2Outlined fontSize="small" />
          <ArrowDownwardOutlined sx={{ fontSize: 18 }} />
        </div>
      ) : (
        <Link
          href="/api/auth/signin?callbackUrl=/userPanel"
          className="bg-[#E5F2E9] p-2 box-content rounded-sm cursor-pointer flex"
        >
          <Person2Outlined fontSize="small" sx={{ color: "#417F56" }} />
        </Link>
      )}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {session && (
          <div className="p-2">
            {userMenuItems.map((item, index) => (
              <div key={index}>
                <Link
                  onClick={handleClose}
                  href={item.href}
                  className="flex items-center text-xs gap-x-1 py-2 cursor-pointer w-fit"
                >
                  <item.icon sx={{ color: "#353535", fontSize: 18 }} />
                  <span className="text-[#353535]">{item.label}</span>
                </Link>
                {index < userMenuItems.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        )}
      </Popover>
    </>
  );
}
