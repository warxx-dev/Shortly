import { useContext, useEffect } from "react";
import { AlertContext } from "../../context/alertContext";

export const Toast = () => {
  const { alert, isVisible, hideAlert } = useContext(AlertContext);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, hideAlert]);

  const colors = {
    success: "bg-green-700/40 border-green-500",
    error: "bg-red-700/40 border-red-500",
    info: "bg-amber-700/40 border-amber-500",
  };

  if (!alert) return null;

  return (
    <div
      className={`text-[14px] p-5 fixed right-6 bottom-6 border-[1px] rounded-lg shadow-2xl ${
        colors[alert.type]
      } transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <p className="font-bold">{alert.title}</p>
      <p>{alert.message}</p>
    </div>
  );
};
