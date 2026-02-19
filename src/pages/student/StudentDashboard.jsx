import { useEffect, useState } from "react";
import API from "../../services/api";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [events, setEvents] = useState([]);
  const [myRegs, setMyRegs] = useState([]);

  // team modal state
  const [teamEvent, setTeamEvent] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([""]);

  const fetchEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data || []);
  };

  const fetchMyRegs = async () => {
    const res = await API.get("/events/my-registrations", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyRegs(res.data || []);
  };

  useEffect(() => {
    fetchEvents();
    fetchMyRegs();
  }, []);

  // ⭐ APPLY INDIVIDUAL EVENT
  const applyIndividual = async (eventId) => {
    try {
      await API.post(
        "/events/apply",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchMyRegs();
      alert("Applied successfully 🎉");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // ⭐ APPLY TEAM EVENT
  const applyTeam = async () => {
    try {
      await API.post(
        "/events/apply",
        {
          eventId: teamEvent._id,
          teamName,
          members,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Team registered 🎉");
      setTeamEvent(null);
      setTeamName("");
      setMembers([""]);
      fetchMyRegs();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // ⭐ FIXED APPLIED CHECK (individual + team)
  const isApplied = (eventId) => {
    return myRegs.some((reg) => reg.eventId?._id === eventId);
  };

  const addMember = () => setMembers([...members, ""]);

  const updateMember = (value, index) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  return (
    <div className="p-6 md:p-10 space-y-10">

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold">Welcome back, {user?.name} 👋</h1>
        <p className="opacity-90 mt-2">
          Discover events and manage your registrations.
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl text-center">
          <h2 className="text-3xl font-bold">{events.length}</h2>
          <p className="text-slate-400">Available Events</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl text-center">
          <h2 className="text-3xl font-bold">{myRegs.length}</h2>
          <p className="text-slate-400">My Applications</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl text-center">
          <h2 className="text-3xl font-bold">
            {myRegs.filter(r => r.status === "approved").length}
          </h2>
          <p className="text-slate-400">Tickets Approved</p>
        </div>
      </div>

      {/* EVENTS */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Available Events 🎉</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event._id}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-indigo-500/20 shadow-xl overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{event.description}</p>

                <p className="text-sm">📅 {event.date} ⏰ {event.time}</p>
                <p className="text-sm mb-4">📍 {event.venue}</p>

                {!isApplied(event._id) ? (
                  event.type === "individual" ? (
                    <button
                      onClick={() => applyIndividual(event._id)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-2 rounded-xl"
                    >
                      Apply Now
                    </button>
                  ) : (
                    <button
                      onClick={() => setTeamEvent(event)}
                      className="w-full bg-purple-600 py-2 rounded-xl"
                    >
                      Register Team 👥
                    </button>
                  )
                ) : (
                  <button className="w-full bg-green-600 py-2 rounded-xl">
                    Applied ✅
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TEAM MODAL */}
      {teamEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-3xl w-[400px] space-y-4">
            <h2 className="text-2xl font-bold">Register Team 👥</h2>

            <input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-2 bg-slate-700 rounded"
            />

            {members.map((m, i) => (
              <input
                key={i}
                placeholder={`Member ${i + 1}`}
                value={m}
                onChange={(e) => updateMember(e.target.value, i)}
                className="w-full p-2 bg-slate-700 rounded"
              />
            ))}

            <button onClick={addMember} className="text-indigo-400">
              + Add Member
            </button>

            <button
              onClick={applyTeam}
              className="w-full bg-indigo-600 py-2 rounded-xl"
            >
              Submit Team 🚀
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default StudentDashboard;
