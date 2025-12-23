import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "user") {
      setIsLoggedIn("user"); // set role ke user
      navigate("/"); // redirect ke homepage/public
    } else {
      setIsLoggedIn("admin"); // set role ke admin
      navigate("/admin/dashboard"); // redirect ke admin dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b14] relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#39ff14]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[160px]" />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_0_60px_rgba(57,255,20,0.08)]">
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <img
            src="/src/assets/Gateva-ver1.png"
            alt="Gateva"
            className="h-12 object-contain"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Masuk ke Gateva
        </h1>
        <p className="text-center text-white/60 text-sm mb-8">
          Kelola dan jelajahi event favoritmu
        </p>

        {/* ROLE SWITCH */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-8">
          {["user", "admin"].map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition
                ${
                  role === item
                    ? "bg-[#39ff14] text-black"
                    : "text-white/60 hover:text-white"
                }`}
            >
              {item === "user" ? "User" : "Admin"}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-white/70 mb-2">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#39ff14]/60"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#39ff14]/60"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-[#39ff14] text-black hover:brightness-110 hover:scale-[1.02] transition-all"
          >
            Masuk sebagai {role === "user" ? "User" : "Admin"}
          </button>
        </form>

        {/* CANCEL */}
        <Link
          to="/"
          className="block text-center mt-4 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:bg-white/5 transition"
        >
          Cancel & Kembali
        </Link>
      </div>
    </div>
  );
}
