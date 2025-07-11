import FoodCard from "./FoodCard";
import { useSelector } from "react-redux";
import CustomButton from "@/components/ui/CustomButton";
import { RootState } from "@/store/store";

export default function FoodList() {
  const selectedItems = useSelector(
    (state: RootState) => state.cart.selectedItems
  );

  return (
    <section>
      <div className="grid grid-cols-3 gap-2 mb-2 md:mb-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 2xl:grid-cols-6 2xl:gap-4">
        {selectedItems.map((item, index) => (
          <FoodCard item={item} key={index} />
        ))}
      </div>
      <ActionButtons />
    </section>
  );
}

function ActionButtons() {
  return (
    <>
      <button className="text-[#717171] text-xs text-center block mb-4 cursor-pointer md:hidden">
        مشاهده همه سفارشات
      </button>
      <CustomButton
        variant="outlined"
        sx={{
          backgroundColor: "transparent",
          borderColor: "#C30000",
          color: "#C30000",
          mx: "auto",
          display: "flex",
          "&:hover": {
            backgroundColor: "#FFF2F2",
          },
        }}
      >
        لغو سفارش
      </CustomButton>
    </>
  );
}
