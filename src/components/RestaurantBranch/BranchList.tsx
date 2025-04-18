"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BranchList() {
  const images: string[] = [
    "/assets/images/branchImages/branch-05.jpg",
    "/assets/images/branchImages/branch-01.jpg",
    "/assets/images/branchImages/branch-04.jpg",
  ];

  return (
    <div>
      <h3 className="font-bold mb-3 text-center">شعبه اکباتان</h3>
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
              width={500}
              height={200}
              className="w-full h-44 md:h-60 object-cover"
            />
          </SwiperSlide>
        ))}
        <div className="custom-prev absolute top-1/2 right-4 z-10 -translate-y-1/2 text-xl text-white cursor-pointer">
          ❮
        </div>
        <div className="custom-next absolute top-1/2 left-4 z-10 -translate-y-1/2 text-xl text-white cursor-pointer">
          ❯
        </div>
      </Swiper>
    </div>
  );
}
