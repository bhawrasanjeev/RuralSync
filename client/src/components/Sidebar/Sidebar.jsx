import React from 'react';
import {
  LayoutDashboard,
  AlertCircle,
  FileText,
  Briefcase,
  Megaphone,
  Asterisk,
  User,
  Settings,
  HelpCircle,
  ExternalLink,
  PieChart,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

export const Sidebar = ({
  currentPage,
  onNavigate,
  isOpen,
  onCloseMobile,
}) => {
  const { isAuthenticated } = useAuth();

  const mainLinks = [
    { route: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="sidebar-icon" /> },
    { route: 'complaints', label: 'Complaints', icon: <AlertCircle className="sidebar-icon" /> },
    { route: 'schemes', label: 'Schemes', icon: <FileText className="sidebar-icon" /> },
    { route: 'jobs', label: 'Jobs', icon: <Briefcase className="sidebar-icon" /> },
    { route: 'notices', label: 'Notices', icon: <Megaphone className="sidebar-icon" /> },
    { route: 'reports', label: 'Village Budget & Report', icon: <PieChart className="sidebar-icon" /> },
    { route: 'emergency', label: 'Emergency', icon: <Asterisk className="sidebar-icon" /> },
  ];

  const secondaryLinks = [
    { route: 'profile', label: isAuthenticated ? 'Profile' : 'Profile (Sign In)', icon: <User className="sidebar-icon" /> },
    { route: 'admin', label: 'Settings', icon: <Settings className="sidebar-icon" /> },
  ];

  const handleLinkClick = (route) => {
    if (route === 'profile' && !isAuthenticated) {
      onNavigate('login');
    } else {
      onNavigate(route);
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-nav-section flex-1">
          <div className="sidebar-group">
            {mainLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleLinkClick(link.route)}
                className={`sidebar-link ${currentPage === link.route ? 'active' : ''}`}
              >
                {link.icon}
                <span className="truncate">{link.label}</span>
              </button>
            ))}
          </div>

          <hr className="sidebar-divider" />

          <div className="sidebar-group">
            {secondaryLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleLinkClick(link.route)}
                className={`sidebar-link ${currentPage === link.route ? 'active' : ''}`}
              >
                {link.icon}
                <span className="truncate">{link.label}</span>
              </button>
            ))}
          </div>

          <div className="sidebar-admin-box">
            <div className="helpline-header">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Panchayat Helpline</span>
            </div>
            <p className="helpline-desc">
              24x7 Toll-Free Assistance:
            </p>
            <a href="tel:18001801551" className="helpline-phone-link">
              1800-180-1551 <ExternalLink className="w-3 h-3 text-blue-600" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
