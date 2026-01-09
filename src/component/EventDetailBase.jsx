import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Layers, ArrowLeft, Ticket } from "lucide-react";

export default function EventDetailBase({
  events,
  backLink,
  categoryKey,
  ctaLabel,
  descriptionTitle,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((e) => String(e.id).trim() === String(id).trim());

  if (!event) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#05080f] text-white">
        <p className="text-white/60">Event tidak ditemukan</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-24 pb-32 bg-gradient-to-b from-[#05080f] via-[#070d18] to-[#05080f] text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:col-span-2 space-y-8">
          {/* TITLE */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {event.title}
            </h1>
            <div className="flex gap-6 mt-4 text-white/60">
              <span className="flex items-center gap-2">
                <MapPin size={16} /> {event.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} /> {event.date}
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <Card className="bg-white/[0.04] border border-white/10 rounded-3xl backdrop-blur-xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-[#7CFF4D] mb-4">
                {descriptionTitle}
              </h2>
              <p className="text-white/70 leading-relaxed text-lg">
                {event.description}
              </p>
            </CardContent>
          </Card>

          {/* INFO GRID */}
          <div className="grid sm:grid-cols-3 gap-6">
            <InfoCard icon={<MapPin />} label="Lokasi" value={event.location} />
            <InfoCard icon={<Calendar />} label="Tanggal" value={event.date} />
            <InfoCard
              icon={<Layers />}
              label="Kategori"
              value={event.category}
            />
          </div>

          {/* BACK BUTTON */}
          <Button
            variant="outline"
            onClick={() => navigate(backLink)}
            className="
              w-fit px-6 py-6 rounded-xl
              border border-white/20
              bg-white/[0.03]
              text-white/80
              hover:bg-white/[0.08]
              hover:text-white
              transition
            "
          >
            <ArrowLeft className="mr-2" size={18} />
            Kembali
          </Button>
        </div>

        {/* ================= RIGHT TICKET ================= */}
        <div className="sticky top-28 h-fit">
          <Card
            className="
              rounded-3xl border
              border-[#7CFF4D]/20
              bg-gradient-to-br
              from-[#0a1222]
              to-[#05080f]
              shadow-[0_0_60px_-20px_rgba(124,255,77,0.4)]
            "
          >
            <CardContent className="p-8 space-y-6">
              <h3 className="text-lg font-semibold text-[#7CFF4D]">
                Detail Harga
              </h3>

              <PriceRow label="Harga Dasar" value={event.price} />
              <PriceRow label="Biaya Platform" value="Rp 2.500" />
              <PriceRow label="Pajak" value="Rp 5.000" />

              <div className="border-t border-white/10 pt-4 text-white flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[#7CFF4D]">{event.price}</span>
              </div>

              {/* CTA */}
                <Button
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        id: event.id,
                        title: event.title,
                        location: event.location,
                        date: event.date,
                        category: event.category,
                        price: event.price,
                        image: event.image,
                      },
                    })
                  }
                  className="w-full py-6 text-lg font-semibold rounded-xl bg-[#7CFF4D] text-black"
                >
                  <Ticket className="mr-2" />
                  {ctaLabel}
                </Button>


              <p className="text-xs text-white/40 text-center">
                * Tiket tidak dapat dikembalikan
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ================= COMPONENT ================= */

function InfoCard({ icon, label, value }) {
  return (
    <Card className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur">
      <CardContent className="p-6 space-y-2">
        <div className="flex items-center gap-2 text-[#7CFF4D]">
          {icon}
          <span className="text-sm">{label}</span>
        </div>
        <p className="text-lg font-semibold text-white">{value}</p>
      </CardContent>
    </Card>
  );
}

function PriceRow({ label, value }) {
  return (
    <div className="flex justify-between text-white/70">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
