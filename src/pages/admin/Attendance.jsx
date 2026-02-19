import { useEffect, useState } from "react";
import API from "../../services/api";

function Attendance() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await API.get("/events/attendance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data || []);
    };
    fetchAttendance();
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-10">Event Attendance 📊</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((reg) => (
          <div key={reg._id} className="bg-slate-800 p-6 rounded-2xl space-y-2">

            <h2 className="text-xl font-bold">
              {reg.eventId?.title}
            </h2>

            {reg.studentId && (
              <p>👤 {reg.studentId.name}</p>
            )}

            {reg.teamName && (
              <p>👥 {reg.teamName}</p>
            )}

            <p className="text-slate-400 text-sm">
              Ticket: {reg.ticketId}
            </p>

            <p>
              Status: {reg.attendance ? "Present ✅" : "Not Scanned ❌"}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;
