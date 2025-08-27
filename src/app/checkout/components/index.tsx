"use client";

import Header from "./shared/header";
import OrderOverview from "./orderOverview";
import Payments from "./payments";

import {
  CheckoutTabProvider,
  useCheckoutTab,
} from "@/app/checkout/context/CheckoutTabContext";
import ShoppingCart from "./shoppingCart";

export default function Checkout() {
  return (
    <CheckoutTabProvider>
      <CheckoutContent />
    </CheckoutTabProvider>
  );
}

function CheckoutContent() {
  const { activeTab } = useCheckoutTab();

  const tabs: React.ComponentType[] = [ShoppingCart, OrderOverview, Payments];
  const ActiveTabComponent = tabs[activeTab];

  return (
    <section className="px-5 py-6 lg:px-10 2xl:px-28">
      <Header />
      <ActiveTabComponent />
    </section>
  );
}
