import { useState } from "react";
import API from "../../services/api";

function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    type: "individual",
    maxSeats: "",
    maxTeams: "",
    teamSizeLimit: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/events",
        {
          ...form,
          maxSeats: Number(form.maxSeats),
          maxTeams: Number(form.maxTeams),
          teamSizeLimit: Number(form.teamSizeLimit),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Event created 🎉");
    } catch (err) {
      alert("Error creating event");
    }
  };

  return (
    <div className="p-6 md:p-10 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-10 rounded-3xl w-full max-w-xl space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">Create Event</h1>

        <input name="title" placeholder="Event Title"
          onChange={handleChange} className="w-full p-3 bg-slate-700 rounded-xl" />

        <textarea name="description" placeholder="Description"
          onChange={handleChange} className="w-full p-3 bg-slate-700 rounded-xl" />

        <input type="date" name="date"
          onChange={handleChange} className="w-full p-3 bg-slate-700 rounded-xl" />

        <input type="time" name="time"
          onChange={handleChange} className="w-full p-3 bg-slate-700 rounded-xl" />

        <input name="venue" placeholder="Venue"
          onChange={handleChange} className="w-full p-3 bg-slate-700 rounded-xl" />

        {/* EVENT TYPE */}
        <select name="type"
          onChange={handleChange}
          className="w-full p-3 bg-slate-700 rounded-xl"
        >
          <option value="individual">Individual Event</option>
          <option value="team">Team Event (Hackathon)</option>
        </select>

        {/* INDIVIDUAL SETTINGS */}
        {form.type === "individual" && (
          <input type="number" name="maxSeats"
            placeholder="Max Seats"
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 rounded-xl"
          />
        )}

        {/* TEAM SETTINGS */}
        {form.type === "team" && (
          <>
            <input type="number" name="maxTeams"
              placeholder="Max Teams"
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 rounded-xl"
            />

            <input type="number" name="teamSizeLimit"
              placeholder="Team Size Limit (ex: 3)"
              onChange={handleChange}
              className="w-full p-3 bg-slate-700 rounded-xl"
            />
          </>
        )}

        <button className="w-full bg-indigo-600 py-3 rounded-xl">
          Create Event 🚀
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
