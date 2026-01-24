import { Link, useNavigate } from "react-router-dom";
import "../auth.css";
import { useState } from "react";

function OrgSignup() {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      {/* --- LOGO --- */}
      {/* Added zIndex to ensure it's not covered by the background */}
      <div className="auth-logo" style={{ zIndex: 1000 }}>
        <img src="/Logo.svg" alt="Predulive" />
      </div>

      {/* --- TOP RIGHT LINKS --- */}
      {/* Added zIndex: 1000 so these Links are clickable */}
      <div className="auth-top-right" style={{ zIndex: 1000 }}>
        <Link to="/signup" className="top-action">
          Sign up as Talent
        </Link>

        {/* You can point this to "/organization-signin" if you prefer */}
        <Link to="/login" className="top-action">
          Sign in
        </Link>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign‑up as Organization</p>
        <p className="auth-hero-helper">
          Post opportunities and discover reliable talent.
        </p>
      </div>

      {/* --- WHITE CARD --- */}
      <div
        className="auth-card org-signup-card"
        style={{ marginTop: "150px", marginBottom: "60px" }}
      >
        <p className="card-title">Register with</p>

        {/* SOCIAL LOGIN */}
        <div className="social-row">
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

        <p className="divider">or</p>

        <div className="form-group">
          <label>Name</label>
          <input className="auth-input" placeholder="Your full name" />
        </div>

        <div className="form-group">
          <label>Work email</label>
          <input
            className="auth-input"
            placeholder="name@company.com"
          />
        </div>

        <div className="form-group">
          <label>Create a password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="Use 8+ characters"
          />
        </div>

        <div className="form-group">
          <label>Confirm password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="Re-enter password"
          />
        </div>

        {/* REMEMBER ME */}
        <div
          className="remember-toggle-row"
          style={{ marginBottom: "16px" }}
        >
          <input
            className="react-switch-checkbox"
            id="remember-switch"
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <label className="react-switch-label" htmlFor="remember-switch">
            <span className="react-switch-button" />
          </label>
          <span>Remember me</span>
        </div>

        {/* EMAIL INFO */}
        <p
          style={{
            fontSize: "13px",
            color: "#9ca3af",
            marginBottom: "0px",
            marginTop: "50px" 
          }}
        >
          We’ll email a verification link to confirm your account.
        </p>

        {/* SIGN UP BUTTON */}
        <button
          type="button"
          className="auth-button"
          style={{ marginBottom: "18px" }}
          onClick={() => navigate("/organization-onboarding")}
        >
          Sign up
        </button>

        {/* FOOTER */}
        <p
          style={{
            fontSize: "13px",
            color: "#090a0bff",
            marginBottom: "20px",
          }}
        >
          {/* Changed this to point to Organization Signin instead of generic Login */}
          Already have an account? <Link to="/organization-signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default OrgSignup;