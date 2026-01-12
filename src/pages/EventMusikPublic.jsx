import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventMusikPublic() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logic API Real
    const apiUrl = "https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events"; 

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // FILTER: Hanya mengambil kategori 'Musik' dari database API
        const musikOnly = data.filter((item) => item.category === "Musik");
        setEvents(musikOnly);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data musik:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#39ff14] text-xl font-mono animate-pulse tracking-tighter">
          Loading Sabarrr...
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black px-6 py-30">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER - Mengikuti Layout Baru */}
        <div className="mb-16">
          <span className="inline-block mb-3 px-4 py-1 text-xs tracking-widest font-semibold text-[#39ff14] border border-[#39ff14]/30 rounded-sm">
            EVENT MUSIK
          </span>

          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Konser & Festival Musik <br />
            <span className="text-[#39ff14]">Paling Populer Saat Ini</span>
          </h1>

          <p className="text-white/60 mt-5 max-w-2xl">
            Temukan berbagai event musik mulai dari konser indie, festival
            besar, hingga party elektronik dengan pengalaman terbaik.
          </p>
        </div>

        {/* GRID EVENT - Responsive 4 Kolom */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 hover:border-[#39ff14]/40 transition-all duration-500"
            >
              {/* CATEGORY TAG */}
              <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-[#39ff14] bg-[#39ff14]/10">
                {event.category}
              </span>

              {/* TITLE */}
              <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[#39ff14] transition-colors">
                {event.title}
              </h3>

              {/* INFO (📍 Lokasi & 📅 Tanggal) */}
              <div className="text-white/60 text-sm space-y-1 mb-6">
                <p className="flex items-center gap-2">📍 {event.location || "Jakarta, Indonesia"}</p>
                <p className="flex items-center gap-2">📅 {event.date}</p>
              </div>

              {/* ACTION LINK - Pill Style */}
              <Link
                to={`/event/musik/${event.id}`}
                state={event}
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold
                           text-[#39ff14] border border-[#39ff14]/60
                           hover:bg-[#39ff14] hover:text-black transition-all duration-300"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>

        {/* EMPTY STATE - Jika data musik tidak ditemukan */}
        {events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40">Belum ada jadwal festival musik saat ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}