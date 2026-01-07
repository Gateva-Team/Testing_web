import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Bot, Bell, LayoutDashboard } from "lucide-react";

import SidebarAdmin from "./SidebarAdmin";
import AIChatPanel from "./AIChatPanel";

export default function AdminLayout() {
  const [openAI, setOpenAI] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-[#070a0f] text-white">
      {/* ================= SIDEBAR (FIXED) ================= */}
      <aside className="w-[260px] h-screen shrink-0 bg-gradient-to-b from-[#0b0f14] to-[#070a0f] border-r border-emerald-500/10">
        <SidebarAdmin />
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ================= TOP BAR ================= */}
        <header className="h-16 shrink-0 flex items-center justify-between px-8 bg-[#070a0f] border-b border-emerald-500/10">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-emerald-400" size={20} />
            <span className="text-sm tracking-wide text-white/80">
              Gateva Admin Dashboard
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-white/70 hover:text-emerald-400 transition">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
            </button>

            <span className="text-xs text-white/50">Admin Panel</span>
          </div>
        </header>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <main className="flex-1 overflow-y-auto bg-[#070a0f]">
          <div className="px-10 py-8 w-full min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ================= AI FLOAT BUTTON ================= */}
      <button
        onClick={() => setOpenAI(true)}
        className="
          fixed bottom-6 right-6 z-50
          flex items-center gap-3
          px-5 py-3 rounded-xl
          bg-[#0b0f14]
          border border-emerald-400/40
          text-emerald-400
          shadow-lg shadow-emerald-500/10
          hover:bg-emerald-400/10
          transition-all
        "
      >
        <Bot size={18} />
        <span className="text-sm font-medium">AI Insight</span>
      </button>

      <AIChatPanel open={openAI} onClose={() => setOpenAI(false)} />
    </div>
  );
}
