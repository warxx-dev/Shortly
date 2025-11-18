export interface scissorsSvgProps {
  width: number;
  height: number;
}

export type Link = {
  originalLink: string;
  code: string;
};

export interface inputProps {
  placeholder: string;
  text: string;
  name: string;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
  value?: string;
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

export interface TableCardProps {
  originalLink: string;
  shortLink: string;
}
