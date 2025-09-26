import { createContext, ReactNode, useContext, useState } from "react";
import { FranchiseFormValues } from "@/application/schemas/franchise.form-schema";

type FranchiseDialogContextProps = {
  isFranchiseDialogOpen: boolean;
  openFranchiseDialog: () => void;
  closeFranchiseDialog: () => void;
  submittedData: FranchiseFormValues | null;
  setFranchiseSubmittedData: (data: FranchiseFormValues) => void;
};

const FranchiseDialogContext = createContext<FranchiseDialogContextProps | null>(null);

export const FranchiseDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isFranchiseDialogOpen, setIsFranchiseDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FranchiseFormValues | null>(null);

  const openFranchiseDialog = () => setIsFranchiseDialogOpen(true);
  const closeFranchiseDialog = () => setIsFranchiseDialogOpen(false);

  const setFranchiseSubmittedData = (data: FranchiseFormValues) => {
    setSubmittedData(data);
  };

  return (
    <FranchiseDialogContext.Provider
      value={{
        isFranchiseDialogOpen,
        openFranchiseDialog,
        closeFranchiseDialog,
        submittedData,
        setFranchiseSubmittedData,
      }}
    >
      {children}
    </FranchiseDialogContext.Provider>
  );
};

// Custom hook for consuming the context
export const useFranchiseDialog = () => {
  const context = useContext(FranchiseDialogContext);
  if (!context) {
    throw new Error("useFranchiseDialog must be used within a FranchiseDialogProvider");
  }
  return context;
};
