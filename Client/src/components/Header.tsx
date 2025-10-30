import { useContext } from "react";
import { Button } from "./Button";
import { LogInModal } from "./AccessModal";
import { HeaderText } from "./HeaderText";
import { LogInIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Avatar } from "./Avatar";
import { LoginModalContext } from "../context/loginModalContext";

export const Header = () => {
  const { user } = useAuth();
  const { showModal, setShowModal } = useContext(LoginModalContext);
  console.log("User:", user);
  return (
    <header className="sticky flex justify-center w-full border-b border-gray-800 top-0 p-6 bg-slate-900">
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
              setShowModal(!showModal);
            }}
          />
        )}
        {showModal && (
          <div
            onClick={() => setShowModal(false)}
            className="w-dvw h-dvh backdrop-blur-sm fixed top-0 left-0 bg-black/20"
          ></div>
        )}
        <LogInModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </header>
  );
};
