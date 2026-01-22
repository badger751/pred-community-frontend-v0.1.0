function Header() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#000",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h3>My App</h3>
      <button
        onClick={logout}
        style={{
          background: "white",
          color: "black",
          border: "none",
          padding: "8px 14px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
