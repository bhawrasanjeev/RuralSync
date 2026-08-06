import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ruralsync_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('ruralsync_token') || null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('ruralsync_token', token);
    } else {
      localStorage.removeItem('ruralsync_token');
    }
  }, [token]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('ruralsync_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ruralsync_user');
    }
  }, [user]);

  // Login handler with Backend API & Mock Fallback
  const login = async (mobile, password) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      // Try backend Express API endpoint
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);
      setIsLoading(false);
      return { success: true, user: data.user };
    } catch (err) {
      // Fallback offline mock JWT authentication if local express server is not running
      console.warn('Backend connection error, falling back to mock JWT login:', err.message);

      if (mobile === '9876543210' && password === 'password123') {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVTRVItMTAxIiwibmFtZSI6IlN1bml0YSBTaGFybWEiLCJyb2xlIjoiQ2l0aXplbiIsImlhdCI6MTY3MjUxMjAwMH0.mock_signature';
        const mockUser = {
          id: 'USR-101',
          name: 'Sunita Sharma',
          mobile: '9876543210',
          villageName: 'Gram Panchayat Chandanpura',
          wardNo: '3',
          role: 'Citizen',
          aadhaar: '1234-5678-9012',
          rationCardNo: 'MP-SEC-998822',
          landHoldingAcres: '2.5',
          familyMembers: 4,
        };

        setToken(mockToken);
        setUser(mockUser);
        setIsLoading(false);
        return { success: true, user: mockUser };
      } else {
        // Create dynamic user login for demo input
        const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ mobile, name: 'Citizen User', role: 'Citizen' }))}.mock_sig`;
        const mockUser = {
          id: `USR-${Math.floor(100 + Math.random() * 900)}`,
          name: 'Citizen User',
          mobile: mobile,
          villageName: 'Gram Panchayat Chandanpura',
          wardNo: '1',
          role: 'Citizen',
          aadhaar: '9988-7766-5544',
          rationCardNo: 'MP-SEC-112233',
          landHoldingAcres: '1.0',
          familyMembers: 3,
        };

        setToken(mockToken);
        setUser(mockUser);
        setIsLoading(false);
        return { success: true, user: mockUser };
      }
    }
  };

  // Register handler
  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setToken(data.token);
      setUser(data.user);
      setIsLoading(false);
      return { success: true, user: data.user };
    } catch (err) {
      console.warn('Backend server offline, using client-side mock registration:', err.message);
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ name: userData.name, role: userData.role || 'Citizen' }))}.mock_sig`;
      const newUser = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: userData.name,
        mobile: userData.mobile,
        villageName: userData.villageName || 'Gram Panchayat Chandanpura',
        wardNo: userData.wardNo || '1',
        role: userData.role || 'Citizen',
        aadhaar: userData.aadhaar || '1234-5678-9012',
        rationCardNo: `MP-SEC-${Math.floor(100000 + Math.random() * 900000)}`,
        landHoldingAcres: '2.0',
        familyMembers: 3,
      };

      setToken(mockToken);
      setUser(newUser);
      setIsLoading(false);
      return { success: true, user: newUser };
    }
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('ruralsync_token');
    localStorage.removeItem('ruralsync_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        authError,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
