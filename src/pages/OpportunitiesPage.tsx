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
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  UserPlus
} from 'lucide-react';
import '../dashboard.css';

interface Opportunity {
  id: string;
  title: string;
  type: string;
  stack: string[];
  postedAt: string;
  status: 'LIVE' | 'DRAFT' | 'PAUSED' | 'CLOSED';
  statusNote?: string;
  commitments: {
    duration: string;
    hoursPerWeek: number;
    location: string;
  };
  compensation: {
    isPaid: boolean;
    amount?: string;
    totalBudget?: string;
  };
  pipeline: {
    applied: number;
    shortlisted: number;
    selected: number;
  };
  actionLabel: string;
}

const OpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const mockOpportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Frontend Development for Mobile App',
      type: 'Project',
      stack: ['React', 'TypeScript'],
      postedAt: '2 hr ago',
      status: 'LIVE',
      statusNote: 'No candidates yet',
      commitments: {
        duration: '3 months',
        hoursPerWeek: 15,
        location: 'Remote'
      },
      compensation: {
        isPaid: true,
        amount: '35-45K/month',
        totalBudget: '1.5L'
      },
      pipeline: {
        applied: 0,
        shortlisted: 0,
        selected: 0
      },
      actionLabel: 'Browse Talent Pool'
    },
    {
      id: '2',
      title: 'UX Design System for Mobile App',
      type: 'Internship',
      stack: ['Figma', 'Design Systems'],
      postedAt: '5 hr ago',
      status: 'DRAFT',
      statusNote: 'Missing details',
      commitments: {
        duration: '1 month',
        hoursPerWeek: 10,
        location: 'Remote'
      },
      compensation: {
        isPaid: true,
        amount: '15-20K/month',
        totalBudget: '75K'
      },
      pipeline: {
        applied: 0,
        shortlisted: 0,
        selected: 0
      },
      actionLabel: 'Edit Draft'
    },
    {
      id: '3',
      title: 'Backend API Development',
      type: 'Full-time',
      stack: ['Node.js', 'MongoDB'],
      postedAt: '1 day ago',
      status: 'PAUSED',
      statusNote: 'Under review',
      commitments: {
        duration: '6 months',
        hoursPerWeek: 40,
        location: 'Hybrid'
      },
      compensation: {
        isPaid: true,
        amount: '60-80K/month',
        totalBudget: '4.8L'
      },
      pipeline: {
        applied: 12,
        shortlisted: 3,
        selected: 0
      },
      actionLabel: 'View Candidates'
    }
  ];

  const StatusBadge: React.FC<{ status: string; note?: string }> = ({ status, note }) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    
    switch (status) {
      case 'LIVE':
        return (
          <div className="flex flex-col">
            <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>
            {note && <span className="text-xs text-gray-500 mt-1">{note}</span>}
          </div>
        );
      case 'DRAFT':
        return (
          <div className="flex flex-col">
            <span className={`${baseClasses} bg-orange-100 text-orange-800`}>{status}</span>
            {note && <span className="text-xs text-gray-500 mt-1">{note}</span>}
          </div>
        );
      case 'PAUSED':
        return (
          <div className="flex flex-col">
            <span className={`${baseClasses} bg-red-100 text-red-800`}>{status}</span>
            {note && <span className="text-xs text-gray-500 mt-1">{note}</span>}
          </div>
        );
      case 'CLOSED':
        return (
          <div className="flex flex-col">
            <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>
            {note && <span className="text-xs text-gray-500 mt-1">{note}</span>}
          </div>
        );
      default:
        return <span className={baseClasses}>{status}</span>;
    }
  };

  const OpportunityRow: React.FC<{ opportunity: Opportunity }> = ({ opportunity }) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Overview */}
          <div className="col-span-4">
            <h3 className="font-semibold text-gray-900 mb-1">{opportunity.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{opportunity.type}</span>
              <span>•</span>
              <span>{opportunity.stack.join(', ')}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Clock size={12} />
              <span>Posted {opportunity.postedAt}</span>
            </div>
          </div>

          {/* Status */}
          <div className="col-span-2">
            <StatusBadge status={opportunity.status} note={opportunity.statusNote} />
          </div>

          {/* Commitments */}
          <div className="col-span-2">
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar size={12} />
                <span>{opportunity.commitments.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock size={12} />
                <span>{opportunity.commitments.hoursPerWeek} hrs/week</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin size={12} />
                <span>{opportunity.commitments.location}</span>
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="col-span-2">
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-1">
                <DollarSign size={12} className={opportunity.compensation.isPaid ? 'text-green-600' : 'text-gray-400'} />
                <span className={opportunity.compensation.isPaid ? 'text-green-600' : 'text-gray-400'}>
                  {opportunity.compensation.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
              {opportunity.compensation.amount && (
                <div className="text-gray-600">{opportunity.compensation.amount}</div>
              )}
              {opportunity.compensation.totalBudget && (
                <div className="text-xs text-gray-500">Total: {opportunity.compensation.totalBudget}</div>
              )}
            </div>
          </div>

          {/* Pipeline */}
          <div className="col-span-1">
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-1">
                <UserPlus size={12} className="text-blue-600" />
                <span className="text-gray-600">{opportunity.pipeline.applied}</span>
                <span className="text-xs text-gray-500">applied</span>
              </div>
              {opportunity.pipeline.shortlisted > 0 && (
                <div className="text-xs text-green-600">{opportunity.pipeline.shortlisted} shortlisted</div>
              )}
              {opportunity.pipeline.selected > 0 && (
                <div className="text-xs text-blue-600">{opportunity.pipeline.selected} selected</div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="col-span-1">
            <Link 
              to="#" 
              className="text-green-600 hover:text-green-700 text-sm font-medium hover:underline"
            >
              {opportunity.actionLabel}
            </Link>
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
      <main className="main-content flex-1">
        {/* Header */}
        <header className="top-header flex justify-between items-center mb-6">
          <h1 className="page-title text-2xl font-bold text-gray-900">Opportunities</h1>
          <div className="header-actions flex items-center gap-4">
            <div className="search-bar">
              <Search size={18} className="search-icon-svg" />
              <input 
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="icon-btn">
              <Bell size={20} className="bell-icon-svg" />
            </button>
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={() => navigate('/organization-post-opportunity')}
            >
              Create New Opportunity
            </button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="live">Live</option>
                <option value="draft">Draft</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </select>
              
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Pipeline Status</option>
                <option value="no-candidates">No Candidates</option>
                <option value="has-candidates">Has Candidates</option>
                <option value="in-review">In Review</option>
              </select>
              
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Opportunity Type</option>
                <option value="project">Project</option>
                <option value="internship">Internship</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4">
          <div className="grid grid-cols-12 gap-4 items-center text-xs font-semibold text-gray-600 uppercase">
            <div className="col-span-4">Overview</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Commitments</div>
            <div className="col-span-2">Compensation</div>
            <div className="col-span-1">Pipeline</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-3">
          {mockOpportunities.map((opportunity) => (
            <OpportunityRow key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>

        {/* Empty State (if no opportunities) */}
        {mockOpportunities.length === 0 && (
          <div className="empty-state-container">
            <p className="empty-state-text">No opportunities found. Create your first opportunity!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default OpportunitiesPage;