import { useDispatch, useSelector } from "react-redux";
import QuantitySelector from "@/presentation/components/QuantitySelector";
import formatToPersianStyle from "@/lib/utils/formatToPersianStyle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { RootState } from "@/store";
import { decrease, increase, removeItem } from "@/store/cart.slice";
import { calculateDiscountPrice } from "@/lib/utils/calculateDiscountPrice";
import { FoodItemProps } from "@/types/shopping-cart.types";

export default function FoodDetails({ foodItem }: FoodItemProps) {
  const { id, title, description, price, discount } = foodItem;

  const discountedPricePerItem = calculateDiscountPrice(price, discount); // Price of a single item

  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.cart.selectedItems);

  // Check if the current food item is selected
  const selectedItem = selectedItems.find((item) => item.id === id) || null;
  const quantity = selectedItem?.quantity || 0;

  // Calculate total discounted price for the selected item
  const totalDiscountedPricePerItem =
    quantity > 0
      ? formatToPersianStyle(discountedPricePerItem * quantity)
      : formatToPersianStyle(discountedPricePerItem);

  const handleIncrease = () => dispatch(increase({ id }));
  const handleDecrease = () => dispatch(decrease({ id }));
  const handleRemove = () => dispatch(removeItem({ id }));

  return (
    <div className="col-span-2 row-span-3 grid grid-cols-2 md:grid-rows-4 lg:grid-rows-3 p-2 text-[#353535] md:text-sm lg:p-0 lg:py-3 lg:ml-3 lg:mr-5 md:gap-y-1 lg:gap-y-2 md:grid-cols-3">
      <h3 className="lg:text-base md:font-semibold md:col-span-2">{title}</h3>
      {discount && discount > 0 && (
        <div className="flex items-center mr-auto gap-x-2 md:row-start-2 md:col-start-3">
          <del className="text-[#ADADAD] line-through">{formatToPersianStyle(price)}</del>
          <span className="text-[#C30000] bg-[#FFF2F2] rounded-lg px-1">{formatToPersianStyle(discount)} %</span>
        </div>
      )}
      <p className="md:row-span-2 md:text-xs lg:text-sm md:row-start-2 md:col-span-2">{description.slice(0, 40)} ...</p>
      <div className="flex items-center mr-auto gap-x-2 md:col-start-3 md:row-start-4">
        <data value={totalDiscountedPricePerItem}>{totalDiscountedPricePerItem}</data>
        <span>تومان</span>
      </div>
      <DeleteOutlineOutlinedIcon
        fontSize="small"
        onClick={handleRemove}
        className="cursor-pointer md:row-start-1 md:mr-auto lg:w-5 lg:h-5 md:col-start-3"
      />
      <div className="md:col-start-1 md:row-start-4 md:flex md:col-span-2 md:gap-x-2 lg:gap-x-4">
        {/* <p className="self-center">{star}</p> */}
        <QuantitySelector
          selectedItem={selectedItem}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
}
