// ProviderWrapper.tsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store"; // Import from store.ts
import { AddressDialogProvider } from "@/context/AddressDialogContext";
import { ReactNode } from "react";

type ProviderWrapperProps = {
  children: ReactNode;
};

export default function ProviderWrapper({ children }: ProviderWrapperProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AddressDialogProvider>{children}</AddressDialogProvider>
      </PersistGate>
    </Provider>
  );
}
