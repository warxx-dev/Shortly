export interface scissorsSvgProps {
  width: number;
  height: number;
}

export type Link = {
  originalLink: string;
  shortLink: string;
};

export interface inputProps {
  placeholder: string;
  text: string;
  name: string;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface buttonProps {
  onClick?: () => void;
  text?: string;
  icon?: React.ReactNode;
  border?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  gradient?: boolean;
  hiddenText?: boolean;
}

export interface LogInModalProps {
  showModal?: boolean;
  setShowModal: (value: boolean) => void;
}
