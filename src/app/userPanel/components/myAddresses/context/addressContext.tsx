import { LatLngTuple } from "leaflet";
import { createContext, ReactNode, useState } from "react";

type AddressContextType = {
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  selectedLocation: LatLngTuple;
  setSelectedLocation: (coords: LatLngTuple) => void;
  resetAddress: () => void;
};

export const AddressContext = createContext<AddressContextType | undefined>(undefined);

type AddressProviderProps = {
  children: ReactNode;
};

export function AddressProvider({ children }: AddressProviderProps) {
  const defaultAddress = "مشهد میدان آزادی";
  const defaultLocation: LatLngTuple = [36.314986827431504, 59.54047393694055];

  const [selectedAddress, setSelectedAddress] = useState<string>(defaultAddress);
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple>(defaultLocation);

  const resetAddress = () => {
    setSelectedAddress(defaultAddress);
    setSelectedLocation(defaultLocation);
  };

  return (
    <AddressContext.Provider
      value={{
        selectedAddress,
        setSelectedAddress,
        selectedLocation,
        setSelectedLocation,
        resetAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
