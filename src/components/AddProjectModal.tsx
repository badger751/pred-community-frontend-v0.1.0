
import React, { useState } from 'react';
import '../portfolio-modal.css';
import { addFullPortfolioProject } from '../lib/portfolioService';
import toast from 'react-hot-toast';

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company_name: '',
        role: '',
        start_date: '',
        end_date: '',
        description: '',
        project_url: '',
        video_url: '',
    });
    const [files, setFiles] = useState<File[]>([]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async () => {
        if (!formData.title) {
            toast.error("Project title is required");
            return;
        }

        setLoading(true);
        try {
            await addFullPortfolioProject({
                title: formData.title,
                company_name: formData.company_name,
                role: formData.role,
                start_date: formData.start_date || undefined,
                end_date: formData.end_date || undefined,
                description: formData.description,
                project_url: formData.project_url,
                video_url: formData.video_url,
                is_public: true
            }, files, []);

            toast.success("Project added successfully!");
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="project-modal-overlay" onClick={onClose}>
            <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="project-modal-header">
                    <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <h2 className="project-modal-title">Add Portfolio Project</h2>
                    <p className="project-modal-subtitle">Showcase your best work to potential collaborators and employers.</p>
                </div>

                {/* Scrollable Body */}
                <div className="project-modal-body">
                    
                    {/* Project Title */}
                    <div className="pm-form-group">
                        <label className="pm-form-label">
                            Project Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="pm-form-input"
                            placeholder="e.g. E-commerce Mobile App"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Company & Role */}
                    <div className="pm-form-row">
                        <div className="pm-form-group">
                            <label className="pm-form-label">Company / Client</label>
                            <input
                                type="text"
                                name="company_name"
                                className="pm-form-input"
                                placeholder="e.g. Acme Corp"
                                value={formData.company_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pm-form-group">
                            <label className="pm-form-label">Your Role</label>
                            <input
                                type="text"
                                name="role"
                                className="pm-form-input"
                                placeholder="e.g. Lead Designer"
                                value={formData.role}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="pm-form-row">
                        <div className="pm-form-group">
                            <label className="pm-form-label">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                className="pm-form-input"
                                value={formData.start_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pm-form-group">
                            <label className="pm-form-label">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                className="pm-form-input"
                                value={formData.end_date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="pm-form-group">
                        <label className="pm-form-label">Description</label>
                        <textarea
                            name="description"
                            className="pm-form-input pm-form-textarea"
                            placeholder="Describe the project, your contribution, technologies used, and the outcome..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="pm-section-divider">Links & Media</div>

                    {/* Project Link */}
                    <div className="pm-form-group">
                        <label className="pm-form-label">Project Link</label>
                        <input
                            type="url"
                            name="project_url"
                            className="pm-form-input"
                            placeholder="https://yourproject.com"
                            value={formData.project_url}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Video Link */}
                    <div className="pm-form-group">
                        <label className="pm-form-label">External Video Link</label>
                        <input
                            type="url"
                            name="video_url"
                            className="pm-form-input"
                            placeholder="YouTube, Vimeo, or Loom link (optional)"
                            value={formData.video_url}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Upload Zone */}
                    <div className="pm-form-group">
                        <label className="pm-form-label">Upload Media</label>
                        <div 
                            className={`pm-upload-zone ${files.length > 0 ? 'has-files' : ''}`}
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <div className="pm-upload-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                            </div>
                            {files.length === 0 ? (
                                <>
                                    <p className="pm-upload-text">Click to upload images or videos</p>
                                    <p className="pm-upload-hint">PNG, JPG, MP4 up to 50MB each</p>
                                </>
                            ) : (
                                <div className="pm-file-count">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    {files.length} file{files.length > 1 ? 's' : ''} selected
                                </div>
                            )}
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="project-modal-footer">
                    <button 
                        className="pm-btn pm-btn-secondary" 
                        onClick={onClose} 
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button 
                        className={`pm-btn pm-btn-primary ${loading ? 'pm-btn-loading' : ''}`}
                        onClick={handleSubmit} 
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Project'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddProjectModal;
