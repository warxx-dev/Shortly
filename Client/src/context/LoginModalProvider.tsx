import { type ReactNode, useState } from "react";
import { LoginModalContext } from "./loginModalContext";

export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <LoginModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}
