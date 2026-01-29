import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { useAuthStore } from "../stores/authStore";
import { useOrgOnboardingStore } from "../stores/orgOnboardingStore";

function OrgOnboarding2() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { step2, setStep2 } = useOrgOnboardingStore();

  const [industryDomain, setIndustryDomain] = useState(step2.industry_domain || "");
  const [opportunityDurations, setOpportunityDurations] = useState<string[]>(step2.opportunity_durations || []);
  const [openToEarlyTalent, setOpenToEarlyTalent] = useState<boolean>(step2.open_to_early_talent ?? true);
  const [supportStyle, setSupportStyle] = useState(step2.support_style || "");
  const [nonNegotiables, setNonNegotiables] = useState<string[]>(step2.non_negotiables || []);
  const [selectionMethod, setSelectionMethod] = useState(step2.preferred_selection_method || "");
  const [error, setError] = useState<string | null>(null);

  const toggleDuration = (value: string) => {
    setOpportunityDurations((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleNonNegotiable = (value: string) => {
    setNonNegotiables((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSaveAndNext = () => {
    setError(null);

    if (!industryDomain.trim()) {
      setError("Please enter your industry/domain");
      return;
    }

    if (opportunityDurations.length === 0) {
      setError("Please select at least one opportunity duration");
      return;
    }

    if (!supportStyle.trim()) {
      setError("Please select how you prefer to support work");
      return;
    }

    if (!selectionMethod.trim()) {
      setError("Please select a preferred selection method");
      return;
    }

    const step2Data = {
      industry_domain: industryDomain,
      opportunity_durations: opportunityDurations,
      open_to_early_talent: openToEarlyTalent,
      support_style: supportStyle,
      non_negotiables: nonNegotiables,
      preferred_selection_method: selectionMethod,
    };

    console.log("[Org Step 2] About to save:", step2Data);
    setStep2(step2Data);

    const currentState = useOrgOnboardingStore.getState();
    console.log("[Org Step 2] Store after save:", {
      step1: currentState.step1,
      step2: currentState.step2,
      onboarding_step: currentState.onboarding_step,
      onboarding_completed: currentState.onboarding_completed,
    });

    navigate("/organization-onboarding-3");
  };

  return (
    <div className="auth-wrapper">
      {/* LOGO */}
      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive" />
      </div>

      <div className="auth-top-right">
        <button
          className="top-action logout-btn"
          onClick={async () => {
            await logout();
            navigate("/login", { replace: true });
          }}
        >
          Log Out
        </button>
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
          <label>Which industry/domain best describes your organization?*</label>
          <textarea
            className="auth-input"
            rows={3}
            value={industryDomain}
            onChange={(e) => setIndustryDomain(e.target.value)}
            placeholder="E.g., FinTech, EdTech, Consumer goods, Healthcare, etc."
          />
        </div>

        {/* OPPORTUNITIES */}
        <div className="form-group">
          <label>What kind of opportunities would you usually post?*</label>
          <div className="radio-group">
            {["Small tasks (1 to 2 weeks)", "Short projects (2 to 4 weeks)", "Mid-length projects (1 to 2 months)", "Long projects (3+ months)", "Not sure yet"].map((opt) => (
              <label key={opt} className="radio-row">
                <input
                  type="checkbox"
                  checked={opportunityDurations.includes(opt)}
                  onChange={() => toggleDuration(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* ROLE */}
        <div className="form-group">
          <label>Are you open to early‑career talent?*</label>
          <div className="radio-group">
            <label className="radio-row">
              <input
                type="radio"
                name="early_talent"
                checked={openToEarlyTalent === true}
                onChange={() => setOpenToEarlyTalent(true)}
              />
              Yes
            </label>
            <label className="radio-row">
              <input
                type="radio"
                name="early_talent"
                checked={openToEarlyTalent === false}
                onChange={() => setOpenToEarlyTalent(false)}
              />
              No, experienced applicants only
            </label>
          </div>
        </div>

        {/* PRIMARY CONTACT */}
        <div className="form-group">
          <label>How do you prefer to support work once it starts?*</label>
          <div className="radio-group">
            <label className="radio-row">
              <input
                type="radio"
                name="support_style"
                checked={supportStyle === "Guided"}
                onChange={() => setSupportStyle("Guided")}
              />
              Guided: Clear steps + weekly check‑ins
            </label>
            <label className="radio-row">
              <input
                type="radio"
                name="support_style"
                checked={supportStyle === "Light-touch"}
                onChange={() => setSupportStyle("Light-touch")}
              />
              Light‑touch: Starter docs + async questions
            </label>
            <label className="radio-row">
              <input
                type="radio"
                name="support_style"
                checked={supportStyle === "Self-serve"}
                onChange={() => setSupportStyle("Self-serve")}
              />
              Self‑serve: Own delivery, minimal support
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>What are your non‑negotiables for collaboration? (Select all that apply)</label>
          <div className="chip-group">
            {["Communication skills", "On-time delivery", "Problem solving", "Collaboration skills", "Portfolio quality", "Initiative & ownership", "Attention to detail", "Learning mindset"].map((opt) => (
              <span
                key={opt}
                className={`chip ${nonNegotiables.includes(opt) ? "active" : ""}`}
                onClick={() => toggleNonNegotiable(opt)}
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Preferred selection method*</label>
          <div className="radio-group">
            {["Review applications", "Invite recommended matches", "Both"].map((opt) => (
              <label key={opt} className="radio-row">
                <input
                  type="radio"
                  name="selection"
                  checked={selectionMethod === opt}
                  onChange={() => setSelectionMethod(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: 8 }}>{error}</p>
        )}

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
            onClick={handleSaveAndNext}
          >
            Save & Next
          </button>
        </div>
      </div>

      <div className="auth-bottom-actions">
        <button
          className="top-action logout-btn"
          onClick={async () => {
            await logout();
            navigate("/login", { replace: true });
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default OrgOnboarding2;
