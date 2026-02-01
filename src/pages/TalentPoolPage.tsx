import React, { useState } from 'react';
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

const TalentPoolPage: React.FC = () => {
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

  return (
    <div className="dashboard-container flex">
      {/* --- LEFT SIDEBAR --- */}
      <aside className="sidebar-left">
        <div className="logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" className="logo-img" style={{ width: '120px' }} />
        </div>

        <nav className="nav-menu">
          <Link to="/organization" className="nav-item">
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
          <Link to="/org/profile" className="nav-item">
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
  );
};

export default TalentPoolPage;