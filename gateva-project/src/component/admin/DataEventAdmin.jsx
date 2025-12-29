import React, { useState } from "react";

export default function DataEventAdmin() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Konser Jazz",
      category: "Musik",
      date: "2025-12-20",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Seminar AI",
      category: "Seminar",
      date: "2025-12-22",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Workshop UI/UX",
      category: "Workshop",
      date: "2025-12-25",
      status: "Pending",
    },
    {
      id: 4,
      name: "Lomba Coding",
      category: "Lomba",
      date: "2025-12-28",
      status: "Aktif",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    date: "",
    status: "Aktif",
  });

  const [editId, setEditId] = useState(null);

  // Handle input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambah / Update event
  const handleSubmit = () => {
    if (!form.name || !form.category || !form.date) return;

    if (editId) {
      // UPDATE
      setEvents(
        events.map((event) =>
          event.id === editId ? { ...event, ...form } : event
        )
      );
      setEditId(null);
    } else {
      // CREATE
      const newEvent = {
        id: events.length + 1,
        ...form,
      };
      setEvents([...events, newEvent]);
    }

    setForm({ name: "", category: "", date: "", status: "Aktif" });
  };

  // Hapus event
  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Edit event
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

      {/* FORM TAMBAH / EDIT */}
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
            className="p-2 rounded bg-black/40 border border-white/20 text-white"
          />

          <input
            type="text"
            name="category"
            placeholder="Kategori"
            value={form.category}
            onChange={handleChange}
            className="p-2 rounded bg-black/40 border border-white/20 text-white"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-2 rounded bg-black/40 border border-white/20 text-white"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-2 rounded bg-black/40 border border-white/20 text-white"
          >
            <option>Aktif</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition"
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
              className="px-6 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* TABLE EVENT */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-2 px-4 text-white/70">ID</th>
              <th className="py-2 px-4 text-white/70">Event Name</th>
              <th className="py-2 px-4 text-white/70">Category</th>
              <th className="py-2 px-4 text-white/70">Date</th>
              <th className="py-2 px-4 text-white/70">Status</th>
              <th className="py-2 px-4 text-white/70">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-white/10 hover:bg-white/10 transition"
              >
                <td className="py-2 px-4">{event.id}</td>
                <td className="py-2 px-4">{event.name}</td>
                <td className="py-2 px-4">{event.category}</td>
                <td className="py-2 px-4">{event.date}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      event.status === "Aktif"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}