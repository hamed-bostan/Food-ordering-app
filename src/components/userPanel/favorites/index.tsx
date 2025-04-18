import HeaderDesktop from "../header/HeaderDesktop";
import FoodCategories from "./foodCategories";
import FoodList from "./foodList";

export default function Favorites() {
  return (
    <div className="md:border md:border-[#CBCBCB] md:rounded-lg md:p-5">
      <HeaderDesktop label="علاقه مندی‌ها" style="mb-5" />
      <FoodCategories />
      <FoodList />
    </div>
  );
}
