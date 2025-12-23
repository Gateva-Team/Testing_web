import React from "react";
import { Link } from "react-router-dom";

export default function EventLomba() {
  const events = [
    {
      id: 1,
      title: "Hackathon Development Nasional 2025",
      location: "Jakarta",
      date: "18 Oktober 2025",
      category: "Teknologi",
      level: "Mahasiswa & Umum",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
      description:
        "Hackathon nasional untuk mengembangkan solusi teknologi inovatif bersama talenta terbaik Indonesia.",
    },
    {
      id: 2,
      title: "UI/UX Design Competition",
      location: "Online",
      date: "25 Oktober 2025",
      category: "Desain",
      level: "Mahasiswa",
      price: "Rp 50.000",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
      description:
        "Kompetisi desain UI/UX untuk menciptakan produk digital yang estetis dan fungsional.",
    },
    {
      id: 3,
      title: "Startup Business Challenge",
      location: "Bandung",
      date: "2 November 2025",
      category: "Bisnis",
      level: "Umum",
      price: "Rp 100.000",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      description:
        "Ajang kompetisi bisnis untuk menguji ide startup dan model bisnis inovatif.",
    },
    {
      id: 4,
      title: "Mobile App Development Contest",
      location: "Surabaya",
      date: "10 November 2025",
      category: "Programming",
      level: "Mahasiswa",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      description:
        "Lomba pengembangan aplikasi mobile dengan fokus pada inovasi dan pengalaman pengguna.",
    },
  ];

  return (
    <section className="min-h-screen bg-black px-6 py-30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-14">
          <p className="text-[#39ff14] tracking-widest text-sm uppercase mb-2">
            Event Lomba
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Tantang Dirimu di <br />
            <span className="text-[#39ff14]">Kompetisi Terbaik Gateva</span>
          </h1>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative bg-[#0f0f0f]
                         border border-white/10 rounded-2xl p-6"
            >
              <span
                className="inline-block mb-4 px-3 py-1 rounded-full
                               text-xs font-medium
                               text-[#39ff14] bg-[#39ff14]/10"
              >
                {event.category}
              </span>

              <h3 className="text-white text-xl font-bold mb-2">
                {event.title}
              </h3>

              <div className="text-white/60 text-sm space-y-1 mb-6">
                <p>📍 {event.location}</p>
                <p>📅 {event.date}</p>
                <p>🎯 {event.level}</p>
              </div>

              {/* ✅ HANYA LINK */}
              <Link
                to={`/event/${event.id}`}
                state={event}
                className="block text-center px-4 py-2 rounded-full
                           text-sm font-semibold
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
