import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";

const menus = [
  {
    section: "MAIN",
    items: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    section: "MANAGEMENT",
    items: [
      {
        name: "Data Event",
        path: "/admin/data-event",
        icon: Calendar,
        key: "event",
      },
      {
        name: "Transaksi",
        path: "/admin/transaksi",
        icon: CreditCard,
        key: "transaksi",
      },
    ],
  },
];

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State untuk menyimpan jumlah data dari API
  const [counters, setCounters] = useState({
    event: 0,
    transaksi: 0,
  });

  const [usage, setUsage] = useState(() => {
    return JSON.parse(localStorage.getItem("menu-usage") || "{}");
  });

  // Api real-time untuk counter 
  useEffect(() => {
    const fetchCounters = async () => {
      try {
        // Data Event
        const resEvents = await fetch("https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events");
        const dataEvents = await resEvents.json();
        
        // Data Transaksi
        const resTrx = await fetch("https://694d8c8ead0f8c8e6e20ef39.mockapi.io/transactions");
        const dataTrx = await resTrx.json();

        setCounters({
          event: dataEvents.length,
          transaksi: dataTrx.length,
        });
      } catch (error) {
        console.error("Gagal mengambil data counter sidebar:", error);
      }
    };

    fetchCounters();
  }, [location.pathname]); // Update counter setiap kali pindah halaman


  // Menu Usage Tracking
  useEffect(() => {
    setUsage((prev) => {
      const updated = {
        ...prev,
        [location.pathname]: (prev[location.pathname] || 0) + 1,
      };
      localStorage.setItem("menu-usage", JSON.stringify(updated));
      return updated;
    });
  }, [location.pathname]);

  const mostUsedPath = Object.entries(usage).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];

  const handleLogout = () => {
    if (!window.confirm("Yakin ingin logout?")) return;
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside className="h-screen w-[260px] flex flex-col bg-gradient-to-b from-[#0b0f14] to-[#06080c] border-r border-emerald-500/10">
      {/* ===== BRAND ===== */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <span className="text-xs tracking-[0.3em] font-semibold text-emerald-400">
          GATEVA ADMIN
        </span>
      </div>

      {/* ===== MENU ===== */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
        {menus.map((group, idx) => (
          <div key={idx}>
            <p className="mb-3 px-3 text-[11px] tracking-widest text-white/40">
              {group.section}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isMostUsed = item.path === mostUsedPath;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      relative flex items-center justify-between
                      px-4 py-3 rounded-lg
                      text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_10px_rgba(52,211,153,0.05)]"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }
                    `
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} className="opacity-80" />
                      <span>{item.name}</span>

                      {/* SMART HIGHLIGHT */}
                      {isMostUsed && (
                        <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 animate-pulse">
                          HOT
                        </span>
                      )}
                    </div>

                    {/* BADGE COUNTER (Real-time dari State) */}
                    {item.key && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10">
                        {counters[item.key]}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ===== USER ===== */}
      <div className="px-6 py-5 border-t border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <User size={16} />
          </div>

          <div className="overflow-hidden">
            <p className="text-sm text-white font-medium truncate">Admin Gateva</p>
            <p className="text-[10px] text-white/40 uppercase tracking-tighter">System Administrator</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}