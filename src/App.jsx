import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";

import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEvent from "./pages/admin/CreateEvent";
import Requests from "./pages/admin/Requests";
import MyTickets from "./pages/student/MyTickets";
import Scanner from "./pages/admin/Scanner";
import AdminEvents from "./pages/admin/AdminEvents";
import Attendance from "./pages/admin/Attendance";
import AutoLogout from "./components/AutoLogout";


function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 min-h-screen text-white">
        <Navbar />
        <AutoLogout />  
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-event"
            element={
              <ProtectedRoute role="admin">
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute role="admin">
                <Requests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/tickets"
            element={
              <ProtectedRoute role="student">
                <MyTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/scanner"
            element={
              <ProtectedRoute role="admin">
                <Scanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute role="admin">
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute role="admin">
                <Attendance />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
