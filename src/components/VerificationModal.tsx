/* FILE: src/components/VerificationModal.tsx */
import React from "react";
import "../dashboard.css"; // Imports the styles we will add in Step 2

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-icon" onClick={onClose}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-icon-badge" style={{ backgroundColor: '#ecfdf5' }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h2 className="modal-header">The platform is now live!</h2>

        <p className="modal-desc">
          We've successfully verified your account. You now have full access
          to all features and can start engaging with talent immediately.
        </p>

        <p className="modal-desc">
          Thank you for your patience. Let's build something great together.
        </p>

        <div className="modal-btn-row">
          <button className="btn-modal-outline">Complete Profile</button>
          <button className="btn-modal-fill" onClick={onClose}>
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
