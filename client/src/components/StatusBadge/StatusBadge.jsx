import React from 'react';
import './StatusBadge.css';

export const StatusBadge = ({ status }) => {
  const getStatusClass = (st) => {
    const s = st.toLowerCase();
    if (s.includes('resolved') || s.includes('approved') || s.includes('verified') || s.includes('eligible')) {
      return 'status-resolved';
    }
    if (s.includes('progress') || s.includes('assigned')) {
      return 'status-in-progress';
    }
    if (s.includes('action') || s.includes('urgent') || s.includes('pending')) {
      return 'status-action-needed';
    }
    return 'status-submitted';
  };

  return <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>;
};
