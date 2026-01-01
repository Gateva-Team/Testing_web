import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import musicEvents from "../../data/eventMusicPublic.json";

export default function EventDetailMusic() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  // 🔎 ambil dari state ATAU fallback ke JSON
  const event =
    state || musicEvents.find((item) => String(item.id) === id);

  if (!event) {
    return (
      <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="mb-6 text-white/60">Event musik tidak ditemukan</p>
        <button
          onClick={() => navigate("/event/musik")}
          className="px-6 py-3 rounded-xl bg-[#39ff14] text-black font-semibold"
        >
          Kembali ke Event Musik
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f0f1a] text-white pt-20">
      {/* ================= HERO ================= */}
      <div className="relative h-[65vh] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-black/60 to-black/30" />

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-14">
            <span className="inline-block px-4 py-1 mb-4 rounded-full text-sm font-semibold bg-[#39ff14]/15 text-[#39ff14]">
              {event.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
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
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Tentang Event</h2>
            <p className="text-white/70 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Experience", desc: "Visual & sound system premium" },
              { title: "Audience", desc: "Ribuan penonton antusias" },
              { title: "Venue", desc: "Lokasi strategis & nyaman" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10
                           rounded-2xl p-6 hover:-translate-y-1 transition"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
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

            <p className="text-xs text-white/40 mt-6 text-center">
              * Tiket tidak dapat dikembalikan setelah pembelian
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}