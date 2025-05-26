import { createContext, ReactNode, useContext, useState } from "react";
import { FranchiseFormValues } from "@/schemas/franchise-form-schema";

type FranchiseDialogContextProps = {
  isFranchiseDialogOpen: boolean;
  closeFranchiseDialog: () => void;
  submittedData: FranchiseFormValues | null;
  setFranchiseDataAndOpenDialog: (data: FranchiseFormValues) => void;
};

const FranchiseDialogContext =
  createContext<FranchiseDialogContextProps | null>(null);

export const FranchiseDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isFranchiseDialogOpen, setIsFranchiseDialogOpen] = useState(false);
  const [submittedData, setSubmittedData] =
    useState<FranchiseFormValues | null>(null);

  const closeFranchiseDialog = () => {
    setIsFranchiseDialogOpen(false);
  };

  const setFranchiseDataAndOpenDialog = (data: FranchiseFormValues) => {
    setSubmittedData(data);
    setIsFranchiseDialogOpen(true);
  };

  return (
    <FranchiseDialogContext.Provider
      value={{
        isFranchiseDialogOpen,
        closeFranchiseDialog,
        submittedData,
        setFranchiseDataAndOpenDialog,
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
    throw new Error(
      "useFranchiseDialog must be used within a FranchiseDialogProvider"
    );
  }
  return context;
};
