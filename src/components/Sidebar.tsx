import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  LogOut
} from 'lucide-react';


interface SidebarProps {
  currentPage?: string;
  isMobile?: boolean;
}

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
  route?: string;
  badge?: string;
  onClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, isMobile = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();



  // Navigation items configuration
  const navItems: NavItem[] = [
    { key: 'overview', label: 'Overview', icon: LayoutGrid, route: '/organization' },
    { key: 'outreach', label: 'Outreach', icon: Mail, route: '#', badge: '1' },
    { key: 'talent-pool', label: 'Talent Pool', icon: Users, route: '/talent-pool' },
    { key: 'opportunities', label: 'Opportunities', icon: Briefcase, route: '/opportunities' },
    { key: 'contest', label: 'Contest', icon: Trophy, route: '#' },
  ];

  const footerItems: NavItem[] = [
    { key: 'profile', label: 'Profile', icon: User, route: '/org/profile' },
    { key: 'settings', label: 'Settings', icon: Settings, route: '#' },
    { key: 'support', label: 'Support', icon: LifeBuoy, route: '#' },
    { key: 'ai', label: 'Ask AI', icon: Sparkles, route: '#' },
    { key: 'logout', label: 'Log Out', icon: LogOut, route: '#', onClick: () => handleLogout() },
  ];

  const handleLogout = async () => {
    const { useAuthStore } = await import('../stores/authStore');
    const { logout } = useAuthStore.getState();
    await logout();
    window.location.href = '/login';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (key: string) => {
    return currentPage === key || (location.pathname === navItems.find(item => item.key === key)?.route);
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const activeClass = isActive(item.key) ? 'active' : '';
    
    if (item.route) {
      return (
        <Link to={item.route} className={`nav-item ${activeClass}`}>
          <Icon size={18} />
          {item.label}
          {item.badge && <span className="nav-badge">{item.badge}</span>}
        </Link>
      );
    }

    return (
      <div className={`nav-item ${activeClass}`} onClick={item.onClick || (() => {})}
      >
        <Icon size={18} />
        {item.label}
        {item.badge && <span className="nav-badge">{item.badge}</span>}
      </div>
    );
  };

  // Desktop sidebar
  if (!isMobile) {
    return (
      <aside className="sidebar-left">
        <div className="logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" className="logo-img" style={{ width: '120px' }} />
        </div>

        <nav className="nav-menu">
          {navItems.map(item => renderNavItem(item))}
        </nav>

        <div className="sidebar-footer">
          {footerItems.map(item => renderNavItem(item))}
        </div>
      </aside>
    );
  }

  // Mobile navigation overlay
  return (
    <>
      <header className="mobile-top-nav">
        <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-logo-section">
          <img src="/Logo.svg" alt="Predulive Logo" />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <nav className="mobile-nav-dropdown">
            <div className="mobile-nav-header">
              <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Close navigation menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="6"></line>
                  <line x1="18" y1="18" x2="6" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Main Navigation */}
            {navItems.map(item => {
              const activeClass = isActive(item.key) ? 'mobile-nav-item active' : 'mobile-nav-item';
              return (
                <div key={item.key} className={activeClass} onClick={item.onClick}>
                  {React.createElement(item.icon, { size: 20 })}
                  {item.label}
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </div>
              );
            })}

            <div className="mobile-nav-divider"></div>

            {/* Footer Navigation */}
            {footerItems.map(item => {
              const activeClass = isActive(item.key) ? 'mobile-nav-item active' : 'mobile-nav-item';
              return (
                <div key={item.key} className={activeClass} onClick={item.onClick}>
                  {React.createElement(item.icon, { size: 20 })}
                  {item.label}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;