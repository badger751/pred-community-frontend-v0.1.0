import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOpportunityCreationStore } from '../stores/opportunityCreationStore';
import toast from 'react-hot-toast';
import "../workscope.css";

// --- Icons ---
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

// Sidebar Icons
const OverviewIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>;
const OutreachIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const TalentPoolIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const OpportunitiesIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const ContestIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>;
const ProfileIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const SettingsIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const SupportIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
const AskAIIcon = () => <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>;

const OrgWorkScope: React.FC = () => {
    // Store hooks
    const { 
        workScope, 
        setWorkScope, 
        is_loading, 
        clearError 
    } = useOpportunityCreationStore();

    // Clear errors on mount to prevent premature banners
    useEffect(() => {
        clearError();
    }, []);

    const navigate = useNavigate();

    // Helper for checkbox toggling
    const toggleAppReq = (req: string) => {
        const currentReqs = workScope.application_requirements || [];
        setWorkScope({ 
            application_requirements: currentReqs.includes(req) 
                ? currentReqs.filter(r => r !== req) 
                : [...currentReqs, req]
        });
    };

    const handleSaveAndNext = () => {
        // Store is updated via setWorkScope on each field; just navigate
        navigate('/org-review-opportunity');
    };

    return (
        <div className="dashboard-container">
            {/* --- Sidebar --- */}
            <aside className="sidebar-left">
                <div className="logo-section">
                    <img src="/Logo.svg" alt="Predulive Logo" style={{ height: "auto", width: "120px" }} />
                </div>
                <nav className="nav-menu">
                    <div className="nav-item"><OverviewIcon /> Overview</div>
                    <div className="nav-item"><OutreachIcon /> Outreach <span className="nav-badge">1</span></div>
                    <div className="nav-item"><TalentPoolIcon /> Talent Pool</div>
                    <div className="nav-item active"><OpportunitiesIcon /> Opportunities</div>
                    <div className="nav-item"><ContestIcon /> Contest</div>
                </nav>
                <div className="sidebar-footer">
                    <div className="nav-item"><ProfileIcon /> Profile</div>
                    <div className="nav-item"><SettingsIcon /> Settings</div>
                    <div className="nav-item"><SupportIcon /> Support</div>
                    <div className="nav-item"><AskAIIcon /> Ask AI</div>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="main-content">
                {/* Header */}
                <header className="page-header">
                    <h1 className="page-title">Create an Opportunity</h1>
                    <button className="icon-btn"><BellIcon /></button>
                </header>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        {/* Step 1: Done */}
                        <div className="progress-step done">
                            <div className="step-icon-box"><CheckIcon /></div> Core Details
                        </div>
                        <div className="progress-arrow">→</div>
                        {/* Step 2: Active */}
                        <div className="progress-step active">
                            <div className="step-icon-box">2</div> Work Scope
                        </div>
                        <div className="progress-arrow">→</div>
                        {/* Step 3: Pending */}
                        <div className="progress-step">
                            <div className="step-icon-box">3</div> Review
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="form-section">
                    
                    {/* Detailed Description */}
                    <div className="form-group">
                        <label className="form-label">Detailed description<span>*</span></label>
                        <textarea 
                            className="form-textarea" 
                            placeholder="List out the key requirements and responsibilities here"
                            value={workScope.description || ''}
                            onChange={(e) => setWorkScope({ description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Key Deliverables */}
                    <div className="form-group">
                        <label className="form-label">Key deliverables<span>*</span></label>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="List out the key deliverables here" 
                            value={workScope.key_deliverables || ''}
                            onChange={(e) => setWorkScope({ key_deliverables: e.target.value })}
                        />
                    </div>

                    {/* Support Level Cards */}
                    <div className="form-group">
                        <label className="form-label">Support level<span>*</span></label>
                        <div className="support-cards-container">
                            <div className={`support-card ${workScope.support_level === 'Training-friendly' ? 'selected' : ''}`} onClick={() => setWorkScope({ support_level: 'Training-friendly' })}>
                                <div className="support-card-title">Training-friendly</div>
                                <div className="support-card-desc">High mentorship provided</div>
                            </div>
                            <div className={`support-card ${workScope.support_level === 'Balanced' ? 'selected' : ''}`} onClick={() => setWorkScope({ support_level: 'Balanced' })}>
                                <div className="support-card-title">Balanced</div>
                                <div className="support-card-desc">Regular check-ins conducted</div>
                            </div>
                            <div className={`support-card ${workScope.support_level === 'Independent' ? 'selected' : ''}`} onClick={() => setWorkScope({ support_level: 'Independent' })}>
                                <div className="support-card-title">Independent</div>
                                <div className="support-card-desc">Outcome-focused</div>
                            </div>
                        </div>
                    </div>

                    {/* Talent Engagement Pills */}
                    <div className="form-group">
                        <label className="form-label">Talent engagement</label>
                        <div className="pills-row">
                                {['invite-only', 'application-based', 'Both'].map(option => (
                                    <div 
                                        key={option} 
                                        className={`eng-pill ${workScope.talent_engagement === option ? 'selected' : ''}`}
                                        onClick={() => setWorkScope({ talent_engagement: option })}
                                    >
                                        {option}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Primary Communication Mode */}
                    <div className="form-group">
                        <label className="form-label">Primary communication mode</label>
                        <div className="options-grid-2col">
                                {['email', 'whatsApp', 'slack', 'platform', 'discord'].map(mode => (
                                    <label key={mode} className="option-label">
                                        <input type="radio" name="commMode" className="option-input" checked={workScope.primary_communication_mode === mode} onChange={() => setWorkScope({ primary_communication_mode: mode })} />
                                        {mode}
                                    </label>
                                ))}
                        </div>
                    </div>

                    {/* Application Requirements */}
                    <div className="form-group">
                        <label className="form-label">Application requirements<span>*</span></label>
                        <div className="options-grid-2col">
                                {['Portfolio link', 'Resume', 'Work sample', 'Short note'].map(req => (
                                    <label key={req} className="option-label">
                                        <input type="checkbox" className="option-input" checked={workScope.application_requirements?.includes(req)} onChange={() => toggleAppReq(req)} />
                                        {req}
                                    </label>
                                ))}
                        </div>
                    </div>

                    {/* Primary Contact Section - Modified to Side-by-Side Flex */}
                    <div className="form-group">
                        <label className="form-label">Primary Contact<span>*</span></label>
                        <div className="contact-row">
                            <input 
                                type="text" 
                                className="form-input" 
                                placeholder="Full name" 
                                value={workScope.primary_contact_name || ''}
                                onChange={(e) => setWorkScope({ primary_contact_name: e.target.value })}
                            />
                            <input 
                                type="email" 
                                className="form-input" 
                                placeholder="Email" 
                                value={workScope.primary_contact_email || ''}
                                onChange={(e) => setWorkScope({ primary_contact_email: e.target.value })}
                                onBlur={() => {
                                    const email = workScope.primary_contact_email || '';
                                    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
                                        toast.error('Email address must be valid (e.g., user@example.com)');
                                    }
                                }}
                            />
                        </div>
                    </div>



                    {/* Footer Actions - With Pill Button */}
                    <div className="form-actions">
                        <button className="btn-draft" disabled={is_loading}>
                            {is_loading ? 'Saving...' : 'Save Draft'}
                        </button>
                        <div className="action-right">
                            <button className="btn-text">Clear all</button>
                            <button className="btn-primary" onClick={handleSaveAndNext} disabled={is_loading}>
                                {is_loading ? 'Saving...' : 'Save & Next'}
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default OrgWorkScope;