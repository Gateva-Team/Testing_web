import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ================= REVEAL ================= */
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-active");
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function TentangPublic() {
  const heroRef = useReveal();
  const aboutRef = useReveal();
  const featureRef = useReveal();
  const stepRef = useReveal();
  const ctaRef = useReveal();

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* ================= FLOW BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-[#39ff14]/10 blur-[300px]" />
        <div className="absolute top-[40%] left-[60%] w-[900px] h-[900px] bg-violet-600/10 blur-[300px]" />
        <div className="absolute bottom-[-600px] left-[-300px] w-[1000px] h-[1000px] bg-[#39ff14]/10 blur-[340px]" />
      </div>

      {/* ================= HERO ================= */}
      <div
        ref={heroRef}
        className="reveal relative max-w-6xl mx-auto px-6 pt-48 pb-44 text-center"
      >
        <Badge className="mb-10 px-8 py-2.5 bg-[#39ff14]/10 text-[#39ff14] tracking-[0.45em] uppercase">
          Tentang Gateva
        </Badge>

        <h1 className="text-[clamp(44px,6vw,82px)] font-extrabold leading-[1.02] tracking-tight">
          Platform Event & Ticketing
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] to-[#9bff7c]">
            Masa Depan
          </span>
        </h1>

        <p className="mt-14 max-w-3xl mx-auto text-lg md:text-xl text-white/60 leading-[1.9]">
          Gateva menghadirkan pengalaman baru dalam menemukan event dan membeli
          tiket — lebih cepat, lebih aman, dan lebih modern.
        </p>
      </div>

      {/* ================= ABOUT ================= */}
      <div
        ref={aboutRef}
        className="reveal max-w-6xl mx-auto px-6 py-40 grid lg:grid-cols-2 gap-24"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-10">
            Semua Event dalam
            <br />
            <span className="text-[#39ff14]">Satu Platform</span>
          </h2>

          <p className="text-white/65 text-lg leading-relaxed mb-6">
            Gateva menyatukan berbagai jenis event dan sistem ticketing ke dalam
            satu ekosistem yang mudah digunakan.
          </p>

          <p className="text-white/65 text-lg leading-relaxed">
            Dirancang untuk pengguna modern yang mengutamakan kecepatan,
            kenyamanan, dan transparansi.
          </p>
        </div>

        <div className="space-y-7">
          {[
            "Event terkurasi & terpercaya",
            "Informasi event real-time",
            "Pembelian tiket aman & praktis",
          ].map((item, i) => (
            <Card
              key={i}
              className="bg-white/[0.04] border-white/10 rounded-2xl
                         hover:border-[#39ff14]/40 transition"
            >
              <CardContent className="flex gap-5 p-7">
                <div className="w-3 h-3 mt-2 rounded-full bg-[#39ff14]" />
                <p className="text-white/70 leading-relaxed">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <div ref={featureRef} className="reveal max-w-6xl mx-auto px-6 py-40">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-24">
          Fitur Unggulan Gateva
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            [
              "Smart Event Discovery",
              "Temukan event relevan sesuai minat dan waktu.",
            ],
            [
              "Live Ticket Availability",
              "Pantau ketersediaan tiket secara real-time.",
            ],
            ["Secure Checkout", "Sistem pembayaran aman & terenkripsi."],
            ["Personal Reminder", "Notifikasi sebelum event dimulai."],
            ["Mobile Friendly", "Nyaman di semua perangkat."],
            ["Verified Organizer", "Event dari penyelenggara terpercaya."],
          ].map(([title, desc], i) => (
            <Card
              key={i}
              className="group bg-white/[0.04] border-white/10 rounded-3xl
                         hover:-translate-y-2 hover:border-[#39ff14]/40
                         transition-all duration-300"
            >
              <CardContent className="p-10">
                <h3 className="text-lg font-bold mb-4 text-[#39ff14]">
                  {title}
                </h3>
                <p className="text-white/60 leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ================= STEPS ================= */}
      <div ref={stepRef} className="reveal max-w-6xl mx-auto px-6 py-40">
        <h2 className="text-3xl md:text-4xl font-bold mb-24">
          Cara Menggunakan Gateva
        </h2>

        <div className="grid md:grid-cols-4 gap-10">
          {[
            "Cari event sesuai minat",
            "Lihat detail & jadwal",
            "Beli tiket secara online",
            "Datang & nikmati event",
          ].map((step, i) => (
            <Card
              key={i}
              className="relative bg-white/[0.04] border-white/10 rounded-2xl"
            >
              <CardContent className="p-7">
                <span
                  className="absolute -top-5 -left-5 w-11 h-11 rounded-full
                                 bg-[#39ff14] text-black flex items-center justify-center font-extrabold"
                >
                  {i + 1}
                </span>
                <p className="mt-8 text-white/70 leading-relaxed">{step}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div
        ref={ctaRef}
        className="reveal relative text-center py-44 bg-gradient-to-t from-black to-[#0f0f1a]"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
          Siap Menemukan Event Favoritmu?
        </h2>

        <p className="text-white/60 mb-14 text-lg">
          Jelajahi berbagai event dan beli tiketnya sekarang di Gateva.
        </p>

        <Button
          asChild
          size="lg"
          className="rounded-full px-16 py-6 text-base
                     bg-[#39ff14] text-black
                     hover:scale-105 transition"
        >
          <Link to="/beranda-user"> Lihat Semua Event</Link>
        </Button>
      </div>
    </section>
  );
}
