import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function TalentDashboard() {
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "talent") {
      window.location.href = "/";
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "30px" }}>
          <h2>Talent Dashboard</h2>
          <p>Welcome Talent 👋</p>
        </div>
      </div>
    </div>
  );
}

export default TalentDashboard;
