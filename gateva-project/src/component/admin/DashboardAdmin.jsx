import React from "react";
import dashboardData from "./data/dashboardAdmin.json";

export default function DashboardAdmin() {
  const { stats, recentEvents, transaksiBulanan } = dashboardData;

  return (
    <div className="min-h-screen p-8 bg-black text-white font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-wide">
          Admin<span className="text-[#39ff14]">Panel</span>
        </h1>
        <p className="text-white/50 text-sm">
          {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-white/5 border border-[#39ff14]/30"
          >
            <p className="text-sm text-white/60">{stat.title}</p>
            <p className="text-3xl font-semibold mt-3 text-[#39ff14]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* GRAFIK */}
      <div className="p-6 mb-12 rounded-xl bg-white/5 border border-[#39ff14]/30">
        <h2 className="text-xl font-semibold mb-6">
          Grafik Transaksi Bulanan
        </h2>

        <div className="flex items-end gap-4 h-48">
          {transaksiBulanan.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <span className="text-xs text-[#39ff14] mb-2">
                {item.value}
              </span>
              <div
                className="w-full rounded-lg bg-[#39ff14]"
                style={{ height: `${item.value * 3}px` }}
              />
              <span className="text-xs text-white/60 mt-3">
                {item.bulan}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="p-6 rounded-xl bg-white/5 border border-[#39ff14]/30">
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#39ff14]/30">
                <th className="py-3 px-4 text-left text-white/60">ID</th>
                <th className="py-3 px-4 text-left text-white/60">Event Name</th>
                <th className="py-3 px-4 text-left text-white/60">Date</th>
                <th className="py-3 px-4 text-left text-white/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-3 px-4">{event.id}</td>
                  <td className="py-3 px-4">{event.name}</td>
                  <td className="py-3 px-4">{event.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        event.status === "Aktif"
                          ? "bg-[#39ff14]/20 text-[#39ff14]"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}