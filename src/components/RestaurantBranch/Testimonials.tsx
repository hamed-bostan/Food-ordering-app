"use client";

import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import image1 from "@/assets/images/avatars/01.png";
import image2 from "@/assets/images/avatars/02.png";
import image3 from "@/assets/images/avatars/03.png";
import image4 from "@/assets/images/avatars/04.png";
import starRateIcon from "@/assets/images/icons/star-rate.svg"

type Testimonial = {
  id: number;
  image: StaticImageData;
  name: string;
  date: string;
  comment: string;
};

const testimonialDetails: Testimonial[] = [
  {
    id: 1,
    image: image1,
    name: "محمد محمدی",
    date: "۲۳ اسفند ۱۴۰۱",
    comment:
      "از با صفا بودن شعبه اکباتان هر چی بگم کم گفتم. بهترین غذاهای گیاهی عمرمو اینجا خوردم. از مدیریت شعبه اکباتان رستوران‌های ترخینه واقعا تشکر میکنم. ",
  },
  {
    id: 2,
    image: image2,
    name: "آرزو حسن زاده",
    date: "۲۳ اسفند ۱۴۰۱",
    comment:
      "از با صفا بودن شعبه اکباتان هر چی بگم کم گفتم. بهترین غذاهای گیاهی عمرمو اینجا خوردم. از مدیریت شعبه اکباتان رستوران‌های ترخینه واقعا تشکر میکنم. ",
  },
  {
    id: 3,
    image: image3,
    name: "حسین حسینی",
    date: "۲۳ اسفند ۱۴۰۱",
    comment:
      "از با صفا بودن شعبه اکباتان هر چی بگم کم گفتم. بهترین غذاهای گیاهی عمرمو اینجا خوردم. از مدیریت شعبه اکباتان رستوران‌های ترخینه واقعا تشکر میکنم. ",
  },
  {
    id: 4,
    image: image4,
    name: "فرزانه رمضانی",
    date: "۲۳ اسفند ۱۴۰۱",
    comment:
      "از با صفا بودن شعبه اکباتان هر چی بگم کم گفتم. بهترین غذاهای گیاهی عمرمو اینجا خوردم. از مدیریت شعبه اکباتان رستوران‌های ترخینه واقعا تشکر میکنم. ",
  },
  {
    id: 5,
    image: image1,
    name: "سجاد رحیمی",
    date: "۲۳ اسفند ۱۴۰۱",
    comment:
      "از با صفا بودن شعبه اکباتان هر چی بگم کم گفتم. بهترین غذاهای گیاهی عمرمو اینجا خوردم. از مدیریت شعبه اکباتان رستوران‌های ترخینه واقعا تشکر میکنم. ",
  },
  {
    id: 6,
    image: image2,
    name: "آنا عسگری",
    date: "۲۳ اسفند ۱۴۰۱",
    comment:
      "از با صفا بودن شعبه اکباتان هر چی بگم کم گفتم. بهترین غذاهای گیاهی عمرمو اینجا خوردم. از مدیریت شعبه اکباتان رستوران‌های ترخینه واقعا تشکر میکنم. ",
  },
];
export default function Testimonials() {
  return (
    <div className="px-5 py-6 lg:py-7 lg:px-10 2xl:px-28 mt-10 md:mt-[3.75rem] lg:mt-20">
      <span className="block text-center font-bold text-[#353535] mb-3 text-sm md:text-base md:mb-4">
        نظرات کاربران
      </span>
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
            <div className="border border-[#CBCBCB] rounded-sm grid grid-cols-[auto_1fr] p-4 text-xs text-[#353535] lg:text-sm">
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
              <span className="text-[#717171] text-center md:mb-1">
                {item.name}
              </span>
              <span className="text-[#717171] text-center">{item.date}</span>
              <div className="flex items-center justify-end col-start-2 gap-x-1 md:gap-x-2">
                <Image
                  src={starRateIcon}
                  alt="star rate icon"
                  className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                />
                <span className="text-sm lg:text-base">3</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
