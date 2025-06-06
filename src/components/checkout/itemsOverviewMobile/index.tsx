import ItemsCard from "./ItemsCard";
import { useCheckoutTab } from "@/context/CheckoutTabContext";
import { ProductType } from "@/lib/productApi";
import { Divider } from "@mui/material";

type ItemsOverviewMobileProps = {
  selectedItems: ProductType[];
  containerStyle?: string;
};

export default function ItemsOverviewMobile({
  selectedItems,
  containerStyle,
}: ItemsOverviewMobileProps) {
  const { activeTab } = useCheckoutTab();
  const shoppingCartTab = activeTab === 0;

  return (
    <>
      <ul className={`h-52 overflow-y-scroll mb-3 ${containerStyle}`}>
        {selectedItems.map((foodItem, index) => (
          <li key={index}>
            <ItemsCard foodItem={foodItem} />
          </li>
        ))}
      </ul>
      <Divider className={`${shoppingCartTab ? "md:hidden" : ""}`} />
    </>
  );
}
