import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  CalendarDays,
  Ticket,
  Sparkles,
  Flame,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import eventData from "./data/events.json";

/* ================= AI UTILS ================= */
const intentMap = {
  musik: "Musik",
  konser: "Musik",
  seminar: "Seminar",
  workshop: "Workshop",
  lomba: "Lomba",
};

const detectIntent = (query) => {
  const q = query.toLowerCase();
  return Object.keys(intentMap).find((k) => q.includes(k))
    ? intentMap[Object.keys(intentMap).find((k) => q.includes(k))]
    : null;
};

const getCountdown = (date) => {
  const diff = Math.ceil(
    (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (diff <= 0) return "Hari ini";
  if (diff <= 3) return `H-${diff}`;
  if (diff <= 7) return "H-7";
  return `${diff} hari lagi`;
};

/* ================= MAIN ================= */
export default function EventPublic() {
  const navigate = useNavigate();
  const { header, categories, events } = eventData;

  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const aiCategory = detectIntent(search);

  const filteredEvents = useMemo(() => {
    let data = events;

    if (aiCategory) data = data.filter((e) => e.category === aiCategory);
    if (selectedCategory !== "Semua")
      data = data.filter((e) => e.category === selectedCategory);

    if (search)
      data = data.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.location.toLowerCase().includes(search.toLowerCase())
      );

    return data;
  }, [events, search, selectedCategory, aiCategory]);

  const getDetailRoute = (category) => {
    switch (category) {
      case "Musik":
        return "/event/musik/detail";
      case "Seminar":
        return "/event/seminar/detail";
      case "Workshop":
        return "/event/workshop/detail";
      case "Lomba":
        return "/event/lomba/detail";
      default:
        return "/event/detail";
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-black text-white px-6 py-28 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-40%] left-[-10%] w-[600px] h-[600px] bg-[#39ff14]/10 blur-[300px]" />
        <div className="absolute bottom-[-35%] right-[-10%] w-[700px] h-[700px] bg-violet-600/20 blur-[360px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="text-[#39ff14] tracking-[0.35em] text-sm uppercase mb-4">
            {header.subtitle}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {header.title} <br />
            <span className="text-[#39ff14]">{header.highlight}</span>
          </h1>
          <p className="mt-6 text-white/60">{header.description}</p>
        </div>

        {/* SEARCH */}
        <div className="max-w-xl space-y-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#39ff14]"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari musik, seminar, workshop..."
              className="pl-12 rounded-full bg-white/5 border-white/15 text-white placeholder:text-white/40"
            />
          </div>

          {aiCategory && (
            <Badge className="bg-[#39ff14]/20 text-[#39ff14] border-none">
              <Sparkles size={12} className="mr-1" />
              AI mendeteksi minat: {aiCategory}
            </Badge>
          )}
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <Button
              key={i}
              variant="ghost"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-6 font-semibold transition
                ${
                  selectedCategory === cat
                    ? "bg-[#39ff14] text-black"
                    : "border border-[#39ff14]/40 text-[#39ff14] hover:bg-[#39ff14]/20"
                }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* EVENT GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredEvents.map((event, i) => (
            <Card
              key={i}
              className="bg-white/5 border border-white/10 rounded-3xl hover:border-[#39ff14]/40 transition"
            >
              {/* ⚠️ PENTING: PAKSA WARNA TEXT */}
              <CardContent className="p-6 flex flex-col h-full text-white">
                <div className="flex gap-2 mb-4">
                  <Badge className="bg-[#39ff14]/20 text-[#39ff14] border-none">
                    {event.category}
                  </Badge>
                  {event.trending && (
                    <Badge className="bg-rose-500/20 text-rose-400 border-none">
                      <Flame size={12} className="mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold mb-3 text-white">{event.title}</h3>

                <div className="text-sm text-white/60 space-y-2 mb-6">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} /> {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={14} /> {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={14} /> {getCountdown(event.date)}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  <p className="flex justify-between text-sm text-white/70">
                    <span className="flex items-center gap-2">
                      <Ticket size={14} /> Harga
                    </span>
                    <span className="text-[#39ff14] font-semibold">
                      Rp {event.price}
                    </span>
                  </p>

                  <Button
                    onClick={() =>
                      navigate(getDetailRoute(event.category), {
                        state: event,
                      })
                    }
                    className="rounded-full bg-[#39ff14] text-black hover:brightness-110"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
