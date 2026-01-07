import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Mic, ChevronDown, Flame } from "lucide-react";

const MOCK_EVENTS = [
  { title: "Konser Musik Jakarta", tag: "Trending 🔥", freq: 9 },
  { title: "Konser Weekend Ini", tag: "Weekend Ini", freq: 7 },
  { title: "Seminar AI & Teknologi", freq: 5 },
];

export default function NavbarPublic() {
  const [hidden, setHidden] = useState(false);
  const [transparent, setTransparent] = useState(true);
  const [eventOpen, setEventOpen] = useState(false);
  const [query, setQuery] = useState("");

  const lastScroll = useRef(0);
  const dropdownRef = useRef(null);
  const location = useLocation();

  /* ===============================
     SMART HIDE + HERO TRANSPARENT
  =============================== */
  useEffect(() => {
    function onScroll() {
      const current = window.scrollY;

      // hide / show
      if (current > lastScroll.current && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // transparent when hero
      setTransparent(current < window.innerHeight * 0.8);

      lastScroll.current = current;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===============================
     CLOSE DROPDOWN ON OUTSIDE
  =============================== */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setEventOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = MOCK_EVENTS.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${
          transparent
            ? "bg-transparent"
            : "bg-black/70 backdrop-blur-xl border-b border-white/10"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-8">
        {/* LOGO */}
        <Link to="/" className="shrink-0">
          <img src="/src/assets/Gateva-ver1.png" alt="Gateva" className="h-9" />
        </Link>

        {/* SEARCH */}
        <div className="relative hidden md:block w-[420px]">
          <div className="flex items-center h-11 rounded-full bg-white/5 border border-white/10 px-4">
            <Search size={16} className="text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari event, konser, seminar..."
              className="flex-1 bg-transparent outline-none text-sm text-white ml-3"
            />
            <button className="ml-2 text-white/40 hover:text-[#39ff14] transition">
              <Mic size={16} />
            </button>
          </div>

          {query && suggestions.length > 0 && (
            <div className="absolute mt-3 w-full bg-[#0b0b0b]/95 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  className="px-5 py-3 hover:bg-white/5 text-sm text-white flex items-center gap-2 cursor-pointer"
                >
                  {item.tag && (
                    <span className="flex items-center gap-1 text-xs text-orange-400">
                      <Flame size={12} /> {item.tag}
                    </span>
                  )}
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MAIN MENU */}
        <ul className="hidden md:flex items-center gap-10 ml-6 text-sm font-medium text-white/70">
          {["/", "/tentang", "/kontak"].map((path, i) => (
            <li key={path}>
              <Link
                to={path}
                className={`relative transition hover:text-white ${
                  location.pathname === path ? "text-white after:w-full" : ""
                }
                after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                after:bg-[#39ff14] after:w-0 hover:after:w-full after:transition-all`}
              >
                {i === 0 ? "Beranda" : i === 1 ? "Tentang" : "Kontak"}
              </Link>
            </li>
          ))}

          {/* EVENT DROPDOWN */}
          <li ref={dropdownRef} className="relative">
            <button
              onClick={() => setEventOpen((v) => !v)}
              className="flex items-center gap-1 hover:text-white transition"
            >
              Event
              <ChevronDown
                size={14}
                className={`transition ${
                  eventOpen ? "rotate-180 text-[#39ff14]" : ""
                }`}
              />
            </button>

            {eventOpen && (
              <div className="absolute top-full left-0 mt-4 w-56 bg-[#0b0b0b]/95 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
                {["Musik", "Seminar", "Workshop", "Lomba"].map((e) => (
                  <Link
                    key={e}
                    to={`/event/${e.toLowerCase()}`}
                    onClick={() => setEventOpen(false)}
                    className="block px-5 py-3 rounded-xl text-white/70 hover:text-[#39ff14] hover:bg-white/5 transition"
                  >
                    Event {e}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* ACTION */}
        <div className="ml-auto flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm text-white/60 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 rounded-full bg-[#39ff14] text-black text-sm font-semibold hover:brightness-110 hover:scale-[1.04] transition-all"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
