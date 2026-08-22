import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
 
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
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
        />
      </div>
    </div>
  );
}
 
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const handleSubmit = () => {
    console.log('Login submitted:', { email, password, rememberMe });
  };
 
  return (
    <div className="bg-white rounded-2xl shadow-md px-5 sm:px-6 pt-6 sm:pt-8 pb-6">
      <div className="space-y-4">
        <Field
          label=" Email"
          icon={<Mail size={16} className="text-slate-400 shrink-0" />}
          placeholder="name.regno@unn.edu.ng"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
 
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Password</label>
          <div className="flex items-center gap-2 bg-[#f4f7f2] border border-slate-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent">
            <Lock size={16} className="text-slate-400 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-slate-400 hover:text-slate-600 shrink-0"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
 
        {/* Remember me / Forgot password */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
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
 
        <NavLink
          to="/dashboard"
          onClick={handleSubmit}
          className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
        >
          Sign In
          <LogIn size={16} />
        </NavLink>
 
      </div>
 
      <hr className="border-slate-200 my-4" />
 
      <p className="text-center text-xs text-slate-500">
        Don't have an account?{' '}
        <Link to="/signup" className="text-green-800 font-semibold hover:underline">
          Sign up
        </Link>
      </p>
 
 
    
    </div>
  );
}
 
