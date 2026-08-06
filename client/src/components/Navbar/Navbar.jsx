import React, { useState } from 'react';
import {
  Search,
  Globe,
  Bell,
  Menu,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { RuralSyncLogo } from '../Logo/RuralSyncLogo';
import { UserAvatar } from '../Logo/UserAvatar';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export const Navbar = ({
  onNavigate,
  onToggleSidebar,
  searchTerm = '',
  onSearchChange,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [lang, setLang] = useState('EN');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleLanguage = () => {
    if (lang === 'HI') setLang('EN');
    else if (lang === 'EN') setLang('MP');
    else setLang('HI');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="nav-brand-section">
          <button
            onClick={onToggleSidebar}
            className="nav-toggle-btn"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="navbar-brand cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <RuralSyncLogo size="md" showText={false} />
            <div className="navbar-title">
              <span className="font-extrabold text-slate-900 tracking-tight">Rural<span className="text-blue-600">Sync</span></span>
              <span className="navbar-subtitle">CITIZEN PORTAL</span>
            </div>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="nav-search-container">
          <div className="nav-search-wrapper">
            <Search className="nav-search-icon" />
            <input
              type="text"
              placeholder="Search RuralSync..."
              value={searchTerm}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="nav-search-input"
            />
          </div>
        </div>

        <div className="navbar-actions">
          {/* Language Switcher */}
          <button onClick={toggleLanguage} className="nav-lang-btn" title="Switch Language">
            <Globe className="w-4 h-4 text-slate-500" />
            <span>{lang === 'HI' ? 'हिंदी' : lang === 'EN' ? 'English' : 'मालवी'}</span>
          </button>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="nav-bell-btn"
            >
              <Bell className="w-5 h-5" />
              <span className="nav-badge-dot"></span>
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="notifications-dropdown">
                  <div className="dropdown-header">
                    <span className="dropdown-title">Gram Notifications</span>
                    <span className="dropdown-badge">3 New</span>
                  </div>
                  <div className="dropdown-list">
                    <div className="dropdown-item" onClick={() => { onNavigate('schemes'); setNotificationsOpen(false); }}>
                      <p className="item-title">PM-KISAN Sanctioned</p>
                      <p className="item-desc">₹2,000 credited to bank account.</p>
                      <span className="item-time">10 mins ago</span>
                    </div>
                    <div className="dropdown-item" onClick={() => { onNavigate('complaints'); setNotificationsOpen(false); }}>
                      <p className="item-title">Complaint Inspection</p>
                      <p className="item-desc">Ward officer visited Ward 3 water leak site.</p>
                      <span className="item-time">1 hour ago</span>
                    </div>
                    <div className="dropdown-item" onClick={() => { onNavigate('notices'); setNotificationsOpen(false); }}>
                      <p className="item-title">Gram Sabha Notice</p>
                      <p className="item-desc">Special village meeting schedule posted.</p>
                      <span className="item-time">Yesterday</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Auth State: User Avatar or Sign In Buttons */}
          {isAuthenticated ? (
            <div className="relative">
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="nav-profile-pill flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-slate-100 transition-colors"
                title={`${user?.name} (${user?.role})`}
              >
                <UserAvatar size="md" />
                <div className="hidden sm:block text-left pr-1">
                  <p className="text-xs font-extrabold text-slate-900 leading-none">{user?.name || 'Citizen'}</p>
                  <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">{user?.role || 'Citizen'}</span>
                </div>
              </div>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-slate-100 mb-1">
                      <p className="text-xs font-extrabold text-slate-900">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{user?.villageName || 'Chandanpura'}</p>
                      <span className="inline-block mt-1.5 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        JWT Verified Session
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-blue-600" />
                      <span>My Profile & Locker</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer hidden sm:block"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


