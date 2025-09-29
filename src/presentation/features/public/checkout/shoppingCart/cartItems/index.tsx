import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FullCartProduct } from "@/types/shopping-cart.types";
import CartItemsMobileView from "../../shared/cartItemsMobileView";
import CartItemsDesktopView from "./cartItemsDesktopView";

export default function CartItems() {
  const selectedItems: FullCartProduct[] = useSelector((state: RootState) => state.cart.selectedItems);

  return (
    <>
      <CartItemsMobileView selectedItems={selectedItems} containerStyle="md:hidden" />
      <CartItemsDesktopView selectedItems={selectedItems} />
    </>
  );
}
