import { useSelector } from "react-redux";
import ItemsDesktop from "./itemsDesktop";
import { RootState } from "@/store/store";
import { ProductType } from "@/lib/api/productApi";
import ItemsOverviewMobile from "../../itemsOverviewMobile";

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
      <ItemsOverviewMobile
        selectedItems={selectedItems}
        containerStyle="md:hidden"
      />
      <ItemsDesktop selectedItems={selectedItems} />
    </>
  );
}
