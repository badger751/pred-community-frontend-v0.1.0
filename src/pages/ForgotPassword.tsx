import { Link } from "react-router-dom";
import { useState } from "react";
import "../auth.css";
import { forgotPassword } from "../api/auth";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await forgotPassword({ email });
      setSubmitted(true);
    } catch {
      // intentionally generic to prevent account enumeration
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card">
          <h3 className="sign-in-title">Check your email</h3>

          <p className="auth-text font-light">
            If an account exists for <strong>{email}</strong>, you will receive a
            password reset link shortly.
          </p>

          <Link to="/login" className="auth-link">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      {/* TOP LEFT LOGO */}
      <div className="auth-logo" style={{ zIndex: 1000 }}>
        <img src="/Logo.svg" alt="Predulive logo" />
      </div>

      {/* TOP RIGHT LINKS */}
      <div className="auth-top-right" style={{ zIndex: 1000 }}>
        <Link to="/organization-signup" className="top-action">
          Sign in as Organization
        </Link>

        <Link to="/login" className="top-action">
          Sign in
        </Link>
      </div>

      {/* HERO TEXT (UNCHANGED) */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign-In as a Talent</p>
        <p className="auth-hero-desc">Build proof-of-work and get matched.</p>
      </div>

      {/* WHITE CARD */}
      <div className="auth-card">
        <h3 className="sign-in-title">Password Recovery</h3>

        <p className="auth-text font-light">
          Enter the email associated with your account and we’ll send you a
          password reset link.
        </p>

        <label className="input-label">Email</label>
        <input
          className="auth-input"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <div className="top-16" />

        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" className="auth-button secondary">
            Back
          </Link>

          <button
            className="auth-button"
            disabled={loading || !email}
            onClick={handleContinue}
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
