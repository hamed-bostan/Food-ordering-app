"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  FavoriteBorderOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import formatToPersianStyle from "@/lib/formattedPrice";
import discountPrice from "@/lib/discountPrice";
import CustomButton from "@/components/ui/CustomButton";
import { RootState } from "@/store/store";
import { addItem } from "@/shared/redux/cart/cartSlice";
import { ProductType } from "@/lib/api/productApi";

type FoodCardProps = {
  foodItem: ProductType; // The product type
};

export default function FoodCard({ foodItem }: FoodCardProps) {
  return (
    <>
      <FoodImage {...foodItem} />
      <FoodDetails foodItem={foodItem} />
    </>
  );
}

// first way for just using some of the types
type FoodImageProps = Pick<ProductType, "image" | "title">;

function FoodImage({ image, title }: FoodImageProps) {
  return (
    <Image
      src={image}
      width={300}
      height={300}
      alt={title}
      className="w-24 h-full row-span-3 md:w-32 lg:w-40"
    />
  );
}

// second way for just using some of the types
function FoodDetails({ foodItem }: { foodItem: ProductType }) {
  const { id, title, description, price, discount } = foodItem;

  const discountedPrice = formatToPersianStyle(discountPrice(price, discount));

  const dispatch = useDispatch();

  // Access the cart from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.selectedItems);
  const isAddedToCart = cartItems.some((item) => item.id === id); // Check if the item is in the cart

  function handleAddToCart() {
    if (!isAddedToCart) {
      dispatch(addItem(foodItem));
    }
  }

  return (
    <div className="col-span-2 row-span-3 grid grid-cols-2 p-2 text-[#353535] text-xs md:text-sm lg:p-0 lg:py-3 lg:ml-3 lg:mr-5 lg:gap-y-1">
      <h3 className="self-center text-sm md:text-base md:font-semibold lg:self-start">
        {title}
      </h3>
      {discount && (
        <div className="flex items-center mr-auto gap-x-2 md:row-start-2 md:col-start-2">
          <span className="text-[#ADADAD] line-through">
            {formatToPersianStyle(price)}
          </span>
          <span className="text-[#C30000] bg-[#FFF2F2] rounded-lg px-1">
            {formatToPersianStyle(discount)} %
          </span>
        </div>
      )}
      <p className="self-center col-start-1 row-start-2 md:row-span-2 md:self-start">
        {description.slice(0, 10)} ...
      </p>
      <div className="flex items-center col-start-2 row-start-2 mr-auto gap-x-2 md:col-start-2 md:row-start-3">
        <span>{discountedPrice}</span>
        <span>تومان</span>
      </div>
      <FavoriteBorderOutlined
        sx={{ fontSize: { xs: 18, md: 20 }, color: "#717171" }}
        className="self-center col-start-1 row-start-3 cursor-pointer md:row-start-1 md:col-start-2 md:mr-auto lg:self-start"
      />
      <StarBorderOutlined
        sx={{ fontSize: { xs: 20, md: 23 }, color: "#717171" }}
        className="self-center col-start-1 row-start-3 mr-6 cursor-pointer md:row-start-4 md:mr-0"
      />
      <CustomButton
        className="row-start-3 md:row-start-4"
        size="small"
        onClick={handleAddToCart}
        sx={{
          backgroundColor: isAddedToCart ? "#717171" : "#417F56",
          pointerEvents: isAddedToCart ? "none" : "auto",
          gridColumnStart: 2,
          fontSize: { xs: "0.625rem", md: "0.875rem", lg: "1rem" },
          fontWeight: { xs: 400, md: 500 },
          lineHeight: { xs: "1.125rem", md: "1.5rem" },
        }}
      >
        {isAddedToCart ? "افزوده شد" : "افزودن به سبد خرید"}
      </CustomButton>
    </div>
  );
}
