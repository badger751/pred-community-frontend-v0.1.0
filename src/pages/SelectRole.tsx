import "../auth.css";

function SelectRole() {
  const handleRole = (role: string) => {
    localStorage.setItem("role", role);
    window.location.href =
      role === "talent" ? "/talent" : "/organization";
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Choose Your Role</h2>

        <button
          className="auth-button"
          style={{ marginBottom: "12px" }}
          onClick={() => handleRole("talent")}
        >
          Continue as Talent
        </button>

        <button
          className="auth-button"
          onClick={() => handleRole("organization")}
        >
          Continue as Organization
        </button>
      </div>
    </div>
  );
}

export default SelectRole;
