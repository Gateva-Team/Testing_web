import React from "react";
import { Link } from "react-router-dom";

export default function NavbarPublic() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO IMAGE */}
        <Link to="/" className="flex items-center">
          <img
            src="/src/assets/Gateva-ver1.png"
            alt="Gateva"
            className="h-15 w-auto object-contain"
          />
        </Link>

        {/* MENU */}
        <ul className="hidden md:flex items-center gap-12 text-sm font-medium">
          <li>
            <Link
              to="/"
              className="text-white/70 hover:text-[#39ff14] transition"
            >
              Beranda
            </Link>
          </li>

          {/* DROPDOWN EVENT */}
          <li className="relative group">
            <span className="cursor-pointer text-white/70 hover:text-[#39ff14] transition">
              Event
            </span>

            <div
              className="absolute left-0 top-full mt-4 w-64
                         bg-[#0b0b0b]/95 backdrop-blur-xl
                         border border-white/10 rounded-2xl
                         opacity-0 invisible group-hover:opacity-100 group-hover:visible
                         translate-y-2 group-hover:translate-y-0
                         transition-all duration-300"
            >
              <div className="p-2">
                <Link
                  to="/event/musik"
                  className="block px-5 py-3 rounded-xl
                             text-white/70 hover:text-[#39ff14]
                             hover:bg-white/5 transition"
                >
                  Event Musik
                </Link>

                <Link
                  to="/event/seminar"
                  className="block px-5 py-3 rounded-xl
                             text-white/70 hover:text-[#39ff14]
                             hover:bg-white/5 transition"
                >
                  Event Seminar
                </Link>

                <Link
                  to="/event/workshop"
                  className="block px-5 py-3 rounded-xl
                             text-white/70 hover:text-[#39ff14]
                             hover:bg-white/5 transition"
                >
                  Event Workshop
                </Link>

                <Link
                  to="/event/lomba"
                  className="block px-5 py-3 rounded-xl
                             text-white/70 hover:text-[#39ff14]
                             hover:bg-white/5 transition"
                >
                  Event Lomba
                </Link>
              </div>
            </div>
          </li>

          <li>
            <Link
              to="/tentang"
              className="text-white/70 hover:text-[#39ff14] transition"
            >
              Tentang
            </Link>
          </li>

          <li>
            <Link
              to="/kontak"
              className="text-white/70 hover:text-[#39ff14] transition"
            >
              Kontak
            </Link>
          </li>
        </ul>

        {/* ACTION */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm text-white/60 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-2.5 rounded-full text-sm font-semibold
                       bg-[#39ff14] text-black
                       hover:brightness-110 hover:scale-[1.04]
                       transition-all"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
