"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { PaymentMethodType } from "@/types/payment-method.types";
import { AddressType } from "@/application/schemas/address.schema";

// These enums come from your schema
export type BranchType = "aghdasieh" | "vanak" | "ekbatan";
export type DeliveryMethodType = "pickup" | "courier";

type OrderContextType = {
  // branch selection
  branch: BranchType | null;
  setBranch: (b: BranchType) => void;

  // delivery method
  deliveryMethod: DeliveryMethodType | null;
  setDeliveryMethod: (d: DeliveryMethodType) => void;

  // selected payment method
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (m: PaymentMethodType) => void;

  // selected address
  address: AddressType | null;
  setAddress: (a: AddressType | null) => void;

  // optional notes
  notes: string | null;
  setNotes: (n: string | null) => void;

  // reset order state
  resetOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [branch, setBranch] = useState<BranchType | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cash");
  const [address, setAddress] = useState<AddressType | null>(null);
  const [notes, setNotes] = useState<string | null>(null);

  const resetOrder = () => {
    setBranch(null);
    setDeliveryMethod(null);
    setPaymentMethod("cash");
    setAddress(null);
    setNotes(null);
  };

  return (
    <OrderContext.Provider
      value={{
        branch,
        setBranch,
        deliveryMethod,
        setDeliveryMethod,
        paymentMethod,
        setPaymentMethod,
        address,
        setAddress,
        notes,
        setNotes,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrderContext must be used within OrderProvider");
  return ctx;
}
