import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful 🎉");

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4">
      <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-slate-700">
        
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>
        <p className="text-center text-slate-400 mb-8">
          Login to access your events and tickets
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>

          <div>
            <label className="text-sm text-slate-300">Email</label>
            <div className="flex items-center bg-slate-900 mt-2 px-3 py-3 rounded-xl">
              <FaEnvelope className="text-slate-400 mr-3" />
              <input name="email" onChange={handleChange} type="email" placeholder="Enter your email" className="bg-transparent outline-none w-full text-white" />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-300">Password</label>
            <div className="flex items-center bg-slate-900 mt-2 px-3 py-3 rounded-xl">
              <FaLock className="text-slate-400 mr-3" />
              <input name="password" onChange={handleChange} type="password" placeholder="Enter your password" className="bg-transparent outline-none w-full text-white" />
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500">
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
