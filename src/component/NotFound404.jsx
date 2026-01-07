import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound404Pro() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0a0a12] overflow-hidden flex items-center justify-center text-white">
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff22 1px, transparent 1px), linear-gradient(to bottom, #ffffff22 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* SIGNAL RINGS */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full border border-white/10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full border border-white/5"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* FLOATING PARTICLES */}
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-[3px] h-[3px] bg-white/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: ["-20", "20"],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* CONTENT */}
      <motion.div
        style={{
          transform: `translate(${mouse.x}px, ${mouse.y}px)`,
        }}
        className="relative z-10 text-center px-6 max-w-xl"
      >
        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[130px] md:text-[170px] font-extrabold tracking-tight"
        >
          404
        </motion.h1>

        {/* TEXT */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/80 text-lg md:text-xl"
        >
          Oops! Sinyal halaman ini hilang.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-1 text-white/50 text-sm"
        >
          Tapi tenang, Gateva masih online sepenuhnya.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black font-medium transition-all hover:scale-105"
          >
            <span>Kembali ke Beranda</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-white/40 text-xs tracking-widest"
        >
          GATEVA · EVENT EXPERIENCE PLATFORM
        </motion.div>
      </motion.div>
    </div>
  );
}
