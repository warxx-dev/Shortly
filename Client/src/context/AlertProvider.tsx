import { type ReactNode, useState } from "react";
import { AlertContext, type Alert } from "./alertContext";

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (newAlert: Alert) => {
    setIsVisible(true);
    setAlert(newAlert);
  };

  const hideAlert = () => {
    setIsVisible(false);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert, isVisible }}>
      {children}
    </AlertContext.Provider>
  );
}
