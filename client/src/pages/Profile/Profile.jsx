import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { UserAvatar } from '../../components/Logo/UserAvatar';
import { FileText, Download, ShieldCheck, MapPin, Phone, Lock, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is not authenticated, restrict profile access
  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
          <Lock className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Citizen Profile Access Restricted</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
            Please sign in to your registered JWT account or create a new citizen account to access your official e-KYC profile, ration card records, and Digital Document Locker.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Account</span>
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-slate-600" />
            <span>Create New Account</span>
          </button>
        </div>
      </div>
    );
  }

  // Active User Profile data from AuthContext when authenticated
  const activeUser = user;

  const digitalDocuments = [
    {
      title: 'Khasra & Khatauni Land Revenue Record',
      docType: 'Revenue Record',
      status: 'Verified',
      issuedDate: '12 Jan 2025',
    },
    {
      title: 'Digital BPL Ration Card Certificate',
      docType: 'Civil Supplies',
      status: 'Verified',
      issuedDate: '04 Mar 2024',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <UserAvatar size="xl" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">{activeUser.name}</h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> e-KYC Verified
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {activeUser.villageName || 'Gram Panchayat Chandanpura'} • Ward No. {activeUser.wardNo || '1'}
            </p>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> +91 {activeUser.mobile} • <span className="font-semibold text-blue-600">{activeUser.role || 'Citizen'}</span>
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5 w-full md:w-auto">
          <div className="flex justify-between gap-6">
            <span className="text-slate-600 font-medium">Ration Card:</span>
            <strong className="text-slate-900 font-mono">{activeUser.rationCardNo || 'MP-SEC-998822'}</strong>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-slate-600 font-medium">Land Holding:</span>
            <strong className="text-slate-900">{activeUser.landHoldingAcres || '2.5'} Acres (Khasra)</strong>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-slate-600 font-medium">Family Members:</span>
            <strong className="text-slate-900">{activeUser.familyMembers || 4} Registered</strong>
          </div>
        </div>
      </div>

      {/* Digital Locker Documents Section */}
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Digital Document Locker & Revenue Records
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {digitalDocuments.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between hover:border-blue-200 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {doc.docType}
                  </span>
                  <StatusBadge status={doc.status} />
                </div>
                <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Issued: {doc.issuedDate}</p>
              </div>

              <button
                onClick={() => alert(`Downloading official PDF certificate: ${doc.title}`)}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
