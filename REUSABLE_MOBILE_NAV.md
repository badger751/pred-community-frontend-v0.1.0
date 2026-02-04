# Reusable Mobile Navigation Boilerplate

This document provides a copy-paste ready boilerplate to implement the **exactly** same mobile navigation system used in the `OrganizationDashboard`.

## 1. Icons (Add these above your component)

```tsx
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
```

## 2. State & Logic (Add inside your component)

```tsx
// 1. Initialize State
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const navigate = useNavigate();

// 2. Define Handlers
const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
const closeMobileMenu = () => setIsMobileMenuOpen(false);

// 3. Handle Escape Key & Background Scroll Lock
useEffect(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeMobileMenu();
  };

  if (isMobileMenuOpen) {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; 
  } else {
    document.body.style.overflow = 'unset';
  }

  return () => {
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = 'unset';
  };
}, [isMobileMenuOpen]);
```

## 3. TSX Structure (Add to your return statement)

Place this at the top of your JSX fragment (`<> ... </>`).

```tsx
{/* --- MOBILE TOP NAVIGATION --- */}
<header className="mobile-top-nav">
  <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
    <HamburgerIcon />
  </button>
  <div className="mobile-logo-section">
    <img src="/Logo.svg" alt="Logo" />
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
      
      {/* Navigation Items - Example: */}
      <div className="nav-item mobile-nav-item active" onClick={() => navigate('/')}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"></rect>
          <rect x="14" y="3" width="7" height="7" rx="1"></rect>
          <rect x="14" y="14" width="7" height="7" rx="1"></rect>
          <rect x="3" y="14" width="7" height="7" rx="1"></rect>
        </svg>
        Overview
      </div>

      <div className="mobile-nav-divider"></div>

      <div className="nav-item mobile-nav-item" onClick={() => navigate('/settings')}>
         {/* Add SVG Icon Here */}
         Settings
      </div>
    </nav>
  </div>
)}
```

## 4. Required CSS (Include in your dashboard.css)

```css
/* --- MOBILE NAVIGATION STYLES --- */

.mobile-top-nav {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 60px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  z-index: 1000;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
}

.hamburger-btn {
  background: none; border: none; cursor: pointer;
  padding: 8px; display: flex; align-items: center;
  border-radius: 6px; color: #4B5563;
}

.mobile-logo-section img { width: 100px; height: auto; }

.mobile-menu-overlay {
  position: fixed; top: 60px; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.2s ease-out;
}

.mobile-nav-dropdown {
  background: #FFFFFF; width: 280px; height: 100%;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
}

.mobile-nav-header {
  display: flex; justify-content: flex-end;
  padding: 16px; border-bottom: 1px solid #F3F4F6;
}

.mobile-nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 20px; color: #4B5563; font-size: 14px;
  font-weight: 500; cursor: pointer; border: none;
  background: none; width: 100%; text-align: left;
}

.mobile-nav-item.active {
  background-color: #ECFDF5;
  color: #065F46;
}

.mobile-nav-divider {
  height: 1px; background-color: #E5E7EB; margin: 8px 0;
}

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }

/* Responsive Breakpoint */
@media (max-width: 768px) {
  .mobile-top-nav { display: flex; }
  .sidebar-left { display: none; }
  .dashboard-container { padding-top: 60px; }
}
```
