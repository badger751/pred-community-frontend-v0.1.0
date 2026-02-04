import React, { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Search,
  Calendar,
  MapPin,
  Star,
  Heart,
  Bookmark,
  UserRound,
  ThumbsUp
} from 'lucide-react';
import toast from "react-hot-toast";

import '../dashboard.css';
import './talent-card.css';
interface TalentProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  availability: string;
  isGoodMatch: boolean;
  isTrusted: boolean;
  history: string; // e.g., "4 Successful Collaborations"
  yoe: number;
  location: string;
  timezone: string;
  workStyle: string;
  skills: string[];
  lastActive: string;
}

const HamburgerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

const showVerificationToast = () => {
    toast("You have full access to the platform. Explore all features now!", {
      icon: "✅",
      duration: 3000,
      style: {
        border: "1px solid #10b981",
        background: "#ecfdf5",
        color: "#065f46",
        borderRadius: "8px",
        padding: "14px 20px",
      },
    });
  };






const TalentPoolPage: React.FC = () => {

 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


   // Mobile menu handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [primaryFilters, setPrimaryFilters] = useState({
    candidateType: 'all',
    domain: '',
    primaryRole: '',
    skills: '',
    experience: '',
    availability: ''
  });
  const [secondaryFilters, setSecondaryFilters] = useState({
    credibility: '',
    workStyle: '',
    location: '',
    timezone: ''
  });
  const [sortBy, setSortBy] = useState('relevance');

  const mockTalent: TalentProfile[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '/api/placeholder/60/60',
      title: 'Senior Frontend Developer',
      availability: 'Available now',
      isGoodMatch: true,
      isTrusted: true,
      history: '4 Successful Collaborations',
      yoe: 5,
      location: 'San Francisco',
      timezone: 'PST',
      workStyle: 'Remote',
      skills: ['React', 'TypeScript', 'UI/UX', 'Frontend'],
      lastActive: '5 mins ago'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      avatar: '/api/placeholder/60/60',
      title: 'Full Stack Engineer',
      availability: 'Available in 2 weeks',
      isGoodMatch: false,
      isTrusted: false,
      history: '2 Successful Collaborations',
      yoe: 3,
      location: 'Austin',
      timezone: 'CST',
      workStyle: 'Hybrid',
      skills: ['Node.js', 'MongoDB', 'React', 'Backend'],
      lastActive: '15 mins ago'
    },
    {
      id: '3',
      name: 'Emily Watson',
      avatar: '/api/placeholder/60/60',
      title: 'UX Designer',
      availability: 'Available now',
      isGoodMatch: true,
      isTrusted: true,
      history: '7 Successful Collaborations',
      yoe: 4,
      location: 'New York',
      timezone: 'EST',
      workStyle: 'Remote',
      skills: ['Figma', 'Design Systems', 'User Research', 'UI Design'],
      lastActive: '2 mins ago'
    }
  ];
    const clearAllFilters = () => {
    setPrimaryFilters({
      candidateType: 'all',
      domain: '',
      primaryRole: '',
      skills: '',
      experience: '',
      availability: ''
    });
    setSecondaryFilters({
      credibility: '',
      workStyle: '',
      location: '',
      timezone: ''
    });
  };

  const TalentCard: React.FC<{ talent: TalentProfile }> = ({ talent }) => {
    return (

      <div className="talent-card">
        {/* Header with Badges and Actions */}
        <div className="card-header">
          <div className="badge-group">
            {talent.isGoodMatch && (
              <div className="pill-good-match">
                <ThumbsUp size={12} />
                Good Match
              </div>
            )}
            {talent.isTrusted && (
              <div className="pill-trusted">
                <Star size={12} fill="currentColor" />
                Trusted
              </div>
            )}
            <div className="pill-collaborations">
              {talent.history}
            </div>
          </div>
          <div className="action-icons">
            <button title="Compare">
              <UserRound size={16} />
            </button>
            <button title="Favorite">
              <Heart size={16} />
            </button>
            <button title="Bookmark">
              <Bookmark size={16} />
            </button>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="profile-info">
          <div className="profile-avatar">
            <img 
              src={talent.avatar} 
              alt={talent.name}
            />
          </div>
          <div className="profile-identity">
            <div className="profile-name">{talent.name}</div>
            <div className="profile-title">
              {talent.title}
              <span className="profile-separator">·</span>
              {talent.availability}
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="stats-highlight">
          <div className="stat-item">
            <Calendar className="stat-icon" size={16} />
            <span className="stat-text">{talent.yoe} YOE</span>
          </div>
          <div className="stat-item">
            <MapPin className="stat-icon" size={16} />
            <span className="stat-text">{talent.location} ({talent.timezone})</span>
          </div>
          <div className="stat-item">
            <Briefcase className="stat-icon" size={16} />
            <span className="stat-text">{talent.workStyle}</span>
          </div>
        </div>

        {/* Skills & Domains */}
        <div className="skill-tags">
          {talent.skills.map((skill, index) => (
            <span 
              key={index}
              className="skill-tag"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="card-footer">
          <div className="activity-text">Active {talent.lastActive}</div>
          <div className="action-group">
            <button className="action-conversation">
              Start Conversation
            </button>
            <button className="action-portfolio">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    );
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
            
            {/* Primary Navigation */}
            <div className="nav-item mobile-nav-item active" onClick={() => {}}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
              Overview
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => {}}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Outreach <span className="nav-badge">1</span>
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => navigate('/talent-pool')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Talent Pool
            </div>
            <div className="nav-item mobile-nav-item" onClick={() => navigate('/opportunities')}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              Opportunities
            </div>
            <div className="nav-item mobile-nav-item" onClick={showVerificationToast}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
              Contest
            </div>

            <div className="mobile-nav-divider"></div>

            {/* Secondary Navigation */}
            <div className="nav-item mobile-nav-item" onClick={() => { navigate('/org-profile'); closeMobileMenu(); }}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile
            </div>
            <div className="nav-item mobile-nav-item" onClick={showVerificationToast}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </div>
            <div className="nav-item mobile-nav-item" onClick={showVerificationToast}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Support
            </div>
            <div className="nav-item mobile-nav-item">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
              Ask AI
            </div>
          </nav>
        </div>
      )}






















    <div className="dashboard-container flex">
      {/* --- LEFT SIDEBAR --- */}
      <aside className="sidebar-left">
        <div className="logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" className="logo-img" style={{ width: '120px' }} />
        </div>

        <nav className="nav-menu">
          <Link to="/org" className="nav-item">
            <LayoutGrid size={18} /> Overview
          </Link>
          <div className="nav-item">
            <Mail size={18} /> Outreach <span className="nav-badge">1</span>
          </div>
          <div className="nav-item active">
            <Users size={18} /> Talent Pool
          </div>
          <div className="nav-item" onClick={() => navigate('/opportunities')}>
            <Briefcase size={18} /> Opportunities
          </div>
          <div className="nav-item">
            <Trophy size={18} /> Contest
          </div>
        </nav>

        <div className="sidebar-footer">
          <Link to="/org-profile" className="nav-item">
            <User size={18} /> Profile
          </Link>
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

      {/* --- MAIN CONTENT --- */}
      <main className="main-content flex-1">
        {/* Header */}
        <header className="top-header flex justify-between items-center mb-6">
          <h1 className="page-title text-2xl font-bold text-gray-900">Talent Pool</h1>
          <div className="header-actions flex items-center gap-4">
            <button className="icon-btn">
              <Bell size={20} className="bell-icon-svg" />
            </button>
            <button className="view-teams-btn">
              View Teams
            </button>
          </div>
        </header>

        {/* Filters - Row 1 */}
        <div className="filter-container mb-4">
          <div className="filter-row">
            <select 
              className="filter-dropdown"
              value={primaryFilters.candidateType}
              onChange={(e) => setPrimaryFilters({...primaryFilters, candidateType: e.target.value})}
            >
              <option value="all">All Candidates</option>
              <option value="available">Available Now</option>
              <option value="upcoming">Available Soon</option>
            </select>
            
            <select 
              className="filter-dropdown"
              value={primaryFilters.domain}
              onChange={(e) => setPrimaryFilters({...primaryFilters, domain: e.target.value})}
            >
              <option value="">Domain</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
            </select>
            
            <select 
              className="filter-dropdown"
              value={primaryFilters.primaryRole}
              onChange={(e) => setPrimaryFilters({...primaryFilters, primaryRole: e.target.value})}
            >
              <option value="">Primary Role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
            
            <select 
              className="filter-dropdown"
              value={primaryFilters.experience}
              onChange={(e) => setPrimaryFilters({...primaryFilters, experience: e.target.value})}
            >
              <option value="">Years of Experience</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6+">6+ years</option>
            </select>
            
            <select 
              className="filter-dropdown"
              value={primaryFilters.availability}
              onChange={(e) => setPrimaryFilters({...primaryFilters, availability: e.target.value})}
            >
              <option value="">Availability</option>
              <option value="now">Available Now</option>
              <option value="2weeks">2 weeks</option>
              <option value="1month">1 month</option>
            </select>
          </div>

          {/* Row 2 - Secondary Filters */}
          <div className="filter-row-secondary">
            <div className="filter-group-spacing">
              <select 
                className="filter-dropdown"
                value={secondaryFilters.credibility}
                onChange={(e) => setSecondaryFilters({...secondaryFilters, credibility: e.target.value})}
              >
                <option value="">Credibility Level</option>
                <option value="trusted">Trusted</option>
                <option value="verified">Verified</option>
                <option value="new">New</option>
              </select>
              
              <select 
                className="filter-dropdown"
                value={secondaryFilters.workStyle}
                onChange={(e) => setSecondaryFilters({...secondaryFilters, workStyle: e.target.value})}
              >
                <option value="">Work Style</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </div>
            
            <div className="filter-group-spacing">
              <select 
                className="filter-dropdown"
                value={secondaryFilters.location}
                onChange={(e) => setSecondaryFilters({...secondaryFilters, location: e.target.value})}
              >
                <option value="">Location</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="india">India</option>
              </select>
              
              <select 
                className="filter-dropdown"
                value={secondaryFilters.timezone}
                onChange={(e) => setSecondaryFilters({...secondaryFilters, timezone: e.target.value})}
              >
                <option value="">Time Zone</option>
                <option value="pst">PST</option>
                <option value="est">EST</option>
                <option value="cst">CST</option>
              </select>
            </div>
            
            <div>
              <button 
                onClick={clearAllFilters}
                className="clear-filters-btn"
              >
                Clear All
              </button>
              <select 
                className="sort-dropdown ml-3"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="recent">Most Recent</option>
                <option value="experience">Experience</option>
                <option value="collaborations">Most Collaborations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="filter-container mb-6">
          <div className="enhanced-search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search talent by skills, name, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTalent.map((talent) => (
            <TalentCard key={talent.id} talent={talent} />
          ))}
        </div>

        {/* Empty State (if no talent) */}
        {mockTalent.length === 0 && (
          <div className="empty-state-container">
            <p className="empty-state-text">No talent found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
    </>
  );
};

export default TalentPoolPage;