import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import seminarEvents from "../../data/eventSeminarPublic.json";

export default function EventDetailSeminar() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  // 🔎 ambil dari state ATAU fallback ke JSON
  const event =
    state || seminarEvents.find((item) => String(item.id) === id);

  if (!event) {
    return (
      <section className="min-h-screen bg-[#0f0f1a] text-white flex flex-col items-center justify-center">
        <p className="mb-6 text-white/60">Event seminar tidak ditemukan</p>
        <button
          onClick={() => navigate("/event/seminar")}
          className="px-6 py-3 rounded-xl bg-[#39ff14] text-black font-semibold"
        >
          Kembali ke Event Seminar
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f0f1a] text-white pt-20">
      {/* ================= HERO ================= */}
      <div className="relative h-[65vh]">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-black/60 to-black/30" />

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-14">
            <span className="px-4 py-1 rounded-full text-sm bg-[#39ff14]/15 text-[#39ff14]">
              {event.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold mt-4">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-6 mt-6 text-white/70">
              <p>📍 {event.location}</p>
              <p>📅 {event.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Deskripsi Seminar</h2>
          <p className="text-white/70 leading-relaxed text-lg">
            {event.description}
          </p>
        </div>

        {/* ================= TICKET ================= */}
        <div className="sticky top-28 h-fit">
          <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8">
            <h3 className="text-lg font-bold mb-2">Harga Tiket</h3>

            <p className="text-4xl font-extrabold text-[#39ff14] mb-6">
              {event.price}
            </p>

            <Link
              to="/checkout"
              state={event}
              className="block w-full py-4 rounded-xl font-semibold text-center
                         bg-[#39ff14] text-black hover:brightness-110 transition"
            >
              🎟️ Beli Tiket
            </Link>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-4 mt-3 rounded-xl
                         border border-white/20 text-white/70
                         hover:bg-white/10 transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}