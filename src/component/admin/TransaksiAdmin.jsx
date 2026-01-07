import { useMemo, useState } from "react";
import transaksiData from "./data/transaksiAdmin.json";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Download,
  Search,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

export default function TransaksiAdmin() {
  const { summary, transaksi } = transaksiData;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("latest");

  const filteredData = useMemo(() => {
    let data = [...transaksi];

    if (status !== "ALL") {
      data = data.filter((t) => t.status === status);
    }

    if (search) {
      data = data.filter(
        (t) =>
          t.user.toLowerCase().includes(search.toLowerCase()) ||
          t.event.toLowerCase().includes(search.toLowerCase()) ||
          t.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data.sort((a, b) =>
      sort === "latest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  }, [transaksi, search, status, sort]);

  return (
    <div className="space-y-10 text-white">
      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Transaksi</h1>
          <p className="text-sm text-white/50">
            Riwayat transaksi event Gateva
          </p>
        </div>

        <Button className="bg-white/10 text-white hover:bg-white/20">
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Transaksi"
          value={summary[0]?.value}
          icon={CreditCard}
        />
        <SummaryCard
          title="Success"
          value={summary[1]?.value}
          icon={CheckCircle2}
          color="emerald"
        />
        <SummaryCard
          title="Pending / Failed"
          value={summary[2]?.value}
          icon={Clock}
          color="yellow"
        />
      </div>

      {/* ================= TABLE ================= */}
      <Card className="bg-[#0b0f14] border-white/5">
        <CardHeader className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-base text-white">
            Daftar Transaksi
          </CardTitle>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">
            {/* SEARCH */}
            <div className="relative w-[230px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari transaksi..."
                className="
                  pl-9
                  bg-[#070a0f]
                  border-white/10
                  text-white
                  placeholder:text-white/40
                  caret-emerald-400
                "
              />
            </div>

            {/* STATUS */}
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[150px] bg-[#070a0f] border-white/10 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0b0f14] border-white/10">
                <SelectItem
                  value="ALL"
                  className="text-white hover:bg-white/10"
                >
                  Semua Status
                </SelectItem>
                <SelectItem
                  value="Success"
                  className="text-white hover:bg-white/10"
                >
                  Success
                </SelectItem>
                <SelectItem
                  value="Pending"
                  className="text-white hover:bg-white/10"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  value="Failed"
                  className="text-white hover:bg-white/10"
                >
                  Failed
                </SelectItem>
              </SelectContent>
            </Select>

            {/* SORT */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[150px] bg-[#070a0f] border-white/10 text-white">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent className="bg-[#0b0f14] border-white/10">
                <SelectItem
                  value="latest"
                  className="text-white hover:bg-white/10"
                >
                  Terbaru
                </SelectItem>
                <SelectItem
                  value="oldest"
                  className="text-white hover:bg-white/10"
                >
                  Terlama
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/5">
                <TableHead className="text-white/50">ID</TableHead>
                <TableHead className="text-white/50">User</TableHead>
                <TableHead className="text-white/50">Event</TableHead>
                <TableHead className="text-white/50">Total</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
                <TableHead className="text-white/50">Tanggal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-white/5 hover:bg-white/5 transition"
                >
                  <TableCell className="text-white">{item.id}</TableCell>
                  <TableCell className="text-white">{item.user}</TableCell>
                  <TableCell className="text-white/70">{item.event}</TableCell>
                  <TableCell className="font-semibold text-emerald-400">
                    {item.total}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-white/60">{item.date}</TableCell>
                </TableRow>
              ))}

              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-white/40 py-8"
                  >
                    Tidak ada transaksi ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SummaryCard({ title, value, icon: Icon, color = "emerald" }) {
  return (
    <Card className="bg-[#0b0f14] border-white/5">
      <CardContent className="p-6 flex items-center gap-4">
        <Icon
          className={
            color === "yellow" ? "text-yellow-400" : "text-emerald-400"
          }
          size={22}
        />
        <div>
          <p className="text-sm text-white/50">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  const map = {
    Success: "bg-emerald-500/15 text-emerald-400",
    Pending: "bg-yellow-500/15 text-yellow-400",
    Failed: "bg-red-500/15 text-red-400",
  };

  return <Badge className={map[status]}>{status}</Badge>;
}
