import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../dashboard.css";
import "../portfolio.css";
import { useAuthStore } from "../stores/authStore";
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

const TalentPortfolioPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
        const fetchPortfolioData = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session?.user?.id) return;

                const { data } = await supabase
                    .from("talent_profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single();

                if (data) setProfile(data);
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolioData();
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

    if (loading) return <div className="loading-spinner">Architecting Portfolio...</div>;

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

                        <div className="nav-item mobile-nav-item" onClick={() => { navigate('/talent-dashboard-v2'); closeMobileMenu(); }}>
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

                        <div className="nav-item mobile-nav-item active" onClick={() => { closeMobileMenu(); }}>
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
                {/* LEFT SIDEBAR */}
                <aside className="sidebar-left">
                    <div className="logo-section">
                        <img src="/Logo.svg" alt="Logo" style={{ width: "120px" }} />
                    </div>
                    <nav className="nav-menu">
                        <div className="nav-item" onClick={() => navigate('/talent-dashboard-v2')}>
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
                        <div className="nav-item" onClick={showVerificationToast}>
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            Outreach
                        </div>
                        <div className="nav-item active">
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="3" y1="9" x2="21" y2="9"></line>
                                <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            Portfolio
                        </div>
                        <div className="nav-item" onClick={showVerificationToast}>
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                            </svg>
                            Contests
                        </div>
                    </nav>
                    <div className="sidebar-footer">
                        <div className="nav-item" onClick={() => navigate('/talent-profile')}>
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Profile
                        </div>
                        <div className="nav-item" onClick={showVerificationToast}>
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
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

                {/* MAIN CONTENT */}
                <main className="main-content">
                    <div className="portfolio-container">
                        
                        {/* Header Actions */}
                        <div className="portfolio-header">
                            <div className="portfolio-title-group">
                                <h2>Portfolio</h2>
                                <span className="last-updated">Last updated 2 hours ago</span>
                            </div>
                            <div className="portfolio-actions">
                                <button className="btn-outline">View / Upload Resume</button>
                                <button className="btn-edit-portfolio" onClick={() => navigate('/talent-profile')}>Edit Portfolio</button>
                            </div>
                        </div>

                        {/* HERO CARD */}
                        <section className="portfolio-hero-card">
                            <div className="hero-main-info">
                                <div className="hero-avatar" style={{ background: '#e2e8f0' }}>
                                    {/* Avatar integration here */}
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" style={{margin: '30px'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <div className="hero-text">
                                    <h1>{profile?.full_name || "Alex Chen"}</h1>
                                    <p className="hero-headline">{profile?.headline || "Product designer focused on UX systems"}</p>
                                    <div className="hero-meta">
                                        <span>{profile?.city || "San Francisco"}, {profile?.country || "USA"}</span>
                                        <span>•</span>
                                        <div className="status-dot"></div>
                                        <span>Open to {profile?.opportunity_types?.[0] || "Projects"}</span>
                                    </div>
                                </div>
                            </div>

                            <blockquote className="hero-bio-quote">
                               "{profile?.bio || "I enjoy working on structured problems where learning and delivery move together."}"
                            </blockquote>

                            <div className="stat-grid">
                                <div className="stat-card">
                                    <span className="stat-label">Experience</span>
                                    <span className="stat-value">{profile?.experience_years || 0} years</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Domains</span>
                                    <span className="stat-value">{profile?.domains?.[0] || "N/A"}</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Work Style</span>
                                    <span className="stat-value">{profile?.work_style || "N/A"}</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Credibility Level</span>
                                    <span className="stat-value verified-badge">
                                        Contributor 
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                    </span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Weekly Activity</span>
                                    <div className="heatmap-grid">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className={`heat-cell level-${Math.floor(Math.random() * 4)}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* EDUCATION */}
                        <section className="education-section">
                            <h3 className="section-heading">Education Timeline</h3>
                            <div className="timeline-scroll">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div className="education-card" key={i}>
                                        <div className="edu-year">2023-2025</div>
                                        <div className="edu-univ">University Name</div>
                                        <div className="edu-course">Course Name</div>
                                        <div className="edu-focus">Focus: Design Thinking, AI, Research</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FEATURED WORK */}
                        <section className="work-section" style={{ marginTop: '48px' }}>
                            <h3 className="section-heading">Featured Work</h3>
                            <div className="work-grid">
                                {[1, 2, 3].map((i) => (
                                    <article className="work-card" key={i}>
                                        <div className="work-media">
                                            <div className="play-button">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                            </div>
                                        </div>
                                        <div className="work-info">
                                            <div className="work-tags">
                                                <span className="work-tag tag-blue">Content / Project Type</span>
                                                <span className="work-tag tag-orange">Showreel</span>
                                            </div>
                                            <h4 className="work-title">Project Title</h4>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </>
    );
};

export default TalentPortfolioPage;
