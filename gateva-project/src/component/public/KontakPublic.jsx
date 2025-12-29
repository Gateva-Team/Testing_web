import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function KontakPublic() {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2jegxni",      // SERVICE ID
        "template_e0i3gh8",     // TEMPLATE ID
        formRef.current,
        "dLa3Te8qFDNagZdfp"     // KEY
      )
      .then(() => {
        alert("Pesan berhasil dikirim ✅");
        formRef.current.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal mengirim pesan ❌");
      });
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-28">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
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
            dengan Gateva? Jangan ragu menghubungi kami.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* INFO */}
          <div className="space-y-8">
            {[
              {
                title: "Email",
                value: "gatevaet@gmail.com",
                link: "mailto:gatevaet@gmail.com",
                desc: "Respon maksimal 1x24 jam",
              },
              {
                title: "WhatsApp",
                value: "+62 822-5347-7806",
                link: "https://wa.me/6282253477806",
                desc: "Senin – Jumat, 09.00 – 17.00",
              },
              {
                title: "Alamat",
                value: "Yogyakarta, Indonesia",
                desc: "Kantor pusat Gateva",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>

                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#39ff14] hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[#39ff14]">{item.value}</p>
                )}

                <p className="text-white/50 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
              <h2 className="text-2xl font-bold mb-8">Kirim Pesan</h2>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Nama Lengkap"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4"
                  />

                  <input
                    type="email"
                    name="user_email"
                    placeholder="Email"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subjek"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4"
                />

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tulis pesan kamu di sini..."
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 resize-none"
                />

                <button
                  type="submit"
                  className="px-10 py-4 rounded-xl font-semibold text-black bg-[#39ff14] hover:brightness-110 transition"
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
