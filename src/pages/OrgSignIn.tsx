import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../stores/authStore";

function OrganizationLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        console.error("[OrgSignIn] Failed to resolve role from profiles", profileError);
        return;
      }

      if (!profile?.role) {
        console.warn("[OrgSignIn] No profile found; staying on org sign-in");
        return;
      }

      const role = profile.role.toLowerCase();
      const onboardingTable = role === "organization" ? "organization_profiles" : "talent_profiles";
      const dashboardRoute = role === "organization" ? "/org" : "/talent-dashboard-v2";
      const onboardingRoute = role === "organization" ? "/organization-onboarding" : "/talent-onboarding";

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

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter work email and password");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      await useAuthStore.getState().bootstrapAuth();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;

      if (!userId) {
        console.warn("[OrgSignIn] No user id after login; staying on page");
        return;
      }

      const { data: onboarding } = await supabase
        .from("organization_profiles")
        .select("onboarding_completed")
        .eq("id", userId)
        .maybeSingle();

      if (onboarding?.onboarding_completed === true) {
        navigate("/organization-dashboard", { replace: true });
      } else {
        navigate("/organization-onboarding", { replace: true });
      }
    } catch (error) {
      console.error("Organization login failed:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* TOP LEFT LOGO */}
      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive logo" />
      </div>

      {/* TOP RIGHT LINKS */}
      <div className="auth-top-right">
        <Link to="/login" className="top-action">
          Sign in as Talent
        </Link>
        <Link to="/organization-signup" className="top-action">
          Sign up
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign-In as Organization</p>
        <p className="auth-hero-desc">
          Post opportunities and discover reliable talent.
        </p>
      </div>

      {/* SIGN IN CARD */}
      <div className="auth-card">
        <h3 className="sign-in-title">Sign In</h3>

        <label className="input-label">Work email*</label>
        <input
          className="auth-input"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="input-label">Password*</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="remember-row">
          <div className="forgot-link">
            <span>Forgot password? </span>
            <Link to="/reset-password" className="reset-link">
              Reset
            </Link>
          </div>

          <label className="remember-toggle-row">
            <input
              type="checkbox"
              className="toggle-input"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <div className="toggle-switch" />
            <span className="toggle-text">Remember me</span>
          </label>
        </div>

        <button
          className="auth-button"
          disabled={!email || !password || loading}
          onClick={handleLogin}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="auth-text">
          Don’t have an account?{" "}
          <Link to="/organization-signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>

      <div className="auth-bottom-actions">
        <Link to="/login" className="top-action">
          Sign in as Talent
        </Link>
        <Link to="/organization-signup" className="top-action">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default OrganizationLogin;
