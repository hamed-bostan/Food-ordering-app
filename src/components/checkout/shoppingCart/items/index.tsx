import { useSelector } from "react-redux";
import ItemsDesktop from "./itemsDesktop";
import ItemsMobile from "@/components/checkout/itemsOverviewMobile";
import { RootState } from "@/redux/store";
import { ProductType } from "@/lib/productApi";

// Extend Product to include quantity from CartItem
export type FullCartProduct = ProductType & {
  quantity: number;
};

export default function Items() {
  const selectedItems: FullCartProduct[] = useSelector(
    (state: RootState) => state.cart.selectedItems
  );

  return (
    <>
      <ItemsMobile selectedItems={selectedItems} containerStyle="md:hidden" />
      <ItemsDesktop selectedItems={selectedItems} />
    </>
  );
}
