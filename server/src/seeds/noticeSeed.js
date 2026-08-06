const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Notice = require('../models/Notice');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const noticesData = [
  {
    title: 'Special Gram Sabha Meeting: FY2025-26 Annual Village Budget & Water Conservation Plan',
    category: 'Circular',
    summary: 'All ward members and citizens are requested to participate in the Special Independence Day Gram Sabha at Community Hall to review FY2025-26 budget allocation and water pipeline expansion.',
    content: 'Special Gram Sabha notice issued under Panchayati Raj Act. Discussion items include Jal Jeevan tap water pipeline expansion in Ward 3 and 4, Solar high-mast light tenders, and BPL ration card review.',
    department: 'Panchayat Development Committee',
    date: '2025-08-15',
    isImportant: true,
    pinnedNotice: true,
    fileSize: '1.4 MB PDF',
    issuer: 'Panchayat Secretary & Sarpanch',
  },
  {
    title: 'Free Livestock Foot & Mouth Disease (FMD) Vaccination Camp',
    category: 'Health Camp',
    summary: 'Free vaccination for cows, buffaloes, and goats will be conducted at Veterinary Sub-Center Chandanpura. Please bring livestock between 8:00 AM and 2:00 PM.',
    content: 'District Veterinary Department officer Dr. P.K. Mishra will lead the livestock health camp. Anti-rabies and FMD booster doses provided free of cost.',
    department: 'Veterinary Services Dept, Sehore',
    date: '2025-08-10',
    isImportant: true,
    pinnedNotice: false,
    fileSize: '650 KB PDF',
    issuer: 'District Veterinary Officer',
  },
  {
    title: 'Public Tender Notice: Solar High-Mast Light Installation in 6 Wards',
    category: 'Tender',
    summary: 'Sealed tenders are invited from registered electrical contractors for installing 6 nos 12m Solar High Mast light towers across Wards 1 to 5. Submission deadline: 20 Aug 2025.',
    content: 'Detailed specifications and EMD tender documents can be collected from Gram Panchayat Office during working hours.',
    department: 'Panchayat Rural Works Cell',
    date: '2025-08-05',
    isImportant: false,
    pinnedNotice: false,
    fileSize: '2.8 MB PDF',
    issuer: 'Junior Engineer & Sarpanch',
  },
  {
    title: 'Fair Price Shop (Ration Shop) Monthly Grain Distribution Schedule',
    category: 'Ration Distribution',
    summary: 'Wheat (5kg/head) and Rice distribution for August 2025 will commence from 6th Aug to 14th Aug at Shop No. 12 Chandanpura. Bring biometrics.',
    content: 'Antyodaya and Priority Household ration card holders can collect free foodgrains using Aadhaar biometric authentication.',
    department: 'Food & Civil Supplies Dept',
    date: '2025-08-02',
    isImportant: false,
    pinnedNotice: false,
    fileSize: '400 KB PDF',
    issuer: 'Civil Supplies Officer',
  },
];

const seedNotices = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is missing in .env file.');
    }

    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing existing notices collection...');
    await Notice.deleteMany({});

    console.log('[Seed] Inserting production-quality Gram Panchayat Notices...');
    const createdNotices = await Notice.insertMany(noticesData);

    console.log(`[Seed] Success! Successfully inserted ${createdNotices.length} notices into MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed notices:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedNotices();
}

module.exports = { seedNotices, noticesData };
