import { useNavigate } from "react-router-dom";
import "../auth.css";

function TalentOnboardingStep2() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">

      {/* TOP LEFT LOGO */}
      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive" />
      </div>

      {/* TOP RIGHT BUTTONS */}
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


      {/* HERO */}
      <div className="auth-hero onboarding-hero">
        <h2 className="auth-hero-title">Talent Onboarding</h2>

        <p className="auth-hero-subtitle">
          Let’s personalize your opportunity matches
        </p>

        <p className="auth-hero-helper">
          You can edit this information anytime
        </p>

        {/* STEP INDICATOR */}
        <div className="onboarding-steps">
          <span className="step completed">
            <span className="step-circle completed">✓</span>
            Goals & Interests
          </span>

          <span className="step-arrow">→</span>

          <span className="step active">
            <span className="step-circle">2</span>
            Background
          </span>

          <span className="step-arrow">→</span>

          <span className="step upcoming">
            <span className="step-circle">3</span>
            Work Style
          </span>
        </div>
      </div>

      {/* WHITE CARD */}
      <div className="onboarding-card">

        {/* LOCATION */}
        <div className="form-section">
          <p className="form-title">Where are you based?*</p>

          <div className="two-col">
            <select className="auth-input">
              <option>Choose city</option>
            </select>

            <select className="auth-input">
              <option>Choose country</option>
            </select>
          </div>

          <select className="auth-input full">
            <option>Time zone</option>
          </select>
        </div>

        {/* STATUS */}
        <div className="form-section">
          <p className="form-title">What best describes you?*</p>

          <label className="radio-row">
            <input type="radio" name="status" /> Student
          </label>
          <label className="radio-row">
            <input type="radio" name="status" /> Recent graduate
          </label>
          <label className="radio-row">
            <input type="radio" name="status" /> Working professional
          </label>
          <label className="radio-row">
            <input type="radio" name="status" /> Other
          </label>
        </div>

        {/* EDUCATION */}
        <div className="form-section">
          <p className="form-title">
            What’s the highest level you’ve completed?*
          </p>

          <div className="two-col">
            <label className="radio-row">
              <input type="radio" name="education" /> High School
            </label>
            <label className="radio-row">
              <input type="radio" name="education" /> Master’s
            </label>
            <label className="radio-row">
              <input type="radio" name="education" /> Diploma
            </label>
            <label className="radio-row">
              <input type="radio" name="education" /> PhD
            </label>
            <label className="radio-row">
              <input type="radio" name="education" /> Bachelor’s
            </label>
            <label className="radio-row">
              <input type="radio" name="education" /> Other
            </label>
          </div>
        </div>

        {/* MAJOR */}
        <div className="form-section">
          <p className="form-title">
            What is your major or specialization?*
          </p>
          <input
            className="auth-input"
            placeholder="Your major"
          />
        </div>

        {/* ACTIONS */}
        <div className="card-actions">
          <button
  className="back-btn"
  onClick={() => navigate(-1)}
>
  Back
</button>

          <button
  className="next-btn"
  onClick={() => navigate("/talent-onboarding-3")}
>
  Save & Next
</button>
        </div>

      </div>
    </div>
  );
}

export default TalentOnboardingStep2;
