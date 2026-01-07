import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, X, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import eventData from "./data/events.json";

// Countdown helper
const calculateCountdown = (dateStr) => {
  const now = new Date();
  const eventDate = new Date(dateStr);
  const diff = eventDate - now;
  if (diff <= 0) return "Event berlangsung!";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Ticket progress helper
const getTicketProgress = (tickets) => {
  if (!tickets) return 0;
  return Math.min(Math.max(tickets / 100, 0), 1);
};

export default function BerandaUser() {
  const { header, categories, events } = eventData;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [countdowns, setCountdowns] = useState({});
  const controls = useAnimation();

  // Update countdown tiap detik
  useEffect(() => {
    const updateCountdowns = () => {
      const updated = {};
      events.forEach((e) => {
        updated[e.title] = calculateCountdown(e.date);
      });
      setCountdowns(updated);
    };
    updateCountdowns();
    const timer = setInterval(updateCountdowns, 1000);
    return () => clearInterval(timer);
  }, [events]);

  // Filter events
  useEffect(() => {
    const filtered = events.filter(
      (e) =>
        (selectedCategory === "Semua" || e.category === selectedCategory) &&
        (searchTerm === "" ||
          e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm, events]);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  // Animate sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start({ opacity: 1, y: 0 });
        });
      },
      { threshold: 0.2 }
    );
    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => observer.observe(section));
  }, [controls]);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero */}
      <section className="relative w-full h-[65vh] overflow-hidden">
        <motion.img
          src={header.image}
          alt="Banner Event"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
          animate={{ y: ["0%", "-5%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-[44px] md:text-5xl font-extrabold text-white"
          >
            {header.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mt-4 text-white/70 text-lg md:text-xl"
          >
            {header.highlight}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <Button className="mt-6 bg-[#39ff14] text-black px-6 py-3 hover:bg-[#32cc11] transition-colors">
              Jelajahi Event
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="py-6 px-6 max-w-[1200px] mx-auto fade-in-section">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
            <Input
              placeholder="Cari event, lokasi, tanggal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 py-3 bg-white/10 border border-[#39ff14] rounded-full text-white placeholder-white/50 focus:ring-2 focus:ring-[#39ff14] focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-3 md:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#39ff14] text-black shadow-md"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Event Grid */}
      <motion.section
        className="py-10 px-6 max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 fade-in-section"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        {filteredEvents.map((event) => {
          const badge = event.badge || null;
          const ticketsLeft = event.tickets ?? 50;
          const ticketProgress = getTicketProgress(ticketsLeft);

          return (
            <motion.div
              key={event.title}
              whileHover={{ scale: 1.06, rotate: 0.5 }}
              className="cursor-pointer relative"
              onClick={() => handleOpenModal(event)}
            >
              <Card className="bg-white/5 border border-white/10 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <CardContent>
                  <div className="flex justify-between items-center mb-2 relative">
                    {badge && (
                      <Badge className="bg-red-500 px-2 text-xs animate-pulse relative z-10">
                        {badge}
                      </Badge>
                    )}
                    <span className="text-[#39ff14] text-xs font-semibold">
                      {event.category}
                    </span>
                  </div>
                  <CardTitle className="text-white truncate">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-white/60 text-sm truncate">
                    {event.date} • {event.location}
                  </CardDescription>

                  <div className="mt-2 flex justify-between items-center relative group">
                    <span className="text-[#39ff14] font-semibold">
                      {event.price}
                    </span>
                    <div className="flex flex-col items-end text-xs text-white/60 gap-1">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {countdowns[event.title]}
                      </div>
                      <div className="text-white/60 text-[10px]">
                        Tersisa {ticketsLeft} tiket
                      </div>
                    </div>
                    <div className="absolute bottom-full left-0 w-full h-2 mt-1 bg-white/20 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                      <div
                        className="h-2 bg-[#39ff14] rounded-full"
                        style={{ width: `${ticketProgress * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Event Mendatang */}
      <section className="py-10 px-6 max-w-[1400px] mx-auto bg-white/5 rounded-2xl fade-in-section">
        <h2 className="text-2xl font-bold text-white mb-6">Event Mendatang</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 8)
            .map((event) => (
              <motion.div
                key={event.title}
                whileHover={{ scale: 1.05, rotate: 0.5 }}
                className="cursor-pointer"
                onClick={() => handleOpenModal(event)}
              >
                <Card className="bg-white/5 border border-white/10 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <CardContent>
                    <div className="flex justify-between items-center mb-2 relative group">
                      <Badge className="bg-[#39ff14] px-2 text-xs shadow-glow relative z-10">
                        Tersisa {event.tickets} tiket
                      </Badge>
                      <span className="text-[#39ff14] text-xs font-semibold">
                        {event.category}
                      </span>
                    </div>
                    <CardTitle className="text-white truncate">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-white/60 text-sm truncate">
                      {event.date} • {event.location}
                    </CardDescription>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-[#39ff14] font-semibold">
                        {event.price}
                      </span>
                      <div className="flex flex-col items-end text-xs text-white/60 gap-1">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {countdowns[event.title]}
                        </div>
                        <div className="text-white/60 text-[10px]">
                          Tersisa {event.tickets} tiket
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 px-6 max-w-[1200px] mx-auto fade-in-section">
        <h2 className="text-2xl font-bold text-white mb-6">FAQ</h2>
        <div className="space-y-2">
          {[
            {
              question: "Bagaimana cara membeli tiket?",
              answer:
                "Pilih event yang kamu inginkan, klik 'Beli Tiket Sekarang' dan ikuti langkah pembayaran.",
            },
            {
              question: "Apakah tiket bisa dibatalkan?",
              answer:
                "Tergantung kebijakan event, sebagian tiket bisa dibatalkan sebelum tanggal tertentu.",
            },
            {
              question: "Bagaimana jika lupa email login?",
              answer:
                "Gunakan fitur 'Lupa Email' di halaman login untuk mereset akses akun.",
            },
            {
              question: "Apakah ada diskon untuk mahasiswa?",
              answer:
                "Ya, beberapa event menawarkan harga khusus mahasiswa. Periksa detail event masing-masing.",
            },
          ].map((faq, idx) => (
            <AccordionItem key={idx} faq={faq} />
          ))}
        </div>
      </section>

      {/* Modal Detail Event */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        {selectedEvent && (
          <DialogContent className="max-w-3xl bg-[#0c0c16] rounded-2xl animate-fadeIn">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {selectedEvent.title}
              </DialogTitle>
              <DialogClose className="absolute top-3 right-3">
                <X size={20} />
              </DialogClose>
            </DialogHeader>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="p-6 text-white/90">
              <p>{selectedEvent.description}</p>
              <div className="mt-4 flex justify-between text-sm">
                <span>{selectedEvent.date}</span>
                <span>{selectedEvent.location}</span>
              </div>
              <div className="mt-4 font-semibold text-[#39ff14] text-lg">
                {selectedEvent.price}
              </div>
              <div className="text-white/60 text-sm mt-1">
                Tersisa {selectedEvent.tickets} tiket
              </div>
              <Button className="mt-4 bg-[#39ff14] w-full hover:bg-[#32cc11] transition-colors">
                Beli Tiket Sekarang
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#0a0a0f] py-10 border-t border-white/10 text-white/70">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
          <div>
            <h4 className="text-[#39ff14] font-bold mb-2 text-lg">Gateva</h4>
            <p className="text-sm">Platform tiket event cerdas berbasis AI.</p>
            <p className="mt-2 text-white/50 text-xs">
              © 2026 Gateva. All rights reserved.
            </p>
          </div>
          <div>
            <h4 className="text-[#39ff14] font-bold mb-2 text-lg">Menu</h4>
            <ul className="text-sm space-y-1">
              <li>
                <Link className="hover:text-[#39ff14] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#39ff14] transition-colors">
                  Event
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#39ff14] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#39ff14] transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#39ff14] font-bold mb-2 text-lg">
              Kategori Event
            </h4>
            <ul className="text-sm space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <span className="hover:text-[#39ff14] transition-colors cursor-pointer">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#39ff14] font-bold mb-2 text-lg">
              Newsletter
            </h4>
            <div className="flex gap-2">
              <Input
                placeholder="Email"
                className="bg-white/10 text-white placeholder-white/50 border-none focus:ring-2 focus:ring-[#39ff14]"
              />
              <Button className="bg-[#39ff14] hover:bg-[#32cc11] transition-colors">
                <Mail />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Accordion item component for FAQ
const AccordionItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-3 cursor-pointer">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center"
      >
        <h3 className="font-medium text-white">{faq.question}</h3>
        <span>{open ? "-" : "+"}</span>
      </div>
      {open && <p className="text-white/70 mt-2">{faq.answer}</p>}
    </div>
  );
};
