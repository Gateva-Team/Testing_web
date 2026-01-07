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

// Dummy counter (bisa diganti dari API / JSON)
const counters = {
  event: 12,
  transaksi: 248,
};

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usage, setUsage] = useState(() => {
    return JSON.parse(localStorage.getItem("menu-usage") || "{}");
  });

  /* =====================
     SMART TRACKING
  ===================== */
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
      <nav className="flex-1 px-4 py-6 space-y-8">
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
                      transition-colors duration-150
                      ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
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
                        <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400">
                          HOT
                        </span>
                      )}
                    </div>

                    {/* BADGE COUNTER */}
                    {item.key && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/60">
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
          <div className="h-9 w-9 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
            <User size={16} />
          </div>

          <div>
            <p className="text-sm text-white font-medium">Admin Gateva</p>
            <p className="text-xs text-white/50">System Administrator</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
