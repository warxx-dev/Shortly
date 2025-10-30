import { Button } from "./Button";
import { Input } from "./Input";
import { HeaderText } from "./HeaderText";
import { Link } from "react-router";
import { ArrowLeft, Lock, Mail, User2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const SignUpModal = () => {
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    register(name, email, password);
  };

  return (
    <>
      <Link
        to="/"
        className="flex items-center gap-2 text-xl absolute top-6 left-6 hover:text-blue-400"
      >
        <ArrowLeft />
        Back
      </Link>
      <HeaderText />
      <div className="w-full max-w-xl flex flex-col gap-4 bg-gray-700 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <p className="text-gray-400">Sing up for save your links permantly</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            name="name"
            placeholder="Enter your name"
            text="Name"
            icon={<User2 />}
          />
          <Input
            name="email"
            placeholder="Enter your email"
            text="Email"
            icon={<Mail />}
          />
          <Input
            name="password"
            placeholder="Enter your password"
            text="Password"
            type="password"
            icon={<Lock />}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm your password"
            text="Confirm Password"
            type="password"
            icon={<Lock />}
          />
          <Button className="m-8" text="Sign Up" />
        </form>
      </div>
    </>
  );
};
