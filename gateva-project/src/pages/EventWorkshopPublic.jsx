import React from "react";
import { Link } from "react-router-dom";

export default function EventWorkshop() {
  const workshops = [
    {
      id: 1,
      title: "UI/UX Design Bootcamp",
      category: "Workshop",
      date: "12 Oktober 2025",
      location: "Online (Zoom)",
      price: "Rp 299.000",
      description:
        "Bootcamp intensif UI/UX Design untuk pemula hingga intermediate dengan studi kasus real project.",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    },
    {
      id: 2,
      title: "React & Frontend Modern",
      category: "Workshop",
      date: "18 Oktober 2025",
      location: "Jakarta",
      price: "Rp 399.000",
      description:
        "Workshop React modern dengan best practice industri dan studi kasus aplikasi nyata.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      id: 3,
      title: "Data Analyst Intensive",
      category: "Workshop",
      date: "25 Oktober 2025",
      location: "Bandung",
      price: "Rp 349.000",
      description:
        "Pelatihan intensif data analyst menggunakan tools populer dan real-world dataset.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    },
    {
      id: 4,
      title: "AI for Beginner",
      category: "Workshop",
      date: "2 November 2025",
      location: "Online",
      price: "Rp 259.000",
      description:
        "Workshop pengenalan Artificial Intelligence untuk pemula tanpa background teknis.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-white px-6 py-30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16">
          <p className="text-[#39ff14] tracking-widest text-sm mb-3">
            EVENT WORKSHOP
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Tingkatkan Skill
            <br />
            <span className="text-[#39ff14]">Lewat Workshop Terbaik</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/60">
            Ikuti workshop pilihan dari berbagai bidang seperti teknologi,
            desain, bisnis, dan pengembangan diri yang dikurasi secara
            profesional.
          </p>
        </div>

        {/* GRID EVENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {workshops.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl p-6
                         bg-white/5 border border-white/10
                         hover:border-[#39ff14]/60
                         transition-all duration-300
                         hover:-translate-y-2"
            >
              <div className="relative z-10">
                <span
                  className="inline-block mb-4 px-4 py-1 rounded-full
                                 text-xs font-semibold
                                 bg-[#39ff14]/10 text-[#39ff14]"
                >
                  {item.category}
                </span>

                <h3 className="text-xl font-bold mb-4">{item.title}</h3>

                <div className="space-y-2 text-sm text-white/60">
                  <p>📅 {item.date}</p>
                  <p>📍 {item.location}</p>
                </div>

                {/* ✅ HANYA TAMBAH LINK */}
                <Link
                  to={`/event/${item.id}`}
                  state={item}
                  className="mt-6 block text-center py-3 rounded-xl font-semibold
                             bg-[#39ff14] text-black
                             hover:shadow-[0_0_25px_rgba(57,255,20,0.8)]
                             transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
