import { useState } from 'react';
import { RefreshCw, UserPlus, Shield, Mail, RotateCcw, Watch, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import unn_banner from "../assets/unnlogo.jpg";


export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    deviceId: '',
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#eef2ec] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Status bar */}
        <div className="bg-blue-600 text-white text-xs font-semibold tracking-wide py-2 px-4 flex items-center justify-center gap-1.5 rounded-t-xl">
          <RefreshCw size={12} />
          SENTINOA SECURE NODE ACTIVE
        </div>

        <div className="flex items-center justify-center gap-2 bg-[#0e0e0e] py-2">
          <img src={unn_banner} alt="University of Nigeria, Nsukka logo" className="w-5 h-5 object-contain" />
          <span className="text-[11px] text-slate-300 tracking-wide">
    ECE Department, University of Nigeria Nsukka.
          </span>
        </div>

        {/* Header */}
        <div className="bg-[#eef2ec] px-6 pt-6 pb-4 text-center">
          <h1 className="text-2xl font-extrabold text-green-800 tracking-wide">SENTINOA</h1>
          <p className="text-xs text-slate-600 mt-1">
            Ensuring UNN Student Safety
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-8">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <UserPlus className="text-green-600" size={28} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Create an Account</h2>
            <p className="text-xs text-slate-500 mt-1">
              Access your security alert history
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Field
              label="FULL NAME"
              icon={<Shield size={16} className="text-slate-400" />}
              placeholder="Firstname Surname"
              type="text"
              value={formData.fullName}
              onChange={handleChange('fullName')}
            />

            <Field
              label="EMAIL ADDRESS"
              icon={<Mail size={16} className="text-slate-400" />}
              placeholder="name.regno@unn.edu.ng"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
            />

            <Field
              label="PASSWORD"
              icon={<Shield size={16} className="text-slate-400" />}
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
            />

            <Field
              label="CONFIRM"
              icon={<RotateCcw size={16} className="text-slate-400" />}
              placeholder="••••••••"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />

            <Field
              label="UNIQUE DEVICE ID"
              icon={<Watch size={16} className="text-slate-400" />}
              placeholder="GW-XXXX-XXXX"
              type="text"
              value={formData.deviceId}
              onChange={handleChange('deviceId')}
              tooltip="Where's this?"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold text-sm py-3 rounded-lg transition-colors mt-2"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, placeholder, type, value, onChange, tooltip }) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-1.5">
        <label className="text-[11px] font-bold text-slate-700 tracking-wide">
          {label}
        </label>
        {tooltip && (
          <span className="flex items-center gap-0.5 text-[11px] text-slate-400">
            <HelpCircle size={11} />
            {tooltip}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 bg-[#f4f7f2] border border-slate-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-600 focus-within:border-transparent">
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>
    </div>
  );
}
