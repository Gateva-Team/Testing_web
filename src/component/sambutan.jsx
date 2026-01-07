import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const GREETINGS = [
  "Hello",
  "Konichiwa",
  "Ni Hao",
  "Ciao",
  "안녕하세요",
  "Привет",
  "Olá",
];

const GREETING_DURATION = 550; // ms
const SUBTITLE_DURATION = 1200;

export default function SambutanGatevaFlow() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const finishedRef = useRef(false); // ⛔ cegah double-run (StrictMode)

  useEffect(() => {
    if (finishedRef.current) return;

    timerRef.current = setTimeout(
      () => {
        setStep((prev) => {
          // masih greeting
          if (prev < GREETINGS.length) return prev + 1;

          // selesai subtitle → redirect
          finishedRef.current = true;
          navigate("/home", { replace: true });
          return prev;
        });
      },
      step < GREETINGS.length ? GREETING_DURATION : SUBTITLE_DURATION
    );

    return () => clearTimeout(timerRef.current);
  }, [step, navigate]);

  const isGreeting = step < GREETINGS.length;
  const showSubtitle = step === GREETINGS.length;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a12] flex items-center justify-center">
      {/* BACKGROUND TECH PATTERN */}
      <motion.div
        className="absolute inset-0 opacity-[0.12]"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 35%, #ffffff33 1px, transparent 1px), radial-gradient(circle at 75% 65%, #ffffff22 1px, transparent 1px)",
          backgroundSize: "140px 140px",
        }}
      />

      {/* GREETINGS */}
      <AnimatePresence mode="wait">
        {isGreeting && (
          <motion.h1
            key={step}
            initial={{ opacity: 0, y: 14, scale: 0.94, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, scale: 1.05, filter: "blur(6px)" }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="text-white text-6xl md:text-8xl font-medium tracking-[0.18em] select-none"
          >
            {GREETINGS[step]}
          </motion.h1>
        )}
      </AnimatePresence>

      {/* SUBTITLE */}
      <AnimatePresence>
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute bottom-28 text-center"
          >
            <h2 className="text-white text-3xl md:text-4xl font-light tracking-wide">
              Selamat Datang di Gateva
            </h2>
            <p className="mt-2 text-white/50 text-xs tracking-[0.4em] uppercase">
              Event Experience Platform
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
