import React, { useState, useEffect } from 'react';
import { mockNotices } from '../../data/mockData';
import { Modal } from '../../components/Modal/Modal';
import {
  BellRing,
  Download,
  Share2,
  Search,
  Building,
  Calendar,
  AlertTriangle,
  FileText,
  PlusCircle,
  Megaphone,
  CheckCircle2,
} from 'lucide-react';
import './Notices.css';

export const NoticesPage = () => {
  const [notices, setNotices] = useState(mockNotices);
  const [filterCat, setFilterCat] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // New Notice Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoticeData, setNewNoticeData] = useState({
    title: '',
    category: 'Circular',
    summary: '',
    department: 'Gram Panchayat Office',
    isImportant: false,
  });
  const [successMsg, setSuccessMsg] = useState('');

  const categories = ['All', 'Circular', 'Tender', 'Ration Distribution', 'Health Camp', 'Governance Notice'];

  // Fetch notices from Express API
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/notices`);
      if (res.ok) {
        const data = await res.json();
        const noticesList = data.data || data;
        if (Array.isArray(noticesList) && noticesList.length > 0) {
          setNotices(noticesList);
        }
      }
    } catch (err) {
      console.warn('API fetch notices error, using default data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!newNoticeData.title || !newNoticeData.summary) {
      alert('Please fill in title and summary');
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/notices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newNoticeData,
          date: new Date().toISOString().split('T')[0],
          fileSize: '1.2 MB PDF',
        }),
      });

      const data = await res.json();
      const createdItem = data.data || data;

      // Unshift to local state
      setNotices((prev) => [createdItem, ...prev]);
      setSuccessMsg('Village Notice published successfully to Gram Panchayat portal and Dashboard!');
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMsg('');
        setNewNoticeData({
          title: '',
          category: 'Circular',
          summary: '',
          department: 'Gram Panchayat Office',
          isImportant: false,
        });
      }, 1200);
    } catch (err) {
      // Fallback local unshift
      const localItem = {
        id: `NOT-${Date.now()}`,
        ...newNoticeData,
        date: new Date().toISOString().split('T')[0],
        fileSize: '1.2 MB PDF',
      };
      setNotices((prev) => [localItem, ...prev]);
      setIsModalOpen(false);
    }
  };

  const filtered = notices.filter((n) => {
    const matchesCat = filterCat === 'All' || n.category === filterCat;
    const matchesSearch =
      (n.title && n.title.toLowerCase().includes(search.toLowerCase())) ||
      (n.summary && n.summary.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-700">
            Official e-Panchayat Gazettes
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-2">Panchayat Circulars, Tenders & Announcements</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xl">
            Official notifications issued by Gram Panchayat Chandanpura, Block Sehore, and District Collectorate.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" /> Publish New Notice
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                filterCat === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search circulars & notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-600 outline-none"
          />
        </div>
      </div>

      {/* Notices Grid */}
      <div className="space-y-4">
        {filtered.map((notice, idx) => (
          <div key={notice.id || idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start justify-between gap-4 hover:border-emerald-200 transition-colors">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {notice.category}
                </span>
                {notice.isImportant && (
                  <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> High Priority Notice
                  </span>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date: {notice.date || 'Today'}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 leading-snug">{notice.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{notice.summary}</p>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Department: <strong>{notice.department || 'Gram Panchayat Office'}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => alert(`Official Gazette PDF (${notice.fileSize || '1.2 MB'}) downloaded to your device.`)}
                className="flex-1 md:flex-initial px-4 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>

              <button
                onClick={() => alert("Notice WhatsApp share link copied to clipboard!")}
                className="p-2 text-slate-500 hover:text-emerald-700 bg-slate-50 rounded-xl hover:bg-emerald-50 border border-slate-200 cursor-pointer"
                title="Share via WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Publish New Notice Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Publish Official Village Notice / Circular"
        >
          <form onSubmit={handleCreateNotice} className="space-y-4">
            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title</label>
              <input
                type="text"
                placeholder="e.g. Gram Sabha Special Development Meeting Notice"
                value={newNoticeData.title}
                onChange={(e) => setNewNoticeData({ ...newNoticeData, title: e.target.value })}
                required
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newNoticeData.category}
                  onChange={(e) => setNewNoticeData({ ...newNoticeData, category: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                >
                  <option value="Circular">Circular</option>
                  <option value="Tender">Tender</option>
                  <option value="Health Camp">Health Camp</option>
                  <option value="Ration Distribution">Ration Distribution</option>
                  <option value="Governance Notice">Governance Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  placeholder="e.g. Gram Panchayat Secretary"
                  value={newNoticeData.department}
                  onChange={(e) => setNewNoticeData({ ...newNoticeData, department: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Summary & Details</label>
              <textarea
                rows={3}
                placeholder="Enter complete details regarding meeting agenda, venue, or guidelines..."
                value={newNoticeData.summary}
                onChange={(e) => setNewNoticeData({ ...newNoticeData, summary: e.target.value })}
                required
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-medium"
              ></textarea>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={newNoticeData.isImportant}
                onChange={(e) => setNewNoticeData({ ...newNoticeData, isImportant: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
              />
              <span className="font-bold">Mark as High Priority Alert (Show Urgent Tag)</span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Publish to Village Portal & Database
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
