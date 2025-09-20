"use client";

import { Divider, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import image1 from "@/assets/images/bannerImages/banner-11.jpg";
import { MobileDrawerProps, NavigationListProps } from "@/types/app-header.types";

export default function MobileDrawer({ navigationItems, isDrawerOpen, handleClose }: MobileDrawerProps) {
  const filteredItems = navigationItems.filter((item) => item.path !== "/franchise");

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={handleClose}>
      <div className="w-64 h-full">
        <div className="relative">
          <Image src={image1} alt="Banner image" className="w-full h-full" />
          <IconButton onClick={handleClose} sx={{ color: "#fff", position: "absolute", top: 4, right: 4 }}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="px-4">
          {filteredItems.map((item, index) => (
            <NavigationList
              key={item.id}
              item={item}
              isLast={index < filteredItems.length - 1}
              handleClose={handleClose}
            />
          ))}
        </div>
      </div>
    </Drawer>
  );
}

function NavigationList({ item, isLast, handleClose }: NavigationListProps) {
  const pathname = usePathname();

  return (
    <>
      <Link onClick={handleClose} href={item.path} className="flex items-center py-2 gap-x-1">
        {item.image && (
          <Image
            src={item.image}
            alt={item.text}
            width={30}
            height={30}
            className={`w-3 h-3 ${pathname === item.path ? "w-4 h-4" : ""}`}
          />
        )}
        <span className={`text-xs text-[#353535] ${pathname === item.path ? "text-[#417F56] text-lg font-bold" : ""}`}>
          {item.text}
        </span>
      </Link>
      {isLast && <Divider sx={{ borderColor: "#CBCBCB" }} />}
    </>
  );
}
