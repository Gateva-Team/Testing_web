import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function EventDetailWorkshop() {
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
    <section className="min-h-screen bg-[#0f0f1a] text-white pt-16">
      {/* HERO */}
      <div className="relative h-[65vh]">
        <img
          src={state.image}
          alt={state.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-black/70 to-black/30" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-16">
          <div>
            <span className="px-4 py-1 rounded-full bg-[#39ff14]/20 text-[#39ff14] text-sm">
              {state.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-4">
              {state.title}
            </h1>
            <div className="mt-4 text-white/70 flex gap-6">
              <p>📅 {state.date}</p>
              <p>📍 {state.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Deskripsi Workshop</h2>
          <p className="text-white/70 leading-relaxed text-lg">
            {state.description}
          </p>
        </div>

        {/* TICKET */}
        <div className="sticky top-24">
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/15
                          rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold mb-2">Harga Tiket</h3>
            <p className="text-4xl font-extrabold text-[#39ff14] mb-6">
              {state.price}
            </p>

            <div className="space-y-4">
              <Link
                to="/checkout"
                state={state}
                className="w-full block text-center py-4 rounded-xl font-semibold
             bg-[#39ff14] text-black
             hover:brightness-110 transition"
              >
                🎟️ Beli Tiket
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="w-full py-4 rounded-xl border border-white/20 text-white/70"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
