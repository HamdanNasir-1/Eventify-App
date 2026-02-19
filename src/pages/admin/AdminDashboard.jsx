import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const eventsRes = await API.get("/events");
    const regRes = await API.get("/events/registrations", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setEvents(eventsRes.data);
    setRegistrations(regRes.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const eventsRes = await API.get("/events");
        const regsRes = await API.get("/events/registrations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEvents(eventsRes.data || []);
        setRegistrations(regsRes.data || []);
      } catch (err) {
        setEvents([]);
        setRegistrations([]);
      }
    };

    fetchData();

    // ⭐ auto refresh every 2 seconds
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-10">
      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold">Admin Dashboard 👑</h1>
        <p className="opacity-90 mt-2">
          Manage events and student registrations.
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold">{events.length}</h2>
          <p className="text-slate-400">Total Events</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold">{registrations.length}</h2>
          <p className="text-slate-400">Total Applications</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold">
            {registrations.filter((r) => r.status === "approved").length}
          </h2>
          <p className="text-slate-400">Approved Tickets</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Quick Actions ⚡</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <a href="/admin/create-event">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-indigo-500/20 shadow-[0_0_25px_rgba(99,102,241,0.25)] p-6 hover:scale-105 transition">
              <h3 className="text-xl font-bold mb-2">➕ Create Event</h3>
              <p className="text-slate-400">Add new college events.</p>
            </div>
          </a>

          <a href="/admin/requests">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-indigo-500/20 shadow-[0_0_25px_rgba(99,102,241,0.25)] p-6 hover:scale-105 transition">
              <h3 className="text-xl font-bold mb-2">📋 View Requests</h3>
              <p className="text-slate-400">Approve student registrations.</p>
            </div>
          </a>

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-indigo-500/20 shadow-[0_0_25px_rgba(99,102,241,0.25)] p-6">
            <h3 className="text-xl font-bold mb-2">🎟️ QR Tickets</h3>
            <p className="text-slate-400">
              Tickets generated automatically after approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
