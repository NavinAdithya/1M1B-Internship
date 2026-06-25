"use client";

import { motion } from "motion/react";
import { SendHorizontal } from "lucide-react";

interface InputAreaProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function InputArea({ input, handleInputChange, handleSubmit, isLoading }: InputAreaProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 30 }}
      onSubmit={handleSubmit}
      className="flex gap-2 p-3 bg-white dark:bg-apple-gray-dark border-t border-black/5 dark:border-white/10 relative z-20"
    >
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Message..."
        className="flex-1 bg-black/5 dark:bg-white/10 rounded-full px-4 py-2 text-[15px] focus:outline-none transition-all placeholder:text-foreground/40 text-foreground"
        disabled={isLoading}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isLoading || !(input || "").trim()}
        className="bg-apple-blue text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50 disabled:bg-gray-400"
      >
        <SendHorizontal size={18} />
      </motion.button>
    </motion.form>
  );
}
