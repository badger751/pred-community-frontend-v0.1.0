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

        <div className="modal-icon-badge">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h2 className="modal-header">Account verification in progress</h2>

        <p className="modal-desc">
          To maintain trust and credibility on the platform, some features are
          available only after your account is verified.
        </p>

        <p className="modal-desc">
          We're reviewing your account details. This can take up to 5 business
          days.
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
