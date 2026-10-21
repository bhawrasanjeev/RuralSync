import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';
import { mockComplaints, mockSchemes, mockVillageStats } from '../../data/mockData';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { StatCard } from '../../components/StatCard/StatCard';
import { Modal } from '../../components/Modal/Modal';
import {
  ShieldAlert,
  Check,
  X,
  FileText,
  AlertCircle,
  PlusCircle,
  DollarSign,
  Users,
  Send,
  Building,
} from 'lucide-react';
import './Admin.css';

export const AdminPage = () => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [schemes, setSchemes] = useState(mockSchemes);
  const [villageStats, setVillageStats] = useState(mockVillageStats);
  const [activeTab, setActiveTab] = useState('grievances');

  // Fetch live dashboard & module data from backend
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [complaintsRes, schemesRes, statsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/complaints`),
          fetch(`${API_BASE_URL}/api/schemes`),
          fetch(`${API_BASE_URL}/api/stats`),
        ]);

        if (complaintsRes.ok) {
          const data = await complaintsRes.json();
          const list = data.data || data;
          if (Array.isArray(list) && list.length > 0) setComplaints(list);
        }

        if (schemesRes.ok) {
          const data = await schemesRes.json();
          const list = data.data || data;
          if (Array.isArray(list) && list.length > 0) setSchemes(list);
        }

        if (statsRes.ok) {
          const data = await statsRes.json();
          const stats = data.data || data;
          if (stats && stats.panchayatFundTotal) setVillageStats(stats);
        }
      } catch (err) {
        console.warn('Backend admin fetch failed, retaining default data:', err.message);
      }
    };

    fetchAdminData();
  }, []);

  // Publish Notice Form State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCat, setNoticeCat] = useState('Circular');
  const [noticeSummary, setNoticeSummary] = useState('');
  const [noticePublished, setNoticePublished] = useState(false);

  const handleUpdateStatus = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handlePublishNotice = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API_BASE_URL}/api/notices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noticeTitle,
          category: noticeCat,
          summary: noticeSummary,
          department: 'Panchayat Administrative Cell',
          date: new Date().toISOString().split('T')[0],
        }),
      });
    } catch (err) {
      console.warn('Backend notice publish failed:', err.message);
    }

    setNoticePublished(true);
    setNoticeTitle('');
    setNoticeSummary('');
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-700">
            Authenticated Officer Portal
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-2">Sarpanch & Panchayat Secretary Control Desk</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Smt. Rajeshwari Devi (Sarpanch) & Smt. Sunita Sharma (Secretary) • Gram Panchayat Chandanpura
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400 block">Panchayat Fund Balance</span>
            <strong className="text-base text-emerald-400 font-extrabold">{villageStats.panchayatFundTotal}</strong>
          </div>
        </div>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Panchayat Fund Allocated"
          value={villageStats.panchayatFundTotal}
          subtitle={`Spent: ${villageStats.panchayatFundSpent}`}
          icon={<DollarSign className="w-5 h-5" />}
          colorBg="bg-emerald-50 text-emerald-700"
        />
        <StatCard
          title="Pending Grievances"
          value={complaints.filter((c) => c.status !== 'Resolved').length}
          subtitle="Awaiting Resolution"
          icon={<AlertCircle className="w-5 h-5" />}
          colorBg="bg-amber-50 text-amber-700"
        />
        <StatCard
          title="Active Development Works"
          value={villageStats.activeProjects}
          subtitle="Roads, Water, Solar"
          icon={<Building className="w-5 h-5" />}
          colorBg="bg-blue-50 text-blue-700"
        />
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('grievances')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'grievances'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          Manage Grievances ({complaints.length})
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'applications'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Approve Scheme Applications
        </button>

        <button
          onClick={() => setActiveTab('noticePublish')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'noticePublish'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          Publish Notice / Tender
        </button>
      </div>

      {/* Tab 1: Manage Grievances Table */}
      {activeTab === 'grievances' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900">Ward Grievances Redressal Desk</h3>
            <span className="text-xs text-gray-500">Update status to notify citizen instantly</span>
          </div>

          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Grievance Title</th>
                  <th>Location / Ward</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((cmp) => (
                  <tr key={cmp.id}>
                    <td className="font-mono font-bold text-xs">{cmp.ticketNo}</td>
                    <td>
                      <div className="font-semibold">{cmp.title}</div>
                      <div className="text-[11px] text-gray-500">{cmp.category}</div>
                    </td>
                    <td>{cmp.location}</td>
                    <td><StatusBadge status={cmp.status} /></td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        {cmp.status !== 'Resolved' && (
                          <button
                            onClick={() => handleUpdateStatus(cmp.id, 'Resolved')}
                            className="px-2.5 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Resolve
                          </button>
                        )}
                        {cmp.status === 'Submitted' && (
                          <button
                            onClick={() => handleUpdateStatus(cmp.id, 'In Progress')}
                            className="px-2.5 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-bold rounded-lg"
                          >
                            Assign Officer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Approve Scheme Applications */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900">Incoming Citizen Scheme Applications</h3>
          <p className="text-xs text-gray-600">Review land records, Aadhaar e-KYC and sanction DBT grants.</p>

          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                  PM-KISAN 17th Installment
                </span>
                <h4 className="font-bold text-sm text-gray-900 mt-1">Applicant: Rameshwar Singh Patel</h4>
                <p className="text-xs text-gray-600 mt-0.5">Khatauni Land Record: 3.5 Acres Verified • Bank: SBI Sehore</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("Application Approved & Forwarded to District Treasury!")}
                  className="px-3.5 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Approve Sanction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Publish Official Notice */}
      {activeTab === 'noticePublish' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm max-w-2xl">
          <h3 className="font-bold text-base text-gray-900 mb-1">Publish Official Panchayat Circular or Tender</h3>
          <p className="text-xs text-gray-600 mb-4">Issued notices appear on all citizen portals and mobile notifications.</p>

          <form onSubmit={handlePublishNotice} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Notice Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. Special Gram Sabha Budget Meeting Notice"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                value={noticeCat}
                onChange={(e) => setNoticeCat(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              >
                <option value="Circular">Circular / Announcement</option>
                <option value="Tender">Public Works Tender</option>
                <option value="Ration Distribution">Ration Shop Distribution</option>
                <option value="Health Camp">Health & Vaccination Camp</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Summary / Body Text</label>
              <textarea
                required
                rows={4}
                placeholder="Details of meeting time, venue, or tender conditions..."
                value={noticeSummary}
                onChange={(e) => setNoticeSummary(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Publish Gazette & Alert Citizens
            </button>

            {noticePublished && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-xs rounded-xl text-center">
                ✓ Official Notice Published Successfully!
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
