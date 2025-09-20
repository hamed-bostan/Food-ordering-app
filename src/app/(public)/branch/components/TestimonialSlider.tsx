"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TestimonialCard from "./TestimonialCard";
import { TestimonialModel } from "@/domain/testimonial.schema";

export default function TestimonialSlider({ testimonial }: { testimonial: TestimonialModel[] }) {
  return (
    <div className="px-5 py-6 lg:py-7 lg:px-10 2xl:px-28 mt-10 md:mt-[3.75rem] lg:mt-20">
      <h2 className="block text-center font-bold text-[#353535] mb-3 text-sm md:text-base md:mb-4">نظرات کاربران</h2>
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
        {testimonial.map((item, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
