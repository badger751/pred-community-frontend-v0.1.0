import React, { useState, useEffect } from 'react';
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
  Clock,
  MapPin,
  Calendar,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useOpportunitiesStore, type FullOpportunity } from '../stores/opportunitiesStore';
import OpportunityDetailModal from '../components/OpportunityDetailModal';
import '../opportunities.css';

const OpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedOpportunity, setSelectedOpportunity] = useState<FullOpportunity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Store hooks
  const { 
    opportunities, 
    loading, 
    error, 
    fetchOpportunities, 
    refreshOpportunities, 
    clearError 
  } = useOpportunitiesStore();

  // Fetch opportunities on component mount
  useEffect(() => {
    fetchOpportunities();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Filter and sort opportunities
  const filteredAndSortedOpportunities = opportunities
    .filter(opp => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.stack.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || 
        opp.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          // Sort by most recent (we'll need to parse postedAt for proper sorting)
          return 0; // TODO: Implement proper date sorting
        case 'name':
          return a.title.localeCompare(b.title);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'candidates':
          return b.pipeline.applied - a.pipeline.applied;
        default:
          return 0;
      }
    });

  

  const OpportunityRow: React.FC<{ opportunity: FullOpportunity; onClick: () => void }> = ({ opportunity, onClick }) => {
    const getStatusClass = (status: string) => {
      switch (status.toLowerCase()) {
        case 'live': return 'opportunity-status-live';
        case 'draft': return 'opportunity-status-draft';
        case 'paused': return 'opportunity-status-paused';
        case 'closed': return 'opportunity-status-closed';
        default: return 'opportunity-status-badge';
      }
    };

    return (
      <div 
        className="opportunity-card"
        onClick={onClick}
      >
        <div className="opportunity-card-grid">
          {/* Overview */}
          <div className="opportunity-overview">
            <h3 className="opportunity-title">{opportunity.title}</h3>
            <div className="opportunity-meta">
              <div className="opportunity-meta-item">
                <span>{opportunity.type}</span>
              </div>
              <div className="opportunity-skills">
                {opportunity.stack.slice(0, 3).map((skill) => (
                  <span key={skill} className="opportunity-skill-chip">{skill}</span>
                ))}
                {opportunity.stack.length > 3 && (
                  <span className="opportunity-skill-chip">+{opportunity.stack.length - 3}</span>
                )}
              </div>
              <div className="opportunity-posted-time">
                <Clock size={12} />
                <span>Posted {opportunity.postedAt}</span>
              </div>
            </div>
          </div>

          {/* Domain */}
          <div className="opportunity-detail-item">
            <span className="opportunity-detail-value truncate">{opportunity.domain || '-'}</span>
          </div>

          {/* Experience */}
          <div className="opportunity-detail-item">
            <span className="opportunity-detail-value">{opportunity.difficulty || '-'}</span>
          </div>

          {/* Mentorship */}
          <div className="opportunity-detail-item">
            <div className={`opportunity-mentorship ${opportunity.mentorship_provided ? 'opportunity-mentorship-yes' : 'opportunity-mentorship-no'}`}>
              {opportunity.mentorship_provided ? '✓' : '—'}
            </div>
          </div>

          {/* Timeline */}
          <div className="opportunity-detail-item">
            <span className="opportunity-detail-value truncate">
              {opportunity.deadline || opportunity.start_timeline || 'Flexible'}
            </span>
          </div>

          {/* Status */}
          <div>
            <div className={`opportunity-status-badge ${getStatusClass(opportunity.status)}`}>
              {opportunity.status}
            </div>
            {opportunity.statusNote && (
              <div className="opportunity-status-note">{opportunity.statusNote}</div>
            )}
          </div>

          {/* Commitments */}
          <div className="opportunity-overview">
            <div className="space-y-2">
              <div className="opportunity-detail-item">
                <Calendar size={12} className="text-gray-400" />
                <span className="opportunity-detail-value">{opportunity.commitments.duration}</span>
              </div>
              <div className="opportunity-detail-item">
                <Clock size={12} className="text-gray-400" />
                <span className="opportunity-detail-value">{opportunity.commitments.hoursPerWeek}h/w</span>
              </div>
              <div className="opportunity-detail-item">
                <MapPin size={12} className="text-gray-400" />
                <span className="opportunity-detail-value">{opportunity.commitments.location}</span>
              </div>
            </div>
          </div>

          {/* Views */}
          <div className="opportunity-views">
            <span>{opportunity.views_count || 0}</span>
          </div>

          {/* Actions */}
          <div>
            <button 
              className={`opportunity-action-btn ${opportunity.status === 'LIVE' ? 'opportunity-action-primary' : 'opportunity-action-secondary'}`}
              onClick={(e) => {
                e.stopPropagation();
                // Handle action button click if needed
              }}
            >
              {opportunity.actionLabel}
            </button>
          </div>
        </div>
      </div>
    );
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
      <main className="opportunities-container flex-1">
        {/* Header */}
        <header className="opportunities-header">
          <h1 className="opportunities-title">Opportunities</h1>
          <div className="opportunities-header-actions">
            <div className="opportunities-search-bar">
              <Search size={18} className="opportunities-search-icon" />
              <input 
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="opportunities-search-input"
              />
            </div>
            <button 
              className="opportunities-btn-secondary"
              onClick={() => refreshOpportunities()}
              title="Refresh opportunities"
            >
              <RefreshCw size={16} className={`opportunities-btn-icon ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="opportunities-btn-secondary">
              <Bell size={16} className="opportunities-btn-icon" />
            </button>
            <button 
              className="opportunities-btn-primary"
              onClick={() => navigate('/organization-post-opportunity')}
            >
              Create New Opportunity
            </button>
          </div>
        </header>

        {/* Error State */}
        {error && (
          <div className="opportunities-error-state">
            <div className="flex items-center">
              <AlertCircle size={20} className="opportunities-error-icon" />
              <div>
                <p className="opportunities-error-message">Error loading opportunities</p>
                <p className="opportunities-error-detail">{error}</p>
              </div>
              <button 
                onClick={() => {
                  clearError();
                  fetchOpportunities();
                }}
                className="opportunities-btn-primary"
                style={{ marginTop: '12px' }}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="opportunities-filter-bar">
          <div className="opportunities-filter-row">
            <div className="opportunities-filter-group">
              <select 
                className="opportunities-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="live">Live</option>
                <option value="draft">Draft</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </select>
              
              <select className="opportunities-select">
                <option value="">Pipeline Status</option>
                <option value="no-candidates">No Candidates</option>
                <option value="has-candidates">Has Candidates</option>
                <option value="in-review">In Review</option>
              </select>
              
              <select className="opportunities-select">
                <option value="">Opportunity Type</option>
                <option value="project">Project</option>
                <option value="internship">Internship</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
              </select>
            </div>
            
            <div className="opportunities-filter-group">
              <span className="opportunities-sort-label">Sort by:</span>
              <select 
                className="opportunities-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
                <option value="candidates">Most Candidates</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="opportunities-table-header">
          <div className="opportunities-table-row">
            <div className="col-span-3">Overview</div>
            <div className="col-span-1">Domain</div>
            <div className="col-span-1">Experience</div>
            <div className="col-span-1">Mentorship</div>
            <div className="col-span-1">Timeline</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Commitments</div>
            <div className="col-span-1">Views</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="opportunities-list">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="opportunity-skeleton">
                <div className="opportunity-card-grid">
                  <div className="opportunity-overview">
                    <div className="opportunity-skeleton" style={{ width: '80%', height: '20px', marginBottom: '8px' }}></div>
                    <div className="opportunity-skeleton" style={{ width: '60%', height: '14px', marginBottom: '4px' }}></div>
                    <div className="opportunity-skeleton" style={{ width: '40%', height: '12px' }}></div>
                  </div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '60px' }}></div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '80px' }}></div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '40px' }}></div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '40px' }}></div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '60px' }}></div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '40px' }}></div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '40px' }}></div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '40px' }}></div>
                  <div className="opportunity-skeleton" style={{ height: '16px', width: '60px' }}></div>
                </div>
              </div>
            ))
          ) : filteredAndSortedOpportunities.length > 0 ? (
            filteredAndSortedOpportunities.map((opportunity) => (
              <OpportunityRow 
                key={opportunity.id} 
                opportunity={opportunity}
                onClick={() => {
                  setSelectedOpportunity(opportunity);
                  setIsModalOpen(true);
                }}
              />
            ))
          ) : (
            <div className="opportunities-empty-state">
              <Briefcase size={64} className="opportunities-empty-icon" />
              <h3 className="opportunities-empty-title">No Opportunities Found</h3>
              <p className="opportunities-empty-description">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No opportunities found matching your filters. Try adjusting your search terms or filters.' 
                  : 'No opportunities found. Create your first opportunity to get started!'}
              </p>
            </div>
          )}
        </div>

        {/* Opportunity Detail Modal */}
        <OpportunityDetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOpportunity(null);
          }}
          opportunity={selectedOpportunity}
        />
      </main>
    </div>
  );
};

export default OpportunitiesPage;