import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import kontakData from "./data/kontak.json";

export default function KontakPublic() {
  const formRef = useRef();
  const { header, contacts, form } = kontakData;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2jegxni",      // SERVICE ID
        "template_e0i3gh8",     // TEMPLATE ID
        formRef.current,
        "dLa3Te8qFDNagZdfp"     // PUBLIC KEY
      )
      .then(() => {
        alert("Pesan berhasil dikirim ✅");
        formRef.current.reset();
      })
      .catch(() => {
        alert("Gagal mengirim pesan ❌");
      });
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-28">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-3xl mb-20">
          <p className="text-[#39ff14] tracking-widest text-sm mb-3 uppercase">
            {header.subtitle}
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {header.title} <br />
            <span className="text-[#39ff14]">{header.highlight}</span>
          </h1>

          <p className="mt-6 text-white/60 text-lg">
            {header.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* INFO */}
          <div className="space-y-8">
            {contacts.map((item, i) => (
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
              <h2 className="text-2xl font-bold mb-8">{form.title}</h2>

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
                  {form.button}
                </button>
              </form>

              <p className="text-xs text-white/40 mt-6">
                {form.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}