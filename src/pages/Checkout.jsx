import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MessageCircle } from "lucide-react";

export default function CheckoutPublic() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!state) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#05080f]">
        <p className="text-white/60">Data checkout tidak ditemukan</p>
      </section>
    );
  }

  const basePrice = Number(String(state.price).replace(/[^\d]/g, ""));
  const platformFee = 2500;
  const tax = 5000;
  const total = useMemo(() => basePrice + platformFee + tax, [basePrice]);
  const rupiah = (v) => `Rp ${v.toLocaleString("id-ID")}`;

  const handlePhoneChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.startsWith("0")) v = "62" + v.slice(1);
    setPhone(v);
  };

  const handleCheckout = async () => {
    if (!name || !phone) return;
    setIsProcessing(true);

    try {
      // Ambil Tanggal Real-time 
      const now = new Date();
      const formattedDate = now.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Transaksi API Simpan Nama asli & Tanggal saat ini
      await fetch("https://694d8c8ead0f8c8e6e20ef39.mockapi.io/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: name,        // Mengambil input nama asli
          event: state.title,
          status: "Success",
          date: formattedDate, // Tanggal real-time saat checkout
          total: rupiah(total)
        }),
      });

      // Update events di MockAPI 
      const newTicketCount = Number(state.tickets) - 1;
      await fetch(`https://694d8c8ead0f8c8e6e20ef39.mockapi.io/events/${state.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets: newTicketCount }),
      });

      // WhatsApp
      const message = `Halo Gateva 👋
Saya ingin membeli tiket event:

🎫 Event : ${state.title}
📍 Lokasi : ${state.location}
📅 Tanggal : ${state.date}

💰 Rincian Harga:
- Tiket : ${rupiah(basePrice)}
- Platform : ${rupiah(platformFee)}
- Pajak : ${rupiah(tax)}
- Total : ${rupiah(total)}

👤 Nama : ${name}
📱 WhatsApp : ${phone}

Waktu Transaksi: ${formattedDate}`;

      const url = `https://wa.me/6289629168442?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      
      // Kembali ke beranda
      navigate("/beranda-user");

    } catch (err) {
      console.error("Gagal checkout:", err);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-32 bg-gradient-to-b from-[#05080f] via-[#070d18] to-[#05080f] text-white">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <Card className="overflow-hidden rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
          <img src={state.image} alt={state.title} className="h-56 w-full object-cover opacity-90" />
          <CardContent className="p-8 space-y-6">
            <span className="inline-flex px-4 py-1 rounded-full text-xs font-semibold bg-[#7CFF4D]/15 text-[#7CFF4D]">{state.category}</span>
            <h2 className="text-3xl font-extrabold text-white">{state.title}</h2>
            <div className="text-white/70 space-y-1 text-sm">
              <p>📍 {state.location}</p>
              <p>📅 {state.date}</p>
            </div>
            <div className="border-t border-white/10 pt-6 space-y-2 text-sm">
              <div className="flex justify-between text-white/70"><span>Harga Tiket</span><span>{rupiah(basePrice)}</span></div>
              <div className="flex justify-between text-white/70"><span>Biaya Platform</span><span>{rupiah(platformFee)}</span></div>
              <div className="flex justify-between text-white/70"><span>Pajak</span><span>{rupiah(tax)}</span></div>
              <div className="flex justify-between pt-4 border-t border-white/10 text-lg font-bold text-[#7CFF4D]"><span>Total</span><span>{rupiah(total)}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
          <CardContent className="p-10 space-y-8">
            <div>
              <h3 className="text-3xl font-extrabold text-white">Checkout Tiket</h3>
              <p className="text-white/60 mt-2">Pemesanan akan dilanjutkan via WhatsApp</p>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="text-white/70">Nama Lengkap</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 bg-black/40 border-white/10 text-white placeholder:text-white/40 focus:border-[#7CFF4D]" placeholder="Masukkan nama lengkap" />
              </div>
              <div>
                <Label className="text-white/70">Nomor WhatsApp</Label>
                <Input value={phone} onChange={handlePhoneChange} className="mt-2 bg-black/40 border-white/10 text-white placeholder:text-white/40 focus:border-[#7CFF4D]" placeholder="Contoh: 628123456789" />
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <Button onClick={handleCheckout} disabled={!name || !phone || isProcessing} className="w-full py-6 rounded-xl bg-[#7CFF4D] text-[#05080f] font-semibold hover:brightness-110">
                <MessageCircle className="mr-2" />
                {isProcessing ? "Memproses..." : "Checkout via WhatsApp"}
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)} className="w-full py-6 rounded-xl border-white/20 bg-white/[0.03] text-white/70 hover:bg-white/[0.08]"><ArrowLeft className="mr-2" />Kembali</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}