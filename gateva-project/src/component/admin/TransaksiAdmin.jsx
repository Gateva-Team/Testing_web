import React from "react";
import transaksiData from "./data/transaksiAdmin.json";

export default function TransaksiAdmin() {
  return (
    <div className="p-8 min-h-screen bg-linear-to-br from-[#0a0a12] to-[#1a1a2e] text-white">
      <h1 className="text-3xl font-bold mb-6">Transaksi</h1>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-2 px-4 text-white/70">ID</th>
              <th className="py-2 px-4 text-white/70">User</th>
              <th className="py-2 px-4 text-white/70">Event</th>
              <th className="py-2 px-4 text-white/70">Amount</th>
              <th className="py-2 px-4 text-white/70">Status</th>
              <th className="py-2 px-4 text-white/70">Date</th>
            </tr>
          </thead>

          <tbody>
            {transaksiData.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-white/10 hover:bg-white/10 transition"
              >
                <td className="py-2 px-4">{tx.id}</td>
                <td className="py-2 px-4">{tx.user}</td>
                <td className="py-2 px-4">{tx.event}</td>
                <td className="py-2 px-4">
                  Rp {tx.amount.toLocaleString("id-ID")}
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      tx.status === "Selesai"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="py-2 px-4">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}