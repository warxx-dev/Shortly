import { User2 } from "lucide-react";

export const Avatar = ({ img }: { img: string | undefined }) => {
  return (
    <div>
      <div className="w-12 h-12 rounded-full hover:bg-slate-900 border-2 border-emerald-500 cursor-pointer hover:shadow-[0px_0px_30px_#00d492] transition-all duration-200 bg-slate-800  text-gray-600 font-bold">
        {img ? (
          <img src={img} alt="User avatar" className="w-12 h-12 rounded-full" />
        ) : (
          <User2 className="text-emerald-500"></User2>
        )}
      </div>
    </div>
  );
};
