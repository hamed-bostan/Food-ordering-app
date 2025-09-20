import { createContext, ReactNode, useState } from "react";

type AddressContextType = {
  value: string;
  setValue: (text: string) => void;
  coords: [number, number];
  setCoords: (coords: [number, number]) => void;
  resetAddress: () => void;
};

export const AddressContext = createContext<AddressContextType | undefined>(undefined);

type AddressProviderProps = {
  children: ReactNode;
};

export function AddressProvider({ children }: AddressProviderProps) {
  const defaultValue = "مشهد میدان آزادی";
  const defaultLocation: [number, number] = [36.314986827431504, 59.54047393694055];

  const [value, setValue] = useState<string>(defaultValue);
  const [coords, setCoords] = useState<[number, number]>(defaultLocation);

  const resetAddress = () => {
    setValue(defaultValue);
    setCoords(defaultLocation);
  };

  return (
    <AddressContext.Provider
      value={{
        value,
        setValue,
        coords,
        setCoords,
        resetAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
