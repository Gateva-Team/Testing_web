import React from "react";

export default function AdminDashboard() {
  // Data statis contoh
  const stats = [
    { title: "Total Event", value: 128, color: "text-[#39ff14]" },
    { title: "Total Transaksi", value: 560, color: "text-[#4f46e5]" },
    { title: "Total User", value: 1020, color: "text-[#facc15]" },
  ];

  const recentEvents = [
    { id: 1, name: "Konser Musik Jazz", date: "2025-12-20", status: "Aktif" },
    { id: 2, name: "Seminar AI", date: "2025-12-22", status: "Aktif" },
    {
      id: 3,
      name: "Workshop Design UI/UX",
      date: "2025-12-25",
      status: "Pending",
    },
    { id: 4, name: "Lomba Coding", date: "2025-12-28", status: "Aktif" },
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#0a0a12] to-[#1a1a2e] text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-white/60">{new Date().toLocaleDateString()}</p>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex flex-col justify-between"
          >
            <p className="text-sm font-medium text-white/70">{stat.title}</p>
            <p className={`text-2xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* DUMMY GRAPH */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-10 shadow-lg border border-white/20">
        <h2 className="text-xl font-semibold mb-4">Grafik Transaksi Bulanan</h2>
        <div className="flex items-end gap-3 h-40">
          <div className="flex-1 h-20 bg-[#39ff14]/40 rounded-xl"></div>
          <div className="flex-1 h-32 bg-[#4f46e5]/40 rounded-xl"></div>
          <div className="flex-1 h-24 bg-[#facc15]/40 rounded-xl"></div>
          <div className="flex-1 h-28 bg-[#39ff14]/40 rounded-xl"></div>
          <div className="flex-1 h-16 bg-[#4f46e5]/40 rounded-xl"></div>
          <div className="flex-1 h-36 bg-[#facc15]/40 rounded-xl"></div>
        </div>
      </div>

      {/* RECENT EVENTS TABLE */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-2 px-4 text-white/70">ID</th>
                <th className="py-2 px-4 text-white/70">Event Name</th>
                <th className="py-2 px-4 text-white/70">Date</th>
                <th className="py-2 px-4 text-white/70">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-white/10 hover:bg-white/10 transition"
                >
                  <td className="py-2 px-4">{event.id}</td>
                  <td className="py-2 px-4">{event.name}</td>
                  <td className="py-2 px-4">{event.date}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        event.status === "Aktif"
                          ? "bg-green-500/20 text-green-400"
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
