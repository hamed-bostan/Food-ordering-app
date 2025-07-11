"use client";

import Image from "next/image";
import formatToPersianStyle from "@/lib/formattedPrice";
import discountPrice from "@/lib/discountPrice";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "@/components/ui/CustomButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { RootState } from "@/store/store";
import { addItem } from "@/shared/redux/cart/cartSlice";
import starRateFillIcon from "@/assets/images/icons/star-rate-fill.svg";
import { ProductType } from "@/lib/productApi";

type ProductItemProps = {
  item: ProductType;
};

export default function FoodCard({ item }: ProductItemProps) {
  return (
    <article className="bg-[#fff] border border-[#CBCBCB] overflow-hidden rounded-sm w-48 md:w-52 md:rounded-lg">
      <DisplayingImage item={item} />
      <OfferDetails item={item} />
    </article>
  );
}

function DisplayingImage({ item }: ProductItemProps) {
  const { image, title } = item;
  return (
    <Image
      src={image}
      alt={title}
      width={110}
      height={110}
      className="object-cover w-full h-28 md:h-36"
    />
  );
}

function OfferDetails({ item }: ProductItemProps) {
  const { id, title, price, discount } = item;
  const discountedPrice = formatToPersianStyle(discountPrice(price, discount));

  const dispatch = useDispatch();

  // Access the cart from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.selectedItems);
  const isAddedToCart = cartItems.some((item) => item.id === id); // Check if the item is in the cart

  function handleAddToCart() {
    if (!isAddedToCart) {
      dispatch(addItem(item));
    }
  }

  return (
    <div className="col-span-2 row-span-3 grid grid-cols-2 p-2 pt-1 text-[#353535] text-xs gap-y-1 md:text-sm md:gap-y-2 md:p-3 h-32 md:h-40">
      <h3 className="text-sm text-center col-span-full md:text-base md:font-semibold">
        {title}
      </h3>
      <button
        type={"button"}
        aria-label={`Add ${title} to favorites`}
        className="ml-auto"
      >
        <FavoriteBorderOutlinedIcon sx={{ color: "#ADADAD", fontSize: 18 }} />
      </button>
      {discount && (
        <p className="flex items-center w-full mr-auto gap-x-1">
          <del className="text-[#ADADAD] line-through">
            {formatToPersianStyle(price)}
          </del>
          <ins
            className="text-[#C30000] bg-[#FFF2F2] rounded-lg text-center mr-auto min-w-8 md:min-w-10"
            style={{ textDecoration: "none" }}
          >
            {formatToPersianStyle(discount)} %
          </ins>
        </p>
      )}
      <div className="flex items-center col-start-1 row-start-3 gap-x-1">
        <Image src={starRateFillIcon} alt="like icon" className="w-4 h-4" />
        <output>5</output>
      </div>
      <p className="col-start-2 row-start-3 mr-auto">{discountedPrice} تومان</p>
      <CustomButton
        onClick={handleAddToCart}
        sx={{
          backgroundColor: isAddedToCart ? "#717171" : "#417F56",
          pointerEvents: isAddedToCart ? "none" : "auto",
          gridColumn: "span 2",
          height: { xs: "2rem", md: "2.5rem" },
          fontSize: { xs: "0.725rem", md: "0.8rem", lg: "0.875rem" },
          leading: "1.25rem",
        }}
      >
        {isAddedToCart ? "افزوده شد" : "افزودن به سبد خرید"}
      </CustomButton>
    </div>
  );
}
