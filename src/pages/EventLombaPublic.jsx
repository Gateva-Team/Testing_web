import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventLombaPublic() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events"; 

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // FILTER: Kategori Lomba
        const lombaOnly = data.filter((item) => item.category === "Lomba");
        setEvents(lombaOnly);
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
        <div className="text-[#39ff14] text-xl font-mono animate-pulse uppercase tracking-widest">
          Loading Sabarrr...
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black px-6 py-30">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER - Perbaikan Teks agar sesuai dengan Lomba */}
        <div className="mb-14">
          <p className="text-[#39ff14] tracking-widest text-sm uppercase mb-2">
            Event Lomba
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Tantang Dirimu di <br />
            <span className="text-[#39ff14]">Kompetisi Terbaik Gateva</span>
          </h1>
          
          <p className="text-white/60 mt-5 max-w-2xl leading-relaxed">
            Tunjukkan bakatmu dan raih prestasi di berbagai bidang kompetisi mulai dari 
            teknologi, desain, hingga bisnis. Saatnya bersinar di panggung nasional.
          </p>
        </div>

        {/* GRID - Layout 4 Kolom */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 hover:border-[#39ff14]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* CATEGORY BADGE */}
                <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium text-[#39ff14] bg-[#39ff14]/10">
                  {event.category}
                </span>

                {/* TITLE */}
                <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#39ff14] transition-colors">
                  {event.title}
                </h3>
                
                {/* INFO LIST */}
                <div className="text-white/60 text-sm space-y-2 mb-8">
                  <p className="flex items-center gap-2">📍 {event.location || "Lokasi menyusul"}</p>
                  <p className="flex items-center gap-2">📅 {event.date}</p>
                  <p className="flex items-center gap-2">🎯 {event.level || "Mahasiswa & Umum"}</p>
                </div>
              </div>

              {/* ACTION LINK */}
              <Link
                to={`/event/lomba/${event.id}`}
                state={event}
                className="block text-center px-4 py-2 rounded-full text-sm font-semibold text-[#39ff14] border border-[#39ff14]/60 hover:bg-[#39ff14] hover:text-black transition-all duration-300"
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