import { Link } from "react-router-dom";
import "../auth.css";

function TalentSignIn() {
  return (
    <div className="auth-wrapper">

      {/* LOGO */}
      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive" />
      </div>

      {/* TOP RIGHT */}
      <div className="auth-top-right">
        <Link to="/signup" className="top-action">
          Sign up as Talent
        </Link>
        <Link to="/login" className="top-action">
          Sign in
        </Link>
      </div>

      {/* HERO */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign‑in as Talent</p>
        <p className="auth-hero-helper">
          Find opportunities and collaborate with organizations.
        </p>
      </div>

      {/* CARD */}
      <div className="auth-card">

        <p className="card-title">Sign in with</p>

        <div className="social-row">
          <button className="social-btn">f</button>
          <button className="social-btn"></button>
          <button className="social-btn">G</button>
        </div>

        <p className="divider">or</p>

        <div className="form-group">
          <label>Email*</label>
          <input
            className="auth-input"
            type="email"
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label>Password*</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter password"
          />
        </div>

        <div className="remember-row">
          <input type="checkbox" />
          <span>Remember me</span>
        </div>

        <button className="auth-submit-btn">
          Sign In
        </button>

        <p className="form-footer">
          Don’t have an account?{" "}
          <Link to="/talent-signup">Sign up</Link>
        </p>

      </div>
    </div>
  );
}

export default TalentSignIn;
