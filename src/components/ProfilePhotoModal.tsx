// FILE: src/components/AddProfilePhotoModal.tsx
import React from 'react';
import '../orgProfile.css'; // We will add the specific styles to this file in Step 2

interface AddProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProfilePhotoModal: React.FC<AddProfilePhotoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Close X Button */}
        <button className="modal-close-icon" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <h2 className="modal-title">Add your profile photo</h2>
        <p className="modal-subtitle">
          Upload a professional photo that represents you well. This will appear on your public talent profile.
        </p>

        {/* Upload Box */}
        <div className="upload-dashed-box">
          <div className="upload-icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="modal-divider">
          <span>Or</span>
        </div>

        {/* Link Input */}
        <input 
          type="text" 
          className="modal-input" 
          placeholder="Add media link" 
        />

        {/* Action Buttons */}
        <div className="modal-footer">
          <button className="btn-modal-back" onClick={onClose}>Back</button>
          <button className="btn-modal-save">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddProfilePhotoModal;