// FILE: src/components/AddOrganizationLogoModal.tsx

import React from 'react';

interface AddOrganizationLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddOrganizationLogoModal: React.FC<AddOrganizationLogoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="org-logo-modal-overlay">
      <div className="org-logo-modal-card">
        {/* Close "X" Button */}
        <button className="org-logo-modal-close-btn" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="org-logo-modal-title">Add organization logo</h2>
        <p className="org-logo-modal-subtitle">
          Add your organization logo to build credibility and help candidates recognize your brand.
        </p>

        {/* Upload Box */}
        <div className="org-logo-upload-area">
          <div className="org-logo-upload-icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
        </div>

        {/* Separator */}
        <div className="org-logo-separator-container">
          <div className="org-logo-separator-line"></div>
          <span className="org-logo-separator-text">Or</span>
          <div className="org-logo-separator-line"></div>
        </div>

        <input
          type="text"
          className="org-logo-modal-input"
          placeholder="Add media link"
        />

        {/* Footer Buttons */}
        <div className="org-logo-modal-actions">
          <button className="org-logo-modal-back-btn" onClick={onClose}>
            Back
          </button>
          <button className="org-logo-modal-save-btn" onClick={onClose}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrganizationLogoModal;