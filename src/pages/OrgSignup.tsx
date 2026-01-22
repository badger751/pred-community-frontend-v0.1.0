import { Link, useNavigate } from "react-router-dom";
import "../auth.css";
import { useState } from "react";

function OrgSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOrgSignup = async () => {
    if (isSubmitting) return;

    setErrorMessage(null);

    // Basic client-side validation
    if (!name.trim()) {
      setErrorMessage("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your work email");
      return;
    }
    if (!password) {
      setErrorMessage("Please create a password");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/orgsignup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
            full_name: name.trim(),
            role: "organization", // or "org" – match what your backend expects
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle duplicate email or other backend errors
        if (
          data?.detail?.toLowerCase().includes("already registered") ||
          data?.message?.toLowerCase().includes("already exists") ||
          data?.error?.toLowerCase().includes("duplicate") ||
          response.status === 409
        ) {
          setErrorMessage("This email is already registered. Please sign in or use a different email.");
        } else {
          setErrorMessage(data?.detail || data?.message || "Organization signup failed. Please try again.");
        }
        return;
      }

      // Success
      console.log("Org signup successful:", data);
      navigate("/organization-onboarding");

    } catch (error) {
      console.error("Org signup error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* TOP LEFT LOGO */}
      <div className="auth-logo" style={{ zIndex: 1000 }}>
        <img src="/Logo.svg" alt="Predulive" />
      </div>

      {/* TOP RIGHT LINKS */}
      <div className="auth-top-right" style={{ zIndex: 1000 }}>
        <Link to="/signup" className="top-action">
          Sign up as Talent
        </Link>
        <Link to="/login" className="top-action">
          Sign in
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign-up as Organization</p>
        <p className="auth-hero-helper">
          Post opportunities and discover reliable talent.
        </p>
      </div>

      {/* WHITE CARD */}
      <div
        className="auth-card org-signup-card"
        style={{ marginTop: "150px", marginBottom: "60px" }}
      >
        <p className="card-title">Register with</p>

        {/* SOCIAL LOGIN */}
        <div className="social-row">
          <div className="social-btn">
            <img src="/facebook.png" alt="facebook" />
          </div>
          <div className="social-btn">
            <img src="/apple.png" alt="apple" />
          </div>
          <div className="social-btn">
            <img src="/google.png" alt="google" />
          </div>
        </div>

        <p className="divider">or</p>

        {/* FORM FIELDS */}
        <div className="form-group">
          <label>Name</label>
          <input
            className="auth-input"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Work email</label>
          <input
            className="auth-input"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Create a password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="Use 8+ characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* REMEMBER ME */}
        <div
          className="remember-toggle-row"
          style={{ marginBottom: "16px" }}
        >
          <input
            className="react-switch-checkbox"
            id="remember-switch"
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <label className="react-switch-label" htmlFor="remember-switch">
            <span className="react-switch-button" />
          </label>
          <span>Remember me</span>
        </div>

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <p className="auth-error-text" style={{ color: "#e74c3c" }}>
            {errorMessage}
          </p>
        )}

        {/* VERIFICATION TEXT */}
        <p
          style={{
            fontSize: "13px",
            color: "#9ca3af",
            marginBottom: "0px",
            marginTop: "20px",
          }}
        >
          We’ll email a verification link to confirm your account.
        </p>

        {/* SIGN UP BUTTON */}
        <button
          type="button"
          className="auth-button"
          style={{ marginBottom: "18px" }}
          onClick={handleOrgSignup}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>

        {/* FOOTER */}
        <p
          style={{
            fontSize: "13px",
            color: "#090a0bff",
            marginBottom: "20px",
          }}
        >
          Already have an account?{" "}
          <Link to="/organization-signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default OrgSignup;