import { useNavigate } from "react-router-dom";
import "../auth.css";

function TalentOnboardingStep3() {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">

      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive" />
      </div>

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

      <div className="auth-hero onboarding-hero">
        <h2 className="auth-hero-title">Talent Onboarding</h2>

        <p className="auth-hero-subtitle">
          Let’s personalize your opportunity matches
        </p>

        <p className="auth-hero-helper">
          You can edit this information anytime
        </p>

        <div className="onboarding-steps">
          <span className="step completed">
            <span className="step-circle completed">✓</span>
            Goals & Interests
          </span>

          <span className="step-arrow">→</span>

          <span className="step completed">
            <span className="step-circle completed">✓</span>
            Background
          </span>

          <span className="step-arrow">→</span>

          <span className="step active">
            <span className="step-circle">3</span>
            Work Style
          </span>
        </div>
      </div>

      <div className="onboarding-card">

        <div className="form-section">
          <p className="form-title">How do you prefer to work?*</p>

          <label className="radio-row">
            <input type="radio" name="workStyle" /> Collaborative  
            <span className="helper-text">
              Regular check-ins, feedback loops, and shared ownership.
            </span>
          </label>

          <label className="radio-row">
            <input type="radio" name="workStyle" /> Independent  
            <span className="helper-text">
              Clear scope, then deliver with minimal back-and-forth.
            </span>
          </label>

          <label className="radio-row">
            <input type="radio" name="workStyle" /> Guided  
            <span className="helper-text">
              I do best with structure, examples, and a point of contact.
            </span>
          </label>
        </div>

        <div className="form-section">
          <p className="form-title">When can you start working?*</p>

          <label className="radio-row">
            <input type="radio" name="startTime" /> Immediately
          </label>
          <label className="radio-row">
            <input type="radio" name="startTime" /> Within a week
          </label>
          <label className="radio-row">
            <input type="radio" name="startTime" /> Within 2–4 weeks
          </label>
          <label className="radio-row">
            <input type="radio" name="startTime" /> Within a month
          </label>
          <label className="radio-row">
            <input type="radio" name="startTime" /> Just exploring
          </label>
        </div>

        <div className="form-section">
          <p className="form-title">Age range</p>

          <label className="radio-row">
            <input type="radio" name="age" /> Under 18
          </label>
          <label className="radio-row">
            <input type="radio" name="age" /> 18–20
          </label>
          <label className="radio-row">
            <input type="radio" name="age" /> 20–25
          </label>
          <label className="radio-row">
            <input type="radio" name="age" /> 26–34
          </label>
          <label className="radio-row">
            <input type="radio" name="age" /> 35+
          </label>
          <label className="radio-row">
            <input type="radio" name="age" /> Prefer not to say
          </label>
        </div>

        <div className="card-actions">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button 
            className="next-btn"
            onClick={() => navigate("/talent-dashboard-v2")}
          >
            View Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

export default TalentOnboardingStep3;