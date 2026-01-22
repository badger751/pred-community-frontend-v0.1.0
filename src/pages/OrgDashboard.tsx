import { useEffect } from "react";
import "../dashboard.css";

function OrgDashboard() {
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "organization") {
      window.location.href = "/";
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Organization Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
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
