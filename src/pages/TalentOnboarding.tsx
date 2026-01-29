import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { useAuthStore } from "../stores/authStore";
import { useOnboardingStore } from "../stores/onboardingStore"; // ← new import

function TalentOnboarding() {
  const navigate = useNavigate();
  const { logout } = useAuthStore(); // get user & logout
  const { setStep1 } = useOnboardingStore(); // get setter for step 1

  const [focusRightNow, setFocusRightNow] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [weeklyCommitment, setWeeklyCommitment] = useState<string>("");
  const [opportunityTypes, setOpportunityTypes] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const domains = [
    "UI developer",
    "Java developer",
    "Vibe coding",
    "AI",
    "Business development",
    "Graphic design",
    "Product management",
    "Data analytics",
  ];

  console.log("Inside TalentOnboarding — component body is executing");

  const handleSaveAndNext = () => {
    setLoading(true);
    setError(null);

    // Basic validation
    if (focusRightNow.length === 0) {
      setError("Please select your current focus");
      setLoading(false);
      return;
    }
    if (selectedDomains.length === 0) {
      setError("Please select at least one domain");
      setLoading(false);
      return;
    }
    if (!weeklyCommitment) {
      setError("Please select weekly commitment");
      setLoading(false);
      return;
    }
    if (opportunityTypes.length === 0) {
      setError("Please select at least one opportunity type");
      setLoading(false);
      return;
    }

    // Prepare data for step 1
    const step1Data = {
   focus_right_now: focusRightNow.join(", "),
      domains: selectedDomains,
      weekly_commitment: weeklyCommitment,
      opportunity_types: opportunityTypes,
    };

    // Log 1: What we are about to save
    console.log("[Step 1] About to save to store:", step1Data);

    // Save to onboarding store
    setStep1(step1Data);

    // Log 2: Confirm what is now in the store
    const currentState = useOnboardingStore.getState();
    console.log("[Step 1] Store state after save:", {
      step1: currentState.step1,
      step2: currentState.step2,
      step3: currentState.step3,
      onboarding_step: currentState.onboarding_step,
      onboarding_completed: currentState.onboarding_completed,
    });

    setLoading(false);
    navigate("/talent-onboarding-2");
  };

  return (
    <div className="auth-wrapper">
      {/* TOP BAR */}
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
        <h2 className="auth-hero-title">Talent Onboarding</h2>
        <p className="auth-hero-subtitle">Let’s personalize your opportunity matches</p>
        <p className="auth-hero-helper">You can edit this information anytime</p>

        {/* STEP INDICATOR */}
        <div className="onboarding-steps">
          <span className="step active">
            <span className="step-circle active">1</span>
            Goals & Interests
          </span>
          <span className="arrow">→</span>
          <span className="step upcoming">
            <span className="step-circle upcoming">2</span>
            Background
          </span>
          <span className="arrow">→</span>
          <span className="step upcoming">
            <span className="step-circle upcoming">3</span>
            Work Style
          </span>
        </div>
      </div>

      {/* WHITE FORM CARD */}
      <div className="onboarding-card">
        {/* SECTION 1: Focus Right Now */}
        <div className="form-section">
          <p className="form-title">What’s your focus right now?*</p>
          {["Earn", "Gain experience", "Explore"].map((option) => (
            <label key={option} className="checkbox-row">
              <input
                type="checkbox"
                checked={focusRightNow.includes(option)}
                onChange={() =>
                  setFocusRightNow((prev) =>
                    prev.includes(option)
                      ? prev.filter((o) => o !== option)
                      : [...prev, option]
                  )
                }
              />
              {option}
            </label>
          ))}
        </div>

        {/* SECTION 2: Domains */}
        <div className="form-section">
          <p className="form-title">What domains are you interested in?*</p>
          <div className="pill-group">
            {domains.map((domain) => (
              <span
                key={domain}
                className={`pill ${selectedDomains.includes(domain) ? "active" : ""}`}
                onClick={() =>
                  setSelectedDomains((prev) =>
                    prev.includes(domain)
                      ? prev.filter((d) => d !== domain)
                      : [...prev, domain]
                  )
                }
              >
                {domain}
              </span>
            ))}
          </div>
        </div>

        {/* SECTION 3: Weekly Commitment */}
        <div className="form-section">
          <p className="form-title">How much time can you commit per week?*</p>
          <div className="two-col">
            {["2–4 hrs", "5–10 hrs", "10–15 hrs", "20+ hrs", "40 hrs"].map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  name="weekly_commitment"
                  checked={weeklyCommitment === opt}
                  onChange={() => setWeeklyCommitment(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* SECTION 4: Opportunity Types */}
        <div className="form-section">
          <p className="form-title">What opportunities are you open to?*</p>
          <div className="two-col">
            {["Projects", "Internship", "Research", "Contract roles", "Part-time roles", "Full-time roles"].map(
              (opt) => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    checked={opportunityTypes.includes(opt)}
                    onChange={() =>
                      setOpportunityTypes((prev) =>
                        prev.includes(opt)
                          ? prev.filter((o) => o !== opt)
                          : [...prev, opt]
                      )
                    }
                  />
                  {opt}
                </label>
              )
            )}
          </div>
        </div>

        {/* ERROR */}
        {error && <p style={{ color: "red", marginTop: "16px" }}>{error}</p>}

        {/* ACTION BUTTONS */}
        <div className="card-actions">
          <button className="back-btn" onClick={() => navigate("/login")}>
            Back
          </button>

          <button
            className="next-btn"
            onClick={handleSaveAndNext}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TalentOnboarding;
