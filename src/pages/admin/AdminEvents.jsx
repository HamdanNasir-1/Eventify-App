import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;

    const token = localStorage.getItem("token");

    await API.delete(`/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchEvents(); // refresh manage events page
    window.location.reload(); // refresh all dashboards + tickets
  };

  const updateEvent = async (e) => {
    e.preventDefault();

    await API.put(`/events/${editingEvent._id}`, editingEvent, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setEditingEvent(null);
    fetchEvents();
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-10">Manage Events 🎉</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-slate-800 p-6 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-slate-400">{event.venue}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setEditingEvent(event)}
                className="bg-indigo-600 px-3 py-1 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEvent(event._id)}
                className="bg-red-600 px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <form
            onSubmit={updateEvent}
            className="bg-slate-900 p-8 rounded-2xl space-y-4 w-[400px]"
          >
            <h2 className="text-2xl font-bold">Edit Event</h2>

            <input
              value={editingEvent.title}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, title: e.target.value })
              }
              className="w-full p-2 bg-slate-700 rounded"
            />

            <input
              value={editingEvent.venue}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, venue: e.target.value })
              }
              className="w-full p-2 bg-slate-700 rounded"
            />

            <input
              type="number"
              value={editingEvent.maxSeats}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, maxSeats: e.target.value })
              }
              className="w-full p-2 bg-slate-700 rounded"
            />

            <button className="w-full bg-indigo-600 py-2 rounded">
              Update Event
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminEvents;
