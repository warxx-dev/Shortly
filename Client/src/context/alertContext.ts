import { createContext } from "react";

export interface Alert {
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

interface AlertContextType {
  alert: Alert | null;
  showAlert: (alert: Alert) => void;
  hideAlert: () => void;
  isVisible: boolean;
}

export const AlertContext = createContext<AlertContextType>({
  alert: null,
  showAlert: () => {},
  hideAlert: () => {},
  isVisible: false,
});
