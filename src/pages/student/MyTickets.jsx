import { useEffect, useState } from "react";
import API from "../../services/api";
import { QRCodeCanvas } from "qrcode.react";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get("/events/my-registrations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // keep only valid approved tickets
        const validTickets = Array.isArray(res.data)
          ? res.data.filter(
              (r) => r && r.status === "approved" && r.eventId && r.ticketId,
            )
          : [];

        setTickets(validTickets);
      } catch (err) {
        setTickets([]);
      }
    };

    fetchTickets();
  }, []);

  // ⭐ EMPTY STATE FIRST
  if (!tickets || tickets.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">My Tickets 🎟️</h1>
        <p className="text-xl text-slate-400">
          No tickets yet. Apply for an event to get your QR ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-10">My Tickets 🎟️</h1>

      {/* Ticket Cards */}
      <div className="grid md:grid-cols-2 gap-10">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            onClick={() => setSelectedTicket(ticket)}
            className="cursor-pointer bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-3xl border border-indigo-500/20 shadow-xl hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              {ticket.eventId?.title || "Event"}
            </h2>

            <div className="bg-white p-4 rounded-2xl w-fit mx-auto">
              <QRCodeCanvas value={ticket.ticketId} size={150} />
            </div>

            <p className="text-center mt-6 text-slate-400">
              Tap to view full ticket
            </p>
          </div>
        ))}
      </div>

      {/* PREMIUM FULL SCREEN TICKET */}
      {selectedTicket && (
        <div
          onClick={() => setSelectedTicket(null)}
          className="fixed inset-0 bg-gradient-to-br from-black via-indigo-950 to-black flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.4)] border border-indigo-500/30 overflow-hidden"
          >
            {/* Glow Strip */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-2 text-white">
                🎉 {selectedTicket.eventId?.title || "Event"}
                {/* TEAM NAME */}
                {selectedTicket.teamName && (
                  <p className="text-indigo-300 mt-2">
                    Team: {selectedTicket.teamName}
                  </p>
                )}
              </h2>

              <p className="text-indigo-300 mb-6">Entry Pass • Valid Ticket</p>

              <div className="bg-white p-6 rounded-2xl inline-block shadow-2xl mb-6">
                <QRCodeCanvas value={selectedTicket.ticketId} size={220} />
              </div>

              <p className="text-slate-400 text-sm">Ticket ID</p>
              <p className="text-indigo-400 break-all text-sm mb-6">
                {selectedTicket.ticketId}
              </p>

              {/* TEAM MEMBERS */}
              {selectedTicket.members && selectedTicket.members.length > 0 && (
                <div className="mb-6">
                  <p className="text-slate-400 text-sm mb-2">Team Members</p>
                  {selectedTicket.members.map((m, i) => (
                    <p key={i} className="text-indigo-300 text-sm">
                      • {m}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-slate-400 text-sm">
                Show this QR at the entry gate
              </p>

              <button
                onClick={() => setSelectedTicket(null)}
                className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTickets;
