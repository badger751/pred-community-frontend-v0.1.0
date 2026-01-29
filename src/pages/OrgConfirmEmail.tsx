import { Link, useLocation, useNavigate } from "react-router-dom";
import "../auth.css";

interface LocationState {
  email?: string;
}

function OrgConfirmEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || {};
  const email = state.email;

  return (
    <div className="auth-wrapper">
      <div className="auth-logo" style={{ zIndex: 1000 }}>
        <img src="/Logo.svg" alt="Predulive" />
      </div>

      <div className="auth-top-right" style={{ zIndex: 1000 }}>
        <button className="top-action" onClick={() => navigate("/organization-signin")}>Go to Sign in</button>
      </div>

      <div className="auth-hero">
        <h2 className="auth-hero-title">Check your email</h2>
        <p className="auth-hero-subtitle">We sent a verification link to finish setup.</p>
        <p className="auth-hero-helper">
          {email ? `Open ${email} to confirm your organization account.` : "Open your inbox to confirm your organization account."}
        </p>
      </div>

      <div className="auth-card org-signup-card" style={{ marginTop: "150px", marginBottom: "60px" }}>
        <h3 className="sign-in-title">Almost there</h3>
        <p className="auth-hero-helper" style={{ marginBottom: "16px" }}>
          Click the verification link in your email to activate your organization account.
        </p>

        <button
          className="auth-button"
          style={{ marginBottom: "12px" }}
          onClick={() => navigate("/organization-signin")}
        >
          Back to Sign in
        </button>

        <p className="auth-text" style={{ marginTop: "8px" }}>
          Didn’t get the email? Check spam or try again from the sign-in page.
        </p>

        <p className="auth-text" style={{ marginTop: "20px" }}>
          Wrong email? <Link to="/organization-signup" className="auth-link">Sign up again</Link>
        </p>
      </div>
    </div>
  );
}

export default OrgConfirmEmail;
