const Notice = require('../models/Notice');
const ApiError = require('../utils/apiError');
const { notices: mockNotices } = require('../data/store');

class NoticeService {
  async getAllNotices(query = {}) {
    const { category, search, pinned } = query;

    if (Notice.db && Notice.db.readyState === 1) {
      let filter = {};
      if (category && category !== 'All') {
        filter.category = category;
      }
      if (pinned) {
        filter.pinnedNotice = true;
      }
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { summary: { $regex: search, $options: 'i' } },
        ];
      }

      return await Notice.find(filter).sort({ pinnedNotice: -1, createdAt: -1 });
    }

    // In-memory fallback
    let list = [...mockNotices];
    if (category && category !== 'All') {
      list = list.filter((n) => n.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)
      );
    }
    return list;
  }

  async createNotice(data) {
    const { title, category, summary, content, department, isImportant, pinnedNotice, issuer } = data;

    if (!title || !summary) {
      throw new ApiError(400, 'Title and Summary are required for notice');
    }

    if (Notice.db && Notice.db.readyState === 1) {
      return await Notice.create({
        title,
        category: category || 'Circular',
        summary,
        content: content || summary,
        department: department || 'Gram Panchayat Office',
        date: new Date().toISOString().split('T')[0],
        isImportant: !!isImportant,
        pinnedNotice: !!pinnedNotice,
        issuer: issuer || 'Panchayat Secretary',
      });
    }

    const newNotice = {
      id: `NOT-${Date.now()}`,
      title,
      category: category || 'Circular',
      date: new Date().toISOString().split('T')[0],
      department: department || 'Gram Panchayat Office',
      summary,
      content: content || summary,
      isImportant: !!isImportant,
      pinnedNotice: !!pinnedNotice,
      fileSize: '1.2 MB PDF',
      issuer: issuer || 'Panchayat Secretary',
    };

    mockNotices.unshift(newNotice);
    return newNotice;
  }
}

module.exports = new NoticeService();
