import type { Dispatch, SetStateAction } from "react";

export interface scissorsSvgProps {
  width: number;
  height: number;
}

export type Link = {
  originalLink: string;
  code: string;
  clicks: number;
  createdAt: Date;
  id: number;
};

export interface inputProps {
  placeholder: string;
  text: string;
  name: string;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

type ButtonClickHandler =
  | (() => void)
  | ((e: React.MouseEvent<HTMLButtonElement>) => void)
  | ((e: React.FormEvent<HTMLFormElement>) => void);

export interface buttonProps {
  onClick?: ButtonClickHandler;
  text?: string;
  icon?: React.ReactNode;
  border?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  gradient?: boolean;
  hiddenText?: boolean;
  onMouseMove?: () => void;
}

export interface TableCardProps {
  originalLink: string;
  shortLink: string;
  code: string;
  clicks: number;
  date: string;
  id: number;
}

export interface EditModalProps {
  shortCode: string;
  originalLink: string;
  setEditModal: Dispatch<SetStateAction<boolean>>;
  id: number;
}
