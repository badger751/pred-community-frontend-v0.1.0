import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../auth.css";

function OrgOnboarding1() {
  const [orgType, setOrgType] = useState("");
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      {/* LOGO */}
      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive" />
      </div>

      {/* TOP RIGHT LINKS */}
      <div className="auth-top-right">
        <Link to="/signup" className="top-action">
          Sign up as Talent
        </Link>
        <Link to="/login" className="top-action">
          Sign in
        </Link>
      </div>

      {/* HERO */}
      <div className="auth-hero onboarding-hero onboarding-step-p1">
        <h2 className="auth-hero-title">Organization Onboarding</h2>
        <p className="auth-hero-subtitle">
          Let’s personalize your talent matches
        </p>
        <p className="auth-hero-helper">
          You can edit this information anytime
        </p>

        {/* STEPS — FIXED (CIRCLES ONLY) */}
        <div className="onboarding-steps">
          <span className="step active">
            <span className="step-circle active">1</span>
            Org Details
          </span>

          <span className="arrow">→</span>

          <span className="step upcoming">
            <span className="step-circle upcoming">2</span>
            Preferences
          </span>

          <span className="arrow">→</span>

          <span className="step upcoming">
            <span className="step-circle upcoming">3</span>
            Expectations
          </span>
        </div>
      </div>

      {/* WHITE CARD */}
      <div className="auth-card org-onboarding-card">
        <div className="form-group">
          <label>Organization name*</label>
          <input className="auth-input" placeholder="Your full name" />
        </div>

        <div className="form-group">
          <label>Organization type*</label>
          <div className="chip-group">
            {[
              "Startup",
              "SME",
              "Enterprise",
              "University / Lab",
              "Non‑profit",
              "Agency",
              "Other",
            ].map((item) => (
              <span
                key={item}
                className={`chip ${orgType === item ? "active" : ""}`}
                onClick={() => setOrgType(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <input
          className="auth-input"
          placeholder="If you selected other, please specify"
        />

        <div className="two-col">
          <div className="form-group">
            <label>Website link*</label>
            <input className="auth-input" placeholder="https://" />
          </div>

          <div className="form-group">
            <label>LinkedIn profile</label>
            <input className="auth-input" placeholder="https://" />
          </div>
        </div>

        <div className="form-group">
          <label>What domain is the organization associated with?*</label>
          <div className="chip-group">
            {[
              "Software / Product",
              "Data / AI",
              "Design / Creative",
              "Social impact / Non‑profit",
              "Marketing / Growth",
              "Business / Operations",
              "Research / Academia",
              "Other",
            ].map((item) => (
              <span
                key={item}
                className={`chip ${domain === item ? "active" : ""}`}
                onClick={() => setDomain(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <input
          className="auth-input"
          placeholder="If you selected other, please specify"
        />

        {/* ACTION BUTTONS */}
        <div
          className="onboarding-actions"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <button
            className="secondary-btn"
            style={{ margin: 0 }}
            onClick={() => navigate("/organization-signup")}
          >
            Back
          </button>

          <button
            className="auth-button"
            style={{ margin: 0 }}
            onClick={() => navigate("/organization-onboarding-2")}
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrgOnboarding1;
