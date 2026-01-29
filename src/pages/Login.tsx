import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../auth.css";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../stores/authStore";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* --------------------------------------------------
     Resolve existing session ONLY on /login
  -------------------------------------------------- */
  useEffect(() => {
    const resolveExistingSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const userId = session.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) {
        console.error("[Login] Failed to resolve role from profiles", profileError);
        return;
      }

      if (!profile?.role) {
        console.warn("[Login] No profile found for user; staying on login");
        return;
      }

      const role = profile.role as "talent" | "organization";

      const onboardingTable =
        role === "organization"
          ? "organization_profiles"
          : "talent_profiles";

      const dashboardRoute =
        role === "organization"
          ? "/org"
          : "/talent-dashboard-v2";

      const onboardingRoute =
        role === "organization"
          ? "/organization-onboarding"
          : "/talent-onboarding";

      const { data: onboarding } = await supabase
        .from(onboardingTable)
        .select("onboarding_completed")
        .eq("id", userId)
        .maybeSingle();

      if (onboarding?.onboarding_completed === true) {
        navigate(dashboardRoute, { replace: true });
      } else {
        navigate(onboardingRoute, { replace: true });
      }
    };

    resolveExistingSession();
  }, [navigate]);

  /* --------------------------------------------------
     Email + Password Login
  -------------------------------------------------- */
  const handleLogin = async () => {
    if (loading) return;

    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      // Let auth bootstrap + useEffect handle redirects
      await useAuthStore.getState().bootstrapAuth();
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorMessage(
        err?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------------------------
     Google OAuth Login
  -------------------------------------------------- */
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
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
      // Redirect handled after OAuth return
    } catch (err: any) {
      console.error("Google login failed:", err);
      setErrorMessage(
        err?.message || "Failed to sign in with Google. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* TOP LEFT LOGO */}
      <div className="auth-logo" style={{ zIndex: 1000 }}>
        <img src="/Logo.svg" alt="Predulive logo" />
      </div>

      {/* TOP RIGHT LINKS (desktop) */}
      <div className="auth-top-right" style={{ zIndex: 1000 }}>
        <Link to="/organization-signup" className="top-action">
          Sign in as Organization
        </Link>

        <Link to="/login" className="top-action">
          Sign in
        </Link>
      </div>

      {/* HERO TEXT */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign-In as a Talent</p>
        <p className="auth-hero-desc">
          Build proof-of-work and get matched.
        </p>
      </div>

      {/* WHITE CARD */}
      <div className="auth-card">
        <h3 className="sign-in-title">Sign In</h3>

        <button
          className="google-wide-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <img src="/google.png" alt="Google" />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        <div className="or-text">or</div>

        <label className="input-label">Email</label>
        <input
          className="auth-input"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="input-label">Password</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="remember-row">
          <span className="forgot-link">
            Forgot password?{" "}
            <Link to="/forgot-password" className="reset-link">
              Reset
            </Link>
          </span>

          <div className="remember-toggle-row">
            <input
              className="react-switch-checkbox"
              id="remember-switch"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label
              className="react-switch-label"
              htmlFor="remember-switch"
            >
              <span className="react-switch-button" />
            </label>
            <span>Remember me</span>
          </div>
        </div>

        <div className="top-8" />

        {errorMessage && (
          <p
            className="auth-error-text"
            style={{ color: "#e74c3c", marginBottom: "16px" }}
          >
            {errorMessage}
          </p>
        )}

        <button
          className="auth-button"
          disabled={!email || !password || loading}
          onClick={handleLogin}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="auth-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link font-light">
            Sign up
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

export default Login;
