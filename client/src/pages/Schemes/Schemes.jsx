import React, { useState } from 'react';
import { mockSchemes } from '../../data/mockData';
import { Modal } from '../../components/Modal/Modal';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import {
  FileText,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Upload,
  Download,
  Calendar,
  Building,
  ShieldCheck,
  Check,
} from 'lucide-react';
import './Schemes.css';

export const SchemesPage = () => {
  const [schemes, setSchemes] = useState(mockSchemes);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [applyModalScheme, setApplyModalScheme] = useState(null);
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [appliedSuccessModal, setAppliedSuccessModal] = useState(null);

  // Form State for Application
  const [applicantName, setApplicantName] = useState('Rameshwar Singh Patel');
  const [aadhaarNo, setAadhaarNo] = useState('8890 4921 1102');
  const [mobileNo, setMobileNo] = useState('+91 98932 77102');
  const [khasraNo, setKhasraNo] = useState('142/2 Chandanpura');
  const [bankAccount, setBankAccount] = useState('30981100293 (SBI Sehore)');
  const [step, setStep] = useState(1);

  // Eligibility Tool state
  const [eligLand, setEligLand] = useState('3.5');
  const [eligCategory, setEligCategory] = useState('OBC');
  const [eligIncome, setEligIncome] = useState('Below 1.5 Lakh');
  const [matchedSchemesCount, setMatchedSchemesCount] = useState(null);

  const categories = ['All', 'Agriculture', 'Housing', 'Health', 'Education', 'Financial', 'Employment'];

  const filteredSchemes = schemes.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyModalScheme) return;

    // Update state to reflect applied
    setSchemes((prev) =>
      prev.map((sch) =>
        sch.id === applyModalScheme.id ? { ...sch, status: 'Applied', appliedCount: sch.appliedCount + 1 } : sch
      )
    );

    const schemeName = applyModalScheme.title;
    setApplyModalScheme(null);
    setStep(1);
    setAppliedSuccessModal(schemeName);
  };

  const handleCheckEligibility = () => {
    setMatchedSchemesCount(5);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Eligibility Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-600/50">
            e-Panchayat Scheme Portal
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-2">Government & Panchayat Welfare Schemes</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
            Directly apply for Central, State, and Gram Panchayat subsidies. Transparent tracking and zero middleman fee.
          </p>
        </div>
        <button
          onClick={() => { setMatchedSchemesCount(null); setEligibilityModalOpen(true); }}
          className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <HelpCircle className="w-4 h-4 text-amber-950" />
          Check Smart Eligibility Tool
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="scheme-card">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="scheme-category-badge">{scheme.category}</span>
                {scheme.status && <StatusBadge status={scheme.status} />}
              </div>

              <h3 className="font-bold text-base text-gray-900 leading-snug">{scheme.title}</h3>
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">{scheme.description}</p>

              <div className="mt-4 p-2.5 bg-emerald-50/80 rounded-lg border border-emerald-100 text-xs">
                <span className="font-semibold text-emerald-950 block">Benefit:</span>
                <span className="text-emerald-800 font-bold">{scheme.benefit}</span>
              </div>

              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{scheme.department}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Deadline: <strong>{scheme.deadline}</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedScheme(scheme)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View Details
              </button>

              <button
                onClick={() => { setApplyModalScheme(scheme); setStep(1); }}
                disabled={scheme.status === 'Applied'}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  scheme.status === 'Applied'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                }`}
              >
                {scheme.status === 'Applied' ? 'Application Submitted' : 'Apply Online'}
                {scheme.status !== 'Applied' && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <Modal
          isOpen={!!selectedScheme}
          onClose={() => setSelectedScheme(null)}
          title={selectedScheme.title}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="scheme-category-badge">{selectedScheme.category}</span>
              <span className="text-xs text-gray-500 font-mono">ID: {selectedScheme.id}</span>
            </div>

            <p className="text-sm text-gray-700">{selectedScheme.description}</p>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-xs text-emerald-950 uppercase">Key Benefit</h4>
              <p className="text-sm font-bold text-emerald-800 mt-0.5">{selectedScheme.benefit}</p>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-2">Eligibility Criteria</h4>
              <ul className="space-y-1.5">
                {selectedScheme.eligibility.map((el, i) => (
                  <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-2">Required Documents</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedScheme.documentsRequired.map((doc, i) => (
                  <div key={i} className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 font-medium flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-xs text-gray-500">Department: {selectedScheme.department}</span>
              <button
                onClick={() => {
                  const s = selectedScheme;
                  setSelectedScheme(null);
                  setApplyModalScheme(s);
                  setStep(1);
                }}
                className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800"
              >
                Proceed to Apply
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Step-by-step Application Form Modal */}
      {applyModalScheme && (
        <Modal
          isOpen={!!applyModalScheme}
          onClose={() => setApplyModalScheme(null)}
          title={`Apply Online: ${applyModalScheme.title}`}
        >
          <form onSubmit={handleApplySubmit} className="space-y-4">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 text-xs font-semibold">
              <span className={step >= 1 ? 'text-emerald-800 font-bold' : 'text-gray-400'}>1. Citizen Info</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-emerald-800 font-bold' : 'text-gray-400'}>2. Land & Bank Details</span>
              <span>→</span>
              <span className={step >= 3 ? 'text-emerald-800 font-bold' : 'text-gray-400'}>3. Verification</span>
            </div>

            {step === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Applicant Name</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Aadhaar Number</label>
                    <input
                      type="text"
                      value={aadhaarNo}
                      onChange={(e) => setAadhaarNo(e.target.value)}
                      required
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      required
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 mt-2"
                >
                  Next Step: Bank & Land Info →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Khasra / Khatauni Land Record Reference</label>
                  <input
                    type="text"
                    value={khasraNo}
                    onChange={(e) => setKhasraNo(e.target.value)}
                    required
                    className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Bank Account & IFSC (DBT Linked)</label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    required
                    className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
                <div className="p-3 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center">
                  <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                  <p className="text-xs font-bold text-gray-700">Upload Aadhaar / Land Document Copy</p>
                  <p className="text-[11px] text-gray-500">Auto-fetched from your Digital Locker</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
                  >
                    Next Step: Final Review →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-950">
                  <p><strong>Applicant:</strong> {applicantName}</p>
                  <p><strong>Aadhaar:</strong> {aadhaarNo}</p>
                  <p><strong>Land Ref:</strong> {khasraNo}</p>
                  <p><strong>Bank A/C:</strong> {bankAccount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" required id="consent" className="rounded text-emerald-600 focus:ring-emerald-500" defaultChecked />
                  <label htmlFor="consent" className="text-xs text-gray-600">
                    I declare that all provided land records and Aadhaar details are genuine.
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                  >
                    ← Edit Details
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </form>
        </Modal>
      )}

      {/* Success Receipt Modal */}
      {appliedSuccessModal && (
        <Modal
          isOpen={!!appliedSuccessModal}
          onClose={() => setAppliedSuccessModal(null)}
          title="Application Submitted Successfully!"
        >
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Application Reference: CH-SCH-2025-9921</h3>
              <p className="text-xs text-gray-600 mt-1">
                Your application for <strong>{appliedSuccessModal}</strong> has been forwarded to the Gram Panchayat Secretary for verification.
              </p>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 flex items-center justify-between">
              <span>Status: <strong>Under Panchayat Audit</strong></span>
              <button
                onClick={() => alert("Simulated Receipt PDF Downloaded to device.")}
                className="text-emerald-700 font-bold flex items-center gap-1 hover:underline"
              >
                <Download className="w-4 h-4" /> Download Receipt
              </button>
            </div>
            <button
              onClick={() => setAppliedSuccessModal(null)}
              className="w-full py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl"
            >
              Done
            </button>
          </div>
        </Modal>
      )}

      {/* Eligibility Checker Tool Modal */}
      {eligibilityModalOpen && (
        <Modal
          isOpen={eligibilityModalOpen}
          onClose={() => setEligibilityModalOpen(false)}
          title="Citizen Scheme Eligibility Calculator"
        >
          <div className="space-y-4">
            <p className="text-xs text-gray-600">
              Enter your family details to instantly discover schemes you qualify for.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Land Holding (Acres)</label>
                <input
                  type="number"
                  value={eligLand}
                  onChange={(e) => setEligLand(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Social Category</label>
                <select
                  value={eligCategory}
                  onChange={(e) => setEligCategory(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC/ST">SC / ST</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Annual Family Income</label>
              <select
                value={eligIncome}
                onChange={(e) => setEligIncome(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5"
              >
                <option value="Below 1.5 Lakh">Below ₹1.5 Lakh (BPL)</option>
                <option value="1.5L to 3L">₹1.5 Lakh - ₹3.0 Lakh</option>
                <option value="Above 3L">Above ₹3.0 Lakh</option>
              </select>
            </div>

            <button
              onClick={handleCheckEligibility}
              className="w-full py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
            >
              Calculate Eligible Schemes
            </button>

            {matchedSchemesCount !== null && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <p className="text-xs font-bold text-emerald-950">
                  🎉 Congratulations! You qualify for {matchedSchemesCount} Active Government Schemes!
                </p>
                <p className="text-[11px] text-emerald-800">
                  Includes PM-KISAN (₹6k/yr), PM Gramin Awas Yojana, Solar Pump 90% Subsidy, and Jal Jeevan Tap Connection.
                </p>
                <button
                  onClick={() => setEligibilityModalOpen(false)}
                  className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-lg"
                >
                  View Eligible Schemes
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
