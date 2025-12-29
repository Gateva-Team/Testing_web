import React from "react";
import { Link } from "react-router-dom";

export default function EventMusik() {
  const events = [
    {
      id: 1,
      title: "Neon Night Festival",
      location: "Jakarta",
      date: "12 Oktober 2025",
      category: "Festival Musik",
      price: "Rp 350.000",
      image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      description:
        "Festival musik malam dengan konsep neon, menghadirkan DJ internasional dan visual futuristik.",
    },
    {
      id: 2,
      title: "Indie Soundscape",
      location: "Bandung",
      date: "19 Oktober 2025",
      category: "Konser Indie",
      price: "Rp 150.000",
      image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
      description:
        "Konser musik indie dengan suasana intimate dan lineup band terbaik tanah air.",
    },
    {
      id: 3,
      title: "Electronic Pulse",
      location: "Surabaya",
      date: "2 November 2025",
      category: "EDM Party",
      price: "Rp 280.000",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      description:
        "EDM party penuh energi dengan dentuman bass dan lighting spektakuler.",
    },
    {
      id: 4,
      title: "Rock Unity Live",
      location: "Yogyakarta",
      date: "9 November 2025",
      category: "Rock Concert",
      price: "Rp 200.000",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
      description:
        "Konser rock dengan band legendaris dan atmosfer yang membakar semangat.",
    },
  ];

  return (
    <section className="min-h-screen bg-black px-6 py-30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16">
          <span className="inline-block mb-3 px-4 py-1 text-xs tracking-widest font-semibold text-[#39ff14]">
            EVENT MUSIK
          </span>

          <h1 className="text-white text-4xl md:text-5xl font-extrabold">
            Konser & Festival Musik <br />
            <span className="text-[#39ff14]">Paling Populer Saat Ini</span>
          </h1>

          <p className="text-white/60 mt-5 max-w-2xl">
            Temukan berbagai event musik mulai dari konser indie, festival
            besar, hingga party elektronik dengan pengalaman terbaik.
          </p>
        </div>

        {/* GRID EVENT */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative bg-[#0d0d0d] rounded-2xl p-6"
            >
              <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-[#39ff14] bg-[#39ff14]/10">
                {event.category}
              </span>

              <h3 className="text-white text-xl font-bold mb-2">
                {event.title}
              </h3>

              <div className="text-white/60 text-sm space-y-1 mb-6">
                <p>📍 {event.location}</p>
                <p>📅 {event.date}</p>
              </div>

              <Link
                to={`/event/${event.id}`}
                state={event}
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold
                           text-[#39ff14] border border-[#39ff14]/60
                           hover:bg-[#39ff14] hover:text-black transition"
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
