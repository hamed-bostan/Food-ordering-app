"use client";

import { Divider } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import { useOrderContext } from "@/context/OrderContext";
import { branches } from "@/presentation/constants/branch.constants";

export default function InPersonPickup() {
  const { branch, setBranch } = useOrderContext();

  return (
    <section className="flex flex-col gap-3">
      {branches.map((item) => (
        <div
          key={item.id}
          onClick={() => setBranch(item.id)}
          className={`rounded-lg p-4 cursor-pointer transition-colors hover:border-[#417F56] ${
            branch === item.id ? "border-2 border-[#417F56]" : "border border-[#CBCBCB]"
          }`}
        >
          <div className="flex items-center mb-2 gap-x-1 md:mb-4">
            <LocationOnOutlined
              sx={{
                color: "#353535",
                fontSize: { xs: 18, md: 20 },
              }}
            />
            <span className="text-[#353535] text-sm">{item.title}</span>
          </div>
          <Divider className="md:hidden" />
          <div className="flex flex-col gap-y-1 px-2 pt-3 text-[#717171] text-xs md:gap-y-2 md:mb-5">
            <p>{item.address}</p>
            <p>شماره تماس ۱: {item.phone1}</p>
            <p>شماره تماس ۲: {item.phone2}</p>
            <p>ساعت کاری: {item.hours}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
