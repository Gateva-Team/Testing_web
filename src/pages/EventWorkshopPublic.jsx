import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventWorkshopPublic() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logic API Real
    const apiUrl = "https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events"; 

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // FILTER: Mengambil hanya kategori Workshop
        const workshopOnly = data.filter((item) => item.category === "Workshop");
        setEvents(workshopOnly);
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
    <section className="min-h-screen bg-black text-white px-6 py-30">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16">
          <p className="text-[#39ff14] tracking-widest text-sm mb-3 font-semibold uppercase">
            Elevate Your Skills
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Tingkatkan Skill <br />
            <span className="text-[#39ff14]">Lewat Workshop Terbaik</span>
          </h1>
          <p className="mt-5 max-w-2xl text-white/60">
            Pelajari teknologi terbaru langsung dari praktisi industri melalui workshop intensif dan praktikal.
          </p>
        </div>

        {/* GRID EVENT - Diubah menjadi 4 kolom (xl:grid-cols-4) agar ukurannya mirip code Musik */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="group flex flex-col justify-between bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 hover:border-[#39ff14]/50 transition-all duration-300"
            >
              <div>
                {/* CATEGORY TAG */}
                <span className="inline-block mb-4 px-3 py-1 rounded-lg text-[10px] font-bold uppercase bg-[#39ff14]/10 text-[#39ff14]">
                  {event.category}
                </span>

                {/* TITLE */}
                <h3 className="text-lg font-bold mb-4 leading-snug group-hover:text-[#39ff14] transition-colors">
                  {event.title}
                </h3>

                {/* INFO (Sesuai gambar: Icon Calendar & Map) */}
                <div className="space-y-2 text-sm text-white/60 mb-8">
                  <p className="flex items-center gap-2">
                    <span className="opacity-80">📅</span> {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="opacity-80">📍</span> {event.location || "Online / Bandung"}
                  </p>
                </div>
              </div>

              {/* BUTTON ACTION (Sesuai gambar: Blok Hijau Terang) */}
              <Link
                to={`/event/workshop/${event.id}`}
                state={event}
                className="block text-center w-full py-3 rounded-xl font-bold text-black bg-[#39ff14] hover:bg-[#32e310] transition-colors text-sm shadow-[0_4px_14px_0_rgba(57,255,20,0.3)]"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {events.length === 0 && (
          <div className="text-center py-20 text-white/20">
            Belum ada workshop yang tersedia untuk saat ini.
          </div>
        )}
      </div>
    </section>
  );
}