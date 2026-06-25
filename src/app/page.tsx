"use client";

import { motion } from "motion/react";
import {
  Zap,
  Leaf,
  TrendingDown,
  Sun,
  MessageCircle,
  ChevronDown,
  Lightbulb,
  Home,
  Factory,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { ChatModal } from "@/components/ChatModal";

const features = [
  {
    icon: TrendingDown,
    title: "Reduce Energy Bills",
    desc: "Get personalised tips to cut your electricity costs by up to 40% with smart habits and efficient appliances.",
  },
  {
    icon: Sun,
    title: "Clean Energy Guidance",
    desc: "Learn about solar panels, wind energy, and renewable alternatives suitable for your home or community.",
  },
  {
    icon: Leaf,
    title: "Sustainable Living",
    desc: "Discover daily practices that reduce your carbon footprint while saving money at the same time.",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    desc: "AI-powered suggestions tailored to your usage patterns, location, and lifestyle for maximum impact.",
  },
];

const benefits = [
  { icon: Home, stat: "40%", label: "Average bill reduction for households" },
  { icon: Factory, stat: "2.5M+", label: "kWh saved by our community" },
  { icon: Globe, stat: "SDG 7", label: "Supporting UN Affordable & Clean Energy Goal" },
  { icon: Zap, stat: "24/7", label: "Instant AI-powered assistance" },
];

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg">
        {/* Floating glow orbs */}
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />

        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-20"
        >
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Zap className="w-5 h-5 text-emerald" />
            EnergyBot
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="hover:text-white transition-colors">Impact</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChatOpen(true)}
            className="bg-emerald text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-emerald-dark transition-colors"
          >
            Try EnergyBot
          </motion.button>
        </motion.nav>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/70 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              Powered by Gemini AI
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white"
          >
            Save Energy.
            <br />
            <span className="bg-gradient-to-r from-emerald via-apple-blue to-purple-400 bg-clip-text text-transparent">
              Save the Planet.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Your AI-powered assistant for reducing electricity bills, understanding
            clean energy, and building sustainable habits — one conversation at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 bg-emerald text-black font-semibold px-8 py-3.5 rounded-full text-base hover:bg-emerald-dark transition-colors shadow-[0_0_30px_rgba(52,211,153,0.3)]"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chatting
            </motion.button>
            <a
              href="#features"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              Learn more <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="relative py-28 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-emerald text-sm font-semibold tracking-widest uppercase mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Everything you need to
              <br />
              <span className="text-white/40">go green effortlessly</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-8 hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-5 group-hover:bg-emerald/20 transition-colors">
                  <f.icon className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-white/50 leading-relaxed text-[15px]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS / IMPACT ─── */}
      <section id="benefits" className="relative py-28 px-6 bg-gradient-to-b from-black via-[#050a12] to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-apple-blue text-sm font-semibold tracking-widest uppercase mb-3">
              Impact
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Making a real difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <b.icon className="w-8 h-8 text-apple-blue mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-apple-blue to-emerald bg-clip-text text-transparent">
                  {b.stat}
                </div>
                <p className="text-white/40 text-sm">{b.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT / HOW IT WORKS ─── */}
      <section id="about" className="relative py-28 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Three simple steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Ask", desc: "Type your energy-related question — from bill reduction to solar panel ROI." },
              { step: "02", title: "Learn", desc: "EnergyBot analyses your query using Gemini AI and provides expert, tailored advice." },
              { step: "03", title: "Act", desc: "Apply the recommendations and start saving energy, money, and the planet." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-2xl p-8"
              >
                <div className="text-5xl font-bold text-white/10 mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-28 px-6 bg-gradient-to-b from-black to-[#050a12] overflow-hidden">
        <div className="glow-orb glow-orb-1" style={{ opacity: 0.15 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to start saving?
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of people who are already using EnergyBot to reduce their
              energy consumption and live more sustainably.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 mx-auto bg-emerald text-black font-semibold px-10 py-4 rounded-full text-base hover:bg-emerald-dark transition-colors shadow-[0_0_40px_rgba(52,211,153,0.3)]"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with EnergyBot
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald" />
            EnergyBot — SDG 7: Affordable and Clean Energy
          </div>
          <p>Built with ♥ for 1M1B • Powered by Gemini AI</p>
        </div>
      </footer>

      {/* ─── CHAT MODAL ─── */}
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* ─── Floating Chat Button ─── */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-dark transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}
    </>
  );
}
