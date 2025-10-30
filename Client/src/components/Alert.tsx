import { useContext } from "react";
import { AlertContext } from "../context/alertContext";

export const Alert = () => {
  const { showAlert, setShowAlert } = useContext(AlertContext);

  if (showAlert) {
    setTimeout(() => {
      setShowAlert(false);
      console.log("Alerta desactivada");
    }, 3000);
  }

  return (
    <div
      className={`text-[14px] p-5 fixed right-6 bottom-6 bg-gray-700 border-black border-[1px] rounded-lg shadow-gray-950 shadow-2xl transition-all  duration-150
          ${!showAlert && "translate-y-30"}`}
    >
      <p>Link shortened successfully.</p>
      <p>Your URL has been shortened and is ready to use.</p>
    </div>
  );
};
