"use client";

import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import image1 from "@/assets/images/branchImages/branch-01.jpg";
import image2 from "@/assets/images/branchImages/branch-04.jpg";
import image3 from "@/assets/images/branchImages/branch-05.jpg";

export default function BranchList() {
  const images: StaticImageData[] = [image1, image2, image3];

  return (
    <div>
      <h3 className="mb-3 font-bold text-center">شعبه اکباتان</h3>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        className="[&_.swiper-pagination-bullet]:bg-[#417F56]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Carousel image ${index + 1}`}
              className="object-cover w-full h-44 md:h-60"
            />
          </SwiperSlide>
        ))}
        <div className="absolute z-10 text-xl text-white -translate-y-1/2 cursor-pointer custom-prev top-1/2 right-4">
          ❮
        </div>
        <div className="absolute z-10 text-xl text-white -translate-y-1/2 cursor-pointer custom-next top-1/2 left-4">
          ❯
        </div>
      </Swiper>
    </div>
  );
}
