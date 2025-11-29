"use client";

import Payments from "./payments";
import ShoppingCart from "./shoppingCart";
import { useCheckoutTab } from "@/context/checkout-tab.context";
import dynamic from "next/dynamic";
import { AddressType } from "@/application/schemas/address.schema";

const OrderOverview = dynamic(() => import("./orderOverview"), { ssr: false }); // Points to client index.tsx (rename ClientOrderOverview if needed)

type CheckoutProps = {
  addresses: AddressType[];
  initialSelectedAddress: AddressType | null;
};

export default function Checkout({ addresses, initialSelectedAddress }: CheckoutProps) {
  return <CheckoutContent addresses={addresses} initialSelectedAddress={initialSelectedAddress} />;
}

function CheckoutContent({ addresses, initialSelectedAddress }: CheckoutProps) {
  const { activeTab } = useCheckoutTab();

  switch (activeTab) {
    case 0:
      return <ShoppingCart />;
    case 1:
      return <OrderOverview addresses={addresses} initialSelectedAddress={initialSelectedAddress} />;
    case 2:
      return <Payments />;
    default:
      return null; // Or fallback UI
  }
}