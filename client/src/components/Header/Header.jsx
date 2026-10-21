import React, { useState, useEffect } from 'react';
import { Sun, MapPin, CloudSun, CloudRain, Wind, Compass, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';
import './Header.css';

export const Header = ({ currentPage }) => {
  const [weather, setWeather] = useState({
    temp: 29,
    condition: 'Partly Cloudy',
    humidity: 72,
    wind: 14,
    city: 'Sehore',
    panchayat: 'Gram Panchayat Chandanpura',
    lat: '23.20° N',
    lng: '77.08° E',
    advisory: 'Optimal weather for monsoon soyabean & paddy crop. Light evening shower expected.',
  });

  const [locationStatus, setLocationStatus] = useState('Standard Location');

  // Detect live GPS location
  const handleDetectGPS = () => {
    if ('geolocation' in navigator) {
      setLocationStatus('Locating GPS...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(2);
          const lng = pos.coords.longitude.toFixed(2);
          setWeather((prev) => ({
            ...prev,
            lat: `${lat}° N`,
            lng: `${lng}° E`,
            panchayat: `Gram Panchayat Chandanpura (${lat}°N, ${lng}°E)`,
          }));
          setLocationStatus('Live GPS Active');
        },
        () => {
          setLocationStatus('Standard Location');
        }
      );
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/weather?city=Sehore`);
        if (res.ok) {
          const data = await res.json();
          setWeather((prev) => ({
            ...prev,
            ...data,
            wind: data.wind !== undefined ? data.wind : (data.windSpeed !== undefined ? Math.round(data.windSpeed) : prev.wind),
          }));
        }
      } catch (err) {
        console.warn('Weather fetch error:', err.message);
      }
    };

    fetchWeather();
  }, []);

  if (currentPage === 'dashboard') {
    return null;
  }

  const pageTitles = {
    dashboard: {
      title: 'Dashboard',
      desc: 'Citizen portal overview and quick services',
    },
    schemes: {
      title: 'Government & Panchayat Schemes',
      desc: 'Explore, check eligibility and apply directly for Central & State Welfare Schemes',
    },
    complaints: {
      title: 'Grievance Redressal & Public Complaints',
      desc: 'Track ward issues, submit photos of infrastructure defects, and audit resolution timeline',
    },
    community: {
      title: 'Gram Sabha & Farmers Community Forum',
      desc: 'Connect with ward members, share agricultural knowledge, and discuss village development',
    },
    jobs: {
      title: 'MGNREGA Employment & Local Job Directory',
      desc: 'Apply for village works, check Muster Roll status, and discover local skilled opportunities',
    },
    notices: {
      title: 'Panchayat Notices, Circulars & Tenders',
      desc: 'Official Gram Sabha announcements, vaccination camp alerts, and ration shop schedules',
    },
    emergency: {
      title: 'Emergency SOS & Health Directory',
      desc: '24/7 Hotline contacts, village PHC doctors, ambulance dispatch, and disaster alerts',
    },
    volunteer: {
      title: 'Village Youth Volunteer Corps',
      desc: 'Participate in Swachh Bharat drives, tree plantations, and digital literacy initiatives',
    },
    admin: {
      title: 'Sarpanch & Secretary Admin Control Panel',
      desc: 'Manage grievances, approve scheme applications, and oversee village development works',
    },
    profile: {
      title: 'Citizen Profile & Digital Document Locker',
      desc: 'Manage ration card details, land records (Khatauni), and verified government documents',
    },
    reports: {
      title: 'Panchayat Budget & Public Audit Reports',
      desc: 'Complete financial transparency: view fund allocations, project expenditures & audits',
    },
  };

  const currentInfo = pageTitles[currentPage] || pageTitles.dashboard;

  return (
    <div className="page-header">
      <div className="header-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="header-location-badge flex items-center gap-1.5 text-xs text-blue-700 font-extrabold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{weather.panchayat} • Block {weather.city}</span>
            <button
              onClick={handleDetectGPS}
              className="ml-1 text-[10px] text-blue-800 bg-blue-100 hover:bg-blue-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer flex items-center gap-1"
              title="Click to detect live GPS coordinates"
            >
              <Compass className="w-3 h-3 text-blue-700" />
              <span>{locationStatus}</span>
            </button>
          </div>
          <h1 className="header-title">{currentInfo.title}</h1>
          <p className="header-desc">{currentInfo.desc}</p>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          {/* Live Weather Card with Agri Advisory */}
          <div className="header-weather-card bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-2.5 px-4 shadow-xs flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <Sun className="w-5 h-5 text-amber-500 animate-pulse" />
              <span>{weather.temp}°C {weather.condition}</span>
            </div>
            <div className="w-px h-6 bg-amber-200"></div>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div className="flex items-center gap-2">
                <span>Humidity: <strong>{weather.humidity}%</strong></span>
                <span>•</span>
                <span>Wind: <strong>{weather.wind} km/h</strong></span>
              </div>
            </div>
          </div>

          <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Agri Weather Advisory: {weather.advisory}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

