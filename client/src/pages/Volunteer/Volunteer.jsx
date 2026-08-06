import React, { useState } from 'react';
import { mockVolunteerEvents } from '../../data/mockData';
import { Modal } from '../../components/Modal/Modal';
import { Users, Award, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import './Volunteer.css';

export const VolunteerPage = () => {
  const [events, setEvents] = useState(mockVolunteerEvents);
  const [signedUpEvent, setSignedUpEvent] = useState(null);

  const handleJoinDrive = (event) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === event.id ? { ...ev, joinedCount: ev.joinedCount + 1 } : ev
      )
    );
    setSignedUpEvent(event);
  };

  return (
    <div className="space-y-6">
      {/* Top Hero */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-700">
            Chandanpura Youth Corps
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-2">Gram Seva Volunteer Drives</h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xl">
            Join hands with fellow youth for cleanliness drives, tree plantations, and digital literacy. Earn official e-Panchayat Volunteer Certificates!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-950/80 p-3 rounded-xl border border-emerald-700">
          <Award className="w-8 h-8 text-amber-300 shrink-0" />
          <div className="text-xs">
            <span className="text-emerald-300 block">Citizen Karma Points</span>
            <strong className="text-base text-white">125 Points Earned</strong>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {events.map((ev) => {
          const progressPercent = Math.min(100, Math.round((ev.joinedCount / ev.targetCount) * 100));

          return (
            <div key={ev.id} className="volunteer-card flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                    {ev.category}
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> {ev.pointsBadge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-gray-900">{ev.title}</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{ev.description}</p>

                <div className="space-y-1 mt-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Date: <strong>{ev.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{ev.location}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                    <span>Volunteers Registered</span>
                    <span>{ev.joinedCount} / {ev.targetCount} ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleJoinDrive(ev)}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                Sign Up as Volunteer
              </button>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {signedUpEvent && (
        <Modal
          isOpen={!!signedUpEvent}
          onClose={() => setSignedUpEvent(null)}
          title="Volunteer Registration Confirmed! 🎉"
        >
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Registered for {signedUpEvent.title}</h3>
              <p className="text-xs text-gray-600 mt-1">
                Thank you, Rameshwar Patel! Your name has been added to the Ward 3 Youth Corps roster.
              </p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 font-bold">
              🎁 Earned: {signedUpEvent.pointsBadge} upon attendance verification!
            </div>

            <button
              onClick={() => setSignedUpEvent(null)}
              className="w-full py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl"
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
