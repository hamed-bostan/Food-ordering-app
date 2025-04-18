import { createContext, useState, useContext, ReactNode } from "react";

// Define the context type
type AddressDialogContextType = {
  isGeolocationDialogOpen: boolean;
  openGeolocationDialog: () => void;
  closeGeolocationDialog: () => void;
  isAddressDialogOpen: boolean;
  openAddressDialog: () => void;
  closeAddressDialog: () => void;
};

const AddressDialogContext = createContext<
  AddressDialogContextType | undefined
>(undefined);

export const AddressDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isGeolocationDialogOpen, setIsGeolocationDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  const openGeolocationDialog = () => setIsGeolocationDialogOpen(true);
  const closeGeolocationDialog = () => setIsGeolocationDialogOpen(false);

  const openAddressDialog = () => setIsAddressDialogOpen(true);
  const closeAddressDialog = () => setIsAddressDialogOpen(false);

  return (
    <AddressDialogContext.Provider
      value={{
        isGeolocationDialogOpen,
        openGeolocationDialog,
        closeGeolocationDialog,
        isAddressDialogOpen,
        openAddressDialog,
        closeAddressDialog,
      }}
    >
      {children}
    </AddressDialogContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAddressDialog = (): AddressDialogContextType => {
  const context = useContext(AddressDialogContext);
  if (!context) {
    throw new Error(
      "useAddressDialog must be used within an AddressDialogProvider"
    );
  }
  return context;
};
