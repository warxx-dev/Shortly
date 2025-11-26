import { Link2 } from "lucide-react";

export const EmptyTable = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 text-center border border-slate-700 shadow-xl">
      <div className="inline-flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20"></div>
          <div className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700">
            <Link2 className="w-12 h-12 text-emerald-400 mx-auto" />
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 mt-6">
        No shortened links yet
      </h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        You haven't created any shortened links yet. Start by creating your
        first link to get all the amazing features!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <div className="text-left bg-slate-700/30 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-400">1</span>
            </div>
            <p className="font-medium text-white text-sm">Create a link</p>
          </div>
          <p className="text-slate-400 text-xs ml-8">
            Enter your long URL and custom short code
          </p>
        </div>
        <div className="text-left bg-slate-700/30 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-400">2</span>
            </div>
            <p className="font-medium text-white text-sm">Copy & Share</p>
          </div>
          <p className="text-slate-400 text-xs ml-8">
            Share your shortened link anywhere you want
          </p>
        </div>
        <div className="text-left bg-slate-700/30 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-400">3</span>
            </div>
            <p className="font-medium text-white text-sm">Track & Manage</p>
          </div>
          <p className="text-slate-400 text-xs ml-8">
            Monitor clicks and manage all your links
          </p>
        </div>
      </div>
    </div>
  );
};
