import type { buttonProps } from "../../types";

export const Button = ({
  border,
  className,
  icon,
  text,
  onClick,
  gradient = true,
  hiddenText,
}: buttonProps) => {
  return (
    <button
      className={`group flex items-center font-bold justify-center ${
        icon && text ? "gap-2.5" : ""
      } max-h-10 ${
        gradient
          ? "bg-gradient-to-br from-emerald-500 to-teal-500  hover:scale-105 hover:shadow-emerald-500/50 shadow-lg"
          : "bg-slate-800 hover:bg-slate-700"
      }  py-2 px-4 border-gray-600 ${
        border && "border"
      } hover:cursor-pointer  transition-transform duration-150 rounded-lg ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      {icon}
      <span className={`${hiddenText ? "hidden sm:inline" : ""} `}>{text}</span>
    </button>
  );
};
