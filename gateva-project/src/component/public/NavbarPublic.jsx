import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarUser() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // nanti bisa ditambah clear token / auth
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO IMAGE */}
        <Link to="/" className="flex items-center">
          <img
            src="/src/assets/Gateva-ver1.png"
            alt="Gateva"
            className="h-12 w-auto object-contain"
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

          {/* EVENT DROPDOWN */}
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
                {[
                  { name: "Event Musik", path: "/event/musik" },
                  { name: "Event Seminar", path: "/event/seminar" },
                  { name: "Event Workshop", path: "/event/workshop" },
                  { name: "Event Lomba", path: "/event/lomba" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    to={item.path}
                    className="block px-5 py-3 rounded-xl
                               text-white/70 hover:text-[#39ff14]
                               hover:bg-white/5 transition"
                  >
                    {item.name}
                  </Link>
                ))}
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

        {/* USER PROFILE */}
        <div className="relative group">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-full
                       bg-white/5 border border-white/10
                       hover:bg-white/10 transition"
          >
            <div className="w-9 h-9 rounded-full bg-[#39ff14]/20 flex items-center justify-center text-[#39ff14] font-bold">
              U
            </div>
            <span className="text-sm text-white/70">User</span>
          </button>

          {/* DROPDOWN PROFILE */}
          <div
            className="absolute right-0 top-full mt-4 w-56
                       bg-[#0b0b0b]/95 backdrop-blur-xl
                       border border-white/10 rounded-2xl
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible
                       translate-y-2 group-hover:translate-y-0
                       transition-all duration-300"
          >
            <div className="p-2">
              <Link
                to="/tiket-saya"
                className="block px-5 py-3 rounded-xl
                           text-white/70 hover:text-[#39ff14]
                           hover:bg-white/5 transition"
              >
                Tiket Saya
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-5 py-3 rounded-xl
                           text-red-400 hover:bg-white/5 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
