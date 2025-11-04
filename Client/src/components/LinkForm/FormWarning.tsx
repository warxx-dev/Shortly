import { AlertCircle } from "lucide-react";

export const FormWarning = () => {
  return (
    <div className="bg-amber-400/10 border border-amber-400/50 rounded-lg p-5 w-full flex gap-3">
      <AlertCircle className="inline mr-2 text-amber-300/90" />
      <div>
        <h4 className="text-amber-300/90 font-bold">
          Links created without an account are temporary
        </h4>
        <p className="text-amber-400/80 text-sm ">
          Sign in or create an account to keep your links forever and manage
          them from your dashboard.
        </p>
      </div>
    </div>
  );
};
