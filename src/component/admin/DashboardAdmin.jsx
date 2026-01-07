import { useMemo, useState } from "react";
import {
  Calendar,
  Ticket,
  Wallet,
  Target,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import dashboardData from "./data/dashboardAdmin.json";

export default function DashboardAdmin() {
  const { stats, eventPerformance, transaksiBulanan } = dashboardData;

  const [statusFilter] = useState("ALL");

  /* ================= DATA ================= */
  const filteredEvents = useMemo(() => {
    return statusFilter === "ALL"
      ? eventPerformance
      : eventPerformance.filter((e) => e.status === statusFilter);
  }, [eventPerformance, statusFilter]);

  const bestEvent = filteredEvents[0];
  const riskEvents = filteredEvents.filter(
    (e) => e.status === "Aktif" && e.tiketTerjual < 400
  );

  const barChartData = eventPerformance.map((e) => ({
    name: e.name.split(" ").slice(0, 2).join(" "),
    revenue: e.pendapatan,
  }));

  /* ================= UI ================= */
  return (
    <div className="space-y-14 text-white">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gateva Admin Dashboard
          </h1>
          <p className="text-sm text-white/50 mt-2">
            Event analytics & revenue intelligence
          </p>
        </div>

        <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          SYSTEM ACTIVE
        </Badge>
      </div>

      {/* ================= KPI ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[
          { title: "Event Aktif", value: stats[0].value, icon: Calendar },
          { title: "Tiket Terjual", value: stats[1].value, icon: Ticket },
          { title: "Pendapatan", value: stats[2].value, icon: Wallet },
          { title: "Avg Harga", value: stats[3].value, icon: Target },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Card
              key={i}
              className="
                bg-gradient-to-br from-[#0b0f14] to-[#070a0f]
                border border-emerald-500/15
                shadow-lg shadow-emerald-500/5
              "
            >
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-white/50">{item.title}</p>
                  <p className="text-xl text-white font-semibold mt-1">
                    {item.value}
                  </p>
                </div>
                <Icon className="w-8 h-8 text-emerald-400/40" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ================= LINE CHART ================= */}
      <Card className="bg-gradient-to-br from-[#0b0f14] to-[#070a0f] border border-emerald-500/15">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <BarChart3 />
            Monthly Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transaksiBulanan}>
              <XAxis stroke="rgba(255,255,255,0.3)" dataKey="bulan" />
              <YAxis stroke="rgba(255,255,255,0.3)" />
              <Tooltip
                contentStyle={{
                  background: "#070a0f",
                  border: "1px solid rgba(57,255,20,0.3)",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#39FF14"
                strokeWidth={3}
                dot={{ r: 4, fill: "#39FF14" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ================= BAR CHART ================= */}
      <Card className="bg-gradient-to-br from-[#0b0f14] to-[#070a0f] border border-emerald-500/15">
        <CardHeader>
          <CardTitle className="text-emerald-400 flex items-center gap-2">
            <BarChart3 />
            Event Revenue Comparison
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
                contentStyle={{
                  background: "#070a0f",
                  border: "1px solid rgba(57,255,20,0.3)",
                  color: "#fff",
                }}
                formatter={(v) => `Rp ${v.toLocaleString("id-ID")}`}
              />
              <Bar
                dataKey="revenue"
                fill="url(#gatevaBar)"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ================= AI INSIGHT ================= */}
      <Card className="bg-gradient-to-br from-[#0b0f14] to-[#070a0f] border border-emerald-500/20 shadow-[0_0_40px_rgba(57,255,20,0.12)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Sparkles />
            AI Insight
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-white/80">
            Event terbaik saat ini adalah{" "}
            <span className="font-semibold">{bestEvent?.name}</span>
          </p>

          <div className="flex items-center gap-2 text-emerald-400">
            <TrendingUp />
            Revenue Leader
          </div>

          {riskEvents.length > 0 && (
            <div className="flex items-center gap-2 text-red-400">
              <TrendingDown />
              {riskEvents.length} event butuh promosi tambahan
            </div>
          )}

          <p className="text-sm text-white/50">
            💡 Optimalkan promosi event dengan demand tinggi untuk scaling
            revenue.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
