import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
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

const OrgReviewOpportunity = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    coreDetails,
    workScope,
    submitOpportunity,
    loadDraft,
    is_loading,
  } = useOpportunityCreationStore();

  useEffect(() => {
    if (id) {
      loadDraft(id);
    }
  }, [id, loadDraft]);

  return (
    <div className="org-review-container">
      {/* --- LEFT SIDEBAR --- */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" className="logo-img" />
        </div>

        <nav className="nav-menu">
          <div className="nav-item" onClick={() => navigate("/organization")}
          >
            <Briefcase size={18} /> Opportunities
          </div>
          <div className="nav-item" onClick={() => navigate("/organization")}
          >
            <Users size={18} /> Talent Pool
          </div>
          <div className="nav-item" onClick={() => navigate("/organization")}
          >
            <Mail size={18} /> Outreach <span className="badge">1</span>
          </div>
          <div className="nav-item" onClick={() => navigate("/organization")}
          >
            <Trophy size={18} /> Contest
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item" onClick={() => navigate("/org/profile")}>
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
          <div className="nav-item" style={{ marginTop: "10px" }}>
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
              <span>Remote</span>
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
  );
};

export default OrgReviewOpportunity;
