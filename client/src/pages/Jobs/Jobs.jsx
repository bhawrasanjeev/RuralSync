import React, { useState } from 'react';
import { mockJobs } from '../../data/mockData';
import { Modal } from '../../components/Modal/Modal';
import {
  Briefcase,
  UserCheck,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  PlusCircle,
  TrendingUp,
  FileText,
  Building,
} from 'lucide-react';
import './Jobs.css';

export const JobsPage = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filterType, setFilterType] = useState('All');
  const [appliedJobModal, setAppliedJobModal] = useState(null);
  const [workerRegisterModalOpen, setWorkerRegisterModalOpen] = useState(false);

  // Form state
  const [workerName, setWorkerName] = useState('Rameshwar Singh Patel');
  const [skillType, setSkillType] = useState('Tractor Operator');
  const [experience, setExperience] = useState('5 Years');
  const [mobile, setMobile] = useState('+91 98932 77102');

  const filteredJobs = jobs.filter((j) => {
    if (filterType === 'MGNREGA') return j.isMgnrega;
    if (filterType === 'Private') return !j.isMgnrega;
    return true;
  });

  const handleApplyJob = (job) => {
    setAppliedJobModal(job);
  };

  const handleRegisterWorker = (e) => {
    e.preventDefault();
    alert("Skill Profile Registered in Gram Panchayat Artisan Directory!");
    setWorkerRegisterModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top MGNREGA Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md border border-purple-800/40">
        <div>
          <span className="text-xs font-bold tracking-wider text-purple-300 bg-purple-950 px-2.5 py-1 rounded-full border border-purple-700/50 uppercase">
            National Rural Employment Guarantee (MGNREGA)
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-2">100 Days Guaranteed Wage Employment Portal</h2>
          <p className="text-xs text-purple-100 mt-1 max-w-xl">
            Demand MGNREGA work, check Muster Roll attendance, and find local agricultural/skilled job openings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-purple-950/80 p-3 rounded-xl border border-purple-700/60 text-center">
            <span className="text-[10px] text-purple-300 uppercase block">Govt Notified Wage</span>
            <strong className="text-lg font-extrabold text-amber-300">₹ 243 / Day</strong>
          </div>
          <button
            onClick={() => setWorkerRegisterModalOpen(true)}
            className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl shadow-lg transition-all whitespace-nowrap"
          >
            Register Skilled Worker Profile
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2">
          {['All', 'MGNREGA', 'Private'].map((ft) => (
            <button
              key={ft}
              onClick={() => setFilterType(ft)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterType === ft
                  ? 'bg-purple-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {ft === 'All' ? 'All Work Listings' : ft === 'MGNREGA' ? 'MGNREGA Public Works' : 'Private & Farm Jobs'}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 font-medium">Showing {filteredJobs.length} active openings</span>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredJobs.map((job) => (
          <div key={job.id} className="job-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={job.isMgnrega ? 'mgnrega-badge' : 'bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full'}>
                  {job.type}
                </span>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {job.wageRate}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900">{job.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" /> {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> Duration: {job.duration}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700">
                <span className="font-bold text-gray-900 block mb-1">Requirements:</span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-gray-600">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <span>Openings: <strong className="text-gray-900">{job.openings} Workers</strong></span>
              </div>
              <button
                onClick={() => handleApplyJob(job)}
                className="px-4 py-2 bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
              >
                {job.isMgnrega ? 'Demand Work (Job Card)' : 'Contact Employer'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Demand Work Confirmation Modal */}
      {appliedJobModal && (
        <Modal
          isOpen={!!appliedJobModal}
          onClose={() => setAppliedJobModal(null)}
          title={appliedJobModal.isMgnrega ? 'MGNREGA Form-6 Work Demand Submission' : 'Contact Employer Information'}
        >
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
              <h4 className="font-bold text-sm text-purple-950">{appliedJobModal.title}</h4>
              <p className="text-xs text-purple-800 mt-0.5">Wage: {appliedJobModal.wageRate} • Location: {appliedJobModal.location}</p>
            </div>

            {appliedJobModal.isMgnrega ? (
              <div className="space-y-3 text-xs text-gray-700">
                <p>
                  As per Section 3(1) of MGNREGA Act, your work demand slip (Form-6) will be generated and registered in the Panchayat Muster Roll.
                </p>
                <div className="p-3 bg-gray-50 rounded-lg space-y-1">
                  <p><strong>Job Card Holder:</strong> Rameshwar Singh Patel</p>
                  <p><strong>Job Card No:</strong> MP-04-012-004-CH</p>
                  <p><strong>Requested Work Days:</strong> 15 Days</p>
                </div>
                <button
                  onClick={() => {
                    alert("Form-6 Work Demand Receipt Generated! Panchayat Secretary notified.");
                    setAppliedJobModal(null);
                  }}
                  className="w-full py-2.5 bg-purple-800 text-white font-bold text-xs rounded-xl hover:bg-purple-900"
                >
                  Generate Form-6 Receipt
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-700">
                <p className="font-semibold text-gray-900">Direct Contact Details:</p>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 space-y-1.5">
                  <p><strong>Posted By:</strong> {appliedJobModal.postedBy}</p>
                  <p className="flex items-center gap-1.5 text-emerald-900 font-bold">
                    <Phone className="w-4 h-4 text-emerald-700" /> Phone: {appliedJobModal.contactNumber}
                  </p>
                </div>
                <button
                  onClick={() => setAppliedJobModal(null)}
                  className="w-full py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Skilled Worker Registration Modal */}
      {workerRegisterModalOpen && (
        <Modal
          isOpen={workerRegisterModalOpen}
          onClose={() => setWorkerRegisterModalOpen(false)}
          title="Register as Skilled Village Worker in Panchayat Directory"
        >
          <form onSubmit={handleRegisterWorker} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                required
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Skill / Trade</label>
                <select
                  value={skillType}
                  onChange={(e) => setSkillType(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                >
                  <option value="Tractor Operator">Tractor / Harvester Operator</option>
                  <option value="Mason">Mason / Brick Layer (Raj Mistry)</option>
                  <option value="Electrician">Electrician / Motor Pump Repair</option>
                  <option value="Plumber">Plumber / Pipeline Fitter</option>
                  <option value="CSC Operator">CSC Computer Operator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Years of Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Contact Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-800 text-white font-bold text-xs rounded-xl hover:bg-purple-900"
            >
              Publish to Village Directory
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
