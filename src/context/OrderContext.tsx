"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AddressType } from "@/application/schemas/address.schema";
import { BranchType, DeliveryMethodType, PaymentMethodType } from "@/application/schemas/order.schema";
import { isOrderDeliveryValid } from "@/domain/order/order.rules";

type OrderContextType = {
  branch: BranchType | null;
  setBranch: (b: BranchType | null) => void;

  deliveryMethod: DeliveryMethodType;
  setDeliveryMethod: (d: DeliveryMethodType) => void;

  paymentMethod: PaymentMethodType;
  setPaymentMethod: (m: PaymentMethodType) => void;

  selectedAddress: AddressType | null;
  setSelectedAddress: (a: AddressType | null) => void;

  notes: string | null;
  setNotes: (n: string | null) => void;

  resetOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [branch, _setBranch] = useState<BranchType | null>(null);
  const [deliveryMethod, _setDeliveryMethod] = useState<DeliveryMethodType>("courier");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("online");
  const [selectedAddress, _setSelectedAddress] = useState<AddressType | null>(null);
  const [notes, setNotes] = useState<string | null>(null);

  const setDeliveryMethod = (method: DeliveryMethodType) => {
    _setDeliveryMethod(method);

    // Reset state according to rules
    if (method === "pickup") _setSelectedAddress(null);
    if (method === "courier") _setBranch(null);
  };

  const setBranch = (b: BranchType | null) => {
    if (isOrderDeliveryValid("pickup", b, null)) _setBranch(b);
    else _setBranch(null);
  };

  const setSelectedAddress = (a: AddressType | null) => {
    if (isOrderDeliveryValid("courier", null, a)) {
      _setSelectedAddress((prev) => (prev?.id !== a?.id ? a : prev));
    } else {
      _setSelectedAddress(null);
    }
  };

  const resetOrder = () => {
    _setBranch(null);
    _setDeliveryMethod("courier");
    setPaymentMethod("cash");
    _setSelectedAddress(null);
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
        selectedAddress,
        setSelectedAddress,
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
