import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

// Pages
import { Dashboard } from './pages/Dashboard/Dashboard';
import { SchemesPage } from './pages/Schemes/Schemes';
import { ComplaintsPage } from './pages/Complaints/Complaints';
import { CommunityPage } from './pages/Community/Community';
import { JobsPage } from './pages/Jobs/Jobs';
import { NoticesPage } from './pages/Notices/Notices';
import { EmergencyPage } from './pages/Emergency/Emergency';
import { VolunteerPage } from './pages/Volunteer/Volunteer';
import { AdminPage } from './pages/Admin/Admin';
import { ProfilePage } from './pages/Profile/Profile';
import { ReportsPage } from './pages/Reports/Reports';
import { LoginPage } from './pages/Auth/Login';
import { SignupPage } from './pages/Auth/Signup';

import './App.css';

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Determine current page route from location pathname
  const getCurrentPageRoute = () => {
    const path = location.pathname.substring(1);
    if (path === 'schemes') return 'schemes';
    if (path === 'complaints') return 'complaints';
    if (path === 'community') return 'community';
    if (path === 'jobs') return 'jobs';
    if (path === 'notices') return 'notices';
    if (path === 'emergency') return 'emergency';
    if (path === 'volunteer') return 'volunteer';
    if (path === 'admin') return 'admin';
    if (path === 'profile') return 'profile';
    if (path === 'reports') return 'reports';
    if (path === 'login') return 'login';
    if (path === 'signup') return 'signup';
    return 'dashboard';
  };

  const currentPage = getCurrentPageRoute();

  const handleNavigate = (page) => {
    if (page === 'dashboard') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-[#f4f5fa] flex flex-col font-sans text-slate-800 antialiased">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar (hidden on login/signup pages) */}
        {!isAuthPage && (
          <Sidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isOpen={sidebarOpen}
            onCloseMobile={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Page Header Banner (hidden on login/signup pages) */}
          {!isAuthPage && (
            <Header
              currentPage={currentPage}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          )}

          {/* Page Body View */}
          <main className="flex-1 p-4 md:p-6 md:px-8 max-w-7xl w-full mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard onNavigate={handleNavigate} />} />
              <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
              <Route path="/schemes" element={<SchemesPage />} />
              <Route path="/complaints" element={<ComplaintsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<Dashboard onNavigate={handleNavigate} />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

