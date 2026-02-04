import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LayoutGrid,
  Bell,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  LogOut,
  Mail,
  Settings,
  Sparkles,
  Trophy,
  User,
  Users,
  X
} from "lucide-react";

import { useOpportunityCreationStore } from "../stores/opportunityCreationStore";
import "../orgreview.css";

// --- Mobile Navigation Icons ---
const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const OrgReviewOpportunity = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    coreDetails,
    workScope,
    submitOpportunity,
    loadDraft,
    is_loading,
    clearError,
  } = useOpportunityCreationStore();

  useEffect(() => {
    if (id) {
      loadDraft(id);
    }
    // Clear any stale error banner on mount
    clearError();
  }, [id, loadDraft, clearError]);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile menu handlers
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Close menu on escape key & scroll lock
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* --- MOBILE TOP NAVIGATION --- */}
      <header className="mobile-top-nav">
        <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
          <HamburgerIcon />
        </button>
        <div className="mobile-logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" />
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <nav className="mobile-nav-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close navigation menu">
                <CloseIcon />
              </button>
            </div>

            <div className="nav-item mobile-nav-item" onClick={() => { navigate("/org"); closeMobileMenu(); }}>
              <LayoutGrid size={20} className="nav-icon" />
              Overview
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
              <Mail size={20} className="nav-icon" />
              Outreach <span className="nav-badge">1</span>
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => { navigate("/talent-pool"); closeMobileMenu(); }}>
              <Users size={20} className="nav-icon" />
              Talent Pool
            </div>
            <div className="nav-item mobile-nav-item active" onClick={() => { navigate("/opportunities"); closeMobileMenu(); }}>
              <Briefcase size={20} className="nav-icon" />
              Opportunities
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
              <Trophy size={20} className="nav-icon" />
              Contest
            </div>

            <div className="mobile-nav-divider"></div>

            <div className="nav-item mobile-nav-item" onClick={() => { navigate("/org-profile"); closeMobileMenu(); }}>
              <User size={20} className="nav-icon" />
              Profile
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
              <Settings size={20} className="nav-icon" />
              Settings
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
              <LifeBuoy size={20} className="nav-icon" />
              Support
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
              <Sparkles size={20} className="nav-icon" />
              Ask AI
            </div>
          </nav>
        </div>
      )}

      <div className="org-review-container">
        {/* --- LEFT SIDEBAR --- */}
        <aside className="sidebar">
          <div className="logo-section">
            <img src="/Logo.svg" alt="Predulive Logo" className="logo-img" />
          </div>

          <nav className="nav-menu">
            <div className="nav-item" onClick={() => navigate("/org")}>
              <LayoutGrid size={18} /> Overview
            </div>
            <div className="nav-item" onClick={() => navigate("/opportunities")}>
              <Briefcase size={18} /> Opportunities
            </div>
            <div className="nav-item" onClick={() => navigate("/talent-pool")}>
              <Users size={18} /> Talent Pool
            </div>
            <div className="nav-item">
              <Mail size={18} /> Outreach <span className="badge">1</span>
            </div>
            <div className="nav-item">
              <Trophy size={18} /> Contest
            </div>
          </nav>

          <div className="sidebar-footer">
            <div className="nav-item" onClick={() => navigate("/org-profile")}>
              <User size={18} /> Profile
            </div>
            <div className="nav-item">
              <Settings size={18} /> Settings
            </div>
            <div className="nav-item">
              <LifeBuoy size={18} /> Support
            </div>
            <div className="nav-item">
              <Sparkles size={18} /> Ask AI
            </div>
            <div className="nav-item" style={{ marginTop: "10px" }} onClick={() => navigate("/login")}>
              <LogOut size={18} /> Log Out
            </div>
          </div>
        </aside>

      {/* --- MAIN CONTENT CENTER --- */}
      <main className="main-content">
        {/* Header */}
        <header className="top-header">
          <h1 className="page-title">Create an Opportunity</h1>
          <div className="header-actions">
            <Bell size={20} />
          </div>
        </header>

        {/* Wizard Progress Bar */}
        <div className="wizard-container">
          <div className="wizard-bar">
            <ChevronLeft className="nav-arrow" size={24} />

            <div className="step completed">
              <div className="step-icon">
                <Check size={14} strokeWidth={3} />
              </div>
              Core Details
            </div>

            <span className="step-arrow">→</span>

            <div className="step completed">
              <div className="step-icon">
                <Check size={14} strokeWidth={3} />
              </div>
              Work Scope
            </div>

            <span className="step-arrow">→</span>

            <div className="step active">
              <div className="step-icon">3</div>
              Review
            </div>

            <ChevronRight className="nav-arrow" size={24} />
          </div>
        </div>

        {/* Review Card */}
        <div className="content-scroll">
          <div className="review-card">
            <h2 className="job-title">{coreDetails.title || "Untitled Opportunity"}</h2>
            <div className="job-meta">
              {coreDetails.weekly_time_commitment && (
                <span>{coreDetails.weekly_time_commitment} hrs / week</span>
              )}
              {coreDetails.weekly_time_commitment && coreDetails.compensation_type && (
                <span> • </span>
              )}
              {coreDetails.compensation_amount && (
                <span>{coreDetails.compensation_amount} / month</span>
              )}
              {coreDetails.compensation_amount && <span> • </span>}
              {coreDetails.duration && <span>{coreDetails.duration}</span>}
              {coreDetails.duration && <span> • </span>}
              <span>{coreDetails.work_setup || 'Not specified'}</span>
              <span> • </span>
              {coreDetails.domain && <span>{coreDetails.domain}</span>}
              {coreDetails.domain && <span> • </span>}
              <span>Difficulty: {coreDetails.difficulty}</span>
              <span> • </span>
              <span>Start: {coreDetails.start_date_type}</span>
            </div>

            <h3 className="section-title">Description</h3>
            <p className="description-text">
              {workScope.description || "No description provided"}
            </p>

            <h3 className="section-title">Key Deliverables</h3>
            <ul className="deliverables-list">
              {workScope.key_deliverables ? (
                workScope.key_deliverables.split("\n").map((deliverable, index) => (
                  <li key={index}>{deliverable}</li>
                ))
              ) : (
                <li>No deliverables specified</li>
              )}
            </ul>

            <h3 className="section-title">Primary Contact</h3>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-label">Full name</span>
                <span className="contact-value">
                  {workScope.primary_contact_name || "•"}
                </span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email ID</span>
                <span className="contact-value">
                  {workScope.primary_contact_email || "•"}
                </span>
              </div>
            </div>

            <div className="tags-grid">
              <div className="tag-box">
                <span className="tag-label">Support level</span>
                <span className="tag-value">
                  {workScope.support_level || "Not specified"}
                </span>
              </div>
              <div className="tag-box">
                <span className="tag-label">Talent engagement</span>
                <span className="tag-value">
                  {workScope.talent_engagement || "Not specified"}
                </span>
              </div>
              <div className="tag-box">
                <span className="tag-label">Primary communication</span>
                <span className="tag-value">
                  {workScope.primary_communication_mode || "Not specified"}
                </span>
              </div>
              <div className="tag-box">
                <span className="tag-label">Application requirements</span>
                <span className="tag-value">
                  {workScope.application_requirements?.join(", ") || "Not specified"}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="action-row">
              <button className="btn-secondary" disabled={is_loading}>
                {is_loading ? "Saving..." : "Save Draft"}
              </button>
              <div className="right-actions">
                <button className="btn-text" onClick={() => navigate("/orgworkscope")}>
                  Edit
                </button>
                <button
                  className="btn-primary"
                  onClick={submitOpportunity}
                  disabled={is_loading}
                >
                  {is_loading ? "Submitting..." : "Post Opportunity"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- RIGHT PANEL --- */}
      <aside className="right-panel">
        <h3 className="standards-title">Opportunity Standards</h3>
        <p className="standards-subtitle">
          Ensure adding missing information for better talent matching
        </p>

        <div className="checklist">
          <div className="check-item">
            <CheckCircle2 className="icon-check" size={16} /> Clear description
          </div>
          <div className="check-item">
            <CheckCircle2 className="icon-check" size={16} /> Pay transparency
          </div>
          <div className="check-item">
            <CheckCircle2 className="icon-check" size={16} /> Support level indicated
          </div>
          {/* Difficulty status based on actual form data */}
          {coreDetails.difficulty ? (
            <div className="check-item">
              <CheckCircle2 className="icon-check" size={16} /> Difficulty level set
            </div>
          ) : (
            <div className="check-item">
              <div className="icon-cross">
                <X size={10} />
              </div>
              Missing: Difficulty level
            </div>
          )}
        </div>
      </aside>
      </div>
    </>
  );
};

export default OrgReviewOpportunity;
