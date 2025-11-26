"use client";

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EmptyStateMessage from "@/presentation/components/EmptyStateMessage";
import { CheckoutTabProvider, useCheckoutTab } from "@/context/checkout-tab.context";
import { OrderProvider } from "@/context/OrderContext";
import Header from "@/presentation/features/public/checkout/shared/header";
import CartSummary from "@/presentation/features/public/checkout/CartSummary";

type ClientInnerLayoutProps = {
  children: ReactNode;
  phoneNumber: string;
};

export default function ClientInnerLayout({ children, phoneNumber }: ClientInnerLayoutProps) {
  return (
    <CheckoutTabProvider>
      <OrderProvider>
        <CheckoutContent phoneNumber={phoneNumber}>{children}</CheckoutContent>
      </OrderProvider>
    </CheckoutTabProvider>
  );
}

function CheckoutContent({ children, phoneNumber }: ClientInnerLayoutProps) {
  const { activeTab } = useCheckoutTab();
  const selectedItems = useSelector((state: RootState) => state.cart.selectedItems);
  const isShoppingCartTab = activeTab === 0;
  const isEmptyCart = isShoppingCartTab && selectedItems.length === 0;

  const gridClass = isShoppingCartTab
    ? "md:grid lg:grid-cols-[60fr_40fr] md:gap-y-4 lg:gap-x-6"
    : "md:grid md:grid-cols-[70fr_40fr] md:gap-x-4 lg:gap-x-6";
  const borderClass = isShoppingCartTab && !isEmptyCart ? "p-5 border border-[#CBCBCB] md:border-none rounded-lg" : "";

  return (
    <section className="px-5 py-6 lg:px-10 2xl:px-28">
      <Header />
      {isEmptyCart ? (
        <EmptyStateMessage
          button={true}
          text="شما در حال حاضر هیچ سفارشی ثبت نکرده‌اید!"
          buttonText="منوی رستوران"
          href="/menu"
        />
      ) : (
        <section className={`${gridClass} ${borderClass}`}>
          {children}
          <CartSummary phoneNumber={phoneNumber} />
        </section>
      )}
    </section>
  );
}
