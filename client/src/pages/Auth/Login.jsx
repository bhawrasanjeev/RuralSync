import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RuralSyncLogo } from '../../components/Logo/RuralSyncLogo';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import './Auth.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [activeTab, setActiveTab] = useState('password'); // 'password' or 'otp'
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto-fill demo credentials
  const fillDemoUser = () => {
    setMobile('9876543210');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!mobile.trim()) {
      setErrorMsg('Please enter your registered Mobile Number or Aadhaar');
      return;
    }

    if (activeTab === 'password' && !password.trim()) {
      setErrorMsg('Please enter your account password');
      return;
    }

    if (activeTab === 'otp' && !otpSent) {
      setOtpSent(true);
      setSuccessMsg('OTP sent to your registered mobile number: 9876****10');
      return;
    }

    const res = await login(mobile, activeTab === 'password' ? password : 'password123');
    if (res.success) {
      setSuccessMsg('Login Successful! Redirecting to Citizen Portal...');
      setTimeout(() => {
        navigate('/');
      }, 800);
    } else {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side Graphic Panel */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-8 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          {/* Subtle Background Glow Circles */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <RuralSyncLogo size="lg" showText={false} />
            <div className="mt-4">
              <h2 className="text-2xl font-extrabold tracking-tight">Rural<span className="text-blue-300">Sync</span></h2>
              <p className="text-xs text-blue-200 uppercase tracking-widest font-bold mt-0.5">Citizen & Sarpanch Portal</p>
            </div>
          </div>

          <div className="relative z-10 space-y-4 my-8">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-1">
                <Sparkles className="w-4 h-4" />
                <span>e-Governance Security</span>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Secure Authentication token authorization linked with Gram Panchayat Chandanpura portal.
              </p>
            </div>

            <div className="space-y-2 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct PM-KISAN & MGNREGA Job Claim</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>24x7 Ward Complaint Grievance Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>e-KYC Verified Digital Khatauni Records</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Digital India Compliant</span>
            </span>
            <span className="font-mono text-[11px]">v2.4</span>
          </div>
        </div>

        {/* Right Side Login Form */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Citizen Sign In</h2>
                <p className="text-xs text-slate-500 mt-1">Enter your credentials to access services</p>
              </div>
              <div className="md:hidden">
                <RuralSyncLogo size="sm" showText={false} />
              </div>
            </div>

            {/* Login Tab Switcher */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setActiveTab('password'); setErrorMsg(''); }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  activeTab === 'password'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('otp'); setErrorMsg(''); }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  activeTab === 'otp'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                OTP Instant Login
              </button>
            </div>

            {/* Error / Success Banners */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile / Aadhaar Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile Number / Aadhaar Card
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. 9876543210 or Aadhaar No"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field (for Password Tab) */}
              {activeTab === 'password' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">Password</label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered mobile number!'); }} className="text-xs text-blue-600 hover:underline font-semibold">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Field (for OTP Tab) */}
              {activeTab === 'otp' && otpSent && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Enter 6-Digit OTP</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. 543210"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      maxLength={6}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold tracking-widest text-slate-800 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span>Remember this device</span>
                </label>

                {/* Auto Fill Demo Button */}
                <button
                  type="button"
                  onClick={fillDemoUser}
                  className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors"
                >
                  ⚡ Auto-Fill Demo User
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{activeTab === 'otp' && !otpSent ? 'Send OTP' : 'Sign In with Auth'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Signup Prompt */}
          <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-500 mt-6">
            New citizen to RuralSync?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-600 font-extrabold hover:underline cursor-pointer"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
