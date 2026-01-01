import React from "react";
import { Link } from "react-router-dom";
import tentangData from "./data/tentang.json";

export default function TentangPublic() {
  const { hero, about, pillars, steps, cta } = tentangData;

  return (
    <section className="min-h-screen bg-black text-white">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <span className="inline-block mb-6 px-5 py-2 rounded-full text-sm bg-[#39ff14]/10 text-[#39ff14] tracking-widest">
            {hero.badge}
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {hero.title}
            <br />
            <span className="text-[#39ff14]">{hero.highlight}</span>
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
            {hero.description}
          </p>
        </div>

        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#39ff14]/10 blur-[120px]" />
      </div>

      {/* ================= APA ITU ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">{about.title}</h2>

          {about.description.map((text, i) => (
            <p
              key={i}
              className="text-white/65 leading-relaxed text-lg mb-6"
            >
              {text}
            </p>
          ))}
        </div>

        <div className="space-y-6">
          {about.points.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white/5 border border-white/10
                         rounded-2xl p-6 hover:border-[#39ff14]/50 transition"
            >
              <div className="w-3 h-3 mt-2 rounded-full bg-[#39ff14]" />
              <p className="text-white/70">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PILAR ================= */}
      <div className="bg-[#0f0f1a]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-center mb-16">
            {pillars.title.split("Gateva")[0]}
            <span className="text-[#39ff14]">Gateva</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {pillars.items.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-8
                           hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-[#39ff14]">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CARA KERJA ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-16">{steps.title}</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.items.map((step, i) => (
            <div
              key={i}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#39ff14] text-black flex items-center justify-center font-extrabold">
                {i + 1}
              </span>
              <p className="mt-6 text-white/70">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="text-center py-32 bg-gradient-to-t from-black to-[#0f0f1a]">
        <h2 className="text-4xl font-extrabold mb-6">{cta.title}</h2>

        <p className="text-white/60 mb-10">{cta.description}</p>

        <Link
          to={cta.link}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full
                     bg-[#39ff14] text-black font-semibold hover:scale-105 transition"
        >
          {cta.button}
        </Link>
      </div>
    </section>
  );
}