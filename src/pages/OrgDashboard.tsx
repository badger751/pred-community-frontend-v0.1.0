import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import "../dashboard.css";

function OrgDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "organization") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Organization Dashboard</h2>
        <button
          className="logout-btn"
          onClick={async () => {
            await logout();
            navigate("/login", { replace: true });
          }}
        >
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <h3>Welcome, Organization 👋</h3>
        <p>This is your dashboard.</p>
      </div>
    </div>
  );
}

export default OrgDashboard;
