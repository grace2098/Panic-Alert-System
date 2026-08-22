import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import sentinoa_logo from "../assets/sentinoalogo.png";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log('Login submitted:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="bg-[#eef2ec] rounded-t-2xl px-6 pt-8 pb-4 text-center">
          <div className="flex justify-center mb-3">
            <img src={sentinoa_logo} alt="Sentinoa Logo" className="w-12 h-12 rounded-xl object-cover" />
          </div>
          <h1 className="text-2xl font-extrabold text-green-800 tracking-wide">SENTINOA</h1>
          <p className="text-xs text-slate-600 mt-1">UNN Security Device Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-b-2xl shadow-md px-6 pt-8 pb-6">
          <div className="space-y-4">
            <Field
              label="School Email"
              icon={<Mail size={16} className="text-slate-400" />}
              placeholder="name.regno@unn.edu.ng"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Password
              </label>
              <div className="flex items-center gap-2 bg-[#f4f7f2] border border-slate-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent">
                <Lock size={16} className="text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me / Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-green-700 focus:ring-green-700"
                />
                Remember Me
              </label>
              <Link to="/forgot-password" className="text-green-800 font-medium hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
            >
              Sign In
              <LogIn size={16} />
            </button>

            <hr className="border-slate-200 my-2" />

            <p className="text-center text-xs text-slate-500">
              Authorized use only.{' '}
              <Link to="/request-access" className="text-green-800 font-semibold hover:underline">
                Request access
              </Link>
            </p>
          </div>

          <hr className="border-slate-200 my-4" />

          <p className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-800 font-semibold hover:underline">
              Sign up
            </Link>
          </p>

          {/* Footer status pill */}
          <div className="flex justify-center mt-6">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              SYSTEMS NOMINAL
            </span>
          </div>

          {/* Footer links */}
          <div className="flex justify-center gap-4 mt-3 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">Compliance</a>
            <a href="#" className="hover:text-slate-600">Security Docs</a>
            <a href="#" className="hover:text-slate-600">Support</a>
          </div>
        </div>

        {/* Copyright*/}
        <div className="text-center mt-8 text-[11px] text-slate-500 leading-relaxed">
          <p>© 2024 SENTINOA IoT Systems. All rights reserved.</p>
          <div className="flex justify-center gap-3 mt-2">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Compliance</a>
            <a href="#" className="hover:text-slate-300">Security</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, placeholder, type, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-1.5 block">{label}</label>
      <div className="flex items-center gap-2 bg-[#f4f7f2] border border-slate-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent">
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
