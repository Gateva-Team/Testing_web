import { useMemo, useState, useEffect } from "react";
import { eventApi, transactionApi } from "@/lib/api";
import {
  Calendar, Ticket, Wallet, Target, BarChart3,
  TrendingUp, TrendingDown, Sparkles, Loader2
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export default function DashboardAdmin() {
  const [events, setEvents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sinkronisasi Data dari API
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [eventData, transData] = await Promise.all([
          eventApi.getAll(),
          transactionApi.getAll()
        ]);
        setEvents(eventData.filter(e => e.status !== "Dihapus"));
        setTransactions(transData);
      } catch (error) {
        console.error("Gagal sinkronisasi dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  // logigak statistik dan chart
  
  const stats = useMemo(() => {
    const revenue = transactions
      .filter(t => t.status === "Success")
      .reduce((acc, curr) => acc + (parseInt(curr.total.replace(/[^0-9]/g, "")) || 0), 0);

    const soldTickets = transactions.filter(t => t.status === "Success").length;

    const avgPrice = events.length > 0 
      ? events.reduce((acc, curr) => acc + (parseInt(curr.price.replace(/[^0-9]/g, "")) || 0), 0) / events.length 
      : 0;

    return [
      { title: "Event Aktif", value: events.length, icon: Calendar },
      { title: "Tiket Terjual", value: soldTickets.toLocaleString("id-ID"), icon: Ticket },
      { title: "Pendapatan", value: "Rp " + revenue.toLocaleString("id-ID"), icon: Wallet },
      { title: "Avg Harga", value: "Rp " + Math.round(avgPrice).toLocaleString("id-ID"), icon: Target },
    ];
  }, [events, transactions]);

  const barChartData = useMemo(() => {
    return events.map(ev => {
      const eventRevenue = transactions
        .filter(t => t.event === ev.title && t.status === "Success")
        .reduce((acc, curr) => acc + (parseInt(curr.total.replace(/[^0-9]/g, "")) || 0), 0);
      return {
        name: ev.title.split(" ").slice(0, 2).join(" "),
        revenue: eventRevenue
      };
    });
  }, [events, transactions]);

  const monthlyTrendData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return months.map(m => {
      const total = transactions
        .filter(t => t.status === "Success" && (t.date || t.tanggal || "").includes(m))
        .reduce((acc, curr) => acc + (parseInt(curr.total.replace(/[^0-9]/g, "")) || 0), 0);
      return { bulan: m, total: total };
    });
  }, [transactions]);

  const bestEvent = barChartData.sort((a, b) => b.revenue - a.revenue)[0];
  const riskEvents = events.filter(e => parseInt(e.tickets) < 50);

  if (loading) return (
    <div className="flex items-center justify-center h-screen text-emerald-400">
      <Loader2 className="animate-spin mr-2" /> Memuat Dashboard...
    </div>
  );

  // Render Dashboard
  return (
    <div className="space-y-14 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gateva Admin Dashboard</h1>
          <p className="text-sm text-white/50 mt-2">Event analytics & revenue intelligence</p>
        </div>
        <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">SYSTEM ACTIVE</Badge>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i} className="bg-gradient-to-br from-[#0b0f14] to-[#070a0f] border border-emerald-500/15 shadow-lg shadow-emerald-500/5">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-white/50">{item.title}</p>
                  <p className="text-xl text-white font-semibold mt-1">{item.value}</p>
                </div>
                <Icon className="w-8 h-8 text-emerald-400/40" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* LINE CHART */}
      <Card className="bg-gradient-to-br from-[#0b0f14] to-[#070a0f] border border-emerald-500/15">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <BarChart3 /> Monthly Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendData}>
              <XAxis stroke="rgba(255,255,255,0.3)" dataKey="bulan" />
              <YAxis stroke="rgba(255,255,255,0.3)" />
              <Tooltip contentStyle={{ background: "#070a0f", border: "1px solid rgba(57,255,20,0.3)", color: "#fff" }} />
              <Line type="monotone" dataKey="total" stroke="#39FF14" strokeWidth={3} dot={{ r: 4, fill: "#39FF14" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* BAR CHART */}
      <Card className="bg-gradient-to-br from-[#0b0f14] to-[#070a0f] border border-emerald-500/15">
        <CardHeader>
          <CardTitle className="text-emerald-400 flex items-center gap-2">
            <BarChart3 /> Event Revenue Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <defs>
                <linearGradient id="gatevaBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#39FF14" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#39FF14" stopOpacity={0.25} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis stroke="rgba(255,255,255,0.4)" dataKey="name" />
              <YAxis stroke="rgba(255,255,255,0.4)" />
              <Tooltip 
                contentStyle={{ background: "#070a0f", border: "1px solid rgba(57,255,20,0.3)", color: "#fff" }} 
                formatter={(v) => `Rp ${v.toLocaleString("id-ID")}`}
              />
              <Bar dataKey="revenue" fill="url(#gatevaBar)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI INSIGHT */}
      <Card className="bg-gradient-to-br from-[#0b0f14] to-[#070a0f] border border-emerald-500/20 shadow-[0_0_40px_rgba(57,255,20,0.12)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Sparkles /> AI Insight
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-white/80">
            Event terbaik saat ini adalah <span className="font-semibold text-emerald-400">{bestEvent?.name || "N/A"}</span>
          </p>
          <div className="flex items-center gap-2 text-emerald-400">
            <TrendingUp /> Revenue Leader
          </div>
          {riskEvents.length > 0 && (
            <div className="flex items-center gap-2 text-red-400">
              <TrendingDown /> {riskEvents.length} event butuh promosi tambahan (stok rendah)
            </div>
          )}
          <p className="text-sm text-white/50">
            💡 Optimalkan promosi event dengan demand tinggi untuk scaling revenue.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}