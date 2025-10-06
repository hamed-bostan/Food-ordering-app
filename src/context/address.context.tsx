import { AddressType } from "@/application/schemas/address.schema";
import { createContext, ReactNode, useState } from "react";

type AddressContextType = {
  address: AddressType | null;
  setAddress: (addr: AddressType | null) => void;
  resetAddress: () => void;
};

export const AddressContext = createContext<AddressContextType | undefined>(undefined);

type AddressProviderProps = {
  children: ReactNode;
};

export function AddressProvider({ children }: AddressProviderProps) {
  const defaultAddress: AddressType = {
    id: "default",
    value: "مشهد میدان آزادی",
    coords: [36.314986827431504, 59.54047393694055],
  };

  const [address, setAddress] = useState<AddressType | null>(defaultAddress);

  const resetAddress = () => setAddress(defaultAddress);

  return (
    <AddressContext.Provider
      value={{
        address,
        setAddress,
        resetAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
