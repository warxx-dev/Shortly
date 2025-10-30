import { type ReactNode, useState } from "react";
import { AlertContext } from "./alertContext";

export function AlertProvider({ children }: { children: ReactNode }) {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <AlertContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
