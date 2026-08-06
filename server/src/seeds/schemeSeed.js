const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Scheme = require('../models/Scheme');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const schemesData = [
  {
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    category: 'Agriculture',
    shortDescription:
      'Direct income support of ₹6,000 per year provided in three equal installments to all landholding farmer families across India.',
    eligibility: [
      'Small and marginal landholding farmer families',
      'Valid Aadhaar linked with active bank account',
      'Verified land ownership record (Khasra/Khatauni in state land portal)',
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land Khasra/Khatauni Certificate Copy',
      'Bank Account Passbook Copy',
      'Active Mobile Number linked with Aadhaar',
    ],
    benefits:
      'Direct Benefit Transfer (DBT) of ₹6,000 annually paid in 3 equal installments of ₹2,000 directly into farmer bank accounts.',
    officialLink: 'https://pmkisan.gov.in',
    applyMode: 'Online',
    status: 'Active',
    lastUpdated: new Date('2025-08-01'),
  },
  {
    title: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    category: 'Housing',
    shortDescription:
      'Financial grant assistance to homeless and rural families living in kutcha or dilapidated houses for constructing permanent pucca homes with toilets.',
    eligibility: [
      'Families living in zero, one, or two-room kutcha houses as per SECC 2011 data',
      'BPL Card holder families without a permanent pucca house',
      'Landless agricultural laborers and marginalized rural households',
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'BPL Ration Card / SECC Household Registration Slip',
      'Bank Account Passbook Photo',
      'Existing Kutcha House Photograph with Geo-tagging',
      'MGNREGA Job Card Number',
    ],
    benefits:
      'Financial assistance grant of ₹1,200,000 in plains (₹1,30,000 in hilly areas) + 90 days MGNREGA unskilled labor wages + ₹12,000 Swachh Bharat toilet construction grant.',
    officialLink: 'https://pmayg.nic.in',
    applyMode: 'Hybrid',
    status: 'Active',
    lastUpdated: new Date('2025-07-25'),
  },
  {
    title: 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM)',
    category: 'Clean Energy',
    shortDescription:
      'Capital subsidy scheme providing up to 90% financial aid for installing off-grid solar irrigation pumps for small farmers.',
    eligibility: [
      'Individual farmers, Water User Associations, and Farmer Producer Organizations (FPOs)',
      'Landholding farmer with access to tube-well, open well, or farm pond',
      'Farmers without existing grid-powered electricity agricultural connection',
    ],
    requiredDocuments: [
      'Land Ownership Proof (Rin Pustika / Khasra Copy)',
      'Water Source Availability Verification Certificate from Sarpanch/Panchayat Secretary',
      'Applicant Aadhaar Card',
      'Bank Passbook Copy',
    ],
    benefits:
      'Up to 90% capital subsidy (60% combined Central & State Government grant + 30% bank loan) on 3HP to 7.5HP off-grid solar water pumps.',
    officialLink: 'https://pmkusum.mnre.gov.in',
    applyMode: 'Online',
    status: 'Active',
    lastUpdated: new Date('2025-07-30'),
  },
  {
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    category: 'Health',
    shortDescription:
      'National health protection scheme providing cashless inpatient medical treatment coverage up to ₹5 Lakh per family annually across empaneled hospitals.',
    eligibility: [
      'Rural households listed in SECC 2011 database',
      'Active BPL Ration Card holding families',
      'Rural families with disabled members or no male adult earning members',
    ],
    requiredDocuments: [
      'Ayushman Bharat Card / Family Ration Card',
      'Aadhaar Card of all family members',
      'Active Mobile Number',
    ],
    benefits:
      'Free cashless healthcare insurance coverage up to ₹5,00,000 per family per year for secondary and tertiary hospitalization across empaneled government and private hospitals.',
    officialLink: 'https://pmjay.gov.in',
    applyMode: 'Online',
    status: 'Active',
    lastUpdated: new Date('2025-08-02'),
  },
  {
    title: 'PM SVANidhi Scheme (Pradhan Mantri Street Vendor’s AtmaNirbhar Nidhi)',
    category: 'Financial Inclusion',
    shortDescription:
      'Micro-credit financial assistance program offering collateral-free working capital loans for rural artisans, micro-traders, and vendors.',
    eligibility: [
      'Rural vendors, micro-traders, and artisans possessing Vending Certificate or endorsement letter',
      'Vendors engaged in vending activities on or before March 24, 2020',
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Vending Certificate / Gram Panchayat Endorsement Letter',
      'Bank Account Details linked with Mobile Number',
    ],
    benefits:
      'Collateral-free working capital loan starting from ₹10,000 up to ₹50,000 with 7% annual interest subvention subsidy and cashback incentives on digital transactions.',
    officialLink: 'https://pmsvanidhi.mohua.gov.in',
    applyMode: 'Online',
    status: 'Active',
    lastUpdated: new Date('2025-07-15'),
  },
  {
    title: 'Lakhpati Didi Scheme (NRLM Micro-Enterprise Drive)',
    category: 'Women & Child',
    shortDescription:
      'National skill training and credit linkage program empowering rural women in Self-Help Groups (SHGs) to earn at least ₹1 Lakh annual income.',
    eligibility: [
      'Active members of Day-NRLM registered Self-Help Groups (SHGs)',
      'Rural women residents aiming to establish micro-enterprises in agriculture, livestock, tailoring, or solar assembly',
    ],
    requiredDocuments: [
      'SHG Member Passbook / Registration ID',
      'Aadhaar Card of Applicant',
      'Bank Account Passbook',
      'Passport Size Photograph',
    ],
    benefits:
      'Financial credit linkage up to ₹5,00,000 without collateral, technical vocational skill training, drone operation certification, and market access linkage.',
    officialLink: 'https://nrlm.gov.in',
    applyMode: 'Offline',
    status: 'Active',
    lastUpdated: new Date('2025-08-03'),
  },
  {
    title: 'Pradhan Mantri Ujjwala Yojana (PMUY 2.0)',
    category: 'Social Welfare',
    shortDescription:
      'Deposit-free clean LPG cooking gas connection scheme for adult women belonging to low-income rural households.',
    eligibility: [
      'Adult woman belonging to SC, ST, PMAY, Antyodaya Anna Yojana (AAY), or BPL rural households',
      'No existing LPG connection in the same household',
    ],
    requiredDocuments: [
      'Aadhaar Card of Applicant & all adult family members',
      'BPL Ration Card / Family Composition Certificate',
      'Bank Passbook linked with Aadhaar for targeted subsidy credit',
    ],
    benefits:
      'Free deposit-free LPG gas connection + free first LPG cylinder refill + hotplate stove free of cost.',
    officialLink: 'https://www.pmuy.gov.in',
    applyMode: 'Hybrid',
    status: 'Active',
    lastUpdated: new Date('2025-07-28'),
  },
];

const seedSchemes = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is missing in .env file.');
    }

    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing existing schemes collection...');
    await Scheme.deleteMany({});

    console.log('[Seed] Inserting 7 realistic Government Schemes...');
    const createdSchemes = await Scheme.insertMany(schemesData);

    console.log(`[Seed] Success! Successfully inserted ${createdSchemes.length} schemes into MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed schemes:', error.message);
    process.exit(1);
  }
};

// Execute seed script if run directly from CLI
if (require.main === module) {
  seedSchemes();
}

module.exports = { seedSchemes, schemesData };
