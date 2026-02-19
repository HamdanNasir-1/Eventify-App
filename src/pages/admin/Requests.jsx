import { useEffect, useState } from "react";
import API from "../../services/api";

function Requests() {
  const [registrations, setRegistrations] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await API.get("/events/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistrations(res.data || []);
    } catch (err) {
      setRegistrations([]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    await API.put(
      `/events/approve/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchRequests();
  };

  if (registrations.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Student Requests 📋</h1>
        <p className="text-xl text-slate-400">No requests yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-10">Event Registrations 📋</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {registrations.map((reg) => (
          <div key={reg._id} className="bg-slate-800 p-6 rounded-2xl space-y-3">

            {/* INDIVIDUAL */}
            {reg.studentId && (
              <>
                <h2 className="text-xl font-bold">
                  👤 {reg.studentId.name}
                </h2>
                <p className="text-slate-400">{reg.studentId.email}</p>
              </>
            )}

            {/* TEAM */}
            {reg.teamName && (
              <>
                <h2 className="text-xl font-bold">👥 {reg.teamName}</h2>
                <p className="text-slate-400">
                  Team Leader ID: {reg.teamLeaderId}
                </p>

                <div className="bg-slate-900 p-3 rounded-xl">
                  <p className="font-semibold mb-2">Members:</p>
                  {reg.members.map((m, i) => (
                    <p key={i} className="text-slate-400">• {m}</p>
                  ))}
                </div>
              </>
            )}

            <p className="text-indigo-400 font-semibold">
              Event: {reg.eventId?.title || "Deleted Event"}
            </p>

            <p>Status: <span className="text-green-400">{reg.status}</span></p>

            {reg.status === "pending" && (
              <button
                onClick={() => approve(reg._id)}
                className="mt-3 bg-indigo-600 px-4 py-2 rounded-xl w-full"
              >
                Approve Registration ✅
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;
