import { createContext } from "react";

interface LoginContextType {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const LoginModalContext = createContext<LoginContextType>({
  showModal: false,
  setShowModal: () => {},
});
