"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, SendHorizontal, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "👋 Hi! I'm EnergyBot, your AI assistant for energy saving.\n\nAsk me anything about:\n• Reducing electricity bills\n• Clean energy options\n• Sustainable daily habits\n• Solar panel guidance\n\nHow can I help you today?",
};

const SYSTEM_PROMPT = `You are EnergyBot, an expert AI assistant specializing in sustainable living, clean energy, and energy-saving tips. You are part of a project supporting UN SDG 7 — Affordable and Clean Energy.

Your guidelines:
- Provide clear, actionable, and practical advice
- Use bullet points and structured formatting for readability
- Be encouraging and positive about sustainable choices
- When discussing costs or savings, provide realistic estimates
- Always consider the user's context (home, office, community)
- Keep responses concise but thorough`;

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

export function ChatModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: {
          role: "system",
          parts: [{ text: SYSTEM_PROMPT }]
        },
      });

      // Build chat history from existing messages (skip welcome)
      const history = updatedMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "user" ? "user" as const : "model" as const,
          parts: [{ text: m.content }],
        }));

      // Remove last user message from history (it will be sent as the new message)
      const lastUserMsg = history.pop();

      const chat = model.startChat({
        history,
      });

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

      const result = await chat.sendMessageStream(lastUserMsg?.parts[0].text || trimmed);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + text } : m
            )
          );
        }
      }
    } catch (err) {
      console.error("Gemini API error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-auto md:bottom-6 md:right-6 md:w-[440px] md:h-[680px] z-50 flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald/15 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px]">EnergyBot</h3>
                  <p className="text-[11px] text-white/40">Powered by Gemini AI</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </motion.button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-emerald text-black rounded-2xl rounded-br-sm"
                        : "bg-white/[0.06] text-white/90 rounded-2xl rounded-bl-sm border border-white/5"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </motion.div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.06] border border-white/5 rounded-2xl rounded-bl-sm px-5 py-4 flex gap-1.5">
                    <span className="typing-dot w-2 h-2 rounded-full bg-white/40" />
                    <span className="typing-dot w-2 h-2 rounded-full bg-white/40" />
                    <span className="typing-dot w-2 h-2 rounded-full bg-white/40" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-white/[0.02]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about energy saving..."
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-emerald/40 transition-colors disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-emerald text-black rounded-full flex items-center justify-center transition-colors disabled:opacity-30 disabled:bg-white/10 disabled:text-white/30 hover:bg-emerald-dark"
              >
                <SendHorizontal className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
