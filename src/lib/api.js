// Gunakan satu Root URL saja
const ROOT_URL = "https://694d8c8ead0f8c8e6e20ef39.mockapi.io";

export const eventApi = {
  // Panggil ke /events
  getAll: () => fetch(`${ROOT_URL}/events`).then(res => res.json()),
  
  create: (data) => fetch(`${ROOT_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json()),

  update: (id, data) => fetch(`${ROOT_URL}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json()),

  delete: (id) => fetch(`${ROOT_URL}/events/${id}`, { method: "DELETE" }).then(res => res.json()),
};

export const transactionApi = {
  // Panggil ke /transactions
  getAll: () => fetch(`${ROOT_URL}/transactions`).then(res => res.json()),
  
  // Tambahkan fungsi update jika ingin admin bisa mengubah status (Success/Failed)
  update: (id, data) => fetch(`${ROOT_URL}/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json()),
};