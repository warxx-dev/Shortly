import { Link2, MousePointerClick, TableConfig } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { LoginModalContext } from "../context/loginModalContext";
import { useContext } from "react";

const elements = [
  {
    icon: Link2,
    title: "Custom Names",
    text: "Choose your own memorable short codes instead of random strings",
  },
  {
    icon: MousePointerClick,
    title: "Track Clicks",
    text: "Monitor how many times your shortened links have been clicked",
  },
  {
    icon: TableConfig,
    title: "Manage Links",
    text: "Keep all your shortened URLs organized in one dashboard",
  },
];

export const HeroSection = () => {
  const handleClick = () => {
    setShowModal(true);
  };
  const { setShowModal } = useContext(LoginModalContext);

  return (
    <div className="flex flex-col w-full max-w-6xl items-center justify-center gap-3 p-12">
      <h1 className="text-5xl font-bold">Shorten URLs with </h1>
      <span className="bg-gradient-to-r text-5xl font-bold from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        Custom Names
      </span>
      <p className="text-gray-400 text-xl">
        Create memorable, branded short links that are easy to share and track.
      </p>
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {elements.map((elem) => {
          return (
            <Card
              key={elem.title}
              icon={elem.icon}
              title={elem.title}
              text={elem.text}
            />
          );
        })}
      </section>
      <Button
        text="Create free account"
        onClick={handleClick}
        className="mt-8"
      />
      <p className="text-gray-400">Create an account for your links persist</p>
    </div>
  );
};
