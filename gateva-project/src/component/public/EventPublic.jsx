import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventData from "./data/events.json";

export default function EventPublic() {
  const navigate = useNavigate();
  const { header, categories, events } = eventData;

  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredEvents =
    selectedCategory === "Semua"
      ? events
      : events.filter((e) => e.category === selectedCategory);

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
            {header.subtitle}
          </p>

          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            {header.title} <br />
            <span className="text-[#39ff14]">{header.highlight}</span>
          </h1>

          <p className="text-white/60 mt-5 max-w-2xl">
            {header.description}
          </p>
        </div>

        {/* FILTER */}
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
              className="group relative bg-[#0d0d0d] rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-[#39ff14] bg-[#39ff14]/10">
                {event.category}
              </span>

              <h3 className="text-white text-xl font-bold mb-3 leading-snug">
                {event.title}
              </h3>

              <div className="text-white/60 text-sm space-y-1 mb-6">
                <p>📍 {event.location}</p>
                <p>📅 {event.date}</p>
              </div>

              <button
                onClick={() =>
                  navigate(getDetailRoute(event.category), { state: event })
                }
                className="w-full px-4 py-2 rounded-full text-sm font-semibold text-[#39ff14] border border-[#39ff14]/60 hover:bg-[#39ff14] hover:text-black transition"
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