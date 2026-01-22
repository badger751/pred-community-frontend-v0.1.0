import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#111",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h3 style={{ marginBottom: "30px" }}>Dashboard</h3>

      <Link to="/talent" style={{ color: "white", display: "block", marginBottom: "16px" }}>
        Home
      </Link>

      <Link to="/profile" style={{ color: "white", display: "block", marginBottom: "16px" }}>
        Profile
      </Link>

      <Link to="/settings" style={{ color: "white", display: "block", marginBottom: "16px" }}>
        Settings
      </Link>
    </div>
  );
}

export default Sidebar;
