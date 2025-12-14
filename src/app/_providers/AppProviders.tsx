"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { ReactNode } from "react";
import { AddressProvider } from "@/context/address.context";

type Props = { children: ReactNode };

export function AppProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AddressProvider>{children}</AddressProvider>
      </PersistGate>
    </Provider>
  );
}
