import React from "react";
import { Link } from "react-router-dom";

export default function EventSeminar() {
  const events = [
    {
      id: 1,
      title: "Future Tech Conference 2025",
      location: "Jakarta",
      date: "15 Oktober 2025",
      category: "Teknologi",
      price: "Rp 450.000",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      description:
        "Konferensi teknologi masa depan yang membahas AI, Web3, Cloud, dan inovasi digital bersama pembicara internasional.",
    },
    {
      id: 2,
      title: "Digital Marketing Summit 2025",
      location: "Bandung",
      date: "22 Oktober 2025",
      category: "Bisnis",
      price: "Rp 300.000",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      description:
        "Seminar digital marketing untuk meningkatkan strategi branding, SEO, dan performance marketing.",
    },
    {
      id: 3,
      title: "Startup & Innovation Forum",
      location: "Surabaya",
      date: "2 November 2025",
      category: "Startup",
      price: "Rp 250.000",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
      description:
        "Forum diskusi startup dan inovasi bersama founder, investor, dan mentor profesional.",
    },
    {
      id: 4,
      title: "AI & Data Science Seminar",
      location: "Yogyakarta",
      date: "9 November 2025",
      category: "Artificial Intelligence",
      price: "Rp 400.000",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      description:
        "Seminar AI & Data Science untuk memahami machine learning, big data, dan penerapannya di industri.",
    },
  ];

  return (
    <section className="min-h-screen bg-black px-6 py-30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
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

        {/* GRID EVENT */}
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
              {/* NEON GLOW */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           transition duration-300 pointer-events-none
                           shadow-[0_0_60px_rgba(57,255,20,0.18)]"
              />

              {/* CATEGORY */}
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

              {/* INFO */}
              <div className="text-white/60 text-sm space-y-1 mb-8">
                <p>📍 {event.location}</p>
                <p>📅 {event.date}</p>
              </div>

              {/* ACTION – ONLY LINK ADDED */}
              <Link
                to={`/event/${event.id}`}
                state={event}
                className="block text-center w-full py-3 rounded-full
                           text-sm font-semibold text-black bg-[#39ff14]
                           hover:scale-[1.03] transition"
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
