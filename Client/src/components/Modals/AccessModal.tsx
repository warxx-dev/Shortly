import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { XIcon } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useState, useContext, type FormEvent } from "react";
import { ModalContext } from "../../context/modalContext";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export const LogInModal = () => {
  const { setLoginModal } = useContext(ModalContext);

  const { login, googleLogin, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmitLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    await login(email, password);
    setLoginModal(false);
  };

  const handleSubmitSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("fullName")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    await register(name, email, password);
    setLoginModal(false);
  };

  const handleClick = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;

    googleLogin(token);

    setLoginModal(false);
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: "-20px" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-20px" }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.stopPropagation()}
      className={`w-full max-w-xs flex-col gap-4 p-6 border border-gray-600 rounded-lg bg-gray-700/30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 sm:max-w-md `}
    >
      <div className="flex justify-between">
        <h2 className="text-2xl">LogIn</h2>
        <button
          className="hover:cursor-pointer hover:bg-gray-900 rounded-lg p-1"
          onClick={() => setLoginModal(false)}
        >
          <XIcon />
        </button>
      </div>
      <form
        onSubmit={isLogin ? handleSubmitLogIn : handleSubmitSignIn}
        className="flex flex-col gap-1"
      >
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-1 overflow-hidden"
            >
              <Input
                placeholder="Jhon Doe"
                text="Full Name"
                name="fullName"
                type="text"
                required={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Input
          placeholder="example@email.com"
          text="Email"
          name="email"
          type="email"
          required={true}
        />
        <Input
          placeholder="••••••••"
          text="Password"
          name="password"
          type="password"
          required={true}
        />
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-1 overflow-hidden"
            >
              <Input
                placeholder="••••••••"
                text="Repeat password"
                name="password"
                type="password"
                required={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          text={isLogin ? "Log in" : "Sign up"}
          className="my-4"
        />
      </form>
      <p>
        {isLogin ? "Haven't you registered yet? " : "Already have an account? "}
        <a
          onClick={handleClick}
          className="text-emerald-400 hover:text-emerald-200 cursor-pointer"
        >
          {isLogin ? "Sign up" : "Log in"}
        </a>
      </p>
      <div className="flex items-center gap-2">
        <hr className="flex-1 border-gray-600" />
        <span className="text-xs text-gray-400">O</span>
        <hr className="flex-1 border-gray-600" />
      </div>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="filled_black"
          size="large"
          text="signin_with"
          shape="rectangular"
        />
      </div>
    </motion.div>,
    document.body
  );
};
