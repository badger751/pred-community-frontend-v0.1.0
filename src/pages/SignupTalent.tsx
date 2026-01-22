import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import "../auth.css";

function SignupTalent() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="auth-wrapper">
      {/* TOP LEFT LOGO */}
      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive logo" />
      </div>

      {/* TOP RIGHT ACTIONS */}
<div className="auth-top-right">
  <button
    className="top-action"
    onClick={() => navigate("/organization-signup")}
  >
    Sign in as Organization
  </button>

  <button
    className="top-action"
    onClick={() => navigate("/login")}
  >
    Sign in
  </button>
</div>


      {/* HERO TEXT */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign‑up as a Talent</p>
        <p className="auth-hero-desc">
          Build proof‑of‑work and get matched.
        </p>
      </div>

      {/* WHITE CARD */}
      <div className="auth-card">
        <h3 className="sign-in-title">Register with</h3>

        <div className="social-login">
          <div className="social-btn">
            <img src="/facebook.png" alt="facebook" />
          </div>
          <div className="social-btn">
            <img src="/apple.png" alt="apple" />
          </div>
          <div className="social-btn">
            <img src="/google.png" alt="google" />
          </div>
        </div>

        <div className="or-text">or</div>

        <input
          className="auth-input"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* REMEMBER ME SWITCH */}
        <div className="remember-row">
  <label className="remember-toggle-row">
    <input
      type="checkbox"
      checked={remember}
      onChange={() => setRemember(!remember)}
      className="toggle-input"
    />
    <span className="toggle-switch"></span>
    <span className="toggle-text">Remember me</span>
  </label>
</div>

        <button className="auth-button">Sign up</button>

        <p className="auth-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupTalent;
