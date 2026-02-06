import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient"; // adjust path if needed
import { useAuthStore } from "../stores/authStore";
import "../dashboard.css";
import toast from 'react-hot-toast';

// --- Icons for Mobile Navigation ---
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



interface Opportunity {
  id: number;
  title: string;
  description: string;
  opportunity_type: string;
  domain?: string;
  work_mode: string;
  time_commitment?: string;
  duration?: string;
  compensation_type?: string;
  organization_id: string;
}

const TalentDashboardV2: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [fullName, setFullName] = useState<string>("Talent");
  const [loadingName, setLoadingName] = useState<boolean>(true);

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loadingOpps, setLoadingOpps] = useState<boolean>(true);
  const [oppError, setOppError] = useState<string | null>(null);

  // --- Mobile Menu State & Logic ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobileMenu();
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // 1. Fetch user name from profiles
    const fetchUserName = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", session.user.id)
          .single();

        if (!error && data?.full_name) {
          setFullName(data.full_name);
        }
      } catch (err) {
        console.error("Failed to load name:", err);
      } finally {
        setLoadingName(false);
      }
    };

    // 2. Fetch published opportunities
    const fetchOpportunities = async () => {
      try {
        setLoadingOpps(true);
        setOppError(null);

        const { data, error } = await supabase
          .from("opportunities")
          .select(`
            id,
            title,
            description,
            opportunity_type,
            domain,
            work_mode,
            time_commitment,
            duration,
            compensation_type,
            organization_id
          `)
          .eq("status", "published")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;

        setOpportunities(data || []);
      } catch (err: any) {
        console.error("Failed to load opportunities:", err.message);
        setOppError("Could not load opportunities right now.");
      } finally {
        setLoadingOpps(false);
      }
    };

    fetchUserName();
    fetchOpportunities();
  }, []);


  const showVerificationToast = () => {
    toast("Identity is under verification process. Platform will be unlocked when done.", {
      icon: '🔒',
      duration: 4500,
      style: {
        border: '1px solid #374151',
        background: '#1f2937',
        color: '#f3f4f6',
        borderRadius: '8px',
        padding: '14px 20px',
      },
    });
  };

  return (
    <>
      {/* --- MOBILE TOP NAVIGATION --- */}
      <header className="mobile-top-nav">
        <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
          <HamburgerIcon />
        </button>
        <div className="mobile-logo-section">
          <img src="/Logo.svg" alt="Logo" />
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
            
            <div className="nav-item mobile-nav-item active" onClick={() => { closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Overview
            </div>

            <div className="nav-item mobile-nav-item" onClick={() => { showVerificationToast(); closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              Opportunities
            </div>

            <div className="nav-item mobile-nav-item" onClick={() => { showVerificationToast(); closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Outreach
            </div>

            <div className="nav-item mobile-nav-item" onClick={() => { showVerificationToast(); closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              Portfolio
            </div>

            <div className="nav-item mobile-nav-item" onClick={() => { showVerificationToast(); closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
              </svg>
              Contests
            </div>

            <div className="mobile-nav-divider"></div>

            <div className="nav-item mobile-nav-item" onClick={() => { navigate('/talent-profile'); closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile
            </div>

            <div className="nav-item mobile-nav-item" onClick={() => { showVerificationToast(); closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </div>

            <div className="nav-item mobile-nav-item" onClick={() => { showVerificationToast(); closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <rect x="7" y="7" width="3" height="3"></rect>
                <rect x="14" y="7" width="3" height="3"></rect>
                <rect x="7" y="14" width="3" height="3"></rect>
                <rect x="14" y="14" width="3" height="3"></rect>
              </svg>
              Ask AI
            </div>

            <div className="mobile-nav-divider"></div>

            <div className="nav-item mobile-nav-item" onClick={async () => {
              await logout();
              navigate("/login", { replace: true });
            }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Log Out
            </div>
          </nav>
        </div>
      )}

      <div className="dashboard-container">
        {/* LEFT SIDEBAR - unchanged */}
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
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Overview
          </div>
          <div className="nav-item" onClick={showVerificationToast}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Opportunities
          </div>
          <div className="nav-item"onClick={showVerificationToast}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Outreach
          </div>
          <div className="nav-item"onClick={showVerificationToast}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            Portfolio
          </div>
          <div className="nav-item"onClick={showVerificationToast}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>
            Contests
          </div>
        </nav>

        <div className="sidebar-footer"onClick={showVerificationToast}>
          <div className="nav-item" onClick={() => navigate('/talent-profile')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </div>
          <div className="nav-item"onClick={showVerificationToast}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <rect x="7" y="7" width="3" height="3"></rect>
              <rect x="14" y="7" width="3" height="3"></rect>
              <rect x="7" y="14" width="3" height="3"></rect>
              <rect x="14" y="14" width="3" height="3"></rect>
            </svg>
            Ask AI
          </div>
        </div>
      </aside>

      {/* CENTER (Main) */}
      <main className="main-content">
        <header className="top-header">
          <div className="page-title">Overview</div>
          <div className="header-actions">
            <div className="search-bar">
              <svg className="search-icon-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search" />
            </div>
            
            <button className="icon-btn">
              <svg className="bell-icon-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            
            <button className="btn-primary-pill" onClick={showVerificationToast}>View Portfolio</button>
            <button
              className="logout-btn"
              onClick={async () => {
                await logout();
                navigate("/login", { replace: true });
              }}
              style={{ marginLeft: "8px" }}
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
                  Welcome, {fullName} <span className="wave">🎉</span>
                </>
              )}
            </h1>
            <p>
              This space reflects your activity, progress, and credibility as
              you engage with opportunities and share your work.
            </p>
          </section>

          {/* Recommended actions - unchanged */}
          <section className="section-container">
            <h3 className="section-title">Recommended actions</h3>
            <div className="action-stack">
              <div className="action-card">
                <div className="action-text">
                  <h4>Create Portfolio</h4>
                  <p>Showcase projects to build credibility through proof-of-work</p>
                </div>
                <button className="btn-action-green" onClick={showVerificationToast}>Create Portfolio</button>
              </div>

              <div className="action-card">
                <div className="action-text">
                  <h4>Update Profile</h4>
                  <p>Add details like skills and availability to get better matches</p>
                </div>
                <button className="btn-action-grey" onClick={() => navigate('/talent-profile')}>View Profile</button>
              </div>

              <div className="action-card">
                <div className="action-text">
                  <h4>Reach out</h4>
                  <p>Start a conversation with an organization you are interested in</p>
                </div>
                <button className="btn-action-grey"onClick={showVerificationToast}>Browse</button>
              </div>
            </div>
          </section>

          {/* BEST OPPORTUNITY MATCHES - now dynamic */}
          <section className="section-container">
  <h3 className="section-title">Best opportunity matches for you</h3>

  {loadingOpps ? (
    <div className="opportunities-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="opportunity-card skeleton">
          <div className="opp-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-sub"></div>
          </div>
          <div className="skeleton-desc"></div>
          <div className="tags-container">
            <span className="skeleton-tag"></span>
            <span className="skeleton-tag"></span>
          </div>
        </div>
      ))}
    </div>
  ) : oppError ? (
    <p className="empty-state" style={{ color: "#6b7280", fontStyle: "italic" }}>
      Could not load opportunities right now — please check back later
    </p>
  ) : opportunities.length === 0 ? (
    <p className="empty-state">Opportunity coming soon</p>
  ) : (
    <div className="opportunities-grid">
      {opportunities.map((opp) => (
        <div key={opp.id} className="opportunity-card">
          <div className="opp-header">
            <h4>{opp.title}</h4>
            <p className="sub-text">
              {opp.opportunity_type} • {opp.domain || "Various Domains"}
            </p>
          </div>

          <p className="desc-text">
            {opp.description.length > 120
              ? opp.description.substring(0, 120) + "..."
              : opp.description}
          </p>

          <div className="tags-container">
            <span className="tag">{opp.work_mode}</span>
            <span className="tag">{opp.time_commitment || "Flexible"}</span>
            <span className="tag">{opp.duration || "N/A"}</span>
            {opp.compensation_type && (
              <span className="tag">{opp.compensation_type}</span>
            )}
          </div>

          <div className="card-footer">
            <span className="date">New opportunity</span>
            <span className="link">View</span>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
          {/* Application snapshot - unchanged */}
          <section className="section-container">
            <h3 className="section-title">Application snapshot</h3>
            <p className="empty-state">
              Once you apply, this space will show your progress across
              opportunities.
            </p>
          </section>
        </div>
      </main>

      {/* RIGHT SIDEBAR - unchanged */}
      <aside className="sidebar-right">
                <div className="right-group">
          <h3 className="right-title">Credibility ladder</h3>
          <div className="timeline-container">
            <div className="timeline-item active">
              {/* Rocket Icon */}
              <div className="timeline-icon">
                <svg className="timeline-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
              </div>
              <div className="timeline-content">
                <span className="level-name">Starter</span>
                <span className="level-sub">Current level</span>
              </div>
            </div>
            <div className="timeline-item">
              {/* Target Icon */}
              <div className="timeline-icon">
                <svg className="timeline-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <div className="timeline-content">
                <span className="level-name">Contributor</span>
              </div>
            </div>
            <div className="timeline-item">
              {/* Shield Icon */}
              <div className="timeline-icon">
                <svg className="timeline-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="timeline-content">
                <span className="level-name">Trusted</span>
              </div>
            </div>
            <div className="timeline-item">
              {/* Crown Icon */}
              <div className="timeline-icon">
                <svg className="timeline-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
              </div>
              <div className="timeline-content">
                <span className="level-name">Leader</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right-group">
          <h3 className="right-title">Weekly momentum</h3>
          <p className="sub-desc">weeks with meaningful proof-of-work updates</p>
          <div className="momentum-grid">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className={`momentum-box ${i > 11 ? "filled" : ""}`}></div>
            ))}
          </div>
          <p className="small-text">Share your work regularly and build your portfolio consistently to see your progress over time.</p>
          <div className="momentum-legend">
            <span>Low</span>
            <div className="legend-dots">
                <span className="dot l1"></span><span className="dot l2"></span><span className="dot l3"></span><span className="dot l4"></span>
            </div>
            <span>High</span>
          </div>
        </div>
        <div className="right-group-bottom">
  
  {/* Row 1: Verified Organization (CHANGED to status pill) */}
  <div className="white-pill-row">
    <div className="row-left">
        <div className="pill-icon-container">
          <svg className="pill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <span>Verified organization</span>
    </div>
    {/* REPLACED toggle with this span */}
    <span className="status-pill on">On</span>
  </div>
          <div className="white-pill-row">
             <div className="row-left">
                {/* Strength Star Icon in Circle */}
                <div className="pill-icon-container">
                  <svg className="pill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <span>Profile strength</span>
            </div>
            <span className="badge-weak">Weak</span>
          </div>
          <a href="#" className="small-link">See how to improve credibility</a>
        </div>
      </aside>
      </div>
    </>
  );
};

export default TalentDashboardV2;
