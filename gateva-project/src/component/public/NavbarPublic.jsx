import React from "react";
import { Link, useNavigate } from "react-router-dom";
import navbarData from "./data/navbar.json";

export default function NavbarUser() {
  const navigate = useNavigate();
  const { logo, menu, user } = navbarData;

  const handleLogout = () => {
    // nanti bisa ditambah clear token / auth
    navigate("/");
  };

  const handleAction = (action) => {
    if (action === "logout") handleLogout();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link to={logo.link} className="flex items-center">
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* MENU */}
        <ul className="hidden md:flex items-center gap-12 text-sm font-medium">
          {menu.map((item, i) => (
            <li key={i} className="relative group">
              {item.dropdown ? (
                <>
                  <span className="cursor-pointer text-white/70 hover:text-[#39ff14] transition">
                    {item.label}
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
                      {item.dropdown.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          className="block px-5 py-3 rounded-xl
                                     text-white/70 hover:text-[#39ff14]
                                     hover:bg-white/5 transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className="text-white/70 hover:text-[#39ff14] transition"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* USER */}
        <div className="relative group">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-full
                       bg-white/5 border border-white/10
                       hover:bg-white/10 transition"
          >
            <div className="w-9 h-9 rounded-full bg-[#39ff14]/20 flex items-center justify-center text-[#39ff14] font-bold">
              {user.initial}
            </div>
            <span className="text-sm text-white/70">{user.name}</span>
          </button>

          <div
            className="absolute right-0 top-full mt-4 w-56
                       bg-[#0b0b0b]/95 backdrop-blur-xl
                       border border-white/10 rounded-2xl
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible
                       translate-y-2 group-hover:translate-y-0
                       transition-all duration-300"
          >
            <div className="p-2">
              {user.menu.map((item, i) =>
                item.action ? (
                  <button
                    key={i}
                    onClick={() => handleAction(item.action)}
                    className={`w-full text-left px-5 py-3 rounded-xl transition
                      ${
                        item.danger
                          ? "text-red-400 hover:bg-white/5"
                          : "text-white/70 hover:text-[#39ff14] hover:bg-white/5"
                      }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={i}
                    to={item.path}
                    className="block px-5 py-3 rounded-xl
                               text-white/70 hover:text-[#39ff14]
                               hover:bg-white/5 transition"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}