import { useMemo, useState } from "react";
import dataEvent from "./data/dataEventAdmin.json";

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
  Plus,
  Pencil,
  Trash2,
  Search,
  Layers,
  CheckCircle2,
  PauseCircle,
} from "lucide-react";

export default function DataEventAdmin() {
  const { events } = dataEvent;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sortKey, setSortKey] = useState("name");

  const filteredEvents = useMemo(() => {
    let data = [...events];

    if (status !== "ALL") {
      data = data.filter((e) => e.status === status);
    }

    if (search) {
      data = data.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }, [events, search, status, sortKey]);

  const total = events.length;
  const aktif = events.filter((e) => e.status === "Aktif").length;
  const nonaktif = total - aktif;

  return (
    <div className="space-y-10 text-white">
      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Data Event</h1>
          <p className="text-sm text-white/50">Manajemen event Gateva</p>
        </div>

        <Button className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
          <Plus size={16} className="mr-2" />
          Tambah Event
        </Button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Insight title="Total Event" value={total} icon={Layers} />
        <Insight title="Event Aktif" value={aktif} icon={CheckCircle2} />
        <Insight
          title="Nonaktif"
          value={nonaktif}
          icon={PauseCircle}
          color="yellow"
        />
      </div>

      {/* ================= TABLE ================= */}
      <Card className="bg-[#0b0f14] border-white/5">
        <CardHeader className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-base text-white">Daftar Event</CardTitle>

          <div className="flex flex-wrap gap-3">
            {/* SEARCH */}
            <div className="relative w-[240px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari event..."
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
                  className="text-white hover:bg-white/10"
                  value="ALL"
                >
                  Semua Status
                </SelectItem>
                <SelectItem
                  className="text-white hover:bg-white/10"
                  value="Aktif"
                >
                  Aktif
                </SelectItem>
                <SelectItem
                  className="text-white hover:bg-white/10"
                  value="Nonaktif"
                >
                  Nonaktif
                </SelectItem>
              </SelectContent>
            </Select>

            {/* SORT */}
            <Select value={sortKey} onValueChange={setSortKey}>
              <SelectTrigger className="w-[160px] bg-[#070a0f] border-white/10 text-white">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent className="bg-[#0b0f14] border-white/10">
                <SelectItem
                  className="text-white hover:bg-white/10"
                  value="name"
                >
                  Nama Event
                </SelectItem>
                <SelectItem
                  className="text-white hover:bg-white/10"
                  value="category"
                >
                  Kategori
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
                <TableHead className="text-white/50">Nama</TableHead>
                <TableHead className="text-white/50">Kategori</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
                <TableHead className="text-right text-white/50">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow
                  key={event.id}
                  className="border-white/5 hover:bg-white/5"
                >
                  <TableCell className="text-white">{event.id}</TableCell>
                  <TableCell className="font-medium text-white">
                    {event.name}
                  </TableCell>
                  <TableCell className="text-white/70">
                    {event.category}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        event.status === "Aktif"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-yellow-500/15 text-yellow-400"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        className="bg-white/5 text-white hover:bg-white/10"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="icon"
                        className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ================= INSIGHT ================= */

function Insight({ title, value, icon: Icon, color = "emerald" }) {
  return (
    <Card className="bg-[#0b0f14] border-white/5">
      <CardContent className="p-6 flex items-center gap-4">
        <Icon
          className={
            color === "yellow" ? "text-yellow-400" : "text-emerald-400"
          }
        />
        <div>
          <p className="text-sm text-white/50">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
