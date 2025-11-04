import { useEffect } from "react";

export const useScrollLock = (lock: boolean) => {
  console.log("useScrollLock called with lock =", lock);
  useEffect(() => {
    if (lock) {
      // Guardamos el scroll actual
      const scrollY = window.scrollY;
      console.log("Locking scroll at position:", scrollY);

      // Añadimos padding-right para compensar la desaparición del scrollbar y evitar el salto
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Bloqueamos el scroll y mantenemos la posición actual
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      // Recuperamos la posición del scroll
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [lock]);
};
