const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
  const { prompt, message } = req.body;
  const userQuery = prompt || message || '';

  if (!userQuery.trim()) {
    return res.status(400).json({ message: 'Query prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Gram Mitra (Sarpanch AI Assistant), a helpful e-governance assistant for Gram Panchayat Chandanpura, Block Sehore. Respond concisely in simple English or Hindi about PM-KISAN, Solar Pump Subsidy, MGNREGA jobs, or Ward complaints.\nUser Query: ${userQuery}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Gram Mitra AI: For PM-KISAN or Solar Pump subsidy applications, visit the 'Government Schemes' page or visit CSC Kendra in Ward 2.";

      return res.json({ reply, source: 'gemini-api' });
    } catch (err) {
      console.warn('Gemini API call error, using rural assistant fallback:', err.message);
    }
  }

  let replyText =
    "Ram Ram! For this service, you will need your Aadhaar card, Land Khasra copy, and bank passbook. You can submit directly on RuralSync or visit the Panchayat CSC Kendra.";
  const lower = userQuery.toLowerCase();

  if (lower.includes('kisan') || lower.includes('farm') || lower.includes('pm-kisan')) {
    replyText =
      "PM-KISAN Samman Nidhi provides ₹6,000 yearly in 3 installments. Your next installment of ₹2,000 is approved. Ensure your Aadhaar e-KYC is complete!";
  } else if (lower.includes('water') || lower.includes('pipe') || lower.includes('leak') || lower.includes('complaint')) {
    replyText =
      "Log this under 'Complaints & Grievances' section. Select category 'Water Supply', specify your Ward number, and attach a photo. Ward Officer resolves water leaks within 48 hours.";
  } else if (lower.includes('job') || lower.includes('mgnrega') || lower.includes('work')) {
    replyText =
      "Gram Panchayat has active MGNREGA works right now: Pond Desilting at East Lake (45 openings) and Paved Road Construction in Ward 2. Daily wage rate is ₹243/day.";
  } else if (lower.includes('solar') || lower.includes('pump')) {
    replyText =
      "Mukhyamantri Solar Pump Subsidy offers up to 90% capital subsidy on 3HP to 7.5HP pumps. Application deadline is 31st August 2025.";
  }

  res.json({ reply: replyText, source: 'gram-mitra-fallback' });
});

module.exports = router;
