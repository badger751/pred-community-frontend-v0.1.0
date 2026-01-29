import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../auth.css";
import { supabase } from "../lib/supabaseClient";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
      // Redirect handled by Supabase after OAuth
    } catch (err: any) {
      console.error("Google signup failed:", err);
      setErrorMessage(err?.message || "Failed to continue with Google. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleSignup() {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            full_name: name,
            role: "talent",
          }),
        }
      );

      const data = await response.json();

      console.log("Signup response — full data:", data);
console.log("Status code:", response.status);
console.log("Response ok?", response.ok);

      if (!response.ok) {
        // Handle duplicate email specifically
        if (
          data?.detail?.toLowerCase().includes("user already registered") ||
          data?.message?.toLowerCase().includes("already registered") ||
          data?.error?.message?.toLowerCase().includes("already registered")
        ) {
          const msg = "This email is already registered. Please sign in or use a different email.";
          setErrorMessage(msg);
          alert(msg); // Simple popup - replace with toast later if you want
          return;
        }

        // Other signup errors
        throw new Error(data?.detail ?? "Signup failed. Please try again.");
      }

      // Success
      console.log("Signup successful:", data);
      navigate("/confirm-email", { state: { email } });

    } catch (error) {
      console.error("Signup error:", error);
      const message = error instanceof Error ? error.message : "Unexpected error during signup";
      setErrorMessage(message);
      alert(message); // Optional: popup for visibility
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-wrapper">
      {/* TOP LEFT LOGO */}
      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive logo" />
      </div>

      {/* TOP RIGHT ACTIONS */}
      <div className="auth-top-right">
        <button
          className="top-action"
          onClick={() => navigate("/organization-signup")}
        >
          Sign in as Organization
        </button>

        <button className="top-action" onClick={() => navigate("/login")}>
          Sign in
        </button>
      </div>

      {/* HERO TEXT */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign-up as a Talent</p>
        <p className="auth-hero-desc">Build proof-of-work and get matched.</p>
      </div>

      {/* WHITE CARD */}
      <div
        className="auth-card org-signup-card"
        style={{ marginTop: "150px", marginBottom: "60px" }}
      >
        <h3 className="sign-in-title">Register with</h3>

        <button
          className="google-wide-btn"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          <img src="/google.png" alt="Google" />
          {isSubmitting ? "Redirecting..." : "Continue with Google"}
        </button>

        <div className="or-text">or</div>

        {/* Name */}
        <label className="input-label">Name</label>
        <input
          className="auth-input"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <label className="input-label">Email</label>
        <input
          className="auth-input"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="input-label">Password</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* REMEMBER ME */}
        <div className="remember-row">
          <div className="remember-toggle-row">
            <input
              className="react-switch-checkbox"
              id="remember-signup"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label className="react-switch-label" htmlFor="remember-signup">
              <span className="react-switch-button" />
            </label>
            <span>Remember me</span>
          </div>
        </div>

        {/* ERROR MESSAGE - now handles duplicate email clearly */}
        {errorMessage && (
          <p className="auth-error-text" style={{ color: "#e53e3e", fontWeight: "500" }}>
            {errorMessage}
          </p>
        )}

        {/* VERIFICATION TEXT */}
        <p className="verification-text">
          We’ll email a verification link to confirm your account.
        </p>

        {/* SIGN UP BUTTON */}
        <button
          className="auth-button"
          onClick={handleSignup}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

        {/* FOOTER LINK */}
        <p className="auth-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign In
          </Link>
        </p>
      </div>

      <div className="auth-bottom-actions">
        <Link to="/organization-signup" className="top-action">
          Sign in as Organization
        </Link>

        <Link to="/login" className="top-action">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default Signup;
