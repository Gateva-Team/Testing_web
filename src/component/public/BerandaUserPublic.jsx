//wibson update 2025-01-08
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const AccordionItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-5 cursor-pointer group">
      <div onClick={() => setOpen(!open)} className="flex justify-between items-center">
        <h3 className={`font-medium transition-colors ${open ? "text-[#39ff14]" : "text-white group-hover:text-white/80"}`}>
          {faq.question}
        </h3>
        <span className="text-white text-xl">{open ? "-" : "+"}</span>
      </div>
      {open && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-white/60 mt-3 text-sm"
        >
          {faq.answer}
        </motion.p>
      )}
    </div>
  );
};

const calculateCountdown = (dateStr) => {
  if (!dateStr) return "Waktu TBD";
  const now = new Date();
  const eventDate = new Date(dateStr);
  if (isNaN(eventDate.getTime())) return "Waktu TBD";
  const diff = eventDate - now;
  if (diff <= 0) return "Event berlangsung!";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export default function BerandaUser() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories] = useState(["Semua", "Musik", "Seminar", "Workshop", "Lomba"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [countdowns, setCountdowns] = useState({});

  const loadEvents = () => {
    fetch("https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events")
      .then((res) => res.json())
      .then((data) => {
        const validData = data.filter(e => e.title && !e.title.includes("title"));
        const normalized = validData.map((e) => ({
          ...e,
          id: e.id,
          title: e.title || "Event Tanpa Nama",
          category: e.category || "Lainnya",
          location: e.location || "Lokasi TBD",
          price: isNaN(e.price) ? e.price : `Rp ${Number(e.price).toLocaleString('id-ID')}`,
          image: e.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
          badge: new Date(e.date) <= new Date() ? "Sedang Berlangsung" : "Upcoming",
        }));
        setEvents(normalized);
        setFilteredEvents(normalized);
      });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = {};
      events.forEach((e) => {
        updated[e.id] = calculateCountdown(e.date);
      });
      setCountdowns(updated);
    }, 1000);
    return () => clearInterval(timer);
  }, [events]);

  useEffect(() => {
    const filtered = events.filter((e) => {
      const matchCat = selectedCategory === "Semua" || e.category === selectedCategory;
      const matchSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm, events]);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleGoToCheckout = () => {
    if (selectedEvent) {
      if (Number(selectedEvent.tickets) <= 0) {
        alert("Maaf, tiket sudah habis!");
        return;
      }
      // pemrosesan API pindah ke CheckoutPublic
      navigate("/checkout", {
        state: {
          id: selectedEvent.id,
          title: selectedEvent.title,
          location: selectedEvent.location,
          date: selectedEvent.date,
          category: selectedEvent.category,
          price: selectedEvent.price,
          image: selectedEvent.image,
          tickets: selectedEvent.tickets
        },
      });
      setOpenModal(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#39ff14] selection:text-black">
      <section className="relative w-full h-[50vh] flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-green-900/20 to-black">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white mb-4">
          JELAJAHI <span className="text-[#39ff14]">EVENT</span> CERDAS
        </motion.h1>
        <p className="text-white/60 text-lg max-w-2xl">Temukan Seminar, Musik, dan Workshop terbaik dengan dukungan AI.</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <Input placeholder="Cari event, lokasi, tanggal..." className="bg-[#111] border-white/10 rounded-full pl-12 h-12 focus:border-[#39ff14] transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat ? "bg-[#39ff14] text-black" : "bg-[#1a1a1a] text-white/60 hover:bg-[#252525]"}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <div className="w-2 h-8 bg-[#39ff14] rounded-full"></div>
          Event Pilihan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.length > 0 ? (
            (selectedCategory === "Semua" ? filteredEvents.slice(0, 10) : filteredEvents).map((event) => (
              <motion.div key={event.id} whileHover={{ y: -10 }} onClick={() => handleOpenModal(event)} className="group cursor-pointer">
                <Card className="bg-[#111] border-white/10 overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Badge className={`absolute top-3 left-3 ${event.badge === "Sedang Berlangsung" ? "bg-red-500" : "bg-blue-600"}`}>{event.badge}</Badge>
                  </div>
                  <CardContent className="p-5 flex-grow">
                    <p className="text-[#39ff14] text-xs font-bold uppercase tracking-widest mb-2">{event.category}</p>
                    <CardTitle className="text-white text-lg line-clamp-1 mb-1">{event.title}</CardTitle>
                    <CardDescription className="text-white/40 text-xs mb-4">{event.date} • {event.location}</CardDescription>
                    <div className="flex justify-between items-end mt-auto">
                      <div><p className="text-white/40 text-[10px] uppercase">Harga</p><p className="text-[#39ff14] font-bold">{event.price}</p></div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[10px] text-white/60 mb-1"><Clock size={10} /> {countdowns[event.id] || "Loading..."}</div>
                        <p className="text-white/40 text-[10px]">Tersisa {event.tickets} tiket</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (<div className="col-span-full py-20 text-center text-white/20">Loading...</div>)}
        </div>
      </main>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <div className="w-2 h-8 bg-[#39ff14] rounded-full"></div>
          Event Mendatang
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.length > 0 ? (
            (selectedCategory === "Semua" ? filteredEvents.slice(0, 4) : filteredEvents).map((event) => (
              <motion.div key={event.id} whileHover={{ y: -10 }} onClick={() => handleOpenModal(event)} className="group cursor-pointer">
                <Card className="bg-[#111] border-white/10 overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <Badge className="absolute top-3 left-3 bg-white text-black hover:bg-white/90 border-none font-bold">COMING SOON</Badge>
                  </div>
                  <CardContent className="p-5 flex-grow flex flex-col">
                    <p className="text-[#39ff14] text-xs font-bold uppercase tracking-widest mb-2">{event.category}</p>
                    <CardTitle className="text-white text-lg line-clamp-1 mb-1">{event.title}</CardTitle>
                    <CardDescription className="text-white/40 text-xs mb-4">{event.date} • {event.location}</CardDescription>
                    <div className="flex justify-between items-end mt-auto">
                      <div><p className="text-white/40 text-[10px] uppercase">Harga</p><p className="text-[#39ff14] font-bold">{event.price}</p></div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[10px] text-white/60 mb-1"><Clock size={10} /> {countdowns[event.id] || "Loading..."}</div>
                        <p className="text-white/40 text-[10px]">Tersisa {event.tickets} tiket</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (<div className="col-span-full py-20 text-center text-white/20">Loading...</div>)}
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold mb-10">FAQ</h2>
        <div className="space-y-2">
          {[
            { question: "Bagaimana cara membeli tiket?", answer: "Pilih event, klik beli tiket, dan lakukan pembayaran melalui e-wallet atau bank transfer." },
            { question: "Apakah tiket bisa dibatalkan?", answer: "Pembatalan tiket bergantung pada kebijakan masing-masing penyelenggara event." },
            { question: "Bagaimana jika lupa email login?", answer: "Silakan hubungi pusat bantuan kami dengan melampirkan bukti transaksi terakhir." },
            { question: "Apakah ada diskon untuk mahasiswa?", answer: "Beberapa event menyediakan harga khusus mahasiswa dengan verifikasi kartu tanda mahasiswa." }
          ].map((faq, i) => (<AccordionItem key={i} faq={faq} />))}
        </div>
      </section>

      <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-[#39ff14] text-2xl font-black">Gateva</h3>
            <p className="text-white/40 text-sm leading-relaxed">Platform tiket event cerdas berbasis AI.</p>
            <p className="text-white/20 text-xs mt-4">© 2026 Gateva. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Menu</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link to="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/event" className="hover:text-white transition-colors">Event</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/kontak" className="hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Kategori Event</h4>
            <ul className="space-y-3 text-sm text-white/40">
              {categories.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Newsletter</h4>
            <div className="flex gap-2">
              <Input placeholder="Email" className="bg-[#111] border-none focus:ring-1 focus:ring-[#39ff14]" />
              <Button className="bg-[#39ff14] hover:bg-[#32cc11] text-black"><Mail size={18} /></Button>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        {selectedEvent && (
          <DialogContent className="bg-[#0f0f0f] border-white/10 text-white max-w-xl rounded-2xl overflow-hidden p-0">
            <img src={selectedEvent.image} className="w-full h-60 object-cover" alt="Detail" />
            <div className="p-6">
              <Badge className="bg-[#39ff14] text-black mb-3">{selectedEvent.category}</Badge>
              <DialogTitle className="text-2xl font-bold mb-2">{selectedEvent.title}</DialogTitle>
              <p className="text-white/60 text-sm mb-6">{selectedEvent.description || "Nikmati pengalaman event terbaik bersama Gateva."}</p>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl mb-6">
                <div><p className="text-[10px] text-white/40 uppercase">Harga Tiket</p><p className="text-[#39ff14] font-bold text-xl">{selectedEvent.price}</p></div>
                <div className="text-right"><p className="text-[10px] text-white/40 uppercase">Sisa Tiket</p><p className="font-bold">{selectedEvent.tickets} Tiket</p></div>
              </div>
              <Button onClick={handleGoToCheckout} className="w-full bg-[#39ff14] text-black font-bold h-12 rounded-xl hover:scale-[1.02] transition-transform">Beli Tiket Sekarang</Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}