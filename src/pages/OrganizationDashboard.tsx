// FILE: src/pages/OrganizationDashboard.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";
import "../dashboard.css";
import VerificationModal from "../components/VerificationModal"; // Import the modal

const OrganizationDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [showModal, setShowModal] = useState(true); // Control the modal state
  const [orgName, setOrgName] = useState<string>("Organization");
  const [loadingName, setLoadingName] = useState<boolean>(true);

  const showVerificationToast = () => {
    toast("Identity is under verification process. Platform will be unlocked when done.", {
      icon: "🔒",
      duration: 4500,
      style: {
        border: "1px solid #374151",
        background: "#1f2937",
        color: "#f3f4f6",
        borderRadius: "8px",
        padding: "14px 20px",
      },
    });
  };

  useEffect(() => {
    const fetchOrgProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user?.id) {
          setLoadingName(false);
          return;
        }

        const { data, error } = await supabase
          .from("organization_profiles")
          .select("organization_name")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("[OrganizationDashboard] Failed to load org profile", error);
          setLoadingName(false);
          return;
        }

        if (data?.organization_name) {
          setOrgName(data.organization_name);
        }
      } catch (err) {
        console.error("[OrganizationDashboard] Failed to load org name", err);
      } finally {
        setLoadingName(false);
      }
    };

    fetchOrgProfile();
  }, []);

  return (
    <div className="dashboard-container">
      {/* --- LEFT SIDEBAR --- */}
      <aside className="sidebar-left">
        <div className="logo-section">
          <img
            src="/Logo.svg"
            alt="Predulive Logo"
            style={{ height: "auto", width: "120px" }}
          />
        </div>

        <nav className="nav-menu">
          <div className="nav-item active">
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1"></rect>
              <rect x="14" y="14" width="7" height="7" rx="1"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1"></rect>
            </svg>
            Overview
          </div>
          <div className="nav-item">
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg >
            Outreach 
            <span className="nav-badge">1</span>
          </div>
          <div className="nav-item"  onClick={showVerificationToast} >
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Talent Pool
          </div>
          <div className="nav-item"  onClick={showVerificationToast}>
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Opportunities
          </div>
          <div className="nav-item"  onClick={showVerificationToast}>
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>
            Contest
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item">
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </div>
          <div className="nav-item"  onClick={showVerificationToast}>
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </div>
          <div className="nav-item"  onClick={showVerificationToast}>
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            Support
          </div>
          <div className="nav-item">
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            </svg>
            Ask AI
          </div>
        </div>
      </aside>

      {/* --- CENTER --- */}
      <main className="main-content">
        <header className="top-header">
          <div className="page-title"  onClick={showVerificationToast}>Overview</div>
          <div className="header-actions">
            <div className="search-bar">
              <svg
                className="search-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search" />
            </div>

            <button className="icon-btn">
              <svg
                className="bell-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>

            <button className="btn-primary-pill" onClick={showVerificationToast}>Post an Opportunity</button>
            <button
              className="logout-btn"
              onClick={async () => {
                await logout();
                navigate("/login", { replace: true });
              }}
            >
              Log Out
            </button>
          </div>
        </header>

        <div className="scrollable-content">
          <section className="welcome-section">
            <h1 className="welcome-heading">
              {loadingName ? (
                <span className="skeleton skeleton-name" aria-hidden />
              ) : (
                <>
                  Welcome, {orgName} <span className="wave">🎉</span>
                </>
              )}
            </h1>
            <p>
              This space reflects your activity, progress, and credibility as
              you engage with talent.
              <br />
              Most organizations start seeing activity after posting their first
              opportunity.
            </p>
          </section>

          <section className="section-container">
            <h3 className="section-title">Recommended actions</h3>
            <div className="action-stack">
              <div className="action-card">
                <div className="action-text">
                  <h4>Post your first opportunity</h4>
                  <p>
                    Create an opportunity to start receiving applications from
                    relevant talent
                  </p>
                </div>
                <button className="btn-action-green">
                  Post an Opportunity
                </button>
              </div>
              <div className="action-card">
                <div className="action-text">
                  <h4>Complete your organization profile</h4>
                  <p>
                    You're at 80%, add details like location and profile picture
                    to reach 100%
                  </p>
                </div>
                <button className="btn-action-grey">View Profile</button>
              </div>
            </div>
          </section>

          <section className="section-container">
            <h3 className="section-title">Active opportunities</h3>
            <div className="empty-state-container">
              <p className="empty-state-text">
                You haven't posted any opportunities yet.
              </p>
            </div>
          </section>

          <section className="section-container">
            <h3 className="section-title">Recent activities</h3>
            <div className="empty-state-container">
              <p className="empty-state-text">
                Updates from candidates and collaborators will appear here
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* --- RIGHT SIDEBAR --- */}
      <aside className="sidebar-right">
        <div className="right-group">
          <h3 className="right-title">Credibility ladder</h3>
          <div className="timeline-container">
            <div className="timeline-item active">
              <div className="timeline-icon">
                <svg
                  className="timeline-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <div className="timeline-content">
                <span className="level-name">Starter</span>
                <span className="level-sub">
                  Verified profile, first post (current)
                </span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">
                <svg
                  className="timeline-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="timeline-content">
                <span className="level-name">Responsive</span>
                <span className="level-sub">
                  Consistent replies &lt; 48 hrs
                </span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">
                <svg
                  className="timeline-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="timeline-content">
                <span className="level-name">Trusted</span>
                <span className="level-sub">Fair pay, timely reviews</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">
                <svg
                  className="timeline-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="timeline-content">
                <span className="level-name">Partner</span>
                <span className="level-sub">High follow-through rate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-group">
          <h3 className="right-title">Response consistency</h3>
          <p className="sub-desc">
            Not enough data yet. Updates once you start responding to messages.
          </p>
          <div className="momentum-grid">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="momentum-box"></div>
            ))}
          </div>
          <div className="momentum-legend">
            <span>Low</span>
            <div className="legend-dots">
              <span className="dot l1"></span>
              <span className="dot l2"></span>
              <span className="dot l3"></span>
              <span className="dot l4"></span>
            </div>
            <span>High</span>
          </div>
        </div>

        <div className="right-group-bottom">
          {/* Row 1: Verified Organization */}
          <div className="white-pill-row">
            <div className="row-left">
              <div className="pill-icon-container">
                <svg
                  className="pill-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>Verified organization</span>
            </div>
            <span className="status-pill on">On</span>
          </div>

          {/* Row 2: Profile Strength */}
          <div className="white-pill-row">
            <div className="row-left">
              <div className="pill-icon-container">
                <svg
                  className="pill-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span>Profile strength</span>
            </div>
            <span className="status-badge strong">Strong</span>
          </div>

          {/* Row 3: Pay Transparency */}
          <div className="white-pill-row">
            <div className="row-left">
              <div className="pill-icon-container">
                <svg
                  className="pill-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <span>Pay transparency</span>
            </div>
            <div className="status-more">•••</div>
          </div>

          {/* Row 4: Avg Response Time */}
          <div className="white-pill-row">
            <div className="row-left">
              <div className="pill-icon-container">
                <svg
                  className="pill-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <span>Avg response time</span>
            </div>
            <div className="status-more">•••</div>
          </div>

          <a href="#" className="small-link">
            See how to improve credibility
          </a>
        </div>
      </aside>

      {/* --- MODAL ADDED HERE --- */}
      <VerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default OrganizationDashboard;
