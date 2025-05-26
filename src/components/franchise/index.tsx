"use client";

import { Divider } from "@mui/material";
import Banner from "../common/Banner";
import Consultation from "./Consultation";
import Highlights from "./Highlights";
import Privilege from "./Privilege";
import RequestForm from "./requestForm";
import image1 from "@/assets/images/bannerImages/banner-06.webp";
import { FranchiseDialogProvider } from "@/context/FranchiseContext";

export default function Franchise() {
  return (
    <div className="hidden md:block">
      <Banner
        styleContainer="md:mb-0"
        imageSrc={image1}
        text="همین الان به خانواده بزرگ ترخینه بپیوندید!"
        isButton={false}
      />
      <div className="container px-10 2xl:px-28">
        <Highlights />
        <Divider />
        <Privilege />
        <Divider />
        <Consultation />
        <Divider />
        <FranchiseDialogProvider>
          <RequestForm />
        </FranchiseDialogProvider>
      </div>
    </div>
  );
}
