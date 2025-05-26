import { createContext, useState, useContext, ReactNode } from "react";

// Define the context type
type FranchiseDialogContextType = {
  isFranchiseDialogOpen: boolean;
  openFranchiseDialog: () => void;
  closeFranchiseDialog: () => void;
};

const FranchiseDialogContext = createContext<
  FranchiseDialogContextType | undefined
>(undefined);

export const FranchiseDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isFranchiseDialogOpen, setIsFranchiseDialogOpen] = useState(false);

  const openFranchiseDialog = () => setIsFranchiseDialogOpen(true);
  const closeFranchiseDialog = () => setIsFranchiseDialogOpen(false);

  return (
    <FranchiseDialogContext.Provider
      value={{
        isFranchiseDialogOpen,
        openFranchiseDialog,
        closeFranchiseDialog,
      }}
    >
      {children}
    </FranchiseDialogContext.Provider>
  );
};

// Custom hook for consuming the context
export const useFranchiseDialog = (): FranchiseDialogContextType => {
  const context = useContext(FranchiseDialogContext);
  if (!context) {
    throw new Error(
      "useFranchiseDialog must be used within an FranchiseDialogProvider"
    );
  }
  return context;
};
