import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

/* NAVBAR */
import NavbarUtama from "./component/NavbarUtama.jsx";
import NavbarPublic from "./component/public/NavbarPublic.jsx";

/* PUBLIC */
import BerandaPublic from "./component/public/BerandaPublic.jsx";
import BerandaUser from "./component/public/BerandaUserPublic.jsx";
import EventPublic from "./component/public/EventPublic.jsx";
import TentangPublic from "./component/public/TentangPublic.jsx";
import KontakPublic from "./component/public/KontakPublic.jsx";
import Login from "./component/Login.jsx";

/* EVENT */
import EventMusikPublic from "./pages/EventMusikPublic.jsx";
import EventSeminarPublic from "./pages/EventSeminarPublic.jsx";
import EventLombaPublic from "./pages/EventLombaPublic.jsx";
import EventWorkshopPublic from "./pages/EventWorkshopPublic.jsx";

import EventDetailMusik from "./pages/menu/EventDetailMusik.jsx";
import EventDetailSeminar from "./pages/menu/EventDetailSeminar.jsx";
import EventDetailLomba from "./pages/menu/EventDetailLomba.jsx";
import EventDetailWorkshop from "./pages/menu/EventDetailWorkshop.jsx";

import Checkout from "./pages/Checkout.jsx";

/* ADMIN */
import AdminLayout from "./component/admin/AdminLayout.jsx";
import AdminDashboard from "./component/admin/DashboardAdmin.jsx";
import DataEventAdmin from "./component/admin/DataEventAdmin.jsx";
import TransaksiAdmin from "./component/admin/TransaksiAdmin.jsx";

/* EXTRA */
import Sambutan from "./component/sambutan.jsx";
import NotFound404 from "./component/NotFound404.jsx";

export default function App() {
  const [role, setRole] = useState(null);
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/splash" ||
    location.pathname === "/404";

  const renderNavbar = () => {
    if (hideNavbar) return null;
    if (role === "admin") return null;
    if (role === "user") return <NavbarPublic />;
    return <NavbarUtama />;
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {renderNavbar()}

      <Routes>
        {/* SPLASH */}
        <Route path="/splash" element={<Sambutan />} />

        {/* REDIRECT AWAL */}
        <Route path="/" element={<Navigate to="/splash" replace />} />

        {/* PUBLIC */}
        <Route path="/home" element={<BerandaPublic />} />
        <Route path="/event" element={<EventPublic />} />
        <Route path="/tentang" element={<TentangPublic />} />
        <Route path="/kontak" element={<KontakPublic />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login setRole={setRole} />} />

        {/* USER */}
        <Route
          path="/beranda-user"
          element={role === "user" ? <BerandaUser /> : <Navigate to="/login" />}
        />

        {/* EVENT */}
        <Route path="/event/musik" element={<EventMusikPublic />} />
        <Route path="/event/seminar" element={<EventSeminarPublic />} />
        <Route path="/event/lomba" element={<EventLombaPublic />} />
        <Route path="/event/workshop" element={<EventWorkshopPublic />} />

        <Route path="/event/musik/:id" element={<EventDetailMusik />} />
        <Route path="/event/seminar/:id" element={<EventDetailSeminar />} />
        <Route path="/event/lomba/:id" element={<EventDetailLomba />} />
        <Route path="/event/workshop/:id" element={<EventDetailWorkshop />} />

        <Route path="/checkout" element={<Checkout />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            role === "admin" ? <AdminLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="data-event" element={<DataEventAdmin />} />
          <Route path="transaksi" element={<TransaksiAdmin />} />
        </Route>

        {/* 404 — HARUS PALING BAWAH */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}
