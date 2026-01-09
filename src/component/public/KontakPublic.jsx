import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Brain,
  Loader2,
  MessageCircle,
} from "lucide-react";

export default function KontakPublic() {
  const formRef = useRef(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [intent, setIntent] = useState("—");

  /* ================= AI INTENT ================= */
  useEffect(() => {
    const t = message.toLowerCase();
    if (!t) return setIntent("—");

    if (t.includes("tiket")) setIntent("Tiket Event");
    else if (t.includes("jadwal")) setIntent("Jadwal Event");
    else if (t.includes("keluhan")) setIntent("Keluhan");
    else setIntent("Pertanyaan Umum");
  }, [message]);

  /* ================= CONFIDENCE ================= */
  useEffect(() => {
    if (!message) return setConfidence(0);

    let score = Math.min(100, 15 + message.length * 0.8);
    if (message.includes("?")) score += 10;
    if (message.length < 20) score -= 10;

    setConfidence(Math.max(5, Math.min(score, 100)));
  }, [message]);

  /* ================= SUBMIT ================= */
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_2jegxni",
        "template_e0i3gh8",
        formRef.current,
        "dLa3Te8qFDNagZdfp"
      )
      .then(() => {
        toast.success("Pesan berhasil dikirim", {
          description: "Tim Gateva akan segera merespons ✨",
        });
        formRef.current.reset();
        setMessage("");
      })
      .catch(() => {
        toast.error("Gagal mengirim pesan", {
          description: "Silakan gunakan WhatsApp Gateva.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#020a05] via-[#04140b] to-black text-white">
      {/* GLOW */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#39ff14]/10 blur-[160px]" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl grid lg:grid-cols-3 gap-12"
        >
          {/* LEFT INFO */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#39ff14]">
              <Sparkles className="w-4 h-4" />
              Hubungi Kami
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Bicara dengan
              <br />
              <span className="text-[#39ff14]">Gateva AI Support</span>
            </h1>

            <p className="text-white/65 max-w-sm">
              Kirim pesan terkait event, tiket, atau kebutuhan lainnya. AI akan
              membantu merapikan pesanmu sebelum dikirim.
            </p>

            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#39ff14]" />
                gatevaet@gmail.com
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#39ff14]" />
                +62 812-3456-7890
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#39ff14]" />
                Yogyakarta, Indonesia
              </div>
            </div>
          </div>

          {/* FORM */}
          <Card className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Kirim Pesan
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    name="user_name"
                    placeholder="Nama lengkap"
                    required
                    className="bg-black/40 border-white/15 text-white placeholder:text-white/40"
                  />
                  <Input
                    name="user_email"
                    type="email"
                    placeholder="Email aktif"
                    required
                    className="bg-black/40 border-white/15 text-white placeholder:text-white/40"
                  />
                </div>

                <Textarea
                  name="message"
                  rows={5}
                  placeholder="Ceritakan kebutuhan atau pertanyaan kamu…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-black/40 border-white/15 text-white placeholder:text-white/40 resize-none"
                />

                {/* AI PANEL */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Brain className="w-4 h-4 text-[#39ff14]" />
                      Intent:
                      <span className="text-white ml-1">{intent}</span>
                    </div>

                    <div className="mt-3">
                      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#39ff14]"
                          animate={{ width: `${confidence}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-white/50">
                        AI Confidence {confidence}%
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs text-white/60 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#39ff14]" />
                      AI Suggestion
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setMessage(
                          "Apakah masih tersedia tiket untuk event akhir pekan ini?"
                        )
                      }
                      className="text-sm text-[#39ff14] hover:underline"
                    >
                      Gunakan pertanyaan umum →
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#39ff14] text-black/90 font-semibold hover:brightness-110"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengirim…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Kirim Pesan
                    </span>
                  )}
                </Button>
              </form>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-white/60 hover:text-[#39ff14]"
              >
                Gunakan WhatsApp jika pesan darurat →
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
