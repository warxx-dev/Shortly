import { createContext } from "react";

interface ModalContextType {
  editModal: boolean;
  setEditModal: (value: boolean) => void;
  loginModal: boolean;
  setLoginModal: (value: boolean) => void;
  deleteModal: boolean;
  setDeleteModal: (value: boolean) => void;
}

export const ModalContext = createContext<ModalContextType>({
  editModal: false,
  setEditModal: () => {},
  loginModal: false,
  setLoginModal: () => {},
  deleteModal: false,
  setDeleteModal: () => {},
});
