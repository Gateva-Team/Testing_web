import React from "react";

export default function KontakPublic() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-28">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="max-w-3xl mb-20">
          <p className="text-[#39ff14] tracking-widest text-sm mb-3 uppercase">
            Kontak Gateva
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Hubungi Tim Kami <br />
            <span className="text-[#39ff14]">Kami Siap Membantu</span>
          </h1>

          <p className="mt-6 text-white/60 text-lg">
            Punya pertanyaan seputar event, kerja sama, atau ingin berkolaborasi
            dengan Gateva? Jangan ragu untuk menghubungi kami melalui form atau
            kontak di bawah ini.
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* ===== CONTACT INFO ===== */}
          <div className="space-y-8">
            {[
              {
                title: "Email",
                value: "support@gateva.id",
                desc: "Respon maksimal 1x24 jam",
                link: "mailto:support@gateva.id",
              },
              {
                title: "WhatsApp",
                value: "+62 822-5347-7806 (Dama)",
                desc: "Senin – Jumat, 09.00 – 17.00",
                link: "https://wa.me/6282253477806",
              },
              {
                title: "Alamat",
                value: "Yogyakarta, Indonesia",
                desc: "Kantor pusat Gateva",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10
                           rounded-2xl p-6 hover:border-[#39ff14]/50
                           transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>

                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#39ff14] font-medium hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[#39ff14] font-medium">{item.value}</p>
                )}

                <p className="text-white/50 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ===== FORM ===== */}
          <div className="lg:col-span-2">
            <div
              className="bg-white/5 backdrop-blur-2xl border border-white/10
                         rounded-3xl p-10 shadow-[0_0_60px_rgba(57,255,20,0.12)]"
            >
              <h2 className="text-2xl font-bold mb-8">Kirim Pesan</h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full bg-black/40 border border-white/10
                               rounded-xl px-5 py-4 text-white
                               focus:outline-none focus:border-[#39ff14]
                               transition"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-black/40 border border-white/10
                               rounded-xl px-5 py-4 text-white
                               focus:outline-none focus:border-[#39ff14]
                               transition"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subjek"
                  className="w-full bg-black/40 border border-white/10
                             rounded-xl px-5 py-4 text-white
                             focus:outline-none focus:border-[#39ff14]
                             transition"
                />

                <textarea
                  rows="5"
                  placeholder="Tulis pesan kamu di sini..."
                  className="w-full bg-black/40 border border-white/10
                             rounded-xl px-5 py-4 text-white
                             focus:outline-none focus:border-[#39ff14]
                             transition resize-none"
                />

                <button
                  type="button"
                  className="w-full md:w-fit px-10 py-4 rounded-xl
                             font-semibold text-black
                             bg-[#39ff14]
                             hover:brightness-110 hover:scale-[1.03]
                             transition-all duration-300"
                >
                  Kirim Pesan
                </button>
              </form>

              <p className="text-xs text-white/40 mt-6">
                * Data kamu aman dan tidak akan dibagikan ke pihak lain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
