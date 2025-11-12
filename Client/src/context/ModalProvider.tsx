import { type ReactNode, useState } from "react";
import { ModalContext } from "./modalContext";
import { useScrollLock } from "../hooks/useScrollLock";

export function ModalProvider({ children }: { children: ReactNode }) {
  const [editModal, setEditModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // Bloquear scroll cuando cualquier modal esté abierto
  const isAnyModalOpen = editModal || loginModal || deleteModal;
  useScrollLock(isAnyModalOpen);
  console.log("ModalProvider render, isAnyModalOpen =", isAnyModalOpen);
  return (
    <ModalContext.Provider
      value={{
        editModal,
        setEditModal,
        deleteModal,
        setDeleteModal,
        loginModal,
        setLoginModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
