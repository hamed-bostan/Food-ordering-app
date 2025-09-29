"use client";

import Link from "next/link";
import { ShoppingCartOutlined, Person2Outlined, ArrowDownwardOutlined } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { MouseEvent, useState } from "react";
import { Divider } from "@mui/material";
import Popover from "@mui/material/Popover";
import { RootState } from "@/store";
import { signOut, useSession } from "next-auth/react";
import { ActionMenuItem, LinkMenuItem, MenuItem, userMenuItems } from "../../UserMenuItems";

function isLink(item: MenuItem): item is LinkMenuItem {
  return "href" in item;
}

function isAction(item: MenuItem): item is ActionMenuItem {
  return "action" in item;
}

export default function ActionButton() {
  const pathname = usePathname();
  const itemsCounter = useSelector((state: RootState) => state.cart.itemsCounter);

  return (
    <div className="flex items-center gap-x-1">
      {/* Cart Button */}
      <div className="relative">
        <Link href="/checkout">
          <div
            className={`w-8 h-8 flex justify-center items-center rounded-sm  
              ${pathname === "/checkout" ? "bg-[#417F56] text-white" : "bg-[#E5F2E9] text-[#417F56]"}`}
          >
            <ShoppingCartOutlined fontSize="small" />
          </div>
        </Link>
        {itemsCounter > 0 && (
          <span className="text-xs text-white bg-[#61AE7B] rounded-full absolute top-1 right-0 w-3 h-3 p-2 flex justify-center items-center">
            {itemsCounter}
          </span>
        )}
      </div>

      <UserMenuPopover />
    </div>
  );
}

function UserMenuPopover() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  function handleAction(item: ActionMenuItem) {
    switch (item.action) {
      case "logout":
        signOut({ callbackUrl: "/" });
        break;
      default:
        console.warn(`Unhandled action: ${item.action}`);
    }
  }

  return (
    <>
      {session ? (
        <button
          onClick={handleClick}
          type="button"
          className={`w-12 h-8 rounded-sm cursor-pointer flex justify-center items-center 
            ${pathname === "/userpanel" ? "bg-[#417F56] text-white" : "bg-[#E5F2E9] text-[#417F56]"}`}
        >
          <Person2Outlined fontSize="small" />
          <ArrowDownwardOutlined sx={{ fontSize: 18 }} />
        </button>
      ) : (
        <Link href="/auth" className="bg-[#E5F2E9] w-8 h-8 rounded-sm cursor-pointer flex justify-center items-center">
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
                {isLink(item) ? (
                  <Link
                    onClick={handleClose}
                    href={item.href}
                    className="flex items-center py-2 text-xs cursor-pointer gap-x-1 w-fit"
                  >
                    <item.icon sx={{ color: "#353535", fontSize: 18 }} />
                    <span className="text-[#353535]">{item.label}</span>
                  </Link>
                ) : isAction(item) ? (
                  <button
                    onClick={() => {
                      handleClose();
                      handleAction(item);
                    }}
                    className="flex items-center py-2 text-xs cursor-pointer gap-x-1 w-fit"
                  >
                    <item.icon sx={{ color: "#353535", fontSize: 18 }} />
                    <span className="text-[#353535]">{item.label}</span>
                  </button>
                ) : null}

                {index < userMenuItems.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        )}
      </Popover>
    </>
  );
}
