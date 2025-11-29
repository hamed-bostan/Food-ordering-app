import { AddressType } from "@/application/schemas/address.schema";
import { createContext, ReactNode, useState } from "react";

type AddressContextType = {
  tempAddress: AddressType | null;
  setTempAddress: (addr: AddressType | null) => void;
  resetTempAddress: () => void;
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

  const [tempAddress, setTempAddress] = useState<AddressType | null>(defaultAddress);

  const resetTempAddress = () => setTempAddress(defaultAddress);

  return (
    <AddressContext.Provider
      value={{
        tempAddress,
        setTempAddress,
        resetTempAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
