import { useState } from "react";
import { Form } from "../components/LinkForm/Form";
import { LinksTable } from "../components/LinksTable/LinksTable";
import { AnimatePresence } from "framer-motion";

const NAV_ITEMS = { NEW_LINK: "New link", MY_LINKS: "My links" };

export const ProtectedPage = () => {
  const [navItem, setNavItem] = useState(NAV_ITEMS.NEW_LINK);
  return (
    <section className="max-w-6xl w-full h-full flex-1">
      <nav className="mt-3">
        <ul className="flex w-full">
          {Object.values(NAV_ITEMS).map((item) => (
            <li
              key={item}
              className={`cursor-pointer px-4 py-2 mx-8 flex-1 text-center font-semibold relative inline-block  ${
                navItem === item ? "text-emerald-400" : ""
              }`}
              onClick={() => setNavItem(item)}
            >
              {item}
              <span
                className={`absolute h-[2px] w-full bg-emerald-400 bottom-0 left-0
         scale-x-0 ${
           item === NAV_ITEMS.NEW_LINK ? "origin-right" : "origin-left"
         } transition-transform duration-300 ease-in-out ${
                  navItem === item ? "scale-x-100 delay-300" : ""
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 flex justify-center w-full ">
        <AnimatePresence>
          {navItem === NAV_ITEMS.NEW_LINK ? (
            <Form showWarning={false} />
          ) : (
            <LinksTable />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
