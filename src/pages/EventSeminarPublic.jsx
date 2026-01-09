import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventSeminarPublic() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ganti URL ini dengan URL MockAPI Anda yang asli
    const apiUrl = "https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events"; 

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // FILTER: Hanya ambil data yang kategorinya 'seminar'
        const seminarOnly = data.filter((item) => item.category === "Seminar");
        setEvents(seminarOnly);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-12">
          Event <span className="text-[#39ff14]">Seminar</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 border border-white/10
                         rounded-2xl p-6 hover:border-[#39ff14]/50
                         transition"
            >
              <h3 className="text-2xl font-bold mb-2">
                {event.title}
              </h3>

              <p className="text-white/60 mb-4">
                📅 {event.date}
              </p>

              <Link
                to={`/event/seminar/${event.id}`}
                state={event}
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