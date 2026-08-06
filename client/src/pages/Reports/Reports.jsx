import React, { useState } from 'react';
import { mockVillageStats } from '../../data/mockData';
import {
  PieChart,
  Download,
  IndianRupee,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Filter,
  Layers,
} from 'lucide-react';
import './Reports.css';

export const ReportsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [filterWard, setFilterWard] = useState('All');

  // Grants & Sources
  const fundSources = [
    { title: '15th Finance Commission Grant', allocated: '₹ 22.00 Lakh', spent: '₹ 16.50 Lakh', share: '48.6%' },
    { title: 'State Finance Commission Fund', allocated: '₹ 12.50 Lakh', spent: '₹ 8.80 Lakh', share: '27.6%' },
    { title: 'MGNREGA Asset Creation Budget', allocated: '₹ 7.20 Lakh', spent: '₹ 4.90 Lakh', share: '15.9%' },
    { title: 'Swachh Bharat Mission (Grameen)', allocated: '₹ 3.50 Lakh', spent: '₹ 1.60 Lakh', share: '7.9%' },
  ];

  // Sector Expenditures
  const sectors = [
    { name: 'Roads & Concrete Drainage Paving', allocated: '₹ 15.00 Lakh', spent: '₹ 12.40 Lakh', progress: 82.6, status: 'On Track' },
    { name: 'Jal Jeevan Tap Water Supply Network', allocated: '₹ 12.00 Lakh', spent: '₹ 9.80 Lakh', progress: 81.6, status: 'Near Completion' },
    { name: 'Solar High-Mast & Streetlight Infrastructure', allocated: '₹ 8.50 Lakh', spent: '₹ 5.20 Lakh', progress: 61.1, status: 'In Progress' },
    { name: 'Primary School Sanitation & Smart Lab', allocated: '₹ 5.00 Lakh', spent: '₹ 3.10 Lakh', progress: 62.0, status: 'In Progress' },
    { name: 'Gram Sabha Hall Infrastructure & CSC Kendra', allocated: '₹ 4.70 Lakh', spent: '₹ 1.30 Lakh', progress: 27.6, status: 'Sanctioned' },
  ];

  // Ward-Wise Financial Allocations
  const wardBudgets = [
    { wardNo: 1, name: 'North School Ward 1', allocated: '₹ 9.5 Lakh', spent: '₹ 7.8 Lakh', activeProjects: 2, officer: 'Surendra Verma', auditStatus: 'Audited & Verified' },
    { wardNo: 2, name: 'Digital Kendra Ward 2', allocated: '₹ 8.2 Lakh', spent: '₹ 6.1 Lakh', activeProjects: 1, officer: 'Sunita Sharma', auditStatus: 'Audited & Verified' },
    { wardNo: 3, name: 'Peepal Chowk Ward 3', allocated: '₹ 10.8 Lakh', spent: '₹ 8.4 Lakh', activeProjects: 3, officer: 'Ramesh Kumar', auditStatus: 'Under Inspection' },
    { wardNo: 4, name: 'Mandi Road Ward 4', allocated: '₹ 11.2 Lakh', spent: '₹ 6.5 Lakh', activeProjects: 2, officer: 'Kailash Patel', auditStatus: 'Audited & Verified' },
    { wardNo: 5, name: 'East Lake Pond Ward 5', allocated: '₹ 5.5 Lakh', spent: '₹ 3.0 Lakh', activeProjects: 1, officer: 'Devendra Meena', auditStatus: 'Audited & Verified' },
  ];

  const filteredWards = wardBudgets.filter(w => filterWard === 'All' || w.wardNo.toString() === filterWard);

  const handleDownloadPDF = () => {
    alert(`Downloading official Gram Panchayat Chandanpura Financial Audit Statement for FY ${selectedYear} (PDF)`);
  };

  const handleExportCSV = () => {
    alert(`Exporting Ward Budget & Expenditure Ledger for FY ${selectedYear} (CSV Sheet)`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg border border-emerald-800/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/60">
              Gram Sabha Public Audit & Transparency
            </span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/40">
              Verified by District Audit Office
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold mt-2 tracking-tight">Gram Panchayat Financial Budget & Expenditure Report</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-2xl leading-relaxed">
            Public financial ledger tracking 100% of government grants, sector allocations, ward-level expenditure, and geo-tagged project completion status in Gram Panchayat Chandanpura.
          </p>
        </div>

        {/* Fiscal Year Selector & Download CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <div className="bg-emerald-950/80 p-1.5 rounded-xl border border-emerald-700/60 flex items-center gap-1">
            <span className="text-xs text-emerald-300 font-bold px-2">FY:</span>
            {['2024-25', '2023-24'].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedYear === yr ? 'bg-emerald-500 text-slate-950 shadow-xs' : 'text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download PDF Audit
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Sanctioned Fund</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{mockVillageStats.panchayatFundTotal}</h3>
            <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              15th Finance & State Grant
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Utilized Amount</p>
            <h3 className="text-2xl font-extrabold text-blue-700 mt-1">{mockVillageStats.panchayatFundSpent}</h3>
            <span className="inline-block mt-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              70.3% Budget Execution Rate
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unspent Balance</p>
            <h3 className="text-2xl font-extrabold text-amber-700 mt-1">₹ 13.40 Lakh</h3>
            <span className="inline-block mt-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
              Reserved for Q4 Works
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700">
            <PieChart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Audited Village Projects</p>
            <h3 className="text-2xl font-extrabold text-purple-700 mt-1">{mockVillageStats.activeProjects} Active</h3>
            <span className="inline-block mt-1 text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-purple-600" /> Geo-Tagged Audit
            </span>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700">
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Fund Sources & Sector Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): Sector Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Sector-Wise Expenditure Breakdown</h3>
                <p className="text-xs text-slate-500 mt-0.5">Financial execution progress across infrastructure, water, and social welfare</p>
              </div>
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export CSV
              </button>
            </div>

            <div className="space-y-4">
              {sectors.map((sec, idx) => (
                <div key={idx} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2.5 hover:border-slate-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-extrabold text-slate-900">{sec.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-700">{sec.spent} spent of <strong className="text-slate-900">{sec.allocated}</strong></span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                        {sec.status}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                      style={{ width: `${sec.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Utilization Rate: <strong className="text-slate-900">{sec.progress}%</strong></span>
                    <span>Remaining Balance: <strong className="text-slate-700">₹ {(parseFloat(sec.allocated.replace(/[^\d.]/g, '')) - parseFloat(sec.spent.replace(/[^\d.]/g, ''))).toFixed(2)} Lakh</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ward-Wise Allocation Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Ward-Wise Budget & Project Allocation</h3>
                <p className="text-xs text-slate-500 mt-0.5">Decentralized budget breakdown for Wards 1 to 5</p>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={filterWard}
                  onChange={(e) => setFilterWard(e.target.value)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                >
                  <option value="All">All Village Wards</option>
                  <option value="1">Ward 1</option>
                  <option value="2">Ward 2</option>
                  <option value="3">Ward 3</option>
                  <option value="4">Ward 4</option>
                  <option value="5">Ward 5</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-3 rounded-l-xl">Ward Name</th>
                    <th className="p-3">Sanctioned</th>
                    <th className="p-3">Utilized</th>
                    <th className="p-3">Projects</th>
                    <th className="p-3">Ward Officer</th>
                    <th className="p-3 rounded-r-xl">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredWards.map((w) => (
                    <tr key={w.wardNo} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-extrabold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        {w.name}
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{w.allocated}</td>
                      <td className="p-3 font-semibold text-emerald-700">{w.spent}</td>
                      <td className="p-3 font-bold text-slate-900">{w.activeProjects} Works</td>
                      <td className="p-3 text-slate-600">{w.officer}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full inline-flex items-center gap-1 ${
                          w.auditStatus.includes('Verified') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" /> {w.auditStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Span 1): Government Grant Sources */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Government Grant Share
            </h3>
            <p className="text-xs text-slate-500">Breakdown of central and state funding sources credited to Gram Panchayat Bank Account.</p>

            <div className="space-y-3 pt-2">
              {fundSources.map((source, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{source.title}</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{source.share}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>Sanctioned: <strong className="text-slate-900">{source.allocated}</strong></span>
                    <span>Utilized: <strong className="text-emerald-700">{source.spent}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Audit Statement Box */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md space-y-3">
            <div className="flex items-center gap-2 text-amber-300">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="font-extrabold text-sm">Gram Sabha Social Audit Certified</h4>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Every expenditure bill and contractor muster roll is audited by the Gram Sabha Social Audit Committee under Section 17 of the Panchayati Raj Act.
            </p>
            <button
              onClick={handleDownloadPDF}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer text-center shadow-xs"
            >
              View Certified Audit Statements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
