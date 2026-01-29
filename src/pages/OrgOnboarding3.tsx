import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { useAuthStore } from "../stores/authStore";
import { useOrgOnboardingStore } from "../stores/orgOnboardingStore";

function OrgOnboarding3() {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuthStore();
  const { step3, setStep3, completeOnboarding, resetOnboarding } = useOrgOnboardingStore();

  const [primaryContactName, setPrimaryContactName] = useState(step3.primary_contact_name || "");
  const [primaryContactEmail, setPrimaryContactEmail] = useState(step3.primary_contact_email || "");
  const [hiringUrgency, setHiringUrgency] = useState(step3.typical_hiring_urgency || "");
  const [orgDescription, setOrgDescription] = useState(step3.org_description || "");
  const [publicDescription, setPublicDescription] = useState(step3.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (!primaryContactName.trim()) {
      setError("Please enter a primary contact name");
      return;
    }
    if (!primaryContactEmail.trim()) {
      setError("Please enter a primary contact email");
      return;
    }
    if (!hiringUrgency.trim()) {
      setError("Please select your typical hiring urgency");
      return;
    }
    if (!orgDescription.trim()) {
      setError("Please add a short organization description");
      return;
    }
    if (!publicDescription.trim()) {
      setError("Please add what you expect from collaborations");
      return;
    }

    setError(null);
    setLoading(true);

    const step3Data = {
      primary_contact_name: primaryContactName,
      primary_contact_email: primaryContactEmail,
      typical_hiring_urgency: hiringUrgency,
      org_description: orgDescription,
      description: publicDescription,
    };

    console.log("[Org Step 3] About to save to store:", step3Data);
    setStep3(step3Data);

    const currentState = useOrgOnboardingStore.getState();
    console.log("[Org Step 3] Store state after save:", {
      step1: currentState.step1,
      step2: currentState.step2,
      step3: currentState.step3,
      onboarding_step: currentState.onboarding_step,
      onboarding_completed: currentState.onboarding_completed,
    });

    completeOnboarding();

    const fullPayload = {
      ...currentState.step1,
      ...currentState.step2,
      ...step3Data,
      onboarding_step: 3,
      onboarding_completed: true,
    };

    console.log("[Org Final] Complete onboarding payload ready:", fullPayload);

    try {
      const token = accessToken || localStorage.getItem("access_token");

      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      console.log("[Org API] Sending full profile with token:", token.substring(0, 20) + "...");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/profiles/profile/organization`,
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
        console.error("[Org API] Backend error:", data);
        throw new Error(data.detail || data.message || "Failed to complete organization onboarding");
      }

      console.log("[Org API] Onboarding completed successfully:", data);
      resetOnboarding();
      navigate("/org", { replace: true });
    } catch (err: any) {
      console.error("[Org API] Save failed:", err);
      setError(err?.message || "Failed to complete onboarding. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <div className="form-group">
          <label>Primary contact*</label>
          <div className="two-col">
            <input
              className="auth-input"
              placeholder="Full name"
              value={primaryContactName}
              onChange={(e) => setPrimaryContactName(e.target.value)}
            />
            <input
              className="auth-input"
              placeholder="Email address"
              value={primaryContactEmail}
              onChange={(e) => setPrimaryContactEmail(e.target.value)}
            />
          </div>
          <p className="auth-hero-helper" style={{ marginTop: 6 }}>
            This will be shown on opportunities as the point of contact.
          </p>
        </div>

        <div className="form-group">
          <label>What’s your typical hiring urgency?*</label>
          <div className="radio-group">
            {["Immediately (1-2 weeks)", "Soon (2-4 weeks)", "This quarter (1-3 months)", "Flexible / not sure"].map((opt) => (
              <label key={opt} className="radio-row">
                <input
                  type="radio"
                  name="urgency"
                  checked={hiringUrgency === opt}
                  onChange={() => setHiringUrgency(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>How would you describe your organization?*</label>
          <textarea
            className="auth-input"
            rows={3}
            value={orgDescription}
            onChange={(e) => setOrgDescription(e.target.value)}
            placeholder="Mission, size, locations, products, or teams involved."
          />
        </div>

        <div className="form-group">
          <label>What should talent expect when collaborating with you?*</label>
          <textarea
            className="auth-input"
            rows={3}
            value={publicDescription}
            onChange={(e) => setPublicDescription(e.target.value)}
            placeholder="Working style, communication cadence, tools, decision process, etc."
          />
        </div>

        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}

        <div
          className="onboarding-actions"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
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
            onClick={handleFinish}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Finish"}
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

export default OrgOnboarding3;
