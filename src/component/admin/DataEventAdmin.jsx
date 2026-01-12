import { useMemo, useState, useEffect } from "react";
import { eventApi } from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Plus, Pencil, Trash2, Layers, CheckCircle2, 
  RotateCcw, Trash, AlertCircle 
} from "lucide-react";

export default function DataEventAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("active"); // "active" atau "trash"

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [formData, setFormData] = useState({
    title: "",
    category: "Musik",
    location: "",
    date: "",
    description: "",
    price: "",
    image: "",
    tickets: 0,
    status: "Aktif"
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await eventApi.getAll();
      setEvents(data);
    } catch (error) {
      console.error("Gagal ambil data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // logic modal form tambah & edit event
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ title: "", category: "Musik", location: "", date: "", description: "", price: "", image: "", tickets: 100, status: "Aktif" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event) => {
    setEditingId(event.id); 
    setFormData({ ...event });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Logic Update (PUT)
        await eventApi.update(editingId, formData);
      } else {
        // Logic Create (POST)
        await eventApi.create({ ...formData, status: "Aktif" });
      }
      setIsModalOpen(false);
      loadData();
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan");
    }
  };

  // logic hapus, restore, pindah ke sampah
  const moveToTrash = async (id) => {
    if (confirm("Pindahkan ke tong sampah?")) {
      await eventApi.update(id, { status: "Dihapus" });
      loadData();
    }
  };

  const restoreEvent = async (id) => {
    await eventApi.update(id, { status: "Aktif" });
    loadData();
  };

  const deletePermanent = async (id) => {
    if (confirm("Hapus permanen? Data tidak bisa kembali!")) {
      await eventApi.delete(id);
      loadData();
    }
  };

  // filter data 
  const activeEvents = events.filter(e => e.status !== "Dihapus");
  const trashedEvents = events.filter(e => e.status === "Dihapus");
  const displayData = view === "active" ? activeEvents : trashedEvents;

  if (loading) return <div className="text-white p-10 text-center italic">Sinkronisasi MockAPI...</div>;

  return (
    <div className="space-y-6 text-white">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Event Manager</h1>
          <div className="flex gap-4 mt-2">
            <button 
              onClick={() => setView("active")}
              className={`text-sm font-medium transition-colors ${view === "active" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-white/40 hover:text-white"}`}
            >
              Semua Event ({activeEvents.length})
            </button>
            <button 
              onClick={() => setView("trash")}
              className={`text-sm font-medium transition-colors ${view === "trash" ? "text-red-400 border-b-2 border-red-400" : "text-white/40 hover:text-white"}`}
            >
              Sampah ({trashedEvents.length})
            </button>
          </div>
        </div>
        {view === "active" && (
          <Button onClick={handleOpenAdd} className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold">
            <Plus size={18} className="mr-2" /> Tambah Event Baru
          </Button>
        )}
      </div>

      {/* STATS */}
      {view === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Insight title="Total Kapasitas" value={activeEvents.reduce((acc, curr) => acc + Number(curr.tickets || 0), 0)} icon={Layers} />
          <Insight title="Event Aktif" value={activeEvents.length} icon={CheckCircle2} />
          <Insight title="Item di Sampah" value={trashedEvents.length} icon={AlertCircle} color="red" />
        </div>
      )}

      {/* TABLE */}
      <Card className="bg-[#0b0f14] border-white/5">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="w-[80px] text-white/50">ID</TableHead>
                <TableHead className="text-white/50">Nama Event</TableHead>
                <TableHead className="text-white/50">Kategori</TableHead>
                <TableHead className="text-white/50">Harga</TableHead>
                <TableHead className="text-right text-white/50">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((item) => (
                <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="text-white/40 font-mono">#{item.id}</TableCell>
                  <TableCell className="font-medium text-white">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-white/10 text-white/70 bg-white/5">
                        {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/80">{item.price}</TableCell>
                  <TableCell className="text-right">
                    {view === "active" ? (
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => handleOpenEdit(item)} size="icon" variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white">
                            <Pencil size={16} />
                        </Button>
                        <Button onClick={() => moveToTrash(item.id)} size="icon" variant="ghost" className="text-red-400 hover:bg-red-500/20 hover:text-red-300">
                            <Trash2 size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => restoreEvent(item.id)} size="icon" variant="ghost" className="text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300">
                            <RotateCcw size={16} />
                        </Button>
                        <Button onClick={() => deletePermanent(item.id)} size="icon" variant="ghost" className="text-red-500 hover:bg-red-500/20 hover:text-red-400">
                            <Trash size={16} />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {displayData.length === 0 && <div className="p-20 text-center text-white/20 italic">Tidak ada data untuk ditampilkan</div>}
        </CardContent>
      </Card>

      {/* MODAL FORM */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#0b0f14] border-white/10 text-white max-w-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">{editingId ? "Edit Detail Event" : "Buat Event Baru"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">Judul Event</label>
              <Input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="bg-[#070a0f] border-white/10 text-white focus:border-emerald-500" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">Kategori</label>
              <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                <SelectTrigger className="bg-[#070a0f] border-white/10 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#0b0f14] border-white/10 text-white">
                  <SelectItem value="Musik">Musik</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Lomba">Lomba</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">Harga</label>
              <Input placeholder="Rp250.000" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="bg-[#070a0f] border-white/10 text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">Tanggal</label>
              <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="bg-[#070a0f] border-white/10 text-white [color-scheme:dark]" />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">Tiket Tersedia</label>
              <Input type="number" value={formData.tickets} onChange={(e) => setFormData({...formData, tickets: e.target.value})} className="bg-[#070a0f] border-white/10 text-white" />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">Lokasi</label>
              <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="bg-[#070a0f] border-white/10 text-white" />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">URL Gambar</label>
              <Input value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="bg-[#070a0f] border-white/10 text-white placeholder:text-white/20" placeholder="https://..." />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/50 font-semibold uppercase tracking-wider">Deskripsi</label>
              <textarea 
                className="w-full min-h-[100px] bg-[#070a0f] border border-white/10 text-white rounded-md p-3 text-sm focus:outline-none focus:border-emerald-500" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <DialogFooter className="col-span-2 pt-4">
              <Button type="submit" className="w-full bg-emerald-500 text-black hover:bg-emerald-600 font-bold h-12">
                {editingId ? "SIMPAN PERUBAHAN" : "PUBLIKASIKAN EVENT"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Insight({ title, value, icon: Icon, color = "emerald" }) {
  return (
    <Card className="bg-[#0b0f14] border-white/5">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color === 'red' ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
            <Icon size={20} className={color === "red" ? "text-red-400" : "text-emerald-400"} />
        </div>
        <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}