"use client";

import { useState } from "react";
import HeaderDesktop from "../header/HeaderDesktop";
import FoodList from "./foodList";
import OrderDetails from "./orderDetails";
import StatusFilter from "./statusFilter";
import { filterLists, FilterCategory } from "./types";

export default function OrderStatus() {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("همه");
  return (
    <div className="md:border md:border-[#CBCBCB] md:rounded-lg md:p-5">
      <HeaderDesktop label="سفارشات" style="mb-4" />
      <StatusFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filterLists={filterLists}
      />
      <div className="border border-[#CBCBCB] rounded-sm p-2 pb-4 md:p-5 md:pt-4">
        <OrderDetails />
        <FoodList />
      </div>
    </div>
  );
}
