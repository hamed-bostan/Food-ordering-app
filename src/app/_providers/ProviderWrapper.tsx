"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { ReactNode } from "react";
import { AddressProvider } from "@/context/address.context";

type ProviderWrapperProps = {
  children: ReactNode;
};

export default function ProviderWrapper({ children }: ProviderWrapperProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AddressProvider>{children}</AddressProvider>
      </PersistGate>
    </Provider>
  );
}
