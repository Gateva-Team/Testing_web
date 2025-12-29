import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EventDetailPublic() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Event tidak ditemukan
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f0f1a] text-white">
      {/* ================= HERO ================= */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={state.image}
          alt={state.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-black/60 to-black/30" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-16">
            <span
              className="inline-block px-4 py-1 mb-4 rounded-full text-sm font-semibold
                             bg-[#39ff14]/15 text-[#39ff14]"
            >
              {state.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {state.title}
            </h1>

            <div className="flex flex-wrap gap-6 mt-6 text-white/70">
              <p>📍 {state.location}</p>
              <p>📅 {state.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-12">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Tentang Event</h2>
            <p className="text-white/70 leading-relaxed text-lg">
              {state.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Experience", desc: "Visual & sound system premium" },
              { title: "Audience", desc: "Ribuan penonton antusias" },
              { title: "Venue", desc: "Lokasi strategis & nyaman" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10
                           rounded-2xl p-6 hover:-translate-y-1 transition"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TICKET CARD ================= */}
        <div className="sticky top-28 h-fit">
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/15
                       rounded-3xl p-8 shadow-[0_0_60px_rgba(57,255,20,0.12)]"
          >
            <h3 className="text-xl font-bold mb-2">Harga Tiket</h3>
            <p className="text-4xl font-extrabold text-[#39ff14] mb-6">
              {state.price}
            </p>

            <div className="space-y-4">
              <Link
                to="/checkout"
                state={state}
                className="block w-full py-4 rounded-xl font-semibold text-center
             bg-[#39ff14] text-black
             hover:brightness-110 hover:scale-[1.02]
             transition-all duration-300"
              >
                🎟️ Beli Tiket
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="w-full py-4 rounded-xl border border-white/20
                           text-white/70 hover:bg-white/10
                           transition"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-white/40 mt-6 text-center">
              * Tiket tidak dapat dikembalikan setelah pembelian
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
