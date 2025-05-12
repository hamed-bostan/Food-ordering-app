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
      <div className={`h-52 overflow-y-scroll mb-3 ${containerStyle}`}>
        {selectedItems.map((foodItem, index) => (
          <ItemsCard foodItem={foodItem} key={index} />
        ))}
      </div>
      <Divider className={`${shoppingCartTab ? "md:hidden" : ""}`} />
    </>
  );
}
