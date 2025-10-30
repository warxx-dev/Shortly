import { createContext } from "react";

interface AlertContextType {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
}

export const AlertContext = createContext<AlertContextType>({
  showAlert: false,
  setShowAlert: () => {},
});
