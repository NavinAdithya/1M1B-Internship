"use client";

import { motion } from "motion/react";
import { UIMessage } from "@ai-sdk/react";

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
          isUser
            ? "bg-apple-blue text-white rounded-2xl rounded-br-sm"
            : "bg-black/5 dark:bg-white/10 text-foreground rounded-2xl rounded-bl-sm"
        }`}
      >
        <div className="whitespace-pre-wrap">
          {(message as any).content || (message.parts?.map((p: any, i: number) => (p.type === 'text' ? p.text : '')).join('') || "")}
        </div>
      </div>
    </motion.div>
  );
}
