import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { useOnboardingStore } from "../stores/onboardingStore";
import { useAuthStore } from "../stores/authStore"; // for token / logout if needed

function TalentOnboardingStep3() {
  const navigate = useNavigate();

  // Get setters and current values from store
  const { step3, setStep3, completeOnboarding, resetOnboarding } = useOnboardingStore();
  const { accessToken, logout } = useAuthStore(); // optional: use from store if you prefer

  // Local state (pre-filled from store if coming back)
  const [workStyle, setWorkStyle] = useState(step3.work_style || "");
  const [startTimeline, setStartTimeline] = useState(step3.start_timeline || "");
  const [ageRange, setAgeRange] = useState(step3.age_range || "");
  const [availability, setAvailability] = useState(step3.availability || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Inside TalentOnboardingStep3 — component body is executing");

  const handleFinish = async () => {
    // Basic validation (required fields)
    if (!workStyle.trim()) {
      setError("Please select how you prefer to work");
      return;
    }
    if (!startTimeline.trim()) {
      setError("Please select when you can start working");
      return;
    }
    if (!ageRange.trim()) {
      setError("Please select your age range");
      return;
    }
    if (!availability.trim()) {
      setError("Please select your availability");
      return;
    }
    

    setLoading(true);
    setError(null);

    // Prepare data for step 3
    const step3Data = {
      work_style: workStyle,
      start_timeline: startTimeline,
      age_range: ageRange,
      availability,
    };

    // Log 1: What we're about to save to store
    console.log("[Step 3] About to save to store:", step3Data);

    // Save to onboarding store
    setStep3(step3Data);

    // Log 2: Confirm full store state after save
    const currentState = useOnboardingStore.getState();
    console.log("[Step 3] Store state after save:", {
      step1: currentState.step1,
      step2: currentState.step2,
      step3: currentState.step3,
      onboarding_step: currentState.onboarding_step,
      onboarding_completed: currentState.onboarding_completed,
    });

    // Mark as completed
    completeOnboarding();

    // Log 3: Final complete payload ready to send to backend
    const fullPayload = {
      ...currentState.step1,
      ...currentState.step2,
      ...currentState.step3,
      onboarding_step: 3,
      onboarding_completed: true,
    };
    console.log("[Final] Complete onboarding payload ready:", fullPayload);

    try {
      // Get token (try store first, fallback to localStorage)
      let token = accessToken || localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      console.log("[API] Sending full profile with token:", token.substring(0, 20) + "...");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/profiles/profile/talent`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fullPayload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("[API] Backend error:", data);
        throw new Error(data.detail || data.message || "Failed to complete onboarding");
      }

      console.log("[API] Onboarding completed successfully:", data);

      // Success: reset store, go to dashboard
      resetOnboarding();
      navigate("/talent-dashboard-v2");

    } catch (err: any) {
      console.error("[API] Save failed:", err);
      setError(err.message || "Failed to complete onboarding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">

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

          {["Collaborative", "Independent", "Guided"].map((opt) => (
            <label key={opt} className="radio-row">
              <input
                type="radio"
                name="workStyle"
                checked={workStyle === opt}
                onChange={() => setWorkStyle(opt)}
              />
              {opt}
              <span className="helper-text">
                {opt === "Collaborative" && "Regular check-ins, feedback loops, and shared ownership."}
                {opt === "Independent" && "Clear scope, then deliver with minimal back-and-forth."}
                {opt === "Guided" && "I do best with structure, examples, and a point of contact."}
              </span>
            </label>
          ))}
        </div>

        <div className="form-section">
          <p className="form-title">When can you start working?*</p>

          {["Immediately", "Within a week", "Within 2–4 weeks", "Within a month", "Just exploring"].map((opt) => (
            <label key={opt} className="radio-row">
              <input
                type="radio"
                name="startTime"
                checked={startTimeline === opt}
                onChange={() => setStartTimeline(opt)}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="form-section">
          <p className="form-title">Age range</p>

          {["Under 18", "18–20", "20–25", "26–34", "35+", "Prefer not to say"].map((opt) => (
            <label key={opt} className="radio-row">
              <input
                type="radio"
                name="age"
                checked={ageRange === opt}
                onChange={() => setAgeRange(opt)}
              />
              {opt}
            </label>
          ))}
        </div>

        {/* Missing field from your JSON — added here */}
        <div className="form-section">
          <p className="form-title">Availability</p>
          <input
            className="auth-input"
            placeholder="e.g. Full-time, Part-time, Freelance..."
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>

        {/* ERROR */}
        {error && <p style={{ color: "red", marginTop: "16px" }}>{error}</p>}

        <div className="card-actions">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button 
            className="next-btn"
            onClick={handleFinish}
            disabled={loading}
          >
            {loading ? "Saving..." : "View Dashboard"}
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

export default TalentOnboardingStep3;
