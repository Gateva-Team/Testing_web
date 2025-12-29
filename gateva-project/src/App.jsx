import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Navbar
import NavbarUtama from "./component/NavbarUtama.jsx";
import NavbarPublic from "./component/public/NavbarPublic.jsx";
import NavbarAdmin from "./component/admin/NavbarAdmin.jsx";

// Public Pages
import BerandaPublic from "./component/public/BerandaPublic.jsx";
import EventPublic from "./component/public/EventPublic.jsx";
import TentangPublic from "./component/public/TentangPublic.jsx";
import KontakPublic from "./component/public/KontakPublic.jsx";
import Login from "./component/Login.jsx";

// Event Pages
import EventMusikPublic from "./pages/EventMusikPublic.jsx";
import EventSeminarPublic from "./pages/EventSeminarPublic.jsx";
import EventLombaPublic from "./pages/EventLombaPublic.jsx";
import EventWorkshopPublic from "./pages/EventWorkshopPublic.jsx";
import Checkout from "./pages/Checkout.jsx";

// Event Detail
import EventDetailPublic from "./pages/menu/EventDetailMusik.jsx";
import EventDetailSeminar from "./pages/menu/EventDetailSeminar.jsx";
import EventDetailWorkshop from "./pages/menu/EventDetailWorkshop.jsx";
import EventDetailLomba from "./pages/menu/EventDetailLomba.jsx";

// Admin Pages
import AdminDashboard from "./component/admin/DashboardAdmin.jsx";
import DataEventAdmin from "./component/admin/DataEventAdmin.jsx";
import TransaksiAdmin from "./component/admin/TransaksiAdmin.jsx";

export default function App() {
  const location = useLocation();

  // 🔐 Role-based login: null | 'user' | 'admin'
  const [role, setRole] = useState(null);

  // Navbar logic: hide on login page
  const hideNavbar = location.pathname === "/login";

  const renderNavbar = () => {
    if (hideNavbar) return null;
    if (role === "admin") return <NavbarAdmin />;
    if (role === "user") return <NavbarPublic />;
    return <NavbarUtama />;
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* Navbar */}
      {renderNavbar()}

      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<BerandaPublic />} />
        <Route path="/event" element={<EventPublic />} />
        <Route path="/tentang" element={<TentangPublic />} />
        <Route path="/kontak" element={<KontakPublic />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login setIsLoggedIn={setRole} />} />

        {/* EVENT CATEGORY */}
        <Route path="/event/musik" element={<EventMusikPublic />} />
        <Route path="/event/seminar" element={<EventSeminarPublic />} />
        <Route path="/event/lomba" element={<EventLombaPublic />} />
        <Route path="/event/workshop" element={<EventWorkshopPublic />} />

        {/* EVENT DETAIL */}
        <Route path="/event/:id" element={<EventDetailPublic />} />
        <Route path="/seminar/:id" element={<EventDetailSeminar />} />
        <Route path="/workshop/:id" element={<EventDetailWorkshop />} />
        <Route path="/lomba/:id" element={<EventDetailLomba />} />

        {/* CHECKOUT */}
        <Route path="/checkout" element={<Checkout />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/data-event"
          element={
            role === "admin" ? <DataEventAdmin /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/transaksi"
          element={
            role === "admin" ? <TransaksiAdmin /> : <Navigate to="/login" />
          }
        />

        {/* Catch-all: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
