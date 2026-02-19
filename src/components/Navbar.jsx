import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaCalendarAlt className="text-indigo-500" />
          CampusEvents
        </Link>

        {!user && (
          <div className="flex gap-6 items-center">
            <Link to="/login">Login</Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-xl"
            >
              Signup
            </Link>
          </div>
        )}

        {/* STUDENT NAV */}
        {user?.role === "student" && (
          <div className="flex items-center gap-6">
            <Link to="/student/dashboard">Dashboard</Link>
            <Link to="/student/tickets">My Tickets 🎟️</Link>

            <span className="text-slate-300">
              Hi, <span className="text-indigo-400">{user.name}</span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        )}

        {/* ADMIN NAV */}
        {user?.role === "admin" && (
          <div className="flex items-center gap-6">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/create-event">Create Event </Link>
            <Link to="/admin/requests">Requests </Link>
            <Link to="/admin/events">Manage Events </Link>
            <Link to="/admin/scanner">Scan QR </Link>
            <Link to="/admin/attendance">Attendance </Link>


            <span className="text-slate-300">
              Hi, <span className="text-indigo-400">{user.name}</span>
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
