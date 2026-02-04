import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Mail, 
  Users, 
  Briefcase, 
  Trophy, 
  User, 
  Settings, 
  LifeBuoy, 
  Sparkles, 
  LogOut, 
  Bell, 
  Check,
  ChevronRight
} from 'lucide-react';
import { useOpportunityCreationStore } from '../stores/opportunityCreationStore';
import toast from 'react-hot-toast';
import "../workscope.css";

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

    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Mobile menu handlers
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // Close menu on escape key & scroll lock
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
                        
                        <div className="nav-item mobile-nav-item" onClick={() => { navigate('/org'); closeMobileMenu(); }}>
                            <LayoutGrid size={20} className="nav-icon" />
                            Overview
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
                            <Mail size={20} className="nav-icon" />
                            Outreach <span className="nav-badge">1</span>
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { navigate('/talent-pool'); closeMobileMenu(); }}>
                            <Users size={20} className="nav-icon" />
                            Talent Pool
                        </div>
                        <div className="nav-item mobile-nav-item active" onClick={() => { navigate('/opportunities'); closeMobileMenu(); }}>
                            <Briefcase size={20} className="nav-icon" />
                            Opportunities
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
                            <Trophy size={20} className="nav-icon" />
                            Contest
                        </div>

                        <div className="mobile-nav-divider"></div>

                        <div className="nav-item mobile-nav-item" onClick={() => { navigate('/org-profile'); closeMobileMenu(); }}>
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

            <div className="dashboard-container">
                {/* --- Sidebar --- */}
                <aside className="sidebar-left">
                    <div className="logo-section">
                        <img src="/Logo.svg" alt="Predulive Logo" style={{ height: "auto", width: "120px" }} />
                    </div>
                    <nav className="nav-menu">
                        <div className="nav-item" onClick={() => navigate('/org')}>
                            <LayoutGrid size={18} className="nav-icon" /> Overview
                        </div>
                        <div className="nav-item">
                            <Mail size={18} className="nav-icon" /> Outreach <span className="nav-badge">1</span>
                        </div>
                        <div className="nav-item" onClick={() => navigate('/talent-pool')}>
                            <Users size={18} className="nav-icon" /> Talent Pool
                        </div>
                        <div className="nav-item active" onClick={() => navigate('/opportunities')}>
                            <Briefcase size={18} className="nav-icon" /> Opportunities
                        </div>
                        <div className="nav-item">
                            <Trophy size={18} className="nav-icon" /> Contest
                        </div>
                    </nav>
                    <div className="sidebar-footer">
                        <div className="nav-item" onClick={() => navigate('/org-profile')}>
                            <User size={18} className="nav-icon" /> Profile
                        </div>
                        <div className="nav-item">
                            <Settings size={18} className="nav-icon" /> Settings
                        </div>
                        <div className="nav-item">
                            <LifeBuoy size={18} className="nav-icon" /> Support
                        </div>
                        <div className="nav-item">
                            <Sparkles size={18} className="nav-icon" /> Ask AI
                        </div>
                        <div className="nav-item" style={{ marginTop: '10px' }} onClick={() => navigate('/login')}>
                            <LogOut size={18} className="nav-icon" /> Log Out
                        </div>
                    </div>
                </aside>

            {/* --- Main Content Area --- */}
            <main className="main-content">
                {/* Header */}
                <header className="page-header">
                    <h1 className="page-title">Create an Opportunity</h1>
                    <button className="icon-btn"><Bell size={20} /></button>
                </header>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        {/* Step 1: Done */}
                        <div className="progress-step done">
                            <div className="step-icon-box"><Check size={14} strokeWidth={3} /></div> Core Details
                        </div>
                        <div className="progress-arrow"><ChevronRight size={16} /></div>
                        {/* Step 2: Active */}
                        <div className="progress-step active">
                            <div className="step-icon-box">2</div> Work Scope
                        </div>
                        <div className="progress-arrow"><ChevronRight size={16} /></div>
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
        </>
    );
};

export default OrgWorkScope;