// FILE: src/pages/OrganizationOpportunities.tsx

import React from 'react';
import './OrganizationOpportunities.css'; // Import the new CSS file

// Placeholder Icons (Inline SVGs)
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const CurrencyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>;


const OrganizationOpportunities: React.FC = () => {
    return (
        <div className="dashboard-container">
            {/* --- LEFT SIDEBAR (Kept from previous code with "Opportunities" active) --- */}
            <aside className="sidebar-left">
                <div className="logo-section">
                    <img src="/Logo.svg" alt="Predulive Logo" style={{ height: "auto", width: "120px" }} />
                </div>

                <nav className="nav-menu">
                    {/* Overview */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                            <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                            <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                            <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                        </svg>
                        Overview
                    </div>
                    {/* Outreach */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Outreach
                        <span className="nav-badge">1</span>
                    </div>
                    {/* Talent Pool */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Talent Pool
                    </div>
                    {/* Opportunities - ACTIVE */}
                    <div className="nav-item active">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        Opportunities
                    </div>
                    {/* Contest */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                        </svg>
                        Contest
                    </div>
                </nav>

                <div className="sidebar-footer">
                    {/* Profile */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Profile
                    </div>
                    {/* Settings */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                        Settings
                    </div>
                    {/* Support */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        Support
                    </div>
                    {/* Ask AI */}
                    <div className="nav-item">
             <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
            Ask AI
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="main-content">
                {/* Header */}
                <header className="opportunities-header">
                    <h1 className="page-title">Opportunities</h1>
                    <div className="header-actions">
                        <div className="search-bar-container">
                            <div className="search-icon-placeholder"><SearchIcon /></div>
                            <input type="text" className="search-bar-input" placeholder="Search" />
                        </div>
                        <button className="icon-btn"><BellIcon /></button>
                        <button className="btn-create-opportunity">Create New Opportunity</button>
                    </div>
                </header>

                {/* Filters */}
                <div className="filters-section">
                    <div className="filters-left">
                        <span className="filter-label">Filters</span>
                        <div className="filter-dropdown">Status <span className="chevron-icon"><ChevronDownIcon /></span></div>
                        <div className="filter-dropdown">Pipeline status <span className="chevron-icon"><ChevronDownIcon /></span></div>
                        <div className="filter-dropdown">Opportunity type <span className="chevron-icon"><ChevronDownIcon /></span></div>
                    </div>
                    <div className="sort-by-container">
                        <span className="sort-by-label">Sort by</span>
                        <div className="filter-dropdown">Latest activity <span className="chevron-icon"><ChevronDownIcon /></span></div>
                    </div>
                </div>

                {/* Column Headers */}
                <div className="column-headers">
                    <div className="col-header overview">OVERVIEW</div>
                    <div className="col-header status">STATUS</div>
                    <div className="col-header commitments">COMMITMENTS</div>
                    <div className="col-header compensation">COMPENSATION</div>
                    <div className="col-header pipeline">PIPELINE</div>
                    <div className="col-header actions">STATUS</div>
                </div>

                {/* Opportunity Card (Sample) */}
                <div className="opportunity-card">
                    <div className="card-section overview">
                        <div className="opp-title">UX Researcher (Sample)</div>
                        <div className="opp-details">Opportunity Type • Primary Technology / Stack etc.</div>
                        <div className="opp-posted">Posted 1 hr ago</div>
                    </div>
                    <div className="card-section status">
                        <span className="badge live">LIVE</span>
                        <span className="badge action-required">ACTION REQUIRED</span>
                        <div className="status-text"><span className="status-dot"></span>Needs shortlisting</div>
                    </div>
                    <div className="card-section commitments">
                        <div className="info-item"><span className="info-icon-placeholder"><CalendarIcon /></span> 3 months</div>
                        <div className="info-item"><span className="info-icon-placeholder"><ClockIcon /></span> 15 hrs/week</div>
                        <div className="info-item"><span className="info-icon-placeholder"><MapPinIcon /></span> Remote</div>
                    </div>
                    <div className="card-section compensation">
                        <div className="info-item"><span className="info-icon-placeholder"><CurrencyIcon /></span> Paid (amount) / Unpaid</div>
                        <div className="info-item"><span className="info-icon-placeholder"><CurrencyIcon /></span> Total budget</div>
                    </div>
                    <div className="card-section pipeline">
                        <div className="pipeline-stat">
                            <div className="stat-count">12</div>
                            <div className="stat-label">Applied</div>
                        </div>
                        <div className="pipeline-stat">
                            <div className="stat-count">12</div>
                            <div className="stat-label">Shortlisted</div>
                        </div>
                        <div className="pipeline-stat">
                            <div className="stat-count">12</div>
                            <div className="stat-label">Selected</div>
                        </div>
                    </div>
                    <div className="card-section actions">
                        <button className="btn-view-candidates">View Candidates</button>
                    </div>
                </div>

                {/* Empty State */}
                <div className="empty-state-container">
                    <p className="empty-state-text">You have not posted any opportunities yet.</p>
                    <button className="btn-post-first">Post 1st Opportunity</button>
                </div>
            </main>
        </div>
    );
};

export default OrganizationOpportunities;