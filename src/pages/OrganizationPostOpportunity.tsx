// FILE: src/pages/OrgPostOpportunity.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Bell, 
  ChevronRight,
  ChevronLeft,
  Calendar
} from 'lucide-react';
import { useOpportunityCreationStore } from '../stores/opportunityCreationStore';
import '../postopportunity.css';

// Placeholder Icons
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

// Helper to get days in a month
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
// Helper to get day of week for the first day of the month (0-6, Sun-Sat)
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const OrgPostOpportunity: React.FC = () => {
    const navigate = useNavigate();
    
    // Store hook
    const { 
        coreDetails, 
        setCoreDetails,
        is_loading,
        error,
        clearError
    } = useOpportunityCreationStore();

    const handleSaveAndNext = () => {
        // Store is updated via setCoreDetails on each field; just navigate
        navigate('/orgworkscope');
    };

    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Mobile menu handlers
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // --- Date Picker State ---
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [datePickerView, setDatePickerView] = useState<'calendar' | 'year'>('calendar');
    const [currentDate, setCurrentDate] = useState(new Date()); // For displayed month/year
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const dateInputRef = useRef<HTMLDivElement>(null);

    const domainOptions = [
        'Technology & Software',
        'Design & Creative', 
        'Marketing & Communications',
        'Business & Finance',
        'Education & Research',
        'Healthcare & Medicine',
        'Engineering & Manufacturing',
        'Nonprofit & Social Impact'
    ];

    const opportunityTypes = [
        { title: 'Short term project', desc: '1-2 week scoped tasks with clear deliverables' },
        { title: 'Long term project', desc: 'Ongoing work over multiple milestones' },
        { title: 'Contract role', desc: 'Defined role with fixed deliverables & timeline' },
        { title: 'Internship', desc: 'Learning-focused role with guidance and mentorship' },
        { title: 'Full-time role', desc: 'Long-term engagement with commitment' },
        { title: 'Research Gig', desc: 'Exploratory or academic research with outcomes' },
        { title: 'Other', desc: 'Non-standard opportunity type' },
    ];

    // Close date picker when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dateInputRef.current && !dateInputRef.current.contains(event.target as Node)) {
                setIsDatePickerOpen(false);
                setDatePickerView('calendar'); // Reset view on close
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dateInputRef]);

    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
        if (!isDatePickerOpen) {
            // Reset to current month/year or selected date's month/year on open
            setCurrentDate(selectedDate || new Date());
            setDatePickerView('calendar');
        }
    };

    // --- Calendar View Handlers ---
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const selectDate = (day: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
        setIsDatePickerOpen(false);
        setCoreDetails({ 
            start_date_type: 'Specific date',
            start_date: newDate 
        }); // Ensure correct pill is active and store the date
    };

    // --- Year View Handlers ---
    const switchToYearView = () => {
        setDatePickerView('year');
    };

    const selectYear = (year: number) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setDatePickerView('calendar');
    };

    // Generate Year Range (12-year blocks starting from 2020 base)
    const currentYear = currentDate.getFullYear();
    const rangeStart = Math.floor((currentYear - 2020) / 12) * 12 + 2020;
    const startYear = rangeStart;
    const endYear = startYear + 11;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    const prevYearRange = () => {
        setCurrentDate(new Date(startYear - 12, currentDate.getMonth(), 1));
    };

    const nextYearRange = () => {
        setCurrentDate(new Date(startYear + 12, currentDate.getMonth(), 1));
    };

    // --- Calendar Rendering Logic ---
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const renderCalendarGrid = () => {
        const days = [];
        // Empty cells for days before the first day of the month (adjusting for Monday start)
        const emptyCells = firstDay === 0 ? 6 : firstDay - 1;
        for (let i = 0; i < emptyCells; i++) {
            days.push(<div key={`empty-${i}`} className="date-cell empty"></div>);
        }
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            
            days.push(
                <div 
                    key={day} 
                    className={`date-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => selectDate(day)}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

    // Format selected date for input
    const formattedDate = selectedDate 
        ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` 
        : '';

    return (
        <>
            {/* --- MOBILE TOP NAVIGATION --- */}
            <header className="mobile-top-nav">
                <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
                    <HamburgerIcon />
                </button>
                <div className="mobile-logo-section">
                    <img src="/Logo.svg" alt="Predulive Logo" />
                </div>
            </header>

            {/* --- MOBILE MENU OVERLAY --- */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
                    <nav className="mobile-nav-dropdown" onClick={(e) => e.stopPropagation()}>
                        <div className="mobile-nav-header">
                            <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close navigation menu">
                                <CloseIcon />
                            </button>
                        </div>
                        
                        <div className="nav-item mobile-nav-item" onClick={() => { navigate('/org'); closeMobileMenu(); }}>
                            <LayoutGrid size={20} className="nav-icon" />
                            Overview
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
                            <Mail size={20} className="nav-icon" />
                            Outreach <span className="nav-badge">1</span>
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { navigate('/talent-pool'); closeMobileMenu(); }}>
                            <Users size={20} className="nav-icon" />
                            Talent Pool
                        </div>
                        <div className="nav-item mobile-nav-item active" onClick={() => { navigate('/opportunities'); closeMobileMenu(); }}>
                            <Briefcase size={20} className="nav-icon" />
                            Opportunities
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
                            <Trophy size={20} className="nav-icon" />
                            Contest
                        </div>

                        <div className="mobile-nav-divider"></div>

                        {/* Secondary Navigation */}
                        <div className="nav-item mobile-nav-item" onClick={() => { navigate('/org-profile'); closeMobileMenu(); }}>
                            <User size={20} className="nav-icon" />
                            Profile
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
                            <Settings size={20} className="nav-icon" />
                            Settings
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
                            <LifeBuoy size={20} className="nav-icon" />
                            Support
                        </div>
                        <div className="nav-item mobile-nav-item" onClick={() => { closeMobileMenu(); }}>
                            <Sparkles size={20} className="nav-icon" />
                            Ask AI
                        </div>
                    </nav>
                </div>
            )}

            <div className="dashboard-container">
                {/* --- LEFT SIDEBAR (Reused) --- */}
                <aside className="sidebar-left">
                <div className="logo-section">
                    <img src="/Logo.svg" alt="Predulive Logo" style={{ height: "auto", width: "120px" }} />
                </div>
                <nav className="nav-menu">
                    <div className="nav-item" onClick={() => navigate('/org')}>
                        <LayoutGrid size={18} className="nav-icon" />
                        Overview
                    </div>
                    <div className="nav-item">
                        <Mail size={18} className="nav-icon" />
                        Outreach <span className="nav-badge">1</span>
                    </div>
                    <div className="nav-item" onClick={() => navigate('/talent-pool')}>
                        <Users size={18} className="nav-icon" />
                        Talent Pool
                    </div>
                    <div className="nav-item active" onClick={() => navigate('/opportunities')}>
                        <Briefcase size={18} className="nav-icon" />
                        Opportunities
                    </div>
                    <div className="nav-item">
                        <Trophy size={18} className="nav-icon" />
                        Contest
                    </div>
                </nav>
                <div className="sidebar-footer">
                    {/* Profile */}
                    <div className="nav-item" onClick={() => navigate('/org-profile')}>
                        <User size={18} className="nav-icon" />
                        Profile
                    </div>
                    <div className="nav-item">
                        <Settings size={18} className="nav-icon" />
                        Settings
                    </div>
                    <div className="nav-item">
                        <LifeBuoy size={18} className="nav-icon" />
                        Support
                    </div>
                    <div className="nav-item">
                        <Sparkles size={18} className="nav-icon" />
                        Ask AI
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="main-content">
                <header className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1 className="page-title">Create an Opportunity</h1>
                    <button className="icon-btn"><Bell size={20} /></button>
                </header>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div className="progress-step active">
                            <span className="step-number">1</span> Core Details
                        </div>
                        <ChevronRight size={16} />
                        <div className="progress-step">
                            <span className="step-number">2</span> Work Scope
                        </div>
                        <ChevronRight size={16} />
                        <div className="progress-step">
                            <span className="step-number">3</span> Review
                        </div>
                    </div>
                </div>

                {/* Form Section: Core Details */}
                <div className="form-section">
                    
                    {/* Opportunity Type */}
                    <div className="form-group">
                        <label className="form-label">Opportunity type<span>*</span></label>
                        <div className="type-cards-container">
                            {opportunityTypes.map((type, index) => (
                                <div 
                                    key={index} 
                        className={`type-card ${coreDetails.opportunity_type === type.title ? 'selected' : ''}`}
                        onClick={() => setCoreDetails({ opportunity_type: type.title })}
                                >
                                    <div className="type-card-title">{type.title}</div>
                                    <div className="type-card-desc">{type.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Title & Duration */}
                    <div className="form-row">
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Opportunity title<span>*</span></label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="Enter title" 
                                    value={coreDetails.title || ''}
                                    onChange={(e) => setCoreDetails({ title: e.target.value })}
                                />
                            </div>
                            <div className="form-col">
                                <label className="form-label">Duration</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="e.g. 2 weeks, 1 month etc." 
                                    value={coreDetails.duration || ''}
                                    onChange={(e) => setCoreDetails({ duration: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Domain, Budget, Work Setup */}
                    <div className="form-row">
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Domain<span>*</span></label>
                                <select 
                                    className="form-input"
                                    value={coreDetails.domain || ''}
                                    onChange={(e) => setCoreDetails({ domain: e.target.value })}
                                >
                                    <option value="">Choose a domain</option>
                                    {domainOptions.map(domain => (
                                        <option key={domain} value={domain}>{domain}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Estimated total budget<span>*</span></label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="Enter budget" 
                                    value={coreDetails.compensation_amount || ''}
                                    onChange={(e) => setCoreDetails({ compensation_amount: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Work setup<span>*</span></label>
                                <div className="pills-container">
                                    {['Remote', 'In-Person', 'Hybrid'].map(setup => (
                                        <div 
                                            key={setup} 
                                            className={`pill ${coreDetails.work_setup === setup ? 'selected' : ''}`}
                                            onClick={() => setCoreDetails({ work_setup: setup })}
                                        >
                                            {setup}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time Commitment & Compensation */}
                    <div className="form-row">
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Weekly time commitment</label>
                                <div className="form-row">
                                    <div className="radio-group">
                                        <label className="radio-label"><input type="radio" name="time" className="radio-input" /> 2-4 hrs</label>
                                        <label className="radio-label"><input type="radio" name="time" className="radio-input" /> 5-10 hrs</label>
                                        <label className="radio-label"><input type="radio" name="time" className="radio-input" /> 10-15 hrs</label>
                                    </div>
                                    <div className="radio-group">
                                        <label className="radio-label"><input type="radio" name="time" className="radio-input" /> 20+ hrs</label>
                                        <label className="radio-label"><input type="radio" name="time" className="radio-input" /> 40 hrs</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Compensation<span>*</span></label>
                                <div className="form-row">
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input type="radio" name="compensation" className="radio-input" onChange={() => setCoreDetails({ compensation_type: 'paid' })} /> Paid
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="compensation" className="radio-input" onChange={() => setCoreDetails({ compensation_type: 'unpaid' })} /> Unpaid
                                        </label>
                                    </div>
                                    {coreDetails.compensation_type === 'paid' && (
                                        <input 
                                            type="text" 
                                            className="form-input" 
                                            placeholder="Enter exact amount" 
                                            style={{marginLeft: '24px'}}
                                            value={coreDetails.compensation_amount || ''}
                                            onChange={(e) => setCoreDetails({ compensation_amount: e.target.value })}
                                        />
                                    )}
                                </div>
                        </div>
                    </div>
                </div>



                {/* Difficulty (With inline details input) */}
                    <div className="form-group">
                        <label className="form-label">Difficulty<span>*</span></label>
                        <div className="difficulty-row">
                            <div className="pills-container">
                                {['Beginner-Friendly', 'Intermediate', 'Advanced'].map(diff => (
                                    <div 
                                        key={diff} 
                                        className={`pill ${coreDetails.difficulty === diff ? 'selected' : ''}`}
                                        onClick={() => setCoreDetails({ difficulty: diff })}
                                    >
                                        {diff}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Input container takes remaining width */}
                            <div className="details-input-container">
                                <input 
                                    type="text" 
                                    className="details-input" 
                                    placeholder="Add more details"
                                    value={coreDetails.difficulty_details || ''}
                                    onChange={(e) => setCoreDetails({ difficulty_details: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- UPDATED SECTION: Start Date (With Date Picker Popup) --- */}
                    <div className="form-group">
                        <label className="form-label">Start date<span>*</span></label>
                        <div className="start-date-row">
                            <div className="pills-container">
                                {['Specific date', 'Flexible', 'ASAP'].map(type => (
                                    <div 
                                        key={type} 
                                        className={`pill ${coreDetails.start_date_type === type ? 'selected' : ''}`}
                                        onClick={() => {
                                            setCoreDetails({ start_date_type: type });
                                            if (type !== 'Specific date') setSelectedDate(null);
                                        }}
                                    >
                                        {type}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Date input with popup wrapper */}
                            <div className="date-input-wrapper" ref={dateInputRef}>
                                <input 
                                    type="text" 
                                    className="date-input-field" 
                                    placeholder="Choose Date" 
                                    value={formattedDate}
                                    readOnly
                                    onClick={toggleDatePicker}
                                />
                                <div className="date-icon-absolute"><Calendar size={16} /></div>

                                {/* --- Date Picker Popup --- */}
                                {isDatePickerOpen && (
                                    <div className="date-picker-popup">
                                        {datePickerView === 'calendar' ? (
                                            /* --- Calendar View --- */
                                            <>
                                                <div className="calendar-header">
                                                    <button className="nav-btn" onClick={prevMonth}><ChevronLeft size={20} /></button>
                                                    <button className="month-year-btn" onClick={switchToYearView}>
                                                        {monthNames[month]} {year}
                                                    </button>
                                                    <button className="nav-btn" onClick={nextMonth}><ChevronRight size={20} /></button>
                                                </div>
                                                <div className="calendar-grid">
                                                    {weekDays.map(day => <div key={day} className="week-day">{day}</div>)}
                                                    {renderCalendarGrid()}
                                                </div>
                                            </>
                                        ) : (
                                            /* --- Year Selection View --- */
                                            <>
                                                <div className="calendar-header">
                                                    <button className="nav-btn" onClick={prevYearRange}><ChevronLeft size={20} /></button>
                                                    <div className="month-year-btn" style={{cursor: 'default'}}>
                                                        {startYear} - {endYear}
                                                    </div>
                                                    <button className="nav-btn" onClick={nextYearRange}><ChevronRight size={20} /></button>
                                                </div>
                                                <div className="years-grid">
                                                    {years.map(y => {
                                                        const isSelected = selectedDate && selectedDate.getFullYear() === y;
                                                        return (
                                                            <div 
                                                                key={y} 
                                                                className={`year-cell ${isSelected ? 'selected' : ''}`}
                                                                onClick={() => selectYear(y)}
                                                            >
                                                                {y}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Error Display */}
                {error && (
                    <div className="error-message" style={{ 
                        marginBottom: '16px', 
                        padding: '12px', 
                        backgroundColor: '#FEE2E2', 
                        color: '#DC2626', 
                        borderRadius: '6px',
                        fontSize: '14px'
                    }}>
                        {error}
                        <button 
                            onClick={clearError} 
                            style={{ 
                                marginLeft: '12px', 
                                background: 'none', 
                                border: 'none', 
                                color: '#DC2626', 
                                cursor: 'pointer'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Form Actions */}
                <div className="form-actions">
                    <button className="btn-outline" disabled={is_loading}>
                        {is_loading ? 'Saving...' : 'Save Draft'}
                    </button>
                    <div className="action-right">
                        <button className="btn-secondary">Clear all</button>
                        <button className="btn-primary" onClick={handleSaveAndNext} disabled={is_loading}>
                            {is_loading ? 'Saving...' : 'Save & Next'}
                        </button>
                    </div>
                </div>

            </main>
        </div>
        </>
    );
};

export default OrgPostOpportunity;