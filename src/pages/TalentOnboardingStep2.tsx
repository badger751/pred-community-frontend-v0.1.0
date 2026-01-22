import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";
import { useOnboardingStore } from "../stores/onboardingStore"; // ← new import

function TalentOnboardingStep2() {
  const navigate = useNavigate();

  // Get setters and current values from store
  const { step2, setStep2 } = useOnboardingStore();

  // Local state (pre-filled from store if coming back)
  const [city, setCity] = useState(step2.city || "");
  const [country, setCountry] = useState(step2.country || "");
  const [timezone, setTimezone] = useState(step2.timezone || "");
  const [currentStatus, setCurrentStatus] = useState(step2.current_status || "");
  const [educationLevel, setEducationLevel] = useState(step2.education_level || "");
  const [majorSpecialization, setMajorSpecialization] = useState(step2.major_specialization || "");

  console.log("Inside TalentOnboardingStep2 — component body is executing");

  const handleSaveAndNext = () => {
    // Basic validation (required fields)
    if (!city.trim()) {
      alert("Please select or enter a city");
      return;
    }
    if (!country.trim()) {
      alert("Please select or enter a country");
      return;
    }
    if (!timezone.trim()) {
      alert("Please select a time zone");
      return;
    }
    if (!currentStatus.trim()) {
      alert("Please select your current status");
      return;
    }
    if (!educationLevel.trim()) {
      alert("Please select your education level");
      return;
    }
    if (!majorSpecialization.trim()) {
      alert("Please enter your major/specialization");
      return;
    }

    // Prepare data for step 2
    const step2Data = {
      city,
      country,
      timezone,
      current_status: currentStatus,
      education_level: educationLevel,
      major_specialization: majorSpecialization,
    };

    // Log 1: What we're about to save
    console.log("[Step 2] About to save to store:", step2Data);

    // Save to onboarding store
    setStep2(step2Data);

    // Log 2: Confirm full store state after save
    const currentState = useOnboardingStore.getState();
    console.log("[Step 2] Store state after save:", {
      step1: currentState.step1,
      step2: currentState.step2,
      step3: currentState.step3,
      onboarding_step: currentState.onboarding_step,
      onboarding_completed: currentState.onboarding_completed,
    });

    navigate("/talent-onboarding-3");
  };

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
            <input
              className="auth-input"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              className="auth-input"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <select
            className="auth-input full"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option value="">Select Time Zone</option>
            <option value="UTC-12:00">(UTC-12:00) Baker Island</option>
            <option value="UTC-11:00">(UTC-11:00) American Samoa</option>
            <option value="UTC-10:00">(UTC-10:00) Hawaii</option>
            <option value="UTC-9:00">(UTC-9:00) Alaska</option>
            <option value="UTC-8:00">(UTC-8:00) Pacific Time (US & Canada)</option>
            <option value="UTC-7:00">(UTC-7:00) Mountain Time (US & Canada)</option>
            <option value="UTC-6:00">(UTC-6:00) Central Time (US & Canada)</option>
            <option value="UTC-5:00">(UTC-5:00) Eastern Time (US & Canada)</option>
            <option value="UTC-4:00">(UTC-4:00) Atlantic Time</option>
            <option value="UTC-3:00">(UTC-3:00) Brasília</option>
            <option value="UTC-2:00">(UTC-2:00) Mid-Atlantic</option>
            <option value="UTC-1:00">(UTC-1:00) Azores</option>
            <option value="UTC+0:00">(UTC+0:00) London, Lisbon</option>
            <option value="UTC+1:00">(UTC+1:00) Paris, Berlin</option>
            <option value="UTC+2:00">(UTC+2:00) Cairo, Athens</option>
            <option value="UTC+3:00">(UTC+3:00) Moscow, Riyadh</option>
            <option value="UTC+4:00">(UTC+4:00) Dubai</option>
            <option value="UTC+5:00">(UTC+5:00) Karachi, Tashkent</option>
            <option value="UTC+5:30">(UTC+5:30) India (IST)</option>
            <option value="UTC+6:00">(UTC+6:00) Dhaka</option>
            <option value="UTC+7:00">(UTC+7:00) Bangkok, Jakarta</option>
            <option value="UTC+8:00">(UTC+8:00) Beijing, Singapore</option>
            <option value="UTC+9:00">(UTC+9:00) Tokyo, Seoul</option>
            <option value="UTC+10:00">(UTC+10:00) Sydney</option>
            <option value="UTC+11:00">(UTC+11:00) Vladivostok</option>
            <option value="UTC+12:00">(UTC+12:00) Auckland</option>
          </select>
        </div>

        {/* STATUS */}
        <div className="form-section">
          <p className="form-title">What best describes you?*</p>

          <div className="two-col">
            {["Student", "Recent graduate", "Working professional", "Other"].map((opt) => (
              <label key={opt} className="radio-row">
                <input
                  type="radio"
                  name="current_status"
                  checked={currentStatus === opt}
                  onChange={() => setCurrentStatus(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="form-section">
          <p className="form-title">What’s the highest level you’ve completed?*</p>

          <div className="two-col">
            {["High School", "Diploma", "Bachelor’s", "Master’s", "PhD", "Other"].map((opt) => (
              <label key={opt} className="radio-row">
                <input
                  type="radio"
                  name="education_level"
                  checked={educationLevel === opt}
                  onChange={() => setEducationLevel(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* MAJOR */}
        <div className="form-section">
          <p className="form-title">What is your major or specialization?*</p>
          <input
            className="auth-input"
            placeholder="Your major"
            value={majorSpecialization}
            onChange={(e) => setMajorSpecialization(e.target.value)}
          />
        </div>

        {/* ACTIONS */}
        <div className="card-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>

          <button className="next-btn" onClick={handleSaveAndNext}>
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TalentOnboardingStep2;