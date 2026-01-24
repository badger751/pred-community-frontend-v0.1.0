// src/pages/OrganizationProfile.tsx

import React, { useState } from 'react';
import '../OrganizationProfile.css';
import AddOrganizationLogoModal from '../components/AddOrganizationLogoModal';

import {
  LayoutGrid,
  Briefcase,
  Send,
  Users,
  Trophy,
  UserCircle,
  Settings,
  LifeBuoy,
  HelpCircle,
  Edit2,
  ChevronDown
} from 'lucide-react';

const OrganizationProfile: React.FC = () => {
  const [organizationType, setOrganizationType] = useState<string[]>([]);
  const [domain, setDomain] = useState<string[]>([]);
  const [opportunityType, setOpportunityType] = useState<string | null>(null);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  const togglePill = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    state: string[],
    value: string
  ) => {
    if (state.includes(value)) {
      setter(state.filter((item) => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  const organizationTypes = ['Startup', 'SME', 'Enterprise', 'University / Lab', 'Non-Profit', 'Agency', 'Other'];
  const domains = ['Software / Product', 'Data / AI', 'Design / Creative', 'Social impact / Non-profit', 'Marketing / Growth', 'Business / Operations', 'Research / Academia', 'Other'];
  const nonNegotiables = ['Communication Skills', 'On-Time Delivery', 'Problem Solving', 'Collaboration Skills', 'Portfolio Quality', 'Initiative & Ownership', 'Attention to Detail', 'Learning mindset'];

  return (
    <div className="dashboard-container">
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        
        {/* TOP SECTION (Logo + Main Nav) */}
        <div className="sidebar-top-section">
          <div className="logo-container">
            {/* Make sure the path to your logo is correct */}
            <img src="/Predulive org logo 1.svg" alt="Predulive" className="logo" />
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <LayoutGrid className="nav-icon" size={20} />
              Overview
            </li>
            <li className="nav-item">
              <Briefcase className="nav-icon" size={20} />
              Opportunities
            </li>
            <li className="nav-item">
              <Send className="nav-icon" size={20} />
              Outreach
              <span className="nav-badge">1</span>
            </li>
            <li className="nav-item">
              <Users className="nav-icon" size={20} />
              Talent Pool
            </li>
            <li className="nav-item">
              <Trophy className="nav-icon" size={20} />
              Contest
            </li>
          </ul>
        </div>

        {/* BOTTOM SECTION (Profile, Settings, Support, Ask AI) */}
        <div className="sidebar-bottom-section">
          <ul className="nav-menu">
            <li className="nav-item active">
              <UserCircle className="nav-icon" size={20} />
              Profile
            </li>
            <li className="nav-item">
              <Settings className="nav-icon" size={20} />
              Settings
            </li>
            <li className="nav-item">
              <LifeBuoy className="nav-icon" size={20} />
              Support
            </li>
            <li className="nav-item">
              <HelpCircle className="nav-icon" size={20} />
              Ask AI
            </li>
          </ul>
        </div>

      </aside>

      {/* --- Main Content --- */}
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">Profile</h1>
        </header>

        <div className="profile-header-card">
          <div className="avatar-container">
            <div className="avatar">
               <Edit2 size={32} />
            </div>
            <button className="edit-icon" onClick={() => setIsLogoModalOpen(true)}>
              <Edit2 size={16} color="#6b7280" />
            </button>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Organization name</h2>
            <div className="profile-description-container">
              <input
                type="text"
                className="profile-description-input"
                placeholder="Description entered during organization onboarding"
              />
              <button className="save-description-btn">Save</button>
            </div>
          </div>
        </div>

        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Organization name</label>
              <input type="text" className="form-input" placeholder="Org_name" />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn profile</label>
              <input type="text" className="form-input" placeholder="https://..." />
            </div>
            <div className="form-group">
              <label className="form-label">Website link</label>
              <input type="text" className="form-input" placeholder="https://..." />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Organization Type</label>
              <div className="pills-container">
                {organizationTypes.map((type) => (
                  <button
                    key={type}
                    className={`pill ${organizationType.includes(type) ? 'selected' : ''}`}
                    onClick={() => togglePill(setOrganizationType, organizationType, type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input type="text" className="form-input" placeholder="Specified type" />
            </div>
            <div className="form-group">
              <label className="form-label">Domain</label>
              <div className="pills-container">
                {domains.map((d) => (
                  <button
                    key={d}
                    className={`pill ${domain.includes(d) ? 'selected' : ''}`}
                    onClick={() => togglePill(setDomain, domain, d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <input type="text" className="form-input" placeholder="Specified domain during onboarding" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input type="text" className="form-input" placeholder="Specified location during onboarding" />
            </div>
            <div className="form-group">
              <label className="form-label">Time Zone</label>
              <div style={{ position: 'relative' }}>
                <input type="text" className="form-input" placeholder="Specified time zone during onboarding" />
                <ChevronDown
                  size={20}
                  color="#9ca3af"
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Primary contact</label>
              <input type="text" className="form-input" placeholder="Specified Full name" />
            </div>
            <div className="form-group">
               <label className="form-label" style={{visibility: 'hidden'}}>Email</label>
               <input type="text" className="form-input" placeholder="Specified Email address" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">What kind of opportunities do you usually post?</label>
              <div className="radio-group">
                {[
                  'Small tasks (1 to 2 weeks)',
                  'Short projects (2 to 4 weeks)',
                  'Mid-length projects (1 to 2 months)',
                  'Long projects (3+ months)',
                  'Not sure yet',
                ].map((option) => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      className="radio-input"
                      name="opportunityType"
                      value={option}
                      checked={opportunityType === option}
                      onChange={() => setOpportunityType(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">What are your non-negotiables for collaboration</label>
              <div className="pills-container">
                {nonNegotiables.map((item) => (
                  <span key={item} className="pill" style={{ cursor: 'default', backgroundColor: '#F3F4F6' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="revert-btn">Revert Changes</button>
            <button className="save-btn">Save Changes</button>
          </div>
        </div>
      </main>

      <AddOrganizationLogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </div>
  );
};

export default OrganizationProfile;