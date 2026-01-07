import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  User,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

/* ================= MOCK AUTH ================= */
const fakeAuth = async (email) => {
  await new Promise((r) => setTimeout(r, 800));

  if (email === "admin@gateva.id") return { role: "admin" };
  if (email === "user@gateva.id") return { role: "user" };

  throw new Error("Akun tidak ditemukan di Gateva");
};

export default function Login({ setRole }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const detectedRole =
    emailValue === "admin@gateva.id"
      ? "admin"
      : emailValue === "user@gateva.id"
      ? "user"
      : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fakeAuth(emailValue);
      setRole(res.role); // set global role

      toast.success(`Login sebagai ${res.role.toUpperCase()}`);

      // redirect sesuai role
      if (res.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.role === "user") {
        navigate("/beranda-user"); // <-- beranda user
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0b0b14] flex items-center justify-center relative overflow-hidden px-6">
      {/* NEON ATMOSPHERE */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-[#39ff14]/12 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-indigo-500/20 rounded-full blur-[200px]" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2.2rem] shadow-[0_0_120px_rgba(57,255,20,0.12)]">
          <CardContent className="px-12 py-14">
            {/* LOGO */}
            <div className="flex justify-center mb-10">
              <img
                src="/src/assets/Gateva-ver1.png"
                alt="Gateva"
                className="h-12 opacity-90"
              />
            </div>

            {/* HEADER */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3">
                Welcome to Gateva
              </h1>
              <p className="text-white/55 text-sm">
                Satu platform untuk seluruh pengalaman event modern
              </p>
            </div>

            {/* ROLE BADGE */}
            {detectedRole && (
              <div className="flex justify-center mb-8">
                <Badge
                  className="px-4 py-1.5 text-xs font-semibold
                    bg-[#39ff14]/15 text-[#39ff14]
                    border border-[#39ff14]/30"
                >
                  {detectedRole === "admin" ? (
                    <ShieldCheck size={14} />
                  ) : (
                    <User size={14} />
                  )}
                  <span className="ml-2">
                    Mode {detectedRole.toUpperCase()}
                  </span>
                </Badge>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* EMAIL */}
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  size={18}
                />
                <Input
                  type="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="email@gateva.id"
                  className="pl-11 py-6 bg-white/[0.03] border-white/10 text-white placeholder-white/30 focus-visible:ring-[#39ff14]/40"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  size={18}
                />
                <Input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="pl-11 pr-12 py-6 bg-white/[0.03] border-white/10 text-white placeholder-white/30 focus-visible:ring-[#39ff14]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* ACTION */}
              <Button
                disabled={loading}
                className="w-full py-6 text-base font-semibold bg-gradient-to-r from-[#39ff14] to-emerald-400 text-white shadow-[0_0_35px_rgba(57,255,20,0.35)] hover:brightness-110"
              >
                {loading ? "Memverifikasi..." : "Masuk ke Gateva"}
              </Button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-[#39ff14] transition"
              >
                <ArrowLeft size={15} />
                Kembali ke Beranda
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
