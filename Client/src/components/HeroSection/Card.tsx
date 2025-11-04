import type { LucideProps } from "lucide-react";
import React from "react";

export const Card = ({
  icon,
  title,
  text,
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  title: string;
}) => {
  return (
    <article className="flex flex-col items-baseline gap-3 p-6 bg-slate-800/50 border-gray-700 border rounded-lg text-center">
      <div className="rounded-lg bg-emerald-500/10 p-3 mb-2">
        {React.createElement(icon, { className: "text-emerald-400" })}
      </div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-gray-400 text-start">{text}</p>
    </article>
  );
};
