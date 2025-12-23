import React from "react";
import { Bell } from "lucide-react"; // icon notifikasi
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  const adminName = "Admin Gateva";

  return (
    <nav className="w-full bg-[#1f1f2e] text-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Kiri: Logo */}
      <div className="flex items-center gap-4">
        <img
          src="/src/assets/Gateva-ver1.png"
          alt="Gateva Logo"
          className="h-10 object-contain"
        />
        <span className="font-bold text-lg">Gateva Admin</span>
      </div>

      {/* Tengah/Kiri: Menu */}
      <div className="flex gap-6">
        <Link
          to="/admin/dashboard"
          className="hover:text-[#39ff14] transition font-medium"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/data-event"
          className="hover:text-[#39ff14] transition font-medium"
        >
          Data Event
        </Link>
        <Link
          to="/admin/transaksi"
          className="hover:text-[#39ff14] transition font-medium"
        >
          Transaksi
        </Link>
      </div>

      {/* Kanan: Notifikasi & Admin */}
      <div className="flex items-center gap-4">
        {/* Notifikasi */}
        <button className="relative p-2 rounded-full hover:bg-white/10 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Nama Admin */}
        <div className="flex items-center gap-2">
          <div className="bg-[#2d2d3e] px-3 py-1 rounded-full text-sm font-medium">
            {adminName}
          </div>
        </div>
      </div>
    </nav>
  );
}
