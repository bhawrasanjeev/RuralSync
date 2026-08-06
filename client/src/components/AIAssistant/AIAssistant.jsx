import React, { useState } from 'react';
import { Bot, X, Send, Mic, MicOff, Sparkles, Volume2 } from 'lucide-react';
import './AIAssistant.css';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'assistant',
      text: 'Ram Ram! I am Gram Mitra (Sarpanch AI). How can I help you today? Ask me about PM-KISAN, Solar Pump Subsidy, MGNREGA work demand, or filing a ward complaint.',
      time: 'Just now',
    },
  ]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = (query) => {
    const textToSend = query || inputText;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!query) setInputText('');

    // Simulate intelligent rural assistant response
    setTimeout(() => {
      let replyText = "For this scheme, you will need your Aadhaar card, Land Khasra/Khatauni copy, and bank passbook. You can submit directly on our 'Government Schemes' page or visit the Panchayat CSC Kendra in Ward 2.";
      const lower = textToSend.toLowerCase();

      if (lower.includes('kisan') || lower.includes('farm') || lower.includes('pm-kisan')) {
        replyText = "PM-KISAN Samman Nidhi provides ₹6,000 yearly in 3 installments. Your next installment of ₹2,000 is approved. Ensure your Aadhaar e-KYC is complete!";
      } else if (lower.includes('water') || lower.includes('pipe') || lower.includes('leak') || lower.includes('complaint')) {
        replyText = "You can log this under 'Complaints & Grievances' section. Select category 'Water Supply', specify your Ward number, and attach a photo. Ward Officer Ramesh Kumar resolves water leaks within 48 hours.";
      } else if (lower.includes('job') || lower.includes('mgnrega') || lower.includes('work')) {
        replyText = "Gram Panchayat has 2 active MGNREGA works right now: Pond Desilting at East Lake (45 openings) and Paved Road Construction in Ward 2. Daily wage rate is ₹243/day.";
      } else if (lower.includes('solar') || lower.includes('pump')) {
        replyText = "Mukhyamantri Solar Pump Subsidy offers up to 90% capital subsidy on 3HP to 7.5HP pumps. Application deadline is 31st August 2025.";
      }

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      speakText(replyText);
    }, 700);
  };

  const toggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        handleSend('How to check my PM-KISAN payment status?');
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ai-floating-trigger"
          aria-label="Ask Gram Mitra AI Assistant"
        >
          <div className="ai-trigger-icon-box">
            <Bot className="w-5 h-5 text-blue-100" />
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1" />
          </div>
          <span className="ai-trigger-label">Gram Mitra AI</span>
          <span className="ai-trigger-badge">Voice</span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="ai-drawer">
          <div className="ai-drawer-header">
            <div className="header-info-box">
              <div className="bot-icon-badge">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="bot-name-title">
                  Gram Mitra Sarpanch AI
                  <span className="bot-pulse-dot"></span>
                </h3>
                <p className="bot-sub-title">Multilingual Panchayat Voice & Text Bot</p>
              </div>
            </div>
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsOpen(false);
              }}
              className="ai-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-msg-bubble ${
                  msg.sender === 'user' ? 'ai-msg-user' : 'ai-msg-assistant'
                }`}
              >
                <p>{msg.text}</p>
                <div className="msg-footer-row">
                  <span>{msg.time}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      className="audio-btn"
                      onClick={() => speakText(msg.text)}
                      title="Listen Voice Audio"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts-bar">
            <button
              onClick={() => handleSend('Check PM-KISAN Status')}
              className="prompt-btn"
            >
              🌾 PM-KISAN Status
            </button>
            <button
              onClick={() => handleSend('Apply for Solar Pump Subsidy')}
              className="prompt-btn"
            >
              ☀️ Solar Pump Scheme
            </button>
            <button
              onClick={() => handleSend('How to log water leakage grievance?')}
              className="prompt-btn"
            >
              💧 File Complaint
            </button>
          </div>

          {/* Input Area */}
          <div className="ai-input-bar">
            <button
              onClick={toggleMic}
              className={`mic-btn ${isRecording ? 'recording' : ''}`}
              title={isRecording ? 'Listening... Speak now' : 'Speak in Hindi / Local Dialect'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={isRecording ? 'Listening to your voice...' : 'Ask in Hindi or English...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="ai-text-input"
            />

            <button
              onClick={() => handleSend()}
              className="send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
