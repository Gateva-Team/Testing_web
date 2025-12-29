import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Event() {
  const navigate = useNavigate();

  const events = [
    {
      title: "Neon Night Festival",
      category: "Musik",
      location: "Jakarta",
      date: "12 Oktober 2025",
      description: "Konser musik elektronik dengan visual neon spektakuler.",
      price: "Rp250.000",
      image: "/images/neon-night.jpg",
    },
    {
      title: "Indie Soundscape",
      category: "Musik",
      location: "Bandung",
      date: "19 Oktober 2025",
      description: "Festival musik indie dengan band lokal dan internasional.",
      price: "Rp150.000",
      image: "/images/indie-soundscape.jpg",
    },
    {
      title: "Tech Innovation Seminar 2025",
      category: "Seminar",
      location: "Online",
      date: "5 November 2025",
      description: "Seminar tentang inovasi teknologi terbaru.",
      price: "Rp50.000",
      image: "/images/tech-seminar.jpg",
    },
    {
      title: "Business Leadership Summit",
      category: "Seminar",
      location: "Surabaya",
      date: "18 November 2025",
      description: "Seminar untuk pemimpin bisnis dan entrepreneur.",
      price: "Rp100.000",
      image: "/images/business-summit.jpg",
    },
    {
      title: "UI/UX Design Competition",
      category: "Lomba",
      location: "Nasional",
      date: "22 November 2025",
      description: "Lomba desain UI/UX untuk developer dan designer.",
      price: "Rp75.000",
      image: "/images/uiux-competition.jpg",
    },
    {
      title: "Hackathon Digital Future",
      category: "Lomba",
      location: "Jakarta",
      date: "29 November 2025",
      description: "Hackathon untuk inovasi digital dan teknologi.",
      price: "Rp100.000",
      image: "/images/hackathon.jpg",
    },
    {
      title: "React Advanced Workshop",
      category: "Workshop",
      location: "Bandung",
      date: "7 Desember 2025",
      description: "Workshop React lanjutan untuk developer.",
      price: "Rp200.000",
      image: "/images/react-workshop.jpg",
    },
    {
      title: "Startup Growth Workshop",
      category: "Workshop",
      location: "Yogyakarta",
      date: "14 Desember 2025",
      description: "Workshop strategi pertumbuhan startup.",
      price: "Rp150.000",
      image: "/images/startup-workshop.jpg",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const categories = ["Semua", "Musik", "Seminar", "Workshop", "Lomba"];

  // Filter events berdasarkan kategori
  const filteredEvents =
    selectedCategory === "Semua"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  // Fungsi untuk menentukan route detail berdasarkan kategori
  const getDetailRoute = (category) => {
    switch (category) {
      case "Musik":
        return "/event/musik";
      case "Seminar":
        return "/event/seminar";
      case "Workshop":
        return "/event/workshop";
      case "Lomba":
        return "/event/lomba";
      default:
        return "/event";
    }
  };

  return (
    <section className="min-h-screen bg-black px-6 py-30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-14">
          <p className="text-[#39ff14] tracking-widest text-sm uppercase mb-3">
            Semua Event Gateva
          </p>

          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Jelajahi Berbagai Event <br />
            <span className="text-[#39ff14]">
              Musik, Seminar, Workshop & Lomba
            </span>
          </h1>

          <p className="text-white/60 mt-5 max-w-2xl">
            Gateva menghadirkan berbagai jenis event dari hiburan hingga
            edukasi. Temukan event yang sesuai dengan minatmu dan lihat detail
            acaranya.
          </p>
        </div>

        {/* FILTER BUTTON */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(item)}
              className={`px-5 py-2 rounded-full text-sm font-semibold
                ${
                  item === selectedCategory
                    ? "bg-[#39ff14] text-black"
                    : "text-[#39ff14] border border-[#39ff14]/40 hover:bg-[#39ff14] hover:text-black"
                } transition`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* GRID EVENT */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredEvents.map((event, index) => (
            <div
              key={index}
              className="group relative bg-[#0d0d0d] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              {/* GLOW */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none shadow-[0_0_80px_rgba(57,255,20,0.15)]" />

              {/* CATEGORY */}
              <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-[#39ff14] bg-[#39ff14]/10">
                {event.category}
              </span>

              {/* TITLE */}
              <h3 className="text-white text-xl font-bold mb-3 leading-snug">
                {event.title}
              </h3>

              {/* INFO */}
              <div className="text-white/60 text-sm space-y-1 mb-6">
                <p>📍 {event.location}</p>
                <p>📅 {event.date}</p>
              </div>

              {/* ACTION */}
              <button
                onClick={() =>
                  navigate(getDetailRoute(event.category), { state: event })
                }
                className="w-full px-4 py-2 rounded-full text-sm font-semibold text-[#39ff14] border border-[#39ff14]/60 hover:bg-[#39ff14] hover:text-black transition-all duration-300"
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
