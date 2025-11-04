import { Logo } from "../../UI/Logo";

export const HeaderText = () => {
  return (
    <div className="flex flex-col items-center  gap-5">
      <div className="flex items-center gap-4">
        <Logo />
        <div className="flex flex-col">
          <h1 className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent text-xl sm:text-3xl font-bold">
            Short.ly
          </h1>
          <p className="text-sm text-gray-400">
            Turn your long links into short, shareable URLs
          </p>
        </div>
      </div>
    </div>
  );
};
