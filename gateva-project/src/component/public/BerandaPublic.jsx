import React from "react";
import { Link } from "react-router-dom";

export default function BerandaPublic() {
  return (
    <section className="min-h-screen bg-black text-white overflow-hidden">
      {/* ================= HERO SPLIT ================= */}
      <div className="relative">
        {/* Glow Background */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#39ff14]/20 blur-[160px]" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[160px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <span
              className="inline-block mb-5 px-5 py-2 rounded-full text-xs font-semibold tracking-widest
                             bg-[#39ff14]/10 text-[#39ff14]"
            >
              PLATFORM EVENT TERPERCAYA
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Temukan Event Terbaik <br />
              <span className="text-[#39ff14]">Dalam Satu Platform</span>
            </h1>

            <p className="mt-6 text-white/70 text-lg max-w-xl">
              Gateva adalah web apps modern untuk menemukan, mengeksplorasi, dan
              mengikuti berbagai event seperti konser, seminar, lomba, dan
              workshop dengan pengalaman yang cepat dan intuitif.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                to="/event"
                className="px-8 py-4 rounded-xl bg-[#39ff14] text-black font-semibold
                           hover:scale-105 transition"
              >
                Jelajahi Event
              </Link>

              <Link
                to="/tentang"
                className="px-8 py-4 rounded-xl border border-white/20
                           text-white/80 hover:bg-white/10 transition"
              >
                Tentang Gateva
              </Link>
            </div>
          </div>

          {/* RIGHT – INFO STACK */}
          <div className="grid gap-6">
            {[
              {
                title: "Event Terverifikasi",
                desc: "Setiap event dikurasi untuk menjamin kualitas dan kredibilitas.",
              },
              {
                title: "Beragam Kategori",
                desc: "Musik, seminar, lomba, hingga workshop profesional.",
              },
              {
                title: "Akses Mudah",
                desc: "Cari, lihat detail, dan daftar event dengan cepat.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10
                           rounded-2xl p-6 hover:-translate-y-1 transition"
              >
                <h3 className="text-lg font-bold mb-2 text-[#39ff14]">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= VALUE SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "🎵",
              title: "Event Musik",
              desc: "Konser dan festival dengan pengalaman audio visual terbaik.",
            },
            {
              icon: "🎓",
              title: "Seminar & Workshop",
              desc: "Tingkatkan skill dan wawasan bersama para ahli.",
            },
            {
              icon: "🏆",
              title: "Kompetisi & Lomba",
              desc: "Tantang diri dan raih prestasi di berbagai bidang.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-[#0f0f0f] border border-white/10
                         rounded-3xl p-8 hover:border-[#39ff14]/60
                         transition-all duration-300"
            >
              <div className="text-4xl mb-5 group-hover:scale-110 transition">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CTA FINAL ================= */}
      <div className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#39ff14]/10 to-purple-500/10 blur-3xl" />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Siap Menjelajahi Event Favoritmu?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-10">
            Gateva hadir untuk menghubungkan kamu dengan pengalaman, komunitas,
            dan kesempatan terbaik melalui event pilihan.
          </p>

          <Link
            to="/event"
            className="inline-block px-10 py-4 rounded-xl
                       bg-[#39ff14] text-black font-semibold
                       hover:scale-105 transition"
          >
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}
