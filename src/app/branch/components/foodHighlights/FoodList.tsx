import FoodCard from "./FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FoodListProps } from "../../lib/types";

export default function FoodList({
  title,
  filter,
  containerStyle = "",
  titleStyle = "text-[#353535]",
  products,
}: FoodListProps) {
  const filteredFood = products.filter((item) => item.filter === filter);
  const nonIranianFood = products.filter((item) => item.category === filter);

  return (
    <section
      className={`p-5 md:p-6 lg:py-7 lg:px-10 2xl:px-28 ${containerStyle}`}
    >
      <h2 className={`font-bold mb-3 block md:text-lg md:mb-5 ${titleStyle}`}>
        {title}
      </h2>
      <Swiper slidesPerView="auto" spaceBetween={10} className="w-full">
        {filteredFood.map((item) => (
          <SwiperSlide key={item.id} className="!w-fit">
            <FoodCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper slidesPerView="auto" spaceBetween={10} className="w-full">
        {nonIranianFood.map((item) => (
          <SwiperSlide key={item.id} className="!w-fit">
            <FoodCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
