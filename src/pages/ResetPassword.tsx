import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false); // ← NEW: track if recovery session is active

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      setError("Invalid reset link (no parameters found).");
      return;
    }

    // Parse hash fragment (Supabase uses #access_token=...&type=recovery&...)
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    const recoverSession = async () => {
      if (type !== "recovery" || !accessToken || !refreshToken) {
        setError("This page is only for password reset links. Please use the link from your email.");
        return;
      }

      try {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) throw sessionError;

        // Verify session is now active
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setSessionReady(true);
          console.log("Recovery session activated successfully");
        } else {
          throw new Error("Session not active after setSession");
        }
      } catch (err: any) {
        console.error("Session recovery failed:", err);
        setError(err.message || "Invalid or expired reset link. Please request a new one.");
      }
    };

    recoverSession();

    // Also listen for auth events (good practice + debug)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, "User:", session?.user?.id || "none");
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session?.user)) {
        setSessionReady(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleResetPassword = async () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setSuccess(true);
      // Optional: sign out after reset (recommended for security)
      // await supabase.auth.signOut();

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (err: any) {
      console.error("Password update failed:", err);
      setError(err.message ?? "Failed to reset password. The link may be expired or invalid.");
    } finally {
      setLoading(false);
    }
  };

  // Button enabled only when passwords valid + session is ready
  const isButtonDisabled = loading || !sessionReady || password.length < 8 || password !== confirmPassword;

  if (success) {
    return (
      <div className="auth-card">
        <h3>Password Reset Successful!</h3>
        <p>Redirecting to login page in a moment...</p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h3>Set New Password</h3>

      {error && <p className="error-text">{error}</p>}

      {/* Debug info – remove in production */}
      <p style={{ fontSize: "0.8rem", color: "#666", textAlign: "center" }}>
        Session ready: {sessionReady ? "Yes ✓" : "No – check console"}
      </p>

      <input
        className="auth-input"
        type="password"
        placeholder="New password (min 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />

      <input
        className="auth-input"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
      />

      <button
        className="auth-button"
        disabled={isButtonDisabled}
        onClick={handleResetPassword}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      <p className="text-sm text-center mt-4">
        Back to <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default ResetPassword;