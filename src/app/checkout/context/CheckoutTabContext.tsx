"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type CheckoutTabContextType = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

// Create context with default undefined value
const CheckoutTabContext = createContext<CheckoutTabContextType | undefined>(
  undefined
);

// Provider Component
export function CheckoutTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <CheckoutTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </CheckoutTabContext.Provider>
  );
}

// Custom Hook for consuming context
export function useCheckoutTab(): CheckoutTabContextType {
  const context = useContext(CheckoutTabContext);
  if (!context) {
    throw new Error("useCheckoutTab must be used within a CheckoutTabProvider");
  }
  return context;
}
