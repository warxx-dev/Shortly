import { useContext } from "react";
import { Button } from "../../UI/Button";
import { LogInModal } from "../../Modals/AccessModal";
import { HeaderText } from "./HeaderText";
import { LogInIcon } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { Avatar } from "./Avatar";
import { ModalContext } from "../../../context/modalContext";
import { AnimatePresence } from "framer-motion";
import { ModalBackground } from "../../Modals/ModalBackground";

export const Header = () => {
  const { user } = useAuth();
  const { loginModal, setLoginModal } = useContext(ModalContext);
  return (
    <header className="sticky flex justify-center w-full border-b border-gray-800 top-0 p-6 bg-slate-900 z-10">
      <div className="max-w-6xl w-full flex relative justify-between items-center">
        <HeaderText />
        {user ? (
          <Avatar img={user.image} />
        ) : (
          <Button
            text={"Log In"}
            hiddenText={true}
            icon={<LogInIcon size={20} />}
            onClick={() => {
              setLoginModal(!loginModal);
            }}
          />
        )}

        <AnimatePresence>
          {loginModal && (
            <>
              <ModalBackground onClick={() => setLoginModal(false)} />
              <LogInModal />
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
