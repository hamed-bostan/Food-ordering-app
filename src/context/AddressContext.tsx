import { createContext, ReactNode, useState } from "react";

type AddressContextType = {
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  editingAddress: { address: string } | null;
  setEditingAddress: (address: { address: string } | null) => void;
};

export const AddressContext = createContext<AddressContextType | undefined>(
  undefined
);

type AddressProviderProps = {
  children: ReactNode;
};

export function AddressProvider({ children }: AddressProviderProps) {
  const [editingAddress, setEditingAddress] = useState<{
    address: string;
  } | null>(null);

  const [selectedAddress, setSelectedAddress] = useState<string>(
    editingAddress?.address || ""
  );

  return (
    <AddressContext.Provider
      value={{
        selectedAddress,
        setSelectedAddress,
        editingAddress,
        setEditingAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
