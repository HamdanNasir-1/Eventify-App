import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    };

    // 🔴 Logout on tab close / refresh
    const handleUnload = () => logout();
    window.addEventListener("beforeunload", handleUnload);

    // 🟡 Logout after 5 minutes inactivity
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
    };

    // Track activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer(); // start timer

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default AutoLogout;
