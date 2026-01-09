import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EventMusikPublic() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ganti URL ini dengan URL MockAPI Anda yang asli
    const apiUrl = "https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events"; 

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // FILTER: Hanya ambil data yang kategorinya 'musik'
        const musikOnly = data.filter((item) => item.category === "Musik");
        setEvents(musikOnly);
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
      <h1 className="text-4xl font-bold mb-10">Event Musik</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border border-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-white/60">{event.level}</p>

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