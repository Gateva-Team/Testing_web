import React from "react";
import { Link } from "react-router-dom";
import events from "../data/eventMusicPublic.json";

export default function EventMusikPublic() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Event Musik</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border border-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-white/60">{event.location}</p>

            <Link
              to={`/event/musik/${event.id}`}
              state={event}
              className="inline-block mt-4 text-[#39ff14]"
            >
              Lihat Detail →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}