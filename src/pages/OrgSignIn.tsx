import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../auth.css"; 
// Update this path to wherever your api function is located
import { loginUser } from "../api/auth"; 

function OrganizationLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    if (!email || !password) {
        alert("Please enter work email and password");
        setLoading(false);
        return;
    }

    // Pass "organization" role to your API
    const res = await loginUser(email, password, "organization");
    
    if (res.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "organization");
      navigate("/organization-onboarding"); 
    } else {
        alert("Login failed. Please check your credentials.");
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      {/* --- TOP LEFT LOGO --- */}
      <div className="auth-logo">
        <img src="/Logo.svg" alt="Predulive logo" />
      </div>

      {/* --- TOP RIGHT LINKS --- */}
      <div className="auth-top-right">
        <Link to="/login" className="top-action">
          Sign in as Talent
        </Link>
        <Link to="/organization-signup" className="top-action">
          Sign up
        </Link>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="auth-hero">
        <h2 className="auth-hero-title">Welcome!</h2>
        <p className="auth-hero-subtitle">Sign‑In as Organization</p>
        <p className="auth-hero-desc">Post opportunities and discover reliable talent.</p>
      </div>

      {/* --- SIGN IN CARD --- */}
      <div className="auth-card">
        <h3 className="sign-in-title">Sign In With</h3>

        {/* Social Buttons */}
        <div className="social-login">
          <button className="social-btn">
            <img src="/facebook.png" alt="facebook" />
          </button>
          <button className="social-btn">
            <img src="/apple.png" alt="apple" />
          </button>
          <button className="social-btn">
            <img src="/google.png" alt="google" />
          </button>
        </div>

        <div className="or-text">or</div>
        
        {/* Work Email */}
        <label className="input-label">Work email*</label>
        <input
          className="auth-input"
          placeholder="name@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* Password */}
        <label className="input-label">Password*</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember & Forgot Password Section 
            The CSS classes .remember-row, .forgot-link, and .order 
            handle the specific layout positions here automatically. 
        */}
        <div className="remember-row">
           {/* Forgot Password Link */}
           <div className="forgot-link">
             <span>Forgot password? </span>
             <Link to="/reset-password" className="reset-link">
               Reset
             </Link>
           </div>

           {/* Toggle Switch */}
           <label className="remember-toggle-row">
             <input 
               type="checkbox" 
               className="toggle-input"
               checked={remember}
               onChange={() => setRemember(!remember)}
             />
             <div className="toggle-switch"></div>
             <span className="toggle-text">Remember me</span>
           </label>
        </div>

        {/* Action Button */}
        <button
          className="auth-button"
          disabled={!email || !password || loading}
          onClick={handleLogin}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Bottom Link */}
        <p className="auth-text">
          Don’t have an account?{" "}
          <Link to="/organization-signup" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default OrganizationLogin;