"use client";

import { useSelector } from "react-redux";
import Items from "./items";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import { useCheckoutTab } from "@/app/checkout/context/CheckoutTabContext";
import CartSummary from "../CartSummary";
import { RootState } from "@/store/store";

export default function ShoppingCart() {
  const { activeTab } = useCheckoutTab();
  const hasBorder = activeTab === 0;
  const selectedItems = useSelector(
    (state: RootState) => state.cart.selectedItems
  );

  return (
    <>
      {selectedItems.length > 0 ? (
        <section
          className={`md:grid lg:grid-cols-[60fr_40fr] md:gap-y-4 lg:gap-x-6 ${
            hasBorder && "p-5 border border-[#CBCBCB] md:border-none rounded-lg"
          }`}
        >
          <Items />
          <CartSummary />
        </section>
      ) : (
        <EmptyStateMessage
          button={true}
          text="شما در حال حاضر هیچ سفارشی ثبت نکرده‌اید!"
          buttonText="منوی رستوران"
          href="/menu"
        />
      )}
    </>
  );
}
