import React from "react";
import { Link } from "react-router-dom";
import workshops from "../data/eventWorkshopPublic.json";

export default function EventWorkshopPublic() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-12">
          Event <span className="text-[#39ff14]">Workshop</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {workshops.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10
                         rounded-2xl p-6 hover:border-[#39ff14]/50
                         transition"
            >
              <h3 className="text-2xl font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-white/60 mb-4">
                📅 {item.date}
              </p>

              <Link
                to={`/event/workshop/${item.id}`}
                state={item}
                className="inline-flex items-center gap-2
                           text-[#39ff14] font-semibold
                           hover:underline"
              >
                Lihat Detail →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}