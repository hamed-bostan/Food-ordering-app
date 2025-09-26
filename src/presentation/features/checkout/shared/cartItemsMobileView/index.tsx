import { useCheckoutTab } from "@/context/checkout-tab.context";
import { ItemsOverviewMobileProps } from "@/types/shopping-cart.types";
import { Divider } from "@mui/material";
import CartItemCard from "./CartItemCard";

export default function CartItemsMobileView({ selectedItems, containerStyle }: ItemsOverviewMobileProps) {
  const { activeTab } = useCheckoutTab();
  const shoppingCartTab = activeTab === 0;

  return (
    <>
      <ul className={`h-52 overflow-y-scroll mb-3 ${containerStyle}`}>
        {selectedItems.map((foodItem, index) => (
          <li key={index}>
            <CartItemCard foodItem={foodItem} />
          </li>
        ))}
      </ul>
      <Divider className={`${shoppingCartTab ? "md:hidden" : ""}`} />
    </>
  );
}
