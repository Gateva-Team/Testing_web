import React from "react";

export default function DataEventAdmin() {
  const events = [
    {
      id: 1,
      name: "Konser Jazz",
      category: "Musik",
      date: "2025-12-20",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Seminar AI",
      category: "Seminar",
      date: "2025-12-22",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Workshop UI/UX",
      category: "Workshop",
      date: "2025-12-25",
      status: "Pending",
    },
    {
      id: 4,
      name: "Lomba Coding",
      category: "Lomba",
      date: "2025-12-28",
      status: "Aktif",
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#0a0a12] to-[#1a1a2e] text-white">
      <h1 className="text-3xl font-bold mb-6">Data Event</h1>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-2 px-4 text-white/70">ID</th>
              <th className="py-2 px-4 text-white/70">Event Name</th>
              <th className="py-2 px-4 text-white/70">Category</th>
              <th className="py-2 px-4 text-white/70">Date</th>
              <th className="py-2 px-4 text-white/70">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-white/10 hover:bg-white/10 transition"
              >
                <td className="py-2 px-4">{event.id}</td>
                <td className="py-2 px-4">{event.name}</td>
                <td className="py-2 px-4">{event.category}</td>
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
  );
}
