import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../stores/authStore";
import "../dashboard.css";
import "../orgprofile.css";
import AddProfilePhotoModal from "../components/ProfilePhotoModal";
import toast from "react-hot-toast";

// --- Icons ---
const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TalentProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  // --- States ---
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Profile Basic
  const [fullName, setFullName] = useState<string>("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");

  // Professional Links
  const [links, setLinks] = useState({
    linkedin: "",
    github: "",
    portfolio: "",
  });

  // Focus & Status
  const [currentFocus, setCurrentFocus] = useState({
    earn: false,
    gainExperience: false,
    explore: false,
  });
  const [descBest, setDescBest] = useState(""); 
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");

  // Details
  const [ageRange, setAgeRange] = useState("");
  const [startTimeline, setStartTimeline] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);

  // Work Preferences
  const [workStyle, setWorkStyle] = useState({
    collaborative: false,
    independent: false,
    guided: false,
  });
  const [timeCommitment, setTimeCommitment] = useState("");
  
  const [opportunities, setOpportunities] = useState({
    projects: false,
    internship: false,
    research: false,
    contract: false,
    partTime: false,
    fullTime: false,
  });

  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  // Location
  const [location, setLocation] = useState({
    city: "",
    country: "",
    timezone: "",
  });

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

  // --- Fetch Logic ---
  useEffect(() => {
    const fetchFullProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) return;

        // Fetch from 'profiles'
        const { data: profileBase, error: profileError } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", session.user.id)
          .single();

        if (profileError) throw profileError;
        setFullName(profileBase.full_name || "");

        // Fetch from 'talent_profiles'
        const { data: tp, error: tpError } = await supabase
          .from("talent_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (tpError && tpError.code !== 'PGRST116') throw tpError;

        if (tp) {
          setHeadline(tp.headline || "");
          setBio(tp.bio || "");
          setLinks({
            linkedin: tp.linkedin_url || "",
            github: tp.github_url || "",
            portfolio: tp.portfolio_url || "",
          });
          
          // Focus mapping
          if (tp.focus_right_now) {
            const focusArr = tp.focus_right_now.split(", ");
            setCurrentFocus({
              earn: focusArr.includes("Earn"),
              gainExperience: focusArr.includes("Gain experience"),
              explore: focusArr.includes("Explore"),
            });
          }

          setDescBest(tp.current_status || "");
          setQualification(tp.education_level || "");
          setSpecialization(tp.major_specialization || "");
          setAgeRange(tp.age_range || "");
          setStartTimeline(tp.start_timeline || "");
          setExperienceYears(tp.experience_years || 0);

          // Work Style
          setWorkStyle({
            collaborative: tp.work_style === "Collaborative",
            independent: tp.work_style === "Independent",
            guided: tp.work_style === "Guided",
          });

          setTimeCommitment(tp.weekly_commitment || "");
          setSelectedDomains(tp.domains || []);

          // Opportunities
          const opps = tp.opportunity_types || [];
          setOpportunities({
            projects: opps.includes("Projects"),
            internship: opps.includes("Internship"),
            research: opps.includes("Research"),
            contract: opps.includes("Contract roles"),
            partTime: opps.includes("Part-time roles"),
            fullTime: opps.includes("Full-time roles"),
          });

          setLocation({
            city: tp.city || "",
            country: tp.country || "",
            timezone: tp.timezone || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchFullProfile();
  }, []);

  // --- Handlers ---
  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      const focusArr = [];
      if (currentFocus.earn) focusArr.push("Earn");
      if (currentFocus.gainExperience) focusArr.push("Gain experience");
      if (currentFocus.explore) focusArr.push("Explore");

      const oppsArr = [];
      if (opportunities.projects) oppsArr.push("Projects");
      if (opportunities.internship) oppsArr.push("Internship");
      if (opportunities.research) oppsArr.push("Research");
      if (opportunities.contract) oppsArr.push("Contract roles");
      if (opportunities.partTime) oppsArr.push("Part-time roles");
      if (opportunities.fullTime) oppsArr.push("Full-time roles");

      const wStyle = workStyle.collaborative ? "Collaborative" : 
                    workStyle.independent ? "Independent" : 
                    workStyle.guided ? "Guided" : "";

      const payload = {
        headline,
        bio,
        linkedin_url: links.linkedin,
        github_url: links.github,
        portfolio_url: links.portfolio,
        focus_right_now: focusArr.join(", "),
        current_status: descBest,
        education_level: qualification,
        major_specialization: specialization,
        age_range: ageRange,
        start_timeline: startTimeline,
        experience_years: experienceYears,
        work_style: wStyle,
        weekly_commitment: timeCommitment,
        domains: selectedDomains,
        opportunity_types: oppsArr,
        city: location.city,
        country: location.country,
        timezone: location.timezone,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("talent_profiles")
        .upsert({ id: session.user.id, ...payload });

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (loading) return <div className="loading-spinner">Loading Premium Profile...</div>;

  return (
    <>
      <header className="mobile-top-nav">
        <button className="hamburger-btn" onClick={toggleMobileMenu}><HamburgerIcon /></button>
        <div className="mobile-logo-section"><img src="/Logo.svg" alt="Logo" /></div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <nav className="mobile-nav-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header"><button className="mobile-close-btn" onClick={closeMobileMenu}><CloseIcon /></button></div>
            <div className="nav-item mobile-nav-item" onClick={() => navigate('/talent-dashboard-v2')}>Overview</div>
            <div className="nav-item mobile-nav-item" onClick={() => navigate('/talent-portfolio')}>Portfolio</div>
            <div className="nav-item mobile-nav-item active">Profile</div>
            <div className="nav-item mobile-nav-item" onClick={async () => { await logout(); navigate("/login"); }}>Log Out</div>
          </nav>
        </div>
      )}

      <div className="dashboard-container">
        <aside className="sidebar-left">
          <div className="logo-section"><img src="/Logo.svg" alt="Predulive" style={{ width: "120px" }} /></div>
          <nav className="nav-menu">
            <div className="nav-item" onClick={() => navigate('/talent-dashboard-v2')}>Overview</div>
            <div className="nav-item" onClick={() => navigate('/talent-portfolio')}>Portfolio</div>
          </nav>
          <div className="sidebar-footer">
            <div className="nav-item active">Profile</div>
            <div className="nav-item" onClick={async () => { await logout(); navigate("/login"); }}>Log Out</div>
          </div>
        </aside>

        <main className="main-content">
          <div className="scrollable-content">
            <section className="reveal-item delay-1">
              <div className="header-bc">Settings &gt; Profile</div>
              <div className="profile-banner-card">
                <div className="avatar-container" onClick={() => setIsPhotoModalOpen(true)}>
                  <div className="avatar-circle">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div className="edit-icon-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></div>
                </div>

                <div className="banner-info" style={{ flex: 1 }}>
                  <h1 style={{ marginBottom: '8px' }}>{fullName}</h1>
                  <input 
                    type="text" 
                    className="profile-description-input" 
                    placeholder="Your professional headline (e.g. Full Stack Developer)" 
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', width: '100%', padding: '4px 0', fontSize: '16px', fontWeight: 500 }}
                  />
                </div>
              </div>
            </section>

            <div className="profile-form-section reveal-item delay-2">
              <h3 className="section-title" style={{ marginBottom: '24px' }}>Professional Bio</h3>
              <textarea 
                className="form-input" 
                placeholder="Tell us about yourself..." 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ width: '100%', minHeight: '100px', borderRadius: '12px', padding: '16px', marginBottom: '40px' }}
              />

              <h3 className="section-title" style={{ marginBottom: '24px' }}>Professional Links</h3>
              <div className="grid-3-col" style={{ marginBottom: '40px' }}>
                <div className="form-group">
                  <label className="form-label">LinkedIn URL</label>
                  <input type="text" className="form-input" value={links.linkedin} onChange={(e) => setLinks({...links, linkedin: e.target.value})} placeholder="linkedin.com/in/..." />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input type="text" className="form-input" value={links.github} onChange={(e) => setLinks({...links, github: e.target.value})} placeholder="github.com/..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Portfolio URL</label>
                  <input type="text" className="form-input" value={links.portfolio} onChange={(e) => setLinks({...links, portfolio: e.target.value})} placeholder="yourportfolio.com" />
                </div>
              </div>

              <div className="grid-2-col">
                <div className="form-group">
                  <label className="form-label">Current focus</label>
                  <div className="tile-group">
                    {['earn', 'gainExperience', 'explore'].map((f) => (
                      <div key={f} className={`tile-item ${currentFocus[f as keyof typeof currentFocus] ? 'active' : ''}`} onClick={() => setCurrentFocus({...currentFocus, [f]: !currentFocus[f as keyof typeof currentFocus]})}>
                        <input type="checkbox" checked={currentFocus[f as keyof typeof currentFocus]} readOnly />
                        <span className="tile-text">{f === 'gainExperience' ? "Gain Experience" : f.charAt(0).toUpperCase() + f.slice(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Interested Domains</label>
                  <div className="pills-cloud">
                    {allDomains.map((d) => (
                      <span key={d} className={`domain-pill ${selectedDomains.includes(d) ? 'active' : ''}`} onClick={() => setSelectedDomains(selectedDomains.includes(d) ? selectedDomains.filter(x => x !== d) : [...selectedDomains, d])}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid-2-col" style={{ marginTop: '40px' }}>
                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <input type="text" className="form-input" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="e.g. Computer Science" />
                </div>
                <div className="form-group">
                  <label className="form-label">Experience (Years)</label>
                  <input type="number" className="form-input" value={experienceYears} onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)} />
                </div>
              </div>

              <div className="grid-2-col" style={{ marginTop: '40px' }}>
                <div className="form-group">
                  <label className="form-label">Age Range</label>
                  <div className="tile-group">
                    {['18–25', '26–34', '35+'].map((range) => (
                      <div key={range} className={`tile-item ${ageRange === range ? 'active' : ''}`} onClick={() => setAgeRange(range)}>
                        <input type="radio" checked={ageRange === range} readOnly />
                        <span className="tile-text">{range}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Start Timeline</label>
                  <div className="tile-group">
                    {['Immediately', 'Within a month', 'After 3 months'].map((time) => (
                      <div key={time} className={`tile-item ${startTimeline === time ? 'active' : ''}`} onClick={() => setStartTimeline(time)}>
                        <input type="radio" checked={startTimeline === time} readOnly />
                        <span className="tile-text">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-actions" style={{ marginTop: '60px' }}>
                <button className="btn-revert" onClick={() => window.location.reload()}>Discard Changes</button>
                <button className="btn-save" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Profile Changes"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddProfilePhotoModal isOpen={isPhotoModalOpen} onClose={() => setIsPhotoModalOpen(false)} />
    </>
  );
};

export default TalentProfilePage;