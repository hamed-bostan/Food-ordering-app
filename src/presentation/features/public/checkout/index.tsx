"use client";

import OrderOverview from "./orderOverview";
import Payments from "./payments";
import ShoppingCart from "./shoppingCart";
import { useCheckoutTab } from "@/context/checkout-tab.context";

export default function Checkout() {
  return <CheckoutContent />;
}

function CheckoutContent() {
  const { activeTab } = useCheckoutTab();
  const tabs: React.ComponentType[] = [ShoppingCart, OrderOverview, Payments];
  const ActiveComponent = tabs[activeTab];
  return <ActiveComponent />;
}
