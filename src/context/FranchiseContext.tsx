import { FranchiseFormValues } from "@/schemas/franchise-form-schema";
import { createContext, useState, useContext, ReactNode } from "react";

// Define the context type
type FranchiseDialogContextType = {
  isFranchiseDialogOpen: boolean;
  openFranchiseDialog: (data: FranchiseFormValuesWithProvinceCity) => void;
  closeFranchiseDialog: () => void;
  submittedData: FranchiseFormValuesWithProvinceCity | null;
};

type FranchiseFormValuesWithProvinceCity = FranchiseFormValues & {
  province: string;
  city: string;
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
  const [submittedData, setSubmittedData] =
    useState<FranchiseFormValuesWithProvinceCity | null>(null);

  const openFranchiseDialog = (data: FranchiseFormValuesWithProvinceCity) => {
    setSubmittedData(data);
    setIsFranchiseDialogOpen(true);
  };

  const closeFranchiseDialog = () => setIsFranchiseDialogOpen(false);

  return (
    <FranchiseDialogContext.Provider
      value={{
        isFranchiseDialogOpen,
        openFranchiseDialog,
        closeFranchiseDialog,
        submittedData,
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
