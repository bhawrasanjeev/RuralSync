// RuralSync In-Memory Store & Mock Database

const villageStats = {
  villageName: 'Gram Panchayat Chandanpura',
  block: 'Sehore',
  district: 'Sehore',
  state: 'Madhya Pradesh',
  population: 3450,
  activeSchemes: 18,
  schemesEnrolled: 1240,
  grievancesResolvedRate: 94.2,
  mgnregaWorkers: 420,
  activeProjects: 8,
  panchayatFundTotal: '₹ 45.2 Lakh',
  panchayatFundSpent: '₹ 31.8 Lakh',
};

let users = [
  {
    id: 'USR-101',
    name: 'Sunita Sharma',
    mobile: '9876543210',
    aadhaar: '1234-5678-9012',
    villageName: 'Gram Panchayat Chandanpura',
    wardNo: '3',
    role: 'Citizen',
    password: 'password123',
    rationCardNo: 'MP-SEC-998822',
    landHoldingAcres: '2.5',
    familyMembers: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'USR-102',
    name: 'Ramesh Kumar',
    mobile: '9826012345',
    aadhaar: '9876-5432-1098',
    villageName: 'Gram Panchayat Chandanpura',
    wardNo: '3',
    role: 'Ward Member',
    password: 'password123',
    rationCardNo: 'MP-SEC-776655',
    landHoldingAcres: '5.0',
    familyMembers: 5,
    createdAt: new Date().toISOString(),
  },
];

const schemes = [
  {
    id: 'SCH-001',
    title: 'PM-KISAN Samman Nidhi Yojana',
    category: 'Agriculture',
    description: 'Financial assistance of ₹6,000 per year provided in three equal installments to landholding farmer families.',
    benefit: '₹6,000 / year direct bank transfer',
    eligibility: ['Small and marginal landholding farmers', 'Valid Aadhaar & Khasra land record', 'Active bank account linked with Aadhaar'],
    deadline: '2025-09-30',
    department: 'Ministry of Agriculture & Farmers Welfare',
    documentsRequired: ['Aadhaar Card', 'Land Khasra/Khatauni Copy', 'Bank Passbook Photo', 'Mobile Number'],
    appliedCount: 432,
    status: 'Approved',
    featured: true,
  },
  {
    id: 'SCH-002',
    title: 'PM Gramin Awas Yojana (PMAY-G)',
    category: 'Housing',
    description: 'Provides financial aid for constructing permanent pucca house with basic amenities like toilet and clean water.',
    benefit: '₹1,200,000 financial grant + 90 days MGNREGA wages',
    eligibility: ['Kutcha or dilapidated house owners', 'BPL Card holder family', 'Landless agricultural labor'],
    deadline: '2025-10-15',
    department: 'Ministry of Rural Development',
    documentsRequired: ['BPL Ration Card', 'Income Certificate', 'Existing House Photo', 'Aadhaar Card'],
    appliedCount: 184,
    status: 'Eligible',
    featured: true,
  },
  {
    id: 'SCH-003',
    title: 'Mukhyamantri Solar Pump Subsidy Scheme',
    category: 'Agriculture',
    description: '90% subsidy on installation of 3HP to 7.5HP off-grid solar irrigation pumps for small farmers.',
    benefit: 'Up to 90% capital subsidy on Solar Pump',
    eligibility: ['Landholding farmer with source of tube-well or farm pond', 'No prior electricity connection subsidy availed'],
    deadline: '2025-08-31',
    department: 'Renewable Energy Department & Agri Commission',
    documentsRequired: ['Land Ownership Proof', 'Water Source Verification Letter', 'Aadhaar Card'],
    appliedCount: 96,
    status: 'Eligible',
    featured: true,
  },
];

let complaints = [
  {
    id: 'CMP-1092',
    ticketNo: 'CH-2025-1092',
    title: 'Main Canal Water Pipeline Leakage in Ward 3',
    category: 'Water Supply',
    description: 'Major water leakage from supply pipe near Banyan tree. Causing waterlogging on main road and wastage of drinking water.',
    location: 'Near Peepal Chowk, Ward No. 3',
    wardNo: 3,
    dateSubmitted: '2025-08-01',
    status: 'In Progress',
    assignedTo: 'Ramesh Kumar (Ward Member & Jal Mitr)',
    priority: 'High',
    upvotes: 24,
    userUpvoted: true,
  },
];

const jobs = [
  {
    id: 'JOB-201',
    title: 'Junior Civil Engineer (Panchayat Roads)',
    department: 'Panchayat Rural Works Department',
    location: 'Panchayat Bhavan Chandanpura',
    salary: '₹25,000/month',
    type: 'Contractual (1 Year)',
    vacancies: 2,
    qualifications: ['Diploma or Degree in Civil Engineering', 'Knowledge of rural road survey'],
    deadline: '2025-08-25',
  },
  {
    id: 'JOB-202',
    title: 'MGNREGA Pond Desilting Labor Work',
    department: 'MGNREGA Rural Employment Cell',
    location: 'East Lake Pond Site, Ward 4',
    salary: '₹243/day (Govt Wage Rate)',
    type: 'Daily Wage Work (100 Days Guarantee)',
    vacancies: 45,
    qualifications: ['Active Job Card Holder', 'Ward Resident'],
    deadline: 'Immediate Joining',
  },
];

const notices = [
  {
    id: 'NOT-301',
    title: 'Monsoon Vector-Borne Disease Prevention Spraying',
    category: 'Health Alert',
    date: '2025-08-05',
    urgent: true,
    content: 'Fogging and anti-larval spraying will take place in Wards 1 to 5 from Monday to Wednesday 8:00 AM.',
    issuer: 'District Health Officer & Sarpanch',
  },
];

const emergencyHelplines = [
  { name: 'Ambulance Emergency', number: '108', desc: 'Dist Hospital Emergency Dispatch' },
  { name: 'Police Helpline', number: '112', desc: 'Police Control Room' },
  { name: 'Kisan Call Center', number: '1800-180-1551', desc: 'Agri Advisory 24x7' },
];

module.exports = {
  villageStats,
  users,
  schemes,
  complaints,
  jobs,
  notices,
  emergencyHelplines,
};
