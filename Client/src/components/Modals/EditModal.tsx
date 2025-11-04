import { X } from "lucide-react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

interface EditModalProps {
  shortCode: string;
  originalLink: string;
}

export const EditModal = ({ shortCode, originalLink }: EditModalProps) => {
  return createPortal(
    <motion.section
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.15 }}
      className="bg-slate-800 border z-30 border-slate-700 rounded-xl shadow-2xl max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
    >
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">Edit Link</h2>
        <Button
          icon={<X className="text-slate-400" />}
          className="p-1!"
          gradient={false}
        />
      </div>
      <form className="p-6 flex flex-col gap-2" action="">
        <Input
          placeholder="Short code"
          text="Short code"
          name="shortCode"
          value={shortCode}
        />
        <Input
          placeholder={"Original URL"}
          text={"Original URL"}
          name={"originalLink"}
          value={originalLink}
        />
        <nav className="flex gap-2 mt-4">
          <Button
            gradient={false}
            className="bg-slate-700! flex-1 hover:bg-slate-600!"
            text="Cancel"
          />
          <Button text="Save changes" className="flex-1" />
        </nav>
      </form>
    </motion.section>,
    document.body
  );
};
