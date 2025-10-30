import type { LogInModalProps } from "../types";
import { Button } from "./Button";
import { Input } from "./Input";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { XIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";

export const LogInModal = ({ showModal, setShowModal }: LogInModalProps) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const { login, googleLogin, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmitLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    login(email, password);
  };

  const handleSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    register(name, email, password);
  };

  const handleClick = () => {
    setIsLogin((v) => !v);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    const token = credentialResponse.credential;

    console.log(token);
    googleLogin(token);

    setShowModal(false);
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-full max-w-xs flex-col gap-4 p-6 border border-gray-600 rounded-lg bg-slate-700/50 absolute top-0 sm:top-24 right-0 z-10 sm:max-w-md  ${
        showModal
          ? "visible animate-fade-in-down"
          : "invisible animate-fade-out-up"
      } animate-duration-150`}
    >
      <div className="flex justify-between">
        <h2 className="text-2xl">LogIn</h2>
        <button
          className="hover:cursor-pointer hover:bg-gray-900 rounded-lg p-1"
          onClick={() => setShowModal(false)}
        >
          <XIcon />
        </button>
      </div>
      <form
        onSubmit={isLogin ? handleSubmitLogIn : handleSubmitSignIn}
        className="flex flex-col gap-1"
      >
        <div
          className={`overflow-hidden transition-[max-height] duration-250 ease-in-out ${
            isLogin ? "max-h-0" : "max-h-[480px]"
          }`}
        >
          <div
            className={`flex flex-col gap-1 transform transition-all duration-400 ease-out ${
              isLogin
                ? "opacity-0 -translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
            aria-hidden={isLogin}
          >
            <Input
              placeholder="Jhon Doe"
              text="Full Name"
              name="fullName"
              type="text"
            />
          </div>
        </div>
        <Input
          placeholder="example@email.com"
          text="Email"
          name="email"
          type="email"
        />
        <Input
          placeholder="••••••••"
          text="Password"
          name="password"
          type="password"
        />

        <div
          className={`overflow-hidden transition-[max-height] duration-250 ease-in-out ${
            isLogin ? "max-h-0" : "max-h-[480px]"
          }`}
        >
          <div
            className={`flex flex-col gap-1 transform transition-all duration-400 ease-out ${
              isLogin
                ? "opacity-0 -translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
            aria-hidden={isLogin}
          >
            <Input
              placeholder="••••••••"
              text="Repeat password"
              name="password"
              type="password"
            />
          </div>
        </div>

        <a className="hover:text-emerald-400">Forgot your password?</a>
        <Button
          type="submit"
          text={!isLogin ? "Sign up" : "Log in"}
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
    </div>
  );
};
