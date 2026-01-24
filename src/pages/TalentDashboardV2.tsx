import React from "react";
import "../dashboard.css"; // Ensure this matches your file name

const TalentDashboardV2: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* --- LEFT SIDEBAR (Updated with SVGs + Logo Preserved) --- */}
      <aside className="sidebar-left">
        <div className="logo-section">
          {/* EXACTLY AS YOU REQUESTED */}
          <img 
            src="/Logo.svg" 
            alt="Predulive Logo" 
            style={{ height: "auto", width: "120px" }} 
          />
        </div>

        <nav className="nav-menu">
          {/* Active Item: Green Background + Green Text */}
          <div className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Overview
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            Opportunities
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Outreach
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            Portfolio
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            Contests
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Profile
          </div>
          <div className="nav-item">
             <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
          </div>
          <div className="nav-item">
             <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>
            Ask AI
          </div>
        </div>
      </aside>

      {/* --- CENTER (Main) --- */}
      <main className="main-content">
        {/* UPDATED HEADER WITH NEW SVGs */}
        <header className="top-header">
          <div className="page-title">Overview</div>
          <div className="header-actions">
            <div className="search-bar">
              {/* New thin-stroke search icon */}
              <svg className="search-icon-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Search" />
            </div>
            
            <button className="icon-btn">
               {/* New thin-stroke bell icon */}
               <svg className="bell-icon-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            
            <button className="btn-primary-pill">View Portfolio</button>
          </div>
        </header>

        <div className="scrollable-content">
          <section className="welcome-section">
            <h1>
              Welcome, First_name <span className="wave">🎉</span>
            </h1>
            <p>
              This space reflects your activity, progress, and credibility as
              you engage with opportunities and share your work.
            </p>
          </section>

          <section className="section-container">
            <h3 className="section-title">Recommended actions</h3>
            <div className="action-stack">
              <div className="action-card">
                <div className="action-text">
                  <h4>Create Portfolio</h4>
                  <p>
                    Showcase projects to build credibility through proof-of-work
                  </p>
                </div>
                <button className="btn-action-green">Create Portfolio</button>
              </div>

              <div className="action-card">
                <div className="action-text">
                  <h4>Update Profile</h4>
                  <p>
                    Add details like skills and availability to get better
                    matches
                  </p>
                </div>
                <button className="btn-action-grey">View Profile</button>
              </div>

              <div className="action-card">
                <div className="action-text">
                  <h4>Reach out</h4>
                  <p>
                    Start a conversation with an organization you are interested
                    in
                  </p>
                </div>
                <button className="btn-action-grey">Browse</button>
              </div>
            </div>
          </section>

          <section className="section-container">
            <h3 className="section-title">Best opportunity matches for you</h3>
            <div className="opportunities-grid">
              {[1, 2, 3].map((item) => (
                <div key={item} className="opportunity-card">
                  <div className="opp-header">
                    <h4>Opportunity Title</h4>
                    <p className="sub-text">
                      Company • Primary Technology / Stack etc.
                    </p>
                  </div>

                  <p className="desc-text">
                    Lorem ipsum dolor sit amet consectetur. Sociis aliquam
                    tellus neque malesuada.
                  </p>

                  <div className="tags-container">
                    <span className="tag">Domain</span>
                    <span className="tag">Compensation</span>
                    <span className="tag">Duration</span>
                    <span className="tag">Work setup</span>
                    <span className="tag">Support level</span>
                  </div>

                  <div className="card-footer">
                    <span className="date">Updated 1 day ago</span>
                    <span className="link">View</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section-container">
            <h3 className="section-title">Application snapshot</h3>
            <p className="empty-state">
              Once you apply, this space will show your progress across
              opportunities.
            </p>
          </section>
        </div>
      </main>

      {/* --- RIGHT SIDEBAR (Updated Icons) --- */}
      <aside className="sidebar-right">
        <div className="right-group">
          <h3 className="right-title">Credibility ladder</h3>
          <div className="timeline-container">
            <div className="timeline-item active">
              {/* Rocket Icon */}
              <div className="timeline-icon">
                <svg className="timeline-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
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
  );
};

export default TalentDashboardV2;