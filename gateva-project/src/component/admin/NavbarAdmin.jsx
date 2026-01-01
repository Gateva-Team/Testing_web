import React from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import navbarData from "./data/navbarAdmin.json";

export default function NavbarAdmin() {
  const { brand, adminName, menu } = navbarData;

  return (
    <nav className="w-full bg-[#1f1f2e] text-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Kiri: Logo */}
      <div className="flex items-center gap-4">
        <img
          src={brand.logo}
          alt="Gateva Logo"
          className="h-10 object-contain"
        />
        <span className="font-bold text-lg">{brand.name}</span>
      </div>

      {/* Menu */}
      <div className="flex gap-6">
        {menu.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="hover:text-[#39ff14] transition font-medium"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Kanan */}
      <div className="flex items-center gap-4">
        {/* Notifikasi */}
        <button className="relative p-2 rounded-full hover:bg-white/10 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Admin */}
        <div className="bg-[#2d2d3e] px-3 py-1 rounded-full text-sm font-medium">
          {adminName}
        </div>
      </div>
    </nav>
  );
}