import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

function OrgOnboarding3() {
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

  <span className="step done">
    <span className="step-circle done">✓</span>
    Preferences
  </span>

  <span className="arrow">→</span>

  <span className="step active">
    <span className="step-circle">3</span>
    Expectations
  </span>
</div>

      </div>

      {/* WHITE CARD */}
      <div className="auth-card org-onboarding-card">
        {/* Q1 */}
        <div className="form-group">
          <label>Are you open to early‑career talent?*</label>
          <div className="radio-group">
            <label className="radio-row">
              <input type="radio" name="career" /> Yes
            </label>
            <label className="radio-row">
              <input type="radio" name="career" /> No, experienced applicants only
            </label>
          </div>
        </div>

        {/* Q2 */}
        <div className="form-group">
          <label>How do you prefer to support work once it starts?*</label>
          <div className="radio-group">
            <label className="radio-row">
              <input type="radio" name="support" /> Guided: Clear steps + weekly check‑ins
            </label>
            <label className="radio-row">
              <input type="radio" name="support" /> Light‑touch: Starter docs + async questions
            </label>
            <label className="radio-row">
              <input type="radio" name="support" /> Self‑serve: Own delivery, minimal support
            </label>
          </div>
        </div>

        {/* Q3 */}
        <div className="form-group">
          <label>What are your non‑negotiables for collaboration?*</label>
          <div className="chip-group">
            <span className="chip">Communication skills</span>
            <span className="chip">On‑time delivery</span>
            <span className="chip">Problem solving</span>
            <span className="chip">Collaboration skills</span>
            <span className="chip">Portfolio quality</span>
            <span className="chip">Initiative & ownership</span>
            <span className="chip">Attention to detail</span>
            <span className="chip">Learning mindset</span>
          </div>
        </div>

        {/* Q4 */}
        <div className="form-group">
          <label>Preferred selection method</label>
          <div className="radio-group">
            <label className="radio-row">
              <input type="radio" name="selection" /> Review applications
            </label>
            <label className="radio-row">
              <input type="radio" name="selection" /> Invite recommended matches
            </label>
            <label className="radio-row">
              <input type="radio" name="selection" /> Both
            </label>
          </div>
        </div>

        {/* ACTIONS */}
        <div
  className="onboarding-actions"
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",   // 🔑 SAME LEVEL
    marginTop: 48,
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
    onClick={() => navigate("/organization-onboarding-2")}
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
    onClick={() => navigate("/organization")}
  >
    Go to dashboard
  </button>
</div>

      </div>
    </div>
  );
}

export default OrgOnboarding3;
