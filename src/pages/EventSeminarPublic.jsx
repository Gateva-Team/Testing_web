import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventSeminarPublic() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logic API tetap dipertahankan
    const apiUrl = "https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events"; 

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // FILTER: Hanya ambil data yang kategorinya 'Seminar'
        const seminarOnly = data.filter((item) => item.category === "Seminar");
        setEvents(seminarOnly);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#39ff14] text-xl font-mono animate-pulse">Loading Sabarrr...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black px-6 py-30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER - Menggunakan Layout UI ke-2 */}
        <div className="mb-16">
          <p className="text-[#39ff14] tracking-widest text-sm uppercase mb-2">
            Event Seminar
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Seminar & Konferensi <br />
            <span className="text-[#39ff14]">Inspiratif untuk Masa Depan</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            Ikuti berbagai seminar dan konferensi terbaik seputar teknologi,
            bisnis, startup, dan inovasi bersama pembicara profesional.
          </p>
        </div>

        {/* GRID EVENT - Menggunakan Grid Responsive UI ke-2 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative bg-[#0f0f0f]
                         border border-white/10 rounded-2xl
                         p-6 overflow-hidden
                         hover:border-[#39ff14]/60
                         transition-all duration-300"
            >
              {/* NEON GLOW EFFECT */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           transition duration-300 pointer-events-none
                           shadow-[0_0_60px_rgba(57,255,20,0.18)]"
              />

              {/* CATEGORY TAG */}
              <span
                className="inline-block mb-4 px-3 py-1 rounded-full
                           text-xs font-medium
                           text-[#39ff14] bg-[#39ff14]/10"
              >
                {event.category}
              </span>

              {/* TITLE */}
              <h3 className="text-white text-xl font-bold mb-3">
                {event.title}
              </h3>

              {/* INFO (📍 Lokasi & 📅 Tanggal) */}
              <div className="text-white/60 text-sm space-y-1 mb-8">
                <p>📍 {event.location || "Online / Lokasi Belum Ditentukan"}</p>
                <p>📅 {event.date}</p>
              </div>

              {/* BUTTON ACTION */}
              <Link
                to={`/event/seminar/${event.id}`}
                state={event}
                className="block text-center w-full py-3 rounded-full
                           text-sm font-semibold text-black bg-[#39ff14]
                           hover:scale-[1.03] transition relative z-10"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}