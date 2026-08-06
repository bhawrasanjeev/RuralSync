const ApiError = require('../utils/apiError');

class AIService {
  /**
   * Process citizen query using Google Gemini API or intelligent rural fallback
   * @param {String} prompt - User query text
   * @param {String} context - Optional citizen context (e.g. Ward No, Name)
   */
  async generateGramMitraResponse(prompt, context = '') {
    if (!prompt || !prompt.trim()) {
      throw new ApiError(400, 'User query prompt is required');
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Use official Gemini REST API / SDK when API key is provided
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      try {
        const systemInstruction = `You are Gram Mitra (Sarpanch AI Assistant), an empathetic, multilingual e-governance assistant for Gram Panchayat Chandanpura, Block Sehore, Madhya Pradesh. Provide helpful, concise advice in simple Hindi, Malvi, or English regarding PM-KISAN, Solar Pump Subsidy, MGNREGA work demand, or Ward public grievances.\n${context ? `Citizen Context: ${context}` : ''}`;

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
                      text: `${systemInstruction}\n\nUser Question: ${prompt}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const textReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (textReply) {
          return {
            reply: textReply,
            model: 'gemini-1.5-flash',
            timestamp: new Date().toISOString(),
          };
        }
      } catch (err) {
        console.warn('[Gemini API Connection Error]:', err.message);
      }
    }

    // Intelligent Fallback Rural Rules Engine if Gemini API Key is missing or offline
    let fallbackText =
      "Ram Ram! For this service, you will need your Aadhaar card, Land Khasra copy, and bank passbook. You can submit directly on RuralSync or visit the Panchayat CSC Kendra in Ward 2.";

    const queryLower = prompt.toLowerCase();

    if (queryLower.includes('kisan') || queryLower.includes('farm') || queryLower.includes('pm-kisan')) {
      fallbackText =
        "PM-KISAN Samman Nidhi provides ₹6,000 yearly in 3 installments. Your next installment of ₹2,000 is approved. Ensure your Aadhaar e-KYC is complete!";
    } else if (queryLower.includes('water') || queryLower.includes('pipe') || queryLower.includes('leak') || queryLower.includes('complaint')) {
      fallbackText =
        "Log this under 'Complaints & Grievances' section. Select category 'Water Supply', specify your Ward number, and attach a photo. Ward Officer resolves water leaks within 48 hours.";
    } else if (queryLower.includes('job') || queryLower.includes('mgnrega') || queryLower.includes('work')) {
      fallbackText =
        "Gram Panchayat has active MGNREGA works right now: Pond Desilting at East Lake (45 openings) and Paved Road Construction in Ward 2. Daily wage rate is ₹243/day.";
    } else if (queryLower.includes('solar') || queryLower.includes('pump')) {
      fallbackText =
        "Mukhyamantri Solar Pump Subsidy offers up to 90% capital subsidy on 3HP to 7.5HP pumps. Application deadline is 31st August 2025.";
    }

    return {
      reply: fallbackText,
      model: 'gram-mitra-rural-engine',
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = new AIService();
