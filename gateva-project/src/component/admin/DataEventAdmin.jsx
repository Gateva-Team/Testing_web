import React, { useState } from "react";
import initialEvents from "./data/dataEventAdmin.json";

export default function DataEventAdmin() {
  const [events, setEvents] = useState(initialEvents);

  const [form, setForm] = useState({
    name: "",
    category: "",
    date: "",
    status: "Aktif",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.category || !form.date) return;

    if (editId) {
      setEvents(
        events.map((event) =>
          event.id === editId ? { ...event, ...form } : event
        )
      );
      setEditId(null);
    } else {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          ...form,
        },
      ]);
    }

    setForm({ name: "", category: "", date: "", status: "Aktif" });
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEdit = (event) => {
    setEditId(event.id);
    setForm({
      name: event.name,
      category: event.category,
      date: event.date,
      status: event.status,
    });
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#0a0a12] to-[#1a1a2e] text-white">
      <h1 className="text-3xl font-bold mb-6">Data Event (Admin)</h1>

      {/* FORM */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Event" : "Tambah Event"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Event"
            value={form.name}
            onChange={handleChange}
            className="p-2 rounded bg-black/40 border border-white/20"
          />
          <input
            type="text"
            name="category"
            placeholder="Kategori"
            value={form.category}
            onChange={handleChange}
            className="p-2 rounded bg-black/40 border border-white/20"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-2 rounded bg-black/40 border border-white/20"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-2 rounded bg-black/40 border border-white/20"
          >
            <option>Aktif</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg"
          >
            {editId ? "Update Event" : "+ Tambah Event"}
          </button>

          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setForm({
                  name: "",
                  category: "",
                  date: "",
                  status: "Aktif",
                });
              }}
              className="px-6 py-2 bg-gray-500/20 text-gray-300 rounded-lg"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th>ID</th>
              <th>Event</th>
              <th>Kategori</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-white/10">
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.category}</td>
                <td>{event.date}</td>
                <td>{event.status}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(event)}>✏️</button>
                  <button onClick={() => handleDelete(event.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}