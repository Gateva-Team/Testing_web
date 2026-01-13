import { useMemo, useState, useEffect } from "react";
import { transactionApi } from "@/lib/api"; 

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
} from "lucide-react";

export default function TransaksiAdmin() {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("latest");

  // Data dari API
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await transactionApi.getAll();
        setTransaksi(data);
      } catch (error) {
        console.error("Gagal load transaksi:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // logika export CSV
  const handleExportCSV = () => {
    if (transaksi.length === 0) return alert("Tidak ada data untuk diekspor");

    // Header CSV sesuai schema
    const headers = ["ID,User,Event,Total,Status,Tanggal"];
    
    // Baris data (filteredData jika ingin hanya yang tampil di layar, atau 'transaksi' untuk semua)
    const rows = filteredData.map(item => 
      `TRX-${item.id},"${item.user}","${item.event}",${item.total},${item.status},"${item.date || item.tanggal}"`
    );

    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `laporan_transaksi_gateva_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //  Hitung summary stats
  const stats = useMemo(() => {
    const totalCount = transaksi.length;
    
    const totalRevenue = transaksi
      .filter(t => t.status === "Success")
      .reduce((acc, curr) => {
        const nominal = parseInt(curr.total.replace(/[^0-9]/g, "")) || 0;
        return acc + nominal;
      }, 0);

    const pendingCount = transaksi.filter(t => t.status === "Pending" || t.status === "Failed").length;

    return {
      total: totalCount.toLocaleString("id-ID"),
      income: "Rp " + totalRevenue.toLocaleString("id-ID"),
      pending: pendingCount.toLocaleString("id-ID")
    };
  }, [transaksi]);

  // Filtered & Sorted Data
  const filteredData = useMemo(() => {
    let data = [...transaksi];
    
    if (status !== "ALL") data = data.filter((t) => t.status === status);
    
    if (search) {
      data = data.filter((t) =>
        (t.user?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (t.event?.toLowerCase() || "").includes(search.toLowerCase()) ||
        t.id.toString().includes(search)
      );
    }

    return data.sort((a, b) => {
      const dateA = new Date(a.date || a.tanggal);
      const dateB = new Date(b.date || b.tanggal);
      return sort === "latest" ? dateB - dateA : dateA - dateB;
    });
  }, [transaksi, search, status, sort]);

  if (loading) return <div className="p-10 text-center text-white">Loading data transaksi...</div>;

  return (
    <div className="space-y-10 text-white">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Transaksi</h1>
          <p className="text-sm text-white/50">Riwayat transaksi event Gateva</p>
        </div>
        {/* Hubungkan handleExportCSV ke Button */}
        <Button 
          onClick={handleExportCSV}
          className="bg-white/10 text-white hover:bg-white/20 transition-all"
        >
          <Download size={16} className="mr-2" /> Export CSV
        </Button>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard title="Total Transaksi" value={stats.total} icon={CreditCard} />
        <SummaryCard title="Success (Revenue)" value={stats.income} icon={CheckCircle2} color="emerald" />
        <SummaryCard title="Pending / Failed" value={stats.pending} icon={Clock} color="yellow" />
      </div>

      {/* TABLE */}
      <Card className="bg-[#0b0f14] border-white/5">
        <CardHeader className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-base text-white">Daftar Transaksi</CardTitle>
          <div className="flex flex-wrap gap-3">
            <div className="relative w-[230px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari transaksi..."
                className="pl-9 bg-[#070a0f] border-white/10 text-white focus:border-[#39ff14]/50"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[150px] bg-[#070a0f] border-white/10 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0b0f14] border-white/10 text-white">
                <SelectItem value="ALL">Semua Status</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border border-white/5">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-white/50">ID</TableHead>
                  <TableHead className="text-white/50">User</TableHead>
                  <TableHead className="text-white/50">Event</TableHead>
                  <TableHead className="text-white/50">Total</TableHead>
                  <TableHead className="text-white/50">Status</TableHead>
                  <TableHead className="text-white/50">Tanggal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition">
                      <TableCell className="text-white/60 font-mono text-xs">TRX-{item.id}</TableCell>
                      <TableCell className="text-white font-medium">{item.user}</TableCell>
                      <TableCell className="text-white/70">{item.event}</TableCell>
                      <TableCell className="font-semibold text-emerald-400">{item.total}</TableCell>
                      <TableCell><StatusBadge status={item.status} /></TableCell>
                      {/* Menggunakan date || tanggal untuk menangani data lama & baru */}
                      <TableCell className="text-white/60">{item.date || item.tanggal}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-white/20">Data tidak ditemukan</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Komponen Summary Card
function SummaryCard({ title, value, icon: Icon, color = "emerald" }) {
  return (
    <Card className="bg-[#0b0f14] border-white/5">
      <CardContent className="p-6 flex items-center gap-4">
        <Icon className={color === "yellow" ? "text-yellow-400" : "text-emerald-400"} size={22} />
        <div>
          <p className="text-sm text-white/50 lowercase first-letter:uppercase">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
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
  return <Badge variant="outline" className={`${map[status] || "bg-white/10"} border-none`}>{status}</Badge>;
}