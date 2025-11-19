import { Button } from "../../UI/Button";
import { LogOut, User2 } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export const Avatar = ({ img }: { img: string | undefined }) => {
  const { logout } = useAuth();
  const [showLogOut, setShowLogOut] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowLogOut(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowLogOut(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center gap-4 rounded-3xl"
    >
      <AnimatePresence>
        {showLogOut && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              text="Log out"
              gradient={false}
              className="hover:bg-red-500/20! hover:ring-2 ring-red-600 hover:text-red-300 transition-all duration-200"
              icon={<LogOut size={16} />}
              onClick={logout}
              hiddenText={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-slate-900 ring-3 ring-emerald-500 cursor-pointer hover:shadow-[0px_0px_20px_#00d492] transition-all duration-200 bg-slate-800  text-gray-600 font-bold">
        {img ? (
          <img
            src={img}
            alt="User avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <User2 className="text-emerald-500"></User2>
        )}
      </div>
    </div>
  );
};
