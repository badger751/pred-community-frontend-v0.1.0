// FILE: src/pages/OrgPostOpportunity.tsx

import React, { useState, useRef, useEffect } from 'react';
import './OrgPostOpportunity.css';

// Placeholder Icons
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;

// Helper to get days in a month
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
// Helper to get day of week for the first day of the month (0-6, Sun-Sat)
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const OrgPostOpportunity: React.FC = () => {
    // State for form fields
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [workSetup, setWorkSetup] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [startDateType, setStartDateType] = useState<string | null>(null);
    const [compensationType, setCompensationType] = useState<string | null>(null);

    // --- Date Picker State ---
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [datePickerView, setDatePickerView] = useState<'calendar' | 'year'>('calendar');
    const [currentDate, setCurrentDate] = useState(new Date()); // For displayed month/year
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const dateInputRef = useRef<HTMLDivElement>(null);

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
        setStartDateType('Specific date'); // Ensure correct pill is active
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
        <div className="dashboard-container">
            {/* --- LEFT SIDEBAR (Reused) --- */}
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
                    <div className="nav-item active">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        Opportunities
                    </div>
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
                        Contest
                    </div>
                </nav>
                <div className="sidebar-footer">
                    {/* Profile */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Profile
                    </div>
                    {/* Settings */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                        Settings
                    </div>
                    {/* Support */}
                    <div className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        Support
                    </div>
                    {/* Ask AI */}
                    <div className="nav-item">
             <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
            Ask AI
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="main-content">
                <header className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1 className="page-title">Create an Opportunity</h1>
                    <button className="icon-btn"><BellIcon /></button>
                </header>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div className="progress-step active">
                            <span className="step-number">1</span> Core Details
                        </div>
                        <ChevronRightIcon />
                        <div className="progress-step">
                            <span className="step-number">2</span> Work Scope
                        </div>
                        <ChevronRightIcon />
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
                                    className={`type-card ${selectedType === type.title ? 'selected' : ''}`}
                                    onClick={() => setSelectedType(type.title)}
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
                                <input type="text" className="form-input" placeholder="Enter title" />
                            </div>
                        </div>
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Duration</label>
                                <input type="text" className="form-input" placeholder="e.g. 2 weeks, 1 month etc." />
                            </div>
                        </div>
                    </div>

                    {/* Domain, Budget, Work Setup */}
                    <div className="form-row">
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Domain<span>*</span></label>
                                <select className="form-input">
                                    <option value="">Choose a domain</option>
                                    {/* Add domain options here */}
                                </select>
                            </div>
                        </div>
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Estimated total budget<span>*</span></label>
                                <input type="text" className="form-input" placeholder="Enter budget" />
                            </div>
                        </div>
                        <div className="form-col">
                            <div className="form-group">
                                <label className="form-label">Work setup<span>*</span></label>
                                <div className="pills-container">
                                    {['Remote', 'In-Person', 'Hybrid'].map(setup => (
                                        <div 
                                            key={setup} 
                                            className={`pill ${workSetup === setup ? 'selected' : ''}`}
                                            onClick={() => setWorkSetup(setup)}
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
                                <div className="form-row" style={{alignItems: 'center'}}>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input type="radio" name="compensation" className="radio-input" onChange={() => setCompensationType('paid')} /> Paid
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="compensation" className="radio-input" onChange={() => setCompensationType('unpaid')} /> Unpaid
                                        </label>
                                    </div>
                                    {compensationType === 'paid' && (
                                        <input type="text" className="form-input" placeholder="Enter exact amount" style={{marginLeft: '24px'}} />
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
                                        className={`pill ${difficulty === diff ? 'selected' : ''}`}
                                        onClick={() => setDifficulty(diff)}
                                    >
                                        {diff}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Input container takes remaining width */}
                            <div className="details-input-container">
                                <input type="text" className="details-input" placeholder="Add more details" />
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
                                        className={`pill ${startDateType === type ? 'selected' : ''}`}
                                        onClick={() => {
                                            setStartDateType(type);
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
                                <div className="date-icon-absolute"><CalendarIcon /></div>

                                {/* --- Date Picker Popup --- */}
                                {isDatePickerOpen && (
                                    <div className="date-picker-popup">
                                        {datePickerView === 'calendar' ? (
                                            /* --- Calendar View --- */
                                            <>
                                                <div className="calendar-header">
                                                    <button className="nav-btn" onClick={prevMonth}><ChevronLeftIcon /></button>
                                                    <button className="month-year-btn" onClick={switchToYearView}>
                                                        {monthNames[month]} {year}
                                                    </button>
                                                    <button className="nav-btn" onClick={nextMonth}><ChevronRightIcon /></button>
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
                                                    <button className="nav-btn" onClick={prevYearRange}><ChevronLeftIcon /></button>
                                                    <div className="month-year-btn" style={{cursor: 'default'}}>
                                                        {startYear} - {endYear}
                                                    </div>
                                                    <button className="nav-btn" onClick={nextYearRange}><ChevronRightIcon /></button>
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

                {/* Form Actions */}
                <div className="form-actions">
                    <button className="btn-outline">Save Draft</button>
                    <div className="action-right">
                        <button className="btn-secondary">Clear all</button>
                        <button className="btn-primary">Save & Next</button>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default OrgPostOpportunity;