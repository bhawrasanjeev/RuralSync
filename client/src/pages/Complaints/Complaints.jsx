import React, { useState } from 'react';
import { mockComplaints } from '../../data/mockData';
import { Modal } from '../../components/Modal/Modal';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import {
  AlertCircle,
  PlusCircle,
  ThumbsUp,
  MapPin,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  Camera,
  Star,
  Check,
} from 'lucide-react';
import './Complaints.css';

export const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [filterTab, setFilterTab] = useState('All');
  const [newComplaintModalOpen, setNewComplaintModalOpen] = useState(false);
  const [activeTimelineComplaint, setActiveTimelineComplaint] = useState(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Water Supply');
  const [wardNo, setWardNo] = useState(3);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');

  const filteredComplaints = complaints.filter((c) => {
    if (filterTab === 'Active') return c.status !== 'Resolved';
    if (filterTab === 'Resolved') return c.status === 'Resolved';
    return true;
  });

  const handleUpvote = (id) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const userUpvoted = !c.userUpvoted;
          return {
            ...c,
            userUpvoted,
            upvotes: userUpvoted ? c.upvotes + 1 : c.upvotes - 1,
          };
        }
        return c;
      })
    );
  };

  const handleCreateComplaint = (e) => {
    e.preventDefault();
    const newId = `CMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id: newId,
      ticketNo: `CH-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      description,
      location: location || `Ward No. ${wardNo}, Chandanpura`,
      wardNo,
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      assignedTo: 'Pending Ward Officer Allocation',
      priority,
      upvotes: 1,
      userUpvoted: true,
      timeline: [
        {
          stage: 'Grievance Registered',
          date: new Date().toLocaleString(),
          description: 'Grievance submitted via RuralSync portal with GPS verification.',
          completed: true,
        },
        {
          stage: 'Ward Officer Review',
          date: 'Pending',
          description: 'Awaiting Sarpanch / Ward Member assignment.',
          completed: false,
        },
      ],
    };

    setComplaints([newTicket, ...complaints]);
    setNewComplaintModalOpen(false);
    // Reset
    setTitle('');
    setDescription('');
    setLocation('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-950 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-amber-800/40">
        <div>
          <span className="text-xs font-bold tracking-wider text-amber-300 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-700/50 uppercase">
            Panchayat Public Audit
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-2">Public Grievance & Infrastructure Redressal</h2>
          <p className="text-xs text-amber-100 mt-1 max-w-xl">
            Report broken streetlights, water pipeline leaks, road potholes, or pension delays directly to your Ward Member.
          </p>
        </div>
        <button
          onClick={() => setNewComplaintModalOpen(true)}
          className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 text-amber-950" />
          File New Grievance
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2">
          {['All', 'Active', 'Resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterTab === tab
                  ? 'bg-amber-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'All' ? 'All Grievances' : tab === 'Active' ? 'Active Issues' : 'Resolved Audits'}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 font-medium hidden sm:inline">
          Showing {filteredComplaints.length} tickets
        </span>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((cmp) => (
          <div key={cmp.id} className="complaint-card">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                    {cmp.ticketNo}
                  </span>
                  <StatusBadge status={cmp.status} />
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {cmp.category}
                  </span>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    {cmp.priority} Priority
                  </span>
                </div>

                <h3 className="font-bold text-base text-gray-900">{cmp.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{cmp.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{cmp.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Submitted: {cmp.dateSubmitted}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>Incharge: <strong>{cmp.assignedTo}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                {/* Community Upvote Button */}
                <button
                  onClick={() => handleUpvote(cmp.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    cmp.userUpvoted
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="Community support count"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${cmp.userUpvoted ? 'fill-amber-700 text-amber-700' : ''}`} />
                  <span>{cmp.upvotes} Citizens Affected</span>
                </button>

                <button
                  onClick={() => setActiveTimelineComplaint(cmp)}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                >
                  <Clock className="w-3.5 h-3.5" /> Track Inspection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit New Complaint Modal */}
      {newComplaintModalOpen && (
        <Modal
          isOpen={newComplaintModalOpen}
          onClose={() => setNewComplaintModalOpen(false)}
          title="File a Public Grievance / Infrastructure Complaint"
        >
          <form onSubmit={handleCreateComplaint} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Issue Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Broken Handpump near Ward 2 Community Well"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                >
                  <option value="Water Supply">Water Supply & Pipeline</option>
                  <option value="Electricity">Electricity & Streetlight</option>
                  <option value="Roads & Infrastructure">Roads & Drainage</option>
                  <option value="Sanitation">Sanitation & Garbage</option>
                  <option value="Pension & Subsidy">Pension & Financial</option>
                  <option value="Health">Health Center / PHC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Ward Number</label>
                <select
                  value={wardNo}
                  onChange={(e) => setWardNo(Number(e.target.value))}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                >
                  {[1, 2, 3, 4, 5, 6].map((w) => (
                    <option key={w} value={w}>Ward No. {w}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Landmark / Location</label>
                <input
                  type="text"
                  placeholder="Near Peepal Chowk, Ward 3"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Urgency Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent / Hazard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Description</label>
              <textarea
                required
                rows={3}
                placeholder="Describe the defect, when it started, and impact on residents..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="p-3 bg-amber-50 border border-dashed border-amber-300 rounded-xl text-center cursor-pointer">
              <Camera className="w-5 h-5 mx-auto text-amber-700 mb-1" />
              <p className="text-xs font-bold text-amber-900">Attach Photo Proof / Defect Image</p>
              <p className="text-[11px] text-amber-700">GPS location tag automatically embedded</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-700 text-white font-bold text-xs rounded-xl hover:bg-amber-800"
            >
              Submit Grievance Ticket
            </button>
          </form>
        </Modal>
      )}

      {/* Timeline Tracking Modal */}
      {activeTimelineComplaint && (
        <Modal
          isOpen={!!activeTimelineComplaint}
          onClose={() => setActiveTimelineComplaint(null)}
          title={`Inspection Timeline: Ticket ${activeTimelineComplaint.ticketNo}`}
        >
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-sm text-gray-900">{activeTimelineComplaint.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{activeTimelineComplaint.description}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span>Category: <strong>{activeTimelineComplaint.category}</strong></span>
                <span>Ward: <strong>No. {activeTimelineComplaint.wardNo}</strong></span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="relative pl-6 space-y-4 my-4">
              <div className="timeline-step-line"></div>

              {activeTimelineComplaint.timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 shrink-0 z-10 bg-white ${
                      step.completed
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {step.completed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <h5 className={`text-xs font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.stage}
                    </h5>
                    <p className="text-[11px] text-gray-500">{step.description}</p>
                    <span className="text-[10px] text-emerald-800 font-mono font-medium">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {activeTimelineComplaint.status === 'Resolved' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <p className="text-xs font-bold text-emerald-950">Issue Resolved & Audited!</p>
                <div className="flex justify-center gap-1 mt-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <p className="text-[11px] text-emerald-800 mt-1">Citizen Feedback Rating: 5/5 Stars</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
