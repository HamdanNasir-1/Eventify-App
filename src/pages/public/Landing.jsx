import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="px-6 md:px-16 py-16 space-y-24">
      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Manage College Events
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Effortlessly
            </span>
          </h1>

          <p className="text-slate-400 mt-6 text-lg">
            Create events, manage registrations, approve students and issue QR
            tickets — all in one platform.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-600 px-6 py-3 rounded-xl hover:bg-slate-800"
            >
              Login
            </Link>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.3)] border border-indigo-500/20">
          <h3 className="text-2xl font-bold mb-4">🎟️ Smart QR Tickets</h3>
          <p className="text-slate-400">
            Students receive secure QR passes after approval. Scan at entry for
            instant attendance.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <h2 className="text-4xl font-bold text-center mb-14">
          Why CampusEvents?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-semibold mb-3"> Event Creation</h3>
            <p className="text-slate-400">
              Admins can create and manage college events easily.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-semibold mb-3"> Approval System</h3>
            <p className="text-slate-400">
              Students apply and admins approve registrations.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-semibold mb-3"> QR Attendance</h3>
            <p className="text-slate-400">
              Scan QR tickets to mark attendance instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
