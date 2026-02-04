// FILE: src/pages/OrgProfilePage.tsx

import React, { useState } from "react";
import "../dashboard.css";
import "../orgprofile.css";
import AddProfilePhotoModal from "../components/ProfilePhotoModal";

const OrgProfilePage: React.FC = () => {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // --- 1. INITIALIZE ALL STATES TO FALSE / EMPTY ---

  // Checkboxes: Current Focus
  const [currentFocus, setCurrentFocus] = useState({
    earn: false,
    gainExperience: false,
    explore: false,
  });

  // Radio: Best Describes
  const [descBest, setDescBest] = useState(""); 

  // Radio: Qualification
  const [qualification, setQualification] = useState("");

  // Checkboxes: Work Style
  const [workStyle, setWorkStyle] = useState({
    collaborative: false,
    independent: false,
    guided: false,
  });

  // Radio: Time Commitment
  const [timeCommitment, setTimeCommitment] = useState("");

  // Checkboxes: Opportunities
  const [opportunities, setOpportunities] = useState({
    projects: false,
    internship: false,
    research: false,
    contract: false,
    partTime: false,
    fullTime: false,
  });

  // --- 2. NEW STATE FOR INTERESTED DOMAINS ---
  const allDomains = [
    "Software / Product",
    "Data / AI",
    "Design / Creative",
    "Social impact / Non-profit",
    "Marketing / Growth",
    "Business / Operations",
    "Research / Academia",
    "Other"
  ];
  
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  // --- HANDLERS ---

  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFocus({ ...currentFocus, [e.target.name]: e.target.checked });
  };

  const handleWorkStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkStyle({ ...workStyle, [e.target.name]: e.target.checked });
  };

  const handleOppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpportunities({ ...opportunities, [e.target.name]: e.target.checked });
  };

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  return (
    <div className="dashboard-container">
      <AddProfilePhotoModal 
        isOpen={isPhotoModalOpen} 
        onClose={() => setIsPhotoModalOpen(false)} 
      />

      {/* --- LEFT SIDEBAR (Unchanged) --- */}
      <aside className="sidebar-left">
        <div className="logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" style={{ height: "auto", width: "120px" }} />
        </div>
        <nav className="nav-menu">
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
            Overview
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Outreach <span className="nav-badge">1</span>
          </div>
          <div className="nav-item">
             <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Talent Pool
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            Opportunities
          </div>
           <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            Contest
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Profile
          </div>
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
          </div>
           <div className="nav-item">
             <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
            Support
          </div>
          <div className="nav-item">
             <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
            Ask AI
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <div className="profile-header-section">
            <div className="header-bc">Profile</div>
            <div className="profile-banner-card">
                
                <div 
                  className="avatar-container" 
                  onClick={() => setIsPhotoModalOpen(true)}
                  style={{ cursor: 'pointer' }}
                >
                    <div className="avatar-circle"></div>
                    <div className="edit-icon-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </div>
                </div>

                <div className="banner-info">
                    <h1>Full name</h1>
                    <span className="banner-desc">
                        Describe yourself in 3-4 words 
                        <span className="add-desc-link">Add Description</span>
                    </span>
                </div>
            </div>
        </div>

        <div className="profile-form-section">
            
            <div className="form-group">
                <label className="form-label">Full name</label>
                <input type="text" className="form-input-disabled" placeholder="specified name during onboarding" disabled />
            </div>

            <div className="grid-2-col">
                <div className="form-group">
                    <label className="form-label">Current focus</label>
                    <div className="checkbox-group">
                        <label className="cb-item"><input type="checkbox" name="earn" checked={currentFocus.earn} onChange={handleFocusChange} /> Earn</label>
                        <label className="cb-item"><input type="checkbox" name="gainExperience" checked={currentFocus.gainExperience} onChange={handleFocusChange} /> Gain experience</label>
                        <label className="cb-item"><input type="checkbox" name="explore" checked={currentFocus.explore} onChange={handleFocusChange} /> Explore</label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Interested Domains</label>
                    
                    {/* --- UPDATED: CLICKABLE DOMAINS --- */}
                    <div className="pills-cloud">
                        {allDomains.map((domain) => (
                          <span 
                            key={domain} 
                            className={`domain-pill ${selectedDomains.includes(domain) ? 'active' : ''}`}
                            onClick={() => toggleDomain(domain)}
                          >
                            {domain}
                          </span>
                        ))}
                    </div>

                    <input type="text" className="form-input-disabled" placeholder="Specified domain during onboarding" disabled />
                </div>
            </div>
            
            <div className="grid-2-col">
                <div className="form-group">
                    <label className="form-label">What describes you the best</label>
                    <div className="radio-group">
                        <label className="radio-item"><input type="radio" name="descBest" value="student" checked={descBest === "student"} onChange={(e) => setDescBest(e.target.value)} /> Student</label>
                        <label className="radio-item"><input type="radio" name="descBest" value="recentGraduate" checked={descBest === "recentGraduate"} onChange={(e) => setDescBest(e.target.value)} /> Recent graduate</label>
                        <label className="radio-item"><input type="radio" name="descBest" value="professional" checked={descBest === "professional"} onChange={(e) => setDescBest(e.target.value)} /> Working professional</label>
                        <label className="radio-item"><input type="radio" name="descBest" value="other" checked={descBest === "other"} onChange={(e) => setDescBest(e.target.value)} /> Other</label>
                    </div>
                </div>

                 <div className="form-group">
                    <label className="form-label">Highest qualification completed</label>
                    <div className="grid-2-col" style={{gap: '12px'}}>
                        <div className="radio-group">
                            <label className="radio-item"><input type="radio" name="qual" value="highSchool" checked={qualification === "highSchool"} onChange={(e) => setQualification(e.target.value)} /> High School</label>
                            <label className="radio-item"><input type="radio" name="qual" value="diploma" checked={qualification === "diploma"} onChange={(e) => setQualification(e.target.value)} /> Diploma</label>
                            <label className="radio-item"><input type="radio" name="qual" value="bachelors" checked={qualification === "bachelors"} onChange={(e) => setQualification(e.target.value)} /> Bachelor's</label>
                        </div>
                         <div className="radio-group">
                            <label className="radio-item"><input type="radio" name="qual" value="masters" checked={qualification === "masters"} onChange={(e) => setQualification(e.target.value)} /> Master's</label>
                            <label className="radio-item"><input type="radio" name="qual" value="phd" checked={qualification === "phd"} onChange={(e) => setQualification(e.target.value)} /> PhD</label>
                            <label className="radio-item"><input type="radio" name="qual" value="other" checked={qualification === "other"} onChange={(e) => setQualification(e.target.value)} /> Other</label>
                        </div>
                    </div>
                    <input type="text" className="form-input-disabled" style={{marginTop: '12px'}} placeholder="Specialization specified during onboarding" disabled />
                </div>
            </div>

            <div className="grid-2-col">
                 <div className="form-group">
                    <label className="form-label">Preferred work style</label>
                    <div className="checkbox-group">
                        <label className="cb-item">
                            <input type="checkbox" name="collaborative" checked={workStyle.collaborative} onChange={handleWorkStyleChange} />
                            <div>
                                Collaborative
                                <span className="cb-desc">Regular check-ins, feedback loops, and shared ownership.</span>
                            </div>
                        </label>
                        <label className="cb-item">
                            <input type="checkbox" name="independent" checked={workStyle.independent} onChange={handleWorkStyleChange} />
                            <div>
                                Independent
                                <span className="cb-desc">Clear scope, then I deliver with minimal back-and-forth.</span>
                            </div>
                        </label>
                         <label className="cb-item">
                            <input type="checkbox" name="guided" checked={workStyle.guided} onChange={handleWorkStyleChange} />
                            <div>
                                Guided
                                <span className="cb-desc">I do best with structure, examples, and a point of contact.</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Total year of experience</label>
                     <input type="text" className="form-input-disabled" placeholder="e.g. 2 years 3 months" disabled />
                </div>
            </div>

            <div className="grid-3-col">
                <div className="form-group">
                    <label className="form-label">City</label>
                     <input type="text" className="form-input-disabled" placeholder="Specified city during onboarding" disabled />
                </div>
                <div className="form-group">
                    <label className="form-label">Country</label>
                     <input type="text" className="form-input-disabled" placeholder="Specified country during onboarding" disabled />
                </div>
                <div className="form-group">
                    <label className="form-label">Time zone</label>
                     <input type="text" className="form-input-disabled" placeholder="Specified time zone during onboarding" disabled 
                      style={{backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center'}}/>
                </div>
            </div>

             <div className="grid-2-col">
                 <div className="form-group">
                    <label className="form-label">Weekly time commitment</label>
                    <div className="grid-2-col" style={{gap: '12px'}}>
                        <div className="radio-group">
                             <label className="radio-item"><input type="radio" name="time" value="2-4" checked={timeCommitment === "2-4"} onChange={(e) => setTimeCommitment(e.target.value)} /> 2-4 hrs</label>
                             <label className="radio-item"><input type="radio" name="time" value="5-10" checked={timeCommitment === "5-10"} onChange={(e) => setTimeCommitment(e.target.value)} /> 5-10 hrs</label>
                             <label className="radio-item"><input type="radio" name="time" value="10-15" checked={timeCommitment === "10-15"} onChange={(e) => setTimeCommitment(e.target.value)} /> 10-15 hrs</label>
                        </div>
                         <div className="radio-group">
                             <label className="radio-item"><input type="radio" name="time" value="20+" checked={timeCommitment === "20+"} onChange={(e) => setTimeCommitment(e.target.value)} /> 20+ hrs</label>
                             <label className="radio-item"><input type="radio" name="time" value="40" checked={timeCommitment === "40"} onChange={(e) => setTimeCommitment(e.target.value)} /> 40 hrs</label>
                        </div>
                    </div>
                </div>

                 <div className="form-group">
                    <label className="form-label">Opportunities you are open to exploring</label>
                    <div className="grid-2-col" style={{gap: '12px'}}>
                        <div className="checkbox-group">
                             <label className="cb-item"><input type="checkbox" name="projects" checked={opportunities.projects} onChange={handleOppChange} /> Projects</label>
                             <label className="cb-item"><input type="checkbox" name="internship" checked={opportunities.internship} onChange={handleOppChange} /> Internship</label>
                             <label className="cb-item"><input type="checkbox" name="research" checked={opportunities.research} onChange={handleOppChange} /> Research</label>
                        </div>
                         <div className="checkbox-group">
                             <label className="cb-item"><input type="checkbox" name="contract" checked={opportunities.contract} onChange={handleOppChange} /> Contract roles</label>
                             <label className="cb-item"><input type="checkbox" name="partTime" checked={opportunities.partTime} onChange={handleOppChange} /> Part-time roles</label>
                             <label className="cb-item"><input type="checkbox" name="fullTime" checked={opportunities.fullTime} onChange={handleOppChange} /> Full-time roles</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button className="btn-revert">Revert Changes</button>
                <button className="btn-save">Save Changes</button>
            </div>

        </div>
      </main>
    </div>
  );
};

export default OrgProfilePage;