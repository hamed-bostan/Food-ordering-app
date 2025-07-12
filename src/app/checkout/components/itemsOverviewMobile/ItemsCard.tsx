import QuantitySelector from "@/components/ui/QuantitySelector";
import { useDispatch, useSelector } from "react-redux";
import formatToPersianStyle from "@/lib/utils/formatToPersianStyle";
import discountPrice from "@/lib/utils/discountPrice";
import { RootState } from "@/store/store";
import { decrease, increase, removeItem } from "@/shared/redux/cart/cartSlice";
import { ProductType } from "@/lib/api/getProducts";

type ItemsCardProps = {
  foodItem: ProductType;
};

export default function ItemsCard({ foodItem }: ItemsCardProps) {
  const { id, price, discount, title } = foodItem;

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.cart.selectedItems
  );

  // Find the selected item from the cart
  const selectedItem = selectedItems.find((item) => item.id === id) || null;

  const index = selectedItems.findIndex((item) => item.id === foodItem.id);

  const handleIncrease = () => dispatch(increase({ id }));
  const handleDecrease = () => dispatch(decrease({ id }));
  const handleRemove = () => dispatch(removeItem({ id }));

  const discountedPricePerItem = discountPrice(price, discount); // Price of a single item

  // Check if the current food item is selected
  const quantity = selectedItem?.quantity ?? 0;

  // Calculate total discounted price for the selected item
  const totalDiscountedPrice =
    quantity > 0
      ? formatToPersianStyle(discountedPricePerItem * quantity)
      : formatToPersianStyle(discountedPricePerItem);

  return (
    <div
      className={`grid grid-cols-2 p-2 ${
        index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-[#EDEDED]"
      }`}
    >
      <div>
        <h3 className="text-[#353535] text-sm">{title}</h3>
        <p className="text-[#717171] text-xs">{totalDiscountedPrice}</p>
      </div>
      <QuantitySelector
        selectedItem={selectedItem}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
        handleRemove={handleRemove}
        styles="mr-auto"
      />
    </div>
  );
}
