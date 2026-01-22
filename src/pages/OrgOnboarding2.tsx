import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

function OrgOnboarding2() {
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
      <div className="auth-hero onboarding-hero">
        <h2 className="auth-hero-title">Organization Onboarding</h2>
        <p className="auth-hero-subtitle">
          Let’s personalize your talent matches
        </p>
        <p className="auth-hero-helper">
          You can edit this information anytime
        </p>

        <div className="onboarding-steps">
  <span className="step done">
    <span className="step-circle done">✓</span>
    Org Details
  </span>

  <span className="arrow">→</span>

  <span className="step active">
    <span className="step-circle active">2</span>
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
        {/* DESCRIPTION */}
        <div className="form-group">
          <label>How would you describe your organization?*</label>
          <textarea
            className="auth-input"
            rows={4}
            placeholder="This description can be associated to your profile and can be visible to the talent pool."
          />
        </div>

        {/* OPPORTUNITIES */}
        <div className="form-group">
          <label>What kind of opportunities would you usually post?</label>
          <div className="radio-group">
            <label className="radio-row">
              <input type="radio" name="opportunity" /> Small tasks (1 to 2 weeks)
            </label>
            <label className="radio-row">
              <input type="radio" name="opportunity" /> Short projects (2 to 4 weeks)
            </label>
            <label className="radio-row">
              <input type="radio" name="opportunity" /> Mid‑length projects (1 to 2 months)
            </label>
            <label className="radio-row">
              <input type="radio" name="opportunity" /> Long projects (3+ months)
            </label>
            <label className="radio-row">
              <input type="radio" name="opportunity" /> Not sure yet
            </label>
          </div>
        </div>

        {/* ROLE */}
        <div className="form-group">
          <label>Your role*</label>
          <div className="chip-group">
            <span className="chip">Founder / Leadership</span>
            <span className="chip">HR / Talent Acquisition</span>
            <span className="chip">Hiring Manager</span>
            <span className="chip">Other</span>
          </div>
        </div>

        <input
          className="auth-input"
          placeholder="If you selected other, please specify"
        />

        {/* PRIMARY CONTACT */}
        <div className="form-group">
          <label>Primary contact*</label>
          <div className="two-col">
            <input className="auth-input" placeholder="Full name" />
            <input className="auth-input" placeholder="Email address" />
          </div>
          <p className="auth-hero-helper" style={{ marginTop: 6 }}>
            This will be shown on the opportunity as the point of contact
          </p>
        </div>

        {/* ACTIONS */}
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
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              margin: 0,
            }}
            onClick={() => navigate("/organization-onboarding")}
          >
            Back
          </button>

          <button
            className="auth-button"
            style={{
              height: 40,
              display: "flex",
              alignItems: "center",
              margin: 0,
            }}
            onClick={() => navigate("/organization-onboarding-3")}
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrgOnboarding2;
