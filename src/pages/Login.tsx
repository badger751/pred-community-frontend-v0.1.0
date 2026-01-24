import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../auth.css"; 
import { loginUser } from "../api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    // basic validation
    if (!email || !password) {
        alert("Please enter email and password");
        setLoading(false);
        return;
    }

    try {
        const res = await loginUser(email, password);
        
        if (res.success) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", res.role);
          navigate("/TalentOnboarding");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* --- TOP LEFT LOGO --- */}
      {/* Added zIndex here just in case */}
      <div className="auth-logo" style={{ zIndex: 1000 }}>
        <img src="/Logo.svg" alt="Predulive logo" />
      </div>

      {/* --- TOP RIGHT LINKS (Now using <Link>) --- */}
      {/* zIndex: 1000 ensures these links sit ABOVE the background image */}
      <div className="auth-top-right" style={{ zIndex: 1000 }}>
        
        {/* Changed from Button to Link */}
        <Link to="/organization-signup" className="top-action">
          Sign in as Organization
        </Link>

        {/* Changed from Button to Link */}
        {/* Note: Since you are already on the Login page, you might want this to point to "/signup" instead? 
            But I have kept it as "/login" per your request. */}
        <Link to="/login" className="top-action">
          Sign in
        </Link>
      </div>

      {/* --- LEFT SIDE: HERO TEXT --- */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign‑In as a Talent</p>
        <p className="auth-hero-desc">Build proof‑of‑work and get matched.</p>
      </div>

      {/* --- RIGHT SIDE: WHITE CARD --- */}
      <div className="auth-card">
        <h3 className="sign-in-title">Sign In With</h3>

        <div className="social-login">
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
            Forgot password? <span className="reset-link">Reset</span>
          </span>

          <div className="remember-toggle-row">
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
        </div>

        <div className="top-8"></div>
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
    </div>
  );
}

export default Login;