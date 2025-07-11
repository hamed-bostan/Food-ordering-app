"use client";

import { useDispatch, useSelector } from "react-redux";
import { tabsConfig } from "./TabsConfig";
import { useCheckoutTab } from "@/context/CheckoutTabContext";
import {
  ArrowBackOutlined,
  ArrowForwardOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { RootState } from "@/store/store";
import { clear } from "@/redux/reducers/cartSlice";
import { IconButton } from "@mui/material";

export default function HeaderMobile() {
  const { activeTab, setActiveTab } = useCheckoutTab();

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.selectedItems);

  const isCartEmpty = cartItems.length === 0;

  function handleClearCart() {
    dispatch(clear());
  }

  function handleNext() {
    if (activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  }

  function handlePrevious() {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  }

  return (
    <div className="flex justify-between mb-6 md:hidden">
      <IconButton
        onClick={handleNext}
        disabled={activeTab === tabsConfig.length - 1}
        sx={{
          color: activeTab === tabsConfig.length - 1 ? "#A0A0A0" : "#353535",
        }}
      >
        <ArrowForwardOutlined fontSize="small" />
      </IconButton>

      <h1 className="text-sm font-bold text-[#353535]">
        {tabsConfig[activeTab].label}
      </h1>
      {activeTab > 0 ? (
        <IconButton onClick={handlePrevious} sx={{ color: "#353535" }}>
          <ArrowBackOutlined fontSize="small" />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleClearCart}
          disabled={isCartEmpty}
          sx={{ color: isCartEmpty ? "#A0A0A0" : "#353535" }}
        >
          <DeleteOutlined fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}
