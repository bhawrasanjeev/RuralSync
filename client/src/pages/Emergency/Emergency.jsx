import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';
import { mockEmergencyContacts } from '../../data/mockData';
import { Modal } from '../../components/Modal/Modal';
import {
  AlertTriangle,
  PhoneCall,
  MapPin,
  Clock,
  ShieldAlert,
  Ambulance,
  HeartPulse,
  CheckCircle2,
} from 'lucide-react';
import './Emergency.css';

export const EmergencyPage = () => {
  const [contacts, setContacts] = useState(mockEmergencyContacts);
  const [sosTriggered, setSosTriggered] = useState(false);

  // Fetch emergency helplines from backend API
  useEffect(() => {
    const fetchEmergency = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/emergency`);
        if (res.ok) {
          const data = await res.json();
          const list = data.data || data;
          if (Array.isArray(list) && list.length > 0) {
            setContacts(list);
          }
        }
      } catch (err) {
        console.warn('Backend emergency fetch failed, using fallback data:', err.message);
      }
    };

    fetchEmergency();
  }, []);

  const handleSosClick = () => {
    setSosTriggered(true);
  };

  return (
    <div className="space-y-6">
      {/* Big Hero SOS Card */}
      <div className="sos-hero-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-rose-950 text-rose-200 px-3 py-1 rounded-full border border-rose-700/60">
            24x7 Citizen Emergency SOS Network
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">One-Tap Emergency Alert</h2>
          <p className="text-xs text-rose-100 max-w-xl">
            In case of medical emergency, snake bite, fire, or accident, tap the SOS button. It broadcasts your GPS location instantly to 108 Ambulance and Sarpanch Ward Officer.
          </p>
        </div>

        <button onClick={handleSosClick} className="big-sos-btn hover:bg-red-600 transition-all">
          <AlertTriangle className="w-8 h-8 mb-1" />
          <span>TAP SOS</span>
          <span className="text-[10px] font-normal tracking-wide mt-0.5">BROADCAST</span>
        </button>
      </div>

      {/* Emergency Hotline Directory */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-rose-700" />
          24x7 Emergency Helplines & Health Officers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((c) => (
            <div key={c.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase bg-rose-50 text-rose-800 px-2 py-0.5 rounded">
                    {c.category}
                  </span>
                  {c.distanceKm !== undefined && (
                    <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-600" /> {c.distanceKm} km away
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm text-gray-900">{c.name}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{c.role}</p>

                <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> Available: {c.availableHours}
                </div>
              </div>

              <a
                href={`tel:${c.phone}`}
                className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4" /> Call {c.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SOS Broadcast Confirmation Modal */}
      {sosTriggered && (
        <Modal
          isOpen={sosTriggered}
          onClose={() => setSosTriggered(false)}
          title="🚨 Emergency SOS Broadcast Triggered!"
        >
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Ambulance className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">GPS Emergency Alert Sent!</h3>
              <p className="text-xs text-gray-600 mt-1">
                Location: <strong>Ward No. 3, Chandanpura (Lat: 23.2031, Long: 77.0821)</strong>
              </p>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5 text-xs text-rose-950 text-left">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 108 Ambulance Control Room Notified
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ward Member Ramesh Kumar Alerted (+91 98260 12345)
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Primary Health Center Emergency Duty Dispatched
              </div>
            </div>

            <button
              onClick={() => setSosTriggered(false)}
              className="w-full py-3 bg-rose-700 text-white text-xs font-bold rounded-xl"
            >
              Cancel Alert / Dismiss
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
