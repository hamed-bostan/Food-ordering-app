"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AddressType } from "@/application/schemas/address.schema";
import { BranchType, DeliveryMethodType, PaymentMethodType } from "@/application/schemas/order.schema";

type OrderContextType = {
  branch: BranchType | null;
  setBranch: (b: BranchType | null) => void;

  deliveryMethod: DeliveryMethodType | null;
  setDeliveryMethod: (d: DeliveryMethodType | null) => void;

  paymentMethod: PaymentMethodType;
  setPaymentMethod: (m: PaymentMethodType) => void;

  address: AddressType | null;
  setAddress: (a: AddressType | null) => void;

  notes: string | null;
  setNotes: (n: string | null) => void;

  resetOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [branch, _setBranch] = useState<BranchType | null>(null);
  const [deliveryMethod, _setDeliveryMethod] = useState<DeliveryMethodType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cash");
  const [address, _setAddress] = useState<AddressType | null>(null);
  const [notes, setNotes] = useState<string | null>(null);

  const setDeliveryMethod = (method: DeliveryMethodType | null) => {
    _setDeliveryMethod(method);

    if (method === "pickup") _setAddress(null);
    if (method === "courier") _setBranch(null);
    if (method === null) {
      _setBranch(null);
      _setAddress(null);
    }
  };

  const setBranch = (b: BranchType | null) => {
    if (deliveryMethod === "pickup") _setBranch(b);
    else _setBranch(null);
  };

  const setAddress = (a: AddressType | null) => {
    if (deliveryMethod === "courier") _setAddress(a);
    else _setAddress(null);
  };

  const resetOrder = () => {
    _setBranch(null);
    _setDeliveryMethod(null);
    setPaymentMethod("cash");
    _setAddress(null);
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
