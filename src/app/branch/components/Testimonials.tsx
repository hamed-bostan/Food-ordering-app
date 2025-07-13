"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import starRateIcon from "@/assets/images/icons/star-rate.svg";
import { testimonialDetails } from "../lib/testimonial-details";

export default function Testimonials() {
  return (
    <div className="px-5 py-6 lg:py-7 lg:px-10 2xl:px-28 mt-10 md:mt-[3.75rem] lg:mt-20">
      <h2 className="block text-center font-bold text-[#353535] mb-3 text-sm md:text-base md:mb-4">
        نظرات کاربران
      </h2>
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
        {testimonialDetails.map((item, index) => (
          <SwiperSlide key={index}>
            <article className="border border-[#CBCBCB] rounded-sm grid grid-cols-[auto_1fr] p-4 text-xs text-[#353535] lg:text-sm">
              <Image
                src={item.image}
                alt={`Profile image of ${item.name}`}
                width={80}
                height={80}
                className="block mx-auto mb-1 w-14 h-14 md:w-20 md:h-20 md:mb-2"
              />
              <p className="col-start-2 row-span-3 pt-2 pr-3 text-justify col-span-full md:p-4">
                {item.comment}
              </p>
              <p className="text-[#717171] text-center md:mb-1">{item.name}</p>
              <p className="text-[#717171] text-center">{item.date}</p>
              <figure className="flex items-center justify-end col-start-2 gap-x-1 md:gap-x-2">
                <Image
                  src={starRateIcon}
                  alt="star rate icon"
                  className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                />
                <output className="text-sm lg:text-base">3</output>
              </figure>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
