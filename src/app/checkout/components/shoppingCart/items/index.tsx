import { useSelector } from "react-redux";
import ItemsDesktop from "./itemsDesktop";
import { RootState } from "@/store/store";
import ItemsOverviewMobile from "../../itemsOverviewMobile";
import { FullCartProduct } from "../lib/types";

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
