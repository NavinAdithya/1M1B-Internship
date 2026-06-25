"use client";

import { useChat } from "@ai-sdk/react";
import { MessageBubble } from "./MessageBubble";
import { InputArea } from "./InputArea";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  parts: [
    {
      type: "text" as const,
      text: "👋 Hi! I'm EnergyBot, your AI assistant for energy saving tips.\n\nAsk me how to reduce electricity bills, understand clean energy, or make your daily habits more sustainable.",
    },
  ],
};

export function ChatLayout() {
  const { messages, sendMessage, status } = useChat({
    messages: [INITIAL_MESSAGE],
  });

  const isLoading = status === "streaming" || status === "submitted";
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    sendMessage({
      role: "user",
      parts: [{ type: "text", text: trimmed }],
    } as any);
    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[85vh] min-h-[600px] w-full max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 bg-white/20 dark:bg-black/40 backdrop-blur-3xl relative">
      <div className="p-5 flex items-center justify-between border-b border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl z-10">
        <h2 className="text-foreground font-semibold text-lg tracking-tight flex items-center gap-2">
          EnergyBot
        </h2>
        <div className="text-xs font-semibold bg-white/30 dark:bg-black/30 text-foreground px-4 py-1.5 rounded-full border border-white/20">
          Powered by Gemini
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-smooth space-y-6">
        <AnimatePresence mode="popLayout">
          {messages.map((message: any) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (messages as any[])[messages.length - 1]?.role === "user" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-black/5 dark:bg-white/5 text-foreground/50 rounded-2xl p-4 text-[13px] max-w-[80%] italic">
                Thinking...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <InputArea
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
