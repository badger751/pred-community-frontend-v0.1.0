// src/pages/OrganizationProfile.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import '../dashboard.css';
import '../orgprofile.css';
import AddOrganizationLogoModal from '../components/OrganizationLogoModal';
import { Loader2 } from 'lucide-react';

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
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  // Form States
  const [orgName, setOrgName] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [organizationType, setOrganizationType] = useState<string[]>([]);
  const [otherType, setOtherType] = useState('');
  const [domain, setDomain] = useState<string[]>([]);
  const [otherDomain, setOtherDomain] = useState('');
  const [location, setLocation] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [opportunityType, setOpportunityType] = useState<string | null>(null);
  const [orgDescription, setOrgDescription] = useState('');
  const [selectedNonNegotiables, setSelectedNonNegotiables] = useState<string[]>([]);
  
  // UI States
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const fetchOrgProfile = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('organization_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setOrgName(data.organization_name || '');
          setLinkedinProfile(data.linkedin_url || '');
          setWebsiteLink(data.website_url || '');
          setOrgDescription(data.org_description || '');
          setPrimaryContact(data.primary_contact_name || '');
          setPrimaryEmail(data.primary_contact_email || '');
          
          // Logic for organization types (string -> array)
          if (data.organization_type) {
             setOrganizationType([data.organization_type]);
          }
          setOtherType(data.other_type_specify || '');
          
          // Logic for domain (string -> array)
          if (data.organization_domain) {
            setDomain([data.organization_domain]);
          }
          setOtherDomain(data.other_domain_specify || '');
          
          // Opportunity type (takes first if array, or direct if string)
          if (Array.isArray(data.opportunity_durations) && data.opportunity_durations.length > 0) {
            setOpportunityType(data.opportunity_durations[0]);
          } else if (data.opportunity_durations) {
            setOpportunityType(data.opportunity_durations);
          }
          
          setLocation(data.location || '');
          setTimeZone(data.time_zone || '');
          
          if (Array.isArray(data.non_negotiables)) {
            setSelectedNonNegotiables(data.non_negotiables);
          }
        }
      } catch (err) {
        console.error('Error fetching org profile:', err);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrgProfile();
  }, [user?.id]);

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

  return (
    <>
      {/* MOBILE TOP NAVIGATION */}
      <header className="mobile-top-nav">
        <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div className="mobile-logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" />
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <nav className="mobile-nav-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <button className="mobile-close-btn" onClick={closeMobileMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => navigate('/org')}>
              <LayoutGrid size={20} className="nav-icon" /> Overview
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => navigate('/opportunities')}>
              <Briefcase size={20} className="nav-icon" /> Opportunities
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => navigate('/talent-pool')}>
              <Users size={20} className="nav-icon" /> Talent Pool
            </div>
            <div className="mobile-nav-divider"></div>
            <div className="nav-item mobile-nav-item active" onClick={() => { navigate('/org-profile'); closeMobileMenu(); }}>
              <UserCircle size={20} className="nav-icon" /> Profile
            </div>
          </nav>
        </div>
      )}

    <div className="dashboard-container">
      {/* --- Sidebar --- */}
      <aside className="sidebar-left">
        
        {/* TOP SECTION (Logo + Main Nav) */}
        <div className="logo-section">
          <img src="/Logo.svg" alt="Predulive" style={{ width: '120px', height: 'auto' }} />
        </div>
        
        <nav className="nav-menu">
          <div className="nav-item" onClick={() => navigate('/org')}>
            <LayoutGrid className="nav-icon" size={18} /> Overview
          </div>
          <div className="nav-item" onClick={() => navigate('/opportunities')}>
            <Briefcase className="nav-icon" size={18} /> Opportunities
          </div>
          <div className="nav-item">
            <Send className="nav-icon" size={18} /> Outreach <span className="nav-badge">1</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/talent-pool')}>
            <Users className="nav-icon" size={18} /> Talent Pool
          </div>
          <div className="nav-item">
            <Trophy className="nav-icon" size={18} /> Contest
          </div>
        </nav>

        {/* BOTTOM SECTION (Profile, Settings, Support, Ask AI) */}
        <div className="sidebar-footer">
          <div className="nav-item active" onClick={() => navigate('/org-profile')}>
            <UserCircle className="nav-icon" size={18} /> Profile
          </div>
          <div className="nav-item">
            <Settings className="nav-icon" size={18} /> Settings
          </div>
          <div className="nav-item">
            <LifeBuoy className="nav-icon" size={18} /> Support
          </div>
          <div className="nav-item">
            <HelpCircle className="nav-icon" size={18} /> Ask AI
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="main-content">
        <div className="scrollable-content">
          <header className="profile-header-section">
            <div className="header-bc">Profile</div>
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
            <h2 className="profile-name">{orgName || "Organization name"}</h2>
            <div className="profile-description-container">
              <input
                type="text"
                className="profile-description-input"
                placeholder="Mission, size, locations, products, or teams involved."
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
              />
              <button className="save-description-btn">Save</button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-20">
            <Loader2 className="animate-spin text-green-600" size={40} />
          </div>
        ) : (
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Organization name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Org_name" 
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn profile</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="https://..." 
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Website link</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="https://..." 
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
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
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Specified type" 
                  value={otherType}
                  onChange={(e) => setOtherType(e.target.value)}
                />
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
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Specified domain during onboarding" 
                  value={otherDomain}
                  onChange={(e) => setOtherDomain(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Specified location during onboarding" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time Zone</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Specified time zone during onboarding" 
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                  />
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
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Specified Full name" 
                  value={primaryContact}
                  onChange={(e) => setPrimaryContact(e.target.value)}
                />
              </div>
              <div className="form-group">
                 <label className="form-label">Email</label>
                 <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Specified Email address" 
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                />
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
                {selectedNonNegotiables.length > 0 ? (
                  selectedNonNegotiables.map((item) => (
                    <span key={item} className="pill selected" style={{ cursor: 'default' }}>
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm italic">No non-negotiables specified</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-revert">Revert Changes</button>
            <button className="btn-save">Save Changes</button>
          </div>
        </div>
        )}
        </div>
      </main>

      <AddOrganizationLogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </div>
    </>
  );
};

export default OrganizationProfile;