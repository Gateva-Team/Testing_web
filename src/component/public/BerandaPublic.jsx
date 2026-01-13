import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { motion, useScroll, useTransform } from "framer-motion";
import berandaData from "./data/beranda.json";

// Komponen Teks Pencarian AI dengan Efek Mengetik
function AISearchingText() {
  const phrases = [
    "menganalisis tiket event yang akan datang",
    "memindai konser dan konferensi global",
    "mencocokkan event sesuai minatmu",
    "memprediksi event dengan permintaan tinggi",
    "menyaring tiket terbaik untukmu",
  ];

  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 24 : 36;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((v) => v + 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex > 0) {
        setText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((v) => v - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((v) => (v + 1) % phrases.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className="flex items-center gap-2 text-[#39ff14]/80 text-[13px]">
      <span className="uppercase tracking-[0.35em]">AI</span>
      <span className="uppercase tracking-[0.35em]">{text}</span>
      <motion.span
        className="ml-1 w-[6px] h-[14px] bg-[#39ff14]"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </div>
  );
}

export default function BerandaPublic() {
  const { hero } = berandaData;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const splineY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative w-screen h-[100svh] bg-black text-white overflow-hidden"
      >
        <motion.div
          style={{ y: glowY }}
          className="absolute -top-48 -left-48 w-[720px] h-[720px] bg-[#39ff14]/20 blur-[340px]"
        />
        <motion.div
          style={{ y: glowY }}
          className="absolute bottom-[-360px] right-[-360px] w-[900px] h-[900px] bg-violet-600/30 blur-[420px]"
        />

        <div className="relative z-10 w-full h-full px-[6vw] grid grid-cols-[1.3fr_2fr_1fr] items-center gap-[6vw]">
          {/* LEFT */}
          <motion.div
            style={{ opacity: fadeOut }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-14"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#39ff14]/80">
              PLATFORM TIKET EVENT BERBASIS AI
            </span>

            <div className="leading-[0.82]">
              <h1 className="text-[96px] font-extrabold tracking-tight">
                GATEVA
              </h1>
              <h2 className="text-[96px] font-extrabold tracking-tight text-white/10">
                TICKETING
              </h2>
            </div>

            <AISearchingText />

            <p className="max-w-[460px] text-[17px] leading-[1.9] text-white/60">
              Gateva adalah platform tiket event generasi baru yang menggunakan
              AI untuk memahami minatmu, memprediksi event populer, dan
              menghadirkan pengalaman visual sebelum kamu membeli tiket.
            </p>

            <div className="flex items-center gap-12">
              <Link
            //Konektin biar logic sesuai (wibson)
                to="/beranda-user"
                className="px-12 py-4 rounded-full bg-[#39ff14] text-black font-semibold tracking-wide hover:scale-105 transition"
              >
                Temukan Event
              </Link>

              <Link
                to="/tentang"
                className="group flex items-center gap-4 text-white/55 hover:text-white transition"
              >
                <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#39ff14]">
                  →
                </span>
                <span className="text-[11px] tracking-[0.35em] uppercase">
                  Tentang Gateva
                </span>
              </Link>
            </div>
          </motion.div>

          {/* CENTER SPLINE */}
          <motion.div
            style={{ y: splineY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[1100px] h-[82vh]">
              <div
                className="absolute inset-0 scale-[1.6] translate-y-32 pointer-events-none"
                style={{
                  maskImage:
                    "radial-gradient(circle at center, black 90%, transparent 100%)",
                }}
              >
                <Spline scene={hero.spline} />
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            style={{ opacity: fadeOut }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col gap-8 max-w-[300px]"
          >
            <span className="text-[#39ff14] text-[10px] tracking-[0.4em] uppercase">
              Keunggulan Gateva
            </span>

            <h3 className="text-[20px] font-semibold leading-[1.4]">
              Tiket Lebih Cerdas <br /> Tanpa Tebak-tebakan
            </h3>

            {[
              {
                title: "AI Event Matching",
                desc: "Rekomendasi tiket berdasarkan minat & histori.",
              },
              {
                title: "Tiket Aman & Resmi",
                desc: "Distribusi tiket terenkripsi & terverifikasi.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h4 className="font-semibold text-[13px] mb-2">{item.title}</h4>
                <p className="text-[12px] leading-[1.8] text-white/55">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="relative w-screen h-[100svh] bg-black text-white flex items-center">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#39ff14]/10 blur-[280px]" />

        <div className="relative z-10 w-full px-[6vw]">
          <div className="text-center mb-[14vh]">
            <span className="text-[11px] tracking-[0.45em] uppercase text-[#39ff14]/80">
              SISTEM TIKET CERDAS
            </span>

            <h2 className="mt-6 text-[clamp(42px,4.5vw,60px)] font-semibold">
              Dari Pencarian <br />
              <span className="text-white/20">Hingga Tiket di Tangan</span>
            </h2>

            <p className="mt-8 max-w-[560px] mx-auto text-white/55 leading-[1.9]">
              Gateva memadukan AI, visual 3D, dan sistem ticketing modern untuk
              memastikan kamu mendapatkan tiket event yang tepat — tanpa ribet.
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-[3vw]">
            {[
              {
                step: "01",
                title: "Analisis Event",
                desc: "AI membaca tren penjualan dan minat pengguna.",
              },
              {
                step: "02",
                title: "Pratinjau Event",
                desc: "Lihat venue, suasana, dan detail event sebelum membeli.",
              },
              {
                step: "03",
                title: "Pembelian Aman",
                desc: "Checkout cepat dengan sistem tiket terenkripsi.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-10 rounded-3xl bg-white/5 border border-white/10"
              >
                <div className="absolute -top-6 left-8 w-14 h-14 rounded-full bg-[#39ff14] text-black flex items-center justify-center font-bold">
                  {item.step}
                </div>

                <h3 className="mt-8 text-xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-sm leading-[1.9] text-white/55">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3 ================= */}
      <section className="relative w-screen h-[100svh] bg-black text-white flex items-center justify-center">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#39ff14]/15 blur-[320px]" />

        <div className="relative z-10 text-center px-[6vw]">
          <span className="text-[11px] tracking-[0.45em] uppercase text-[#39ff14]/80">
            MASA DEPAN TICKET EVENT
          </span>

          <h2 className="mt-6 text-[clamp(44px,5vw,76px)] font-bold">
            Beli Tiket <br />
            <span className="text-[#39ff14]">Dengan Keyakinan</span>
          </h2>

          <p className="mt-10 max-w-[560px] mx-auto text-white/60 leading-[1.9]">
            Tidak lagi asal beli tiket. Gateva memastikan setiap keputusan
            pembelian didukung data, visual, dan prediksi cerdas.
          </p>

          <div className="mt-16 flex justify-center">
            <Link
            
          //Konektin biar logic sesuai (wibson)
              to="/beranda-user"
              className="px-16 py-5 rounded-full bg-[#39ff14] text-black font-semibold tracking-wide hover:scale-105 transition"
            >
              Jelajahi Tiket Sekarang
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
