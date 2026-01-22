import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../auth.css";
import { useOrgOnboardingStore } from "../stores/orgOnboardingStore"; // ← assuming this path

function OrgOnboarding1() {
  const navigate = useNavigate();
  const { step1, setStep1 } = useOrgOnboardingStore();

  // Local state — pre-filled from store if coming back
  const [orgName, setOrgName] = useState(step1.organization_name || "");
  const [orgType, setOrgType] = useState(step1.organization_type || "");
  const [websiteUrl, setWebsiteUrl] = useState(step1.website_url || "");
  const [linkedinUrl, setLinkedinUrl] = useState(step1.linkedin_url || "");
  const [orgDomain, setOrgDomain] = useState(step1.organization_domain || "");
  const [userRole, setUserRole] = useState(step1.user_role_in_org || "");
  const [otherRole, setOtherRole] = useState(step1.other_role_specify || "");
  const [otherDomain, setOtherDomain] = useState(step1.other_domain_specify || "");
  const [otherType, setOtherType] = useState(step1.other_type_specify || "");

  const handleSaveAndNext = () => {
    // Basic validation for required fields
    if (!orgName.trim()) {
      alert("Please enter organization name");
      return;
    }
    if (!orgType.trim()) {
      alert("Please select organization type");
      return;
    }
    if (orgType === "Other" && !otherType.trim()) {
      alert("Please specify other organization type");
      return;
    }
    if (!websiteUrl.trim()) {
      alert("Please enter website link");
      return;
    }
    if (!orgDomain.trim()) {
      alert("Please select organization domain");
      return;
    }
    if (orgDomain === "Other" && !otherDomain.trim()) {
      alert("Please specify other domain");
      return;
    }
    if (!userRole.trim()) {
      alert("Please select your role in the organization");
      return;
    }
    if (userRole === "Other" && !otherRole.trim()) {
      alert("Please specify your role");
      return;
    }

    // Prepare Step 1 data (matches backend JSON structure)
    const step1Data = {
      organization_name: orgName,
      organization_type: orgType,
      website_url: websiteUrl,
      linkedin_url: linkedinUrl,
      organization_domain: orgDomain,
      user_role_in_org: userRole,
      other_role_specify: otherRole,
      other_domain_specify: otherDomain,
      other_type_specify: otherType,
    };

    // Log before save
    console.log("[Org Step 1] About to save:", step1Data);

    // Save to store
    setStep1(step1Data);

    // Log after save (confirm persistence)
    const currentState = useOrgOnboardingStore.getState();
    console.log("[Org Step 1] Store after save:", {
      step1: currentState.step1,
      onboarding_step: currentState.onboarding_step,
    });

    navigate("/organization-onboarding-2");
  };

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
          <input
            className="auth-input"
            placeholder="Your organization name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
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
          value={otherType}
          onChange={(e) => setOtherType(e.target.value)}
        />

        <div className="two-col">
          <div className="form-group">
            <label>Website link*</label>
            <input
              className="auth-input"
              placeholder="https://"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn profile</label>
            <input
              className="auth-input"
              placeholder="https://"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
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
                className={`chip ${orgDomain === item ? "active" : ""}`}
                onClick={() => setOrgDomain(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <input
          className="auth-input"
          placeholder="If you selected other, please specify"
          value={otherDomain}
          onChange={(e) => setOtherDomain(e.target.value)}
        />

        {/* NEW: User role in organization */}
        <div className="form-group">
          <label>Your role in the organization*</label>
          <div className="chip-group">
            {[
              "Founder / Co-founder",
              "CEO / Executive",
              "HR / Talent Acquisition",
              "Engineering / Tech Lead",
              "Product / Project Manager",
              "Marketing / Growth",
              "Other",
            ].map((item) => (
              <span
                key={item}
                className={`chip ${userRole === item ? "active" : ""}`}
                onClick={() => setUserRole(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <input
          className="auth-input"
          placeholder="If you selected other, please specify"
          value={otherRole}
          onChange={(e) => setOtherRole(e.target.value)}
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
            onClick={handleSaveAndNext}
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrgOnboarding1;