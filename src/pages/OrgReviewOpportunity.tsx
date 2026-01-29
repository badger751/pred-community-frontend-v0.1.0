
import { useNavigate } from 'react-router-dom';
import './OrgReviewOpportunity.css';
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
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Check, // <--- Added this for the filled circle icons
  X
} from 'lucide-react';

const OrgReviewOpportunity = () => {
  const navigate = useNavigate();

  return (
    <div className="org-review-container">
      {/* --- LEFT SIDEBAR --- */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" className="logo-img" />
        </div>

        <nav className="nav-menu">
          <div className="nav-item" onClick={() => navigate('/organization')}>
            <LayoutGrid size={18} /> Overview
          </div>
          <div className="nav-item">
            <Mail size={18} /> Outreach <span className="badge">1</span>
          </div>
          <div className="nav-item">
            <Users size={18} /> Talent Pool
          </div>
          <div className="nav-item active">
            <Briefcase size={18} /> Opportunities
          </div>
          <div className="nav-item">
            <Trophy size={18} /> Contest
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item" onClick={() => navigate('/org/profile')}>
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
          <div className="nav-item" style={{ marginTop: '10px' }}>
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

        {/* Wizard Progress Bar (UPDATED) */}
        <div className="wizard-container">
          <div className="wizard-bar">
            <ChevronLeft className="nav-arrow" size={24} />
            
            {/* Step 1: Completed */}
            <div className="step completed">
              <div className="step-icon">
                <Check size={14} strokeWidth={3} />
              </div>
              Core Details
            </div>
            
            <span className="step-arrow">→</span>
            
            {/* Step 2: Completed */}
            <div className="step completed">
              <div className="step-icon">
                <Check size={14} strokeWidth={3} />
              </div>
              Work Scope
            </div>
            
            <span className="step-arrow">→</span>
            
            {/* Step 3: Active */}
            <div className="step active">
              <div className="step-icon">
                3
              </div>
              Review
            </div>

            <ChevronRight className="nav-arrow" size={24} />
          </div>
        </div>

        {/* Review Card */}
        <div className="content-scroll">
          <div className="review-card">
            
            <h2 className="job-title">UX Design System for Mobile App</h2>
            <div className="job-meta">
              10-15 hrs / week &nbsp;•&nbsp; 35-45K / month &nbsp;•&nbsp; 1 month &nbsp;•&nbsp; Remote &nbsp;•&nbsp; Domain &nbsp;•&nbsp; Difficulty &nbsp;•&nbsp; Start date
            </div>

            <h3 className="section-title">Description</h3>
            <p className="description-text">
              Lorem ipsum dolor sit amet consectetur. Urna tellus elementum nunc risus vestibulum. Scelerisque nulla morbi libero tortor aliquam aliquam ultricies mi. Semper nec tincidunt magna in pellentesque in. Ullamcorper pellentesque porttitor tempus eleifend. Tincidunt dolor dolor ridiculus maecenas. Turpis interdum massa in eu odio at. Nec pretium quisque tristique sit pharetra ut cras tellus tincidunt. Sit faucibus ut in dis arcu et.
              <br/><br/>
              raesent scelerisque habitasse amet quam commodo. Molestie vitae mauris eget odio. Id sem sed ipsum feugiat mi sapien at pellentesque. Felis ut porttitor quam aenean enim pellentesque.
            </p>

            <h3 className="section-title">Key Deliverables</h3>
            <ul className="deliverables-list">
              <li>Lorem ipsum dolor sit amet consectetur. Urna tellus elementum nunc risus vestibulum. Scelerisque nulla morbi libero tortor aliquam aliquam ultricies mi. Semper nec tincidunt magna in pellentesque in.</li>
              <li>Tincidunt dolor dolor ridiculus maecenas. Turpis interdum massa in eu odio at. Nec pretium quisque tristique sit pharetra ut cras tellus tincidunt.</li>
            </ul>

            <h3 className="section-title">Primary Contact</h3>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-label">Full name</span>
                <span className="contact-value">•</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email ID</span>
                <span className="contact-value">•</span>
              </div>
            </div>

            <div className="tags-grid">
              <div className="tag-box">
                <span className="tag-label">Support-level</span>
                <span className="tag-value">Training-friendly</span>
              </div>
              <div className="tag-box">
                <span className="tag-label">Talent engagement</span>
                <span className="tag-value">Application-based</span>
              </div>
              <div className="tag-box">
                <span className="tag-label">Primary communication</span>
                <span className="tag-value">Email</span>
              </div>
              <div className="tag-box">
                <span className="tag-label">Application requirements</span>
                <span className="tag-value">Portfolio link, resume, short note</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="action-row">
              <button className="btn-secondary">Save Draft</button>
              <div className="right-actions">
                <button className="btn-text">Edit</button>
                <button className="btn-primary">Post Opportunity</button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- RIGHT PANEL --- */}
      <aside className="right-panel">
        <h3 className="standards-title">Opportunity Standards</h3>
        <p className="standards-subtitle">Ensure adding missing information for better talent matching</p>

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
          <div className="check-item">
            <CheckCircle2 className="icon-check" size={16} /> Support level indicated
          </div>
          <div className="check-item">
            <CheckCircle2 className="icon-check" size={16} /> Support level indicated
          </div>
          <div className="check-item">
            <div className="icon-cross"><X size={10} /></div> Missing: Difficulty level
          </div>
        </div>
      </aside>
    </div>
  );
};

export default OrgReviewOpportunity;