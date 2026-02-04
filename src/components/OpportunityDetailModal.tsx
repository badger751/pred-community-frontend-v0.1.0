import React, { useEffect } from 'react';
import { X, Calendar, DollarSign, Users, UserPlus, Globe, Mail, Phone, Briefcase, Target, CheckCircle } from 'lucide-react';
import { type FullOpportunity } from '../stores/opportunitiesStore';
import '../opportunity-detail.css';

interface OpportunityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: FullOpportunity | null;
}

// Status Badge Component (defined outside render)
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

const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  opportunity 
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !opportunity) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="opportunity-modal-close-btn"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="opportunity-modal-header">
          <h2>{opportunity.title}</h2>
          <div className="opportunity-modal-meta">
            <span>{opportunity.type}</span>
            {opportunity.domain && <span>• {opportunity.domain}</span>}
            <span>• {opportunity.stack.join(', ')}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="opportunity-modal-body">
          {/* Status */}
          <div className="opportunity-modal-section">
            <div className={`opportunity-modal-badge opportunity-status-${opportunity.status.toLowerCase()}`}>
              {opportunity.status}
            </div>
            {opportunity.statusNote && (
              <div className="opportunity-modal-section-content">{opportunity.statusNote}</div>
            )}
          </div>
          {/* Status */}
          <div>
            <StatusBadge status={opportunity.status} note={opportunity.statusNote} />
          </div>

          {/* Domain & Experience */}
          {(opportunity.domain || opportunity.difficulty) && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <Target size={16}/> Details
              </div>
              <div className="opportunity-modal-details">
                {opportunity.domain && (
                  <div>
                    <div className="opportunity-modal-detail-label">Domain</div>
                    <div className="opportunity-modal-detail-value">{opportunity.domain}</div>
                  </div>
                )}
                {opportunity.difficulty && (
                  <div>
                    <div className="opportunity-modal-detail-label">Experience</div>
                    <div className="opportunity-modal-detail-value">{opportunity.difficulty}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mentorship & Timeline */}
          {(opportunity.mentorship_provided !== undefined || opportunity.deadline || opportunity.start_timeline) && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <Calendar size={16}/> Timeline & Support
              </div>
              <div className="opportunity-modal-details">
                <div>
                  <div className="opportunity-modal-detail-label">Mentorship</div>
                  <div className="opportunity-modal-detail-value">{opportunity.mentorship_provided ? 'Yes' : 'No'}</div>
                </div>
                {(opportunity.deadline || opportunity.start_timeline) && (
                  <div>
                    <div className="opportunity-modal-detail-label">Timeline</div>
                    <div className="opportunity-modal-detail-value">{opportunity.deadline || opportunity.start_timeline}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Commitments */}
          <div className="opportunity-modal-section">
            <div className="opportunity-modal-section-title">
              <Calendar size={16}/> Commitments
            </div>
            <div className="opportunity-modal-details">
              <div>
                <div className="opportunity-modal-detail-label">Duration</div>
                <div className="opportunity-modal-detail-value">{opportunity.commitments.duration}</div>
              </div>
              <div>
                <div className="opportunity-modal-detail-label">Hours/Week</div>
                <div className="opportunity-modal-detail-value">{opportunity.commitments.hoursPerWeek}</div>
              </div>
              <div>
                <div className="opportunity-modal-detail-label">Location</div>
                <div className="opportunity-modal-detail-value">{opportunity.commitments.location}</div>
              </div>
            </div>
          </div>

          {/* Compensation */}
          {opportunity.is_compensation_visible !== false && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <DollarSign size={16}/> Compensation
              </div>
              <div className="opportunity-modal-section-content">
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className={opportunity.compensation.isPaid ? 'text-green-600' : 'text-gray-400'} />
                  <span className={opportunity.compensation.isPaid ? 'text-green-600' : 'text-gray-400'}>
                    {opportunity.compensation.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                {opportunity.compensation.amount && (
                  <div className="mt-2 text-sm text-gray-600">Amount: {opportunity.compensation.amount}</div>
                )}
                {opportunity.compensation.totalBudget && (
                  <div className="text-xs text-gray-500">Total Budget: {opportunity.compensation.totalBudget}</div>
                )}
              </div>
            </div>
          )}

          {/* Views & Applications */}
          <div className="opportunity-modal-section">
            <div className="opportunity-modal-section-title">
              <Users size={16}/> Engagement
            </div>
            <div className="opportunity-modal-section-content">
              <div className="flex items-center gap-2">
                <div>
                  <div className="opportunity-views">
                    <span>{opportunity.views_count || 0}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <UserPlus size={14} className="text-blue-600" />
                  <span>{opportunity.pipeline.applied}</span>
                  <span className="text-xs text-gray-500">applications</span>
                </div>
                {opportunity.pipeline.shortlisted > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle size={14} />
                    <span>{opportunity.pipeline.shortlisted} shortlisted</span>
                  </div>
                )}
                {opportunity.pipeline.selected > 0 && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <CheckCircle size={14} />
                    <span>{opportunity.pipeline.selected} selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          {opportunity.learning_outcomes && opportunity.learning_outcomes.length > 0 && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <Target size={16}/> Learning Outcomes
              </div>
              <ul className="opportunity-modal-list">
                {opportunity.learning_outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Pipeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users size={16} />
              Pipeline
            </h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <UserPlus size={14} className="text-blue-600" />
                <span className="text-gray-600">{opportunity.pipeline.applied}</span>
                <span className="text-xs text-gray-500">applied</span>
              </div>
              {opportunity.pipeline.shortlisted > 0 && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={14} />
                  <span>{opportunity.pipeline.shortlisted} shortlisted</span>
                </div>
              )}
              {opportunity.pipeline.selected > 0 && (
                <div className="flex items-center gap-1 text-blue-600">
                  <CheckCircle size={14} />
                  <span>{opportunity.pipeline.selected} selected</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {opportunity.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase size={16} />
                Description
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {opportunity.description}
              </p>
            </div>
          )}

          {/* Key Deliverables */}
          {opportunity.key_deliverables && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <Target size={16}/> Key Deliverables
              </div>
              <div className="opportunity-modal-section-content">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {opportunity.key_deliverables}
                </p>
              </div>
            </div>
          )}

          {/* Additional Details */}
          {(opportunity.difficulty || opportunity.support_level || opportunity.talent_engagement) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Additional Details</h3>
              <div className="space-y-2 text-sm">
                {opportunity.domain && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Domain:</span>
                    <span className="text-gray-700">{opportunity.domain}</span>
                  </div>
                )}
                {opportunity.difficulty && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className="text-gray-700">{opportunity.difficulty}</span>
                  </div>
                )}
                {opportunity.difficulty_details && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difficulty Details:</span>
                    <span className="text-gray-700">{opportunity.difficulty_details}</span>
                  </div>
                )}
                {opportunity.support_level && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Support Level:</span>
                    <span className="text-gray-700">{opportunity.support_level}</span>
                  </div>
                )}
                {opportunity.talent_engagement && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Talent Engagement:</span>
                    <span className="text-gray-700">{opportunity.talent_engagement}</span>
                  </div>
                )}
                {opportunity.primary_communication_mode && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Communication Mode:</span>
                    <span className="text-gray-700">{opportunity.primary_communication_mode}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Application Requirements */}
          {opportunity.application_requirements && opportunity.application_requirements.length > 0 && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <Target size={16}/> Application Requirements
              </div>
              <ul className="opportunity-modal-list">
                {opportunity.application_requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Information */}
          {(opportunity.primary_contact_name || opportunity.primary_contact_email) && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <Users size={16}/> Contact Information
              </div>
              <div className="opportunity-modal-details">
                <div>
                  <div className="opportunity-modal-detail-label">Name</div>
                  <div className="opportunity-modal-detail-value">{opportunity.primary_contact_name}</div>
                </div>
                <div>
                  <div className="opportunity-modal-detail-label">Email</div>
                  <div className="opportunity-modal-detail-value">{opportunity.primary_contact_email}</div>
                </div>
                {opportunity.primary_contact_phone && (
                  <div>
                    <div className="opportunity-modal-detail-label">Phone</div>
                    <div className="opportunity-modal-detail-value">{opportunity.primary_contact_phone}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Links */}
          {(opportunity.website_url || opportunity.linkedin_url) && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <Globe size={16}/> Links
              </div>
              <div className="opportunity-modal-section-content">
                {opportunity.website_url && (
                  <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <a 
                      href={opportunity.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
                {opportunity.linkedin_url && (
                  <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <a 
                      href={opportunity.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Start Date */}
          {opportunity.start_date && (
            <div className="opportunity-modal-section">
              <div className="opportunity-modal-section-title">
                <Calendar size={16}/> Start Date
              </div>
              <div className="opportunity-modal-section-content">
                <div className="text-sm text-gray-700">
                  {opportunity.start_date_type}: {opportunity.start_date}
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {(opportunity.primary_contact_name || opportunity.primary_contact_email || opportunity.primary_contact_phone) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users size={16} />
                Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                {opportunity.primary_contact_name && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={14} />
                    <span>{opportunity.primary_contact_name}</span>
                  </div>
                )}
                {opportunity.primary_contact_email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} />
                    <a href={`mailto:${opportunity.primary_contact_email}`} className="text-blue-600 hover:underline">
                      {opportunity.primary_contact_email}
                    </a>
                  </div>
                )}
                {opportunity.primary_contact_phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} />
                    <a href={`tel:${opportunity.primary_contact_phone}`} className="text-blue-600 hover:underline">
                      {opportunity.primary_contact_phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Links */}
          {(opportunity.website_url || opportunity.linkedin_url) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Globe size={16} />
                Links
              </h3>
              <div className="space-y-2 text-sm">
                {opportunity.website_url && (
                  <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <a 
                      href={opportunity.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
                {opportunity.linkedin_url && (
                  <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <a 
                      href={opportunity.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Start Date */}
          {opportunity.start_date && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar size={16} />
                Start Date
              </h3>
              <p className="text-sm text-gray-700">
                {opportunity.start_date_type}: {opportunity.start_date}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailModal;