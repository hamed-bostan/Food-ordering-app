import { createContext, ReactNode, useContext, useState } from "react";

type LogoutDialogContextProps = {
  isLogoutDialogOpen: boolean;
  openLogoutDialog: () => void;
  closeLogoutDialog: () => void;
};

const LogoutDialogContext =
  createContext<LogoutDialogContextProps | null>(null);

export const LogoutDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const openLogoutDialog = () => setIsLogoutDialogOpen(true);
  const closeLogoutDialog = () => setIsLogoutDialogOpen(false);

  return (
    <LogoutDialogContext.Provider
      value={{
        isLogoutDialogOpen,
        openLogoutDialog,
        closeLogoutDialog,
      }}
    >
      {children}
    </LogoutDialogContext.Provider>
  );
};

// Custom hook for consuming the context
export const useLogoutDialog = () => {
  const context = useContext(LogoutDialogContext);
  if (!context) {
    throw new Error(
      "useLogoutDialog must be used within a LogoutDialogProvider"
    );
  }
  return context;
};
