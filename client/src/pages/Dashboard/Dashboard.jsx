import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Briefcase,
  FileText,
  AlertTriangle,
  Asterisk,
  Clock,
  Phone,
  Sun,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import './Dashboard.css';

export const Dashboard = ({ onNavigate }) => {
  // Flipkart-style Ad Carousel Slides
  const slides = [
    {
      id: 1,
      category: 'Urgent Notice',
      badgeBg: 'bg-red-100 text-red-700',
      icon: <Megaphone className="w-5 h-5 text-red-600" />,
      title: 'Vector-borne Disease Prevention',
      desc: 'Important guidelines and spraying schedule for the upcoming monsoon season across all wards.',
      meta: 'Spraying Schedule: Mon - Wed 8:00 AM • Sehore Health Dept',
      actionText: 'Read Notice',
      route: 'notices',
      bgGradient: 'from-red-50/60 via-white to-slate-50',
      borderColor: 'border-red-200/80',
    },
    {
      id: 2,
      category: 'MGNREGA Job Opening',
      badgeBg: 'bg-purple-100 text-purple-700',
      icon: <Briefcase className="w-5 h-5 text-purple-600" />,
      title: 'Pond Desilting & Rainwater Harvesting Work',
      desc: '45 vacancies open under 100 days guaranteed wage employment scheme at East Lake Pond.',
      meta: 'Govt Wage: ₹243 / day • 45 Openings • Job Card Holder',
      actionText: 'Demand Work',
      route: 'jobs',
      bgGradient: 'from-purple-50/60 via-white to-slate-50',
      borderColor: 'border-purple-200/80',
    },
    {
      id: 3,
      category: 'Digital Service Job',
      badgeBg: 'bg-emerald-100 text-emerald-700',
      icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
      title: 'CSC Computer Operator',
      desc: 'Full-time computer data entry assistant position at Gram Panchayat Digital Kendra Office.',
      meta: 'Salary: ₹12,000 / month • Ward 2 CSC Center',
      actionText: 'Apply Job',
      route: 'jobs',
      bgGradient: 'from-emerald-50/60 via-white to-slate-50',
      borderColor: 'border-emerald-200/80',
    },
    {
      id: 4,
      category: 'Technical Job',
      badgeBg: 'bg-blue-100 text-blue-700',
      icon: <Sun className="w-5 h-5 text-blue-600" />,
      title: 'Solar Pump Maintenance & Grid Technician',
      desc: 'Oversee and service 3HP to 7.5HP solar irrigation pumps installed across Chandanpura farm sectors.',
      meta: 'Contract Salary: ₹15,000 / month • ITI Electrical / Solar',
      actionText: 'Apply Job',
      route: 'jobs',
      bgGradient: 'from-blue-50/60 via-white to-slate-50',
      borderColor: 'border-blue-200/80',
    },
    {
      id: 5,
      category: 'Welfare Job Opening',
      badgeBg: 'bg-amber-100 text-amber-800',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      title: 'Anganwadi Nutrition & Health Care Assistant',
      desc: 'Assist in child nutrition distribution and pre-school health care activities at Ward 1 Anganwadi Center.',
      meta: 'Honorarium: ₹8,500 / month • Resident of Ward 1 or 2',
      actionText: 'Apply Job',
      route: 'jobs',
      bgGradient: 'from-amber-50/60 via-white to-slate-50',
      borderColor: 'border-amber-200/80',
    },
  ];

  // Append clone of slide 0 to the end for seamless 100% infinite continuous loop
  const extendedSlides = [...slides, { ...slides[0], id: 'clone-first' }];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [latestNotices, setLatestNotices] = useState([]);

  // Fetch live notices from backend API
  useEffect(() => {
    const fetchDashboardNotices = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_BASE}/api/notices`);
        if (res.ok) {
          const data = await res.json();
          const list = data.data || data;
          if (Array.isArray(list) && list.length > 0) {
            setLatestNotices(list);
          }
        }
      } catch (err) {
        console.warn('Dashboard notice fetch error:', err.message);
      }
    };

    fetchDashboardNotices();
  }, []);

  // Touch & Mouse Drag Gesture State
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Automatic slide transition every 4 seconds (4000ms)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(slides.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide(slides.length - 1);
      }, 20);
    } else {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Seamless infinite loop transition reset
  const handleTransitionEnd = () => {
    if (currentSlide === slides.length) {
      setIsTransitioning(false);
      setCurrentSlide(0);
    }
  };

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX - touchEndX > 40) {
      // Swiped Left -> Next Slide
      handleNext();
    } else if (touchEndX - touchStartX > 40) {
      // Swiped Right -> Prev Slide
      handlePrev();
    }
  };

  // Mouse Drag handlers
  const handleMouseDown = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    setTouchStartX(e.clientX);
    setTouchEndX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEndX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);
    if (touchStartX - touchEndX > 40) {
      handleNext();
    } else if (touchEndX - touchStartX > 40) {
      handlePrev();
    }
  };

  const activeIndicatorIndex = currentSlide % slides.length;

  return (
    <div className="space-y-6 pb-6">
      {/* Flipkart-Style Top Automated Swipe Sliding Banner (Infinite Loop, No Arrow Buttons) */}
      <div className="relative select-none">
        <div
          className="overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md transition-all cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setIsDragging(false);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Track Container */}
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                className="w-full flex-shrink-0 min-w-full"
              >
                <div
                  className={`bg-gradient-to-r ${slide.bgGradient} p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 min-h-[220px]`}
                >
                  {/* Left Info Area */}
                  <div className="max-w-3xl space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`${slide.badgeBg} font-bold text-xs px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs`}>
                        {slide.category}
                      </span>
                      <div className="p-1.5 bg-white/80 rounded-lg shadow-xs">
                        {slide.icon}
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {slide.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      {slide.desc}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white/70 px-3 py-1 rounded-lg border border-slate-200/60">
                      <span>{slide.meta}</span>
                    </div>
                  </div>

                  {/* Right Action Button */}
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(slide.route);
                      }}
                      className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <span>{slide.actionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pagination Indicators + 4-Second Progress Bar */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTransitioning(true);
                  setCurrentSlide(index);
                }}
                className={`relative overflow-hidden h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndicatorIndex === index
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {activeIndicatorIndex === index && !isPaused && (
                  <div className="absolute inset-0 bg-white/40 animate-[progressBar_4s_linear_infinite]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>



      {/* Quick Actions Section */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('complaints')}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all text-center group"
          >
            <div className="bg-red-100/80 text-red-500 p-3.5 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800">Report Complaint</span>
          </div>

          <div
            onClick={() => onNavigate('schemes')}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all text-center group"
          >
            <div className="bg-emerald-100/80 text-emerald-500 p-3.5 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800">Apply for Scheme</span>
          </div>

          <div
            onClick={() => onNavigate('jobs')}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all text-center group"
          >
            <div className="bg-blue-100/80 text-blue-600 p-3.5 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800">Search Jobs</span>
          </div>

          <div
            onClick={() => onNavigate('emergency')}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all text-center group"
          >
            <div className="bg-[#78350f] text-white p-3.5 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <Asterisk className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs text-slate-800">Emergency Call</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Left (Notices & Schemes) & Right (Complaints & Quick Dial) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Latest Village Notices */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">Latest Village Notices</h3>
              </div>
              <button
                onClick={() => onNavigate('notices')}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {latestNotices.length > 0 ? (
                latestNotices.slice(0, 2).map((notice, idx) => (
                  <div key={notice.id || idx} className="bg-slate-50/90 border border-slate-100 rounded-2xl p-4 flex items-stretch gap-4 hover:bg-slate-50 transition-colors">
                    <div className={`w-1.5 rounded-full flex-shrink-0 ${notice.isImportant ? 'bg-rose-600' : 'bg-blue-600'}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{notice.title}</h4>
                        {notice.isImportant && (
                          <span className="text-[9px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded uppercase">Urgent</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {notice.summary || notice.desc}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Date: {notice.date || 'Today'} • {notice.department || 'Gram Panchayat'}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-50/90 border border-slate-100 rounded-2xl p-4 flex items-stretch gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-slate-900">Water Supply Maintenance & Pipeline Check</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Scheduled maintenance for the main pipeline on Thursday, 10 AM to 4 PM.
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Today, 09:00 AM</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Schemes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Recommended Schemes</h3>
              </div>
              <button
                onClick={() => onNavigate('schemes')}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Primary Scheme */}
              <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">PM Kisan Samman Nidhi</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Income support of ₹6,000 per year to all landholding farmer families.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('schemes')}
                  className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer text-center shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          {/* Your Complaints Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 mb-4">Your Complaints</h3>

            <div className="space-y-3 mb-4">
              <div className="bg-slate-50/90 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Active</span>
                <span className="text-3xl font-extrabold text-red-600">2</span>
              </div>

              <div className="bg-slate-50/90 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Resolved</span>
                <span className="text-3xl font-extrabold text-emerald-600">15</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('complaints')}
              className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
            >
              View All Complaints
            </button>
          </div>

          {/* Quick Dial Card */}
          <div className="bg-red-50/70 border border-red-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Asterisk className="w-5 h-5 text-red-800" />
              <h3 className="font-extrabold text-base text-red-950">Quick Dial</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-red-100">
                <div>
                  <h4 className="font-bold text-xs text-red-950">Ambulance</h4>
                  <p className="text-[11px] text-red-800/80 mt-0.5">Local Hospital</p>
                </div>
                <a
                  href="tel:108"
                  className="w-9 h-9 rounded-full bg-red-900 hover:bg-red-950 text-white flex items-center justify-center transition-colors shadow-sm"
                  title="Call Ambulance"
                >
                  <Phone className="w-4 h-4 fill-white" />
                </a>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <h4 className="font-bold text-xs text-red-950">Police</h4>
                  <p className="text-[11px] text-red-800/80 mt-0.5">Village Station</p>
                </div>
                <a
                  href="tel:100"
                  className="w-9 h-9 rounded-full bg-red-900 hover:bg-red-950 text-white flex items-center justify-center transition-colors shadow-sm"
                  title="Call Police"
                >
                  <Phone className="w-4 h-4 fill-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
