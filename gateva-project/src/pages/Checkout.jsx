import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPublic() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Data checkout tidak ditemukan
      </div>
    );
  }

  const handleCheckout = () => {
    if (!name || !phone) {
      alert("Mohon lengkapi nama dan nomor WhatsApp");
      return;
    }

    const message = `
Halo Gateva 👋
Saya ingin membeli tiket event:

🎫 Event : ${state.title}
📅 Tanggal : ${state.date}
📍 Lokasi : ${state.location}
💰 Harga : ${state.price}

👤 Nama : ${name}
📱 WhatsApp : ${phone}
    `;

    const whatsappUrl = `https://wa.me/6289629168442?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12">
        {/* ================= EVENT SUMMARY ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <img
            src={state.image}
            alt={state.title}
            className="h-56 w-full object-cover"
          />

          <div className="p-8">
            <span
              className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold
                             bg-[#39ff14]/15 text-[#39ff14]"
            >
              {state.category}
            </span>

            <h2 className="text-2xl font-extrabold mb-2">{state.title}</h2>

            <div className="text-white/60 text-sm space-y-1 mb-6">
              <p>📍 {state.location}</p>
              <p>📅 {state.date}</p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <span className="text-white/60">Total Harga</span>
              <span className="text-2xl font-bold text-[#39ff14]">
                {state.price}
              </span>
            </div>
          </div>

          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none
                          shadow-[0_0_80px_rgba(57,255,20,0.12)]"
          />
        </div>

        {/* ================= FORM CHECKOUT ================= */}
        <div
          className="bg-white/10 backdrop-blur-xl border border-white/15
                        rounded-3xl p-10 shadow-[0_0_60px_rgba(57,255,20,0.15)]"
        >
          <h3 className="text-3xl font-extrabold mb-2">Checkout Tiket</h3>
          <p className="text-white/60 mb-8">
            Lengkapi data untuk melanjutkan pemesanan via WhatsApp
          </p>

          <div className="space-y-6">
            {/* Nama */}
            <div>
              <label className="block mb-2 text-sm text-white/70">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-black/40
                           border border-white/10
                           focus:outline-none focus:border-[#39ff14]
                           text-white"
              />
            </div>

            {/* Nomor */}
            <div>
              <label className="block mb-2 text-sm text-white/70">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                placeholder="Contoh: 08123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-black/40
                           border border-white/10
                           focus:outline-none focus:border-[#39ff14]
                           text-white"
              />
            </div>

            {/* ACTION */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl font-semibold text-black
                           bg-[#39ff14]
                           hover:scale-[1.03]
                           hover:shadow-[0_0_30px_rgba(57,255,20,0.9)]
                           transition-all"
              >
                💬 Checkout via WhatsApp
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full py-4 rounded-xl border border-white/20
                           text-white/70 hover:bg-white/10 transition"
              >
                Kembali
              </button>
            </div>
          </div>

          <p className="text-xs text-white/40 mt-6 text-center">
            Dengan melanjutkan, kamu menyetujui syarat & ketentuan Gateva
          </p>
        </div>
      </div>
    </section>
  );
}
