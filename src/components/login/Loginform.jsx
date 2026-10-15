import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  // Same reasoning as Signup: wait for currentUser to actually update
  // rather than navigating right after the login() promise resolves.
  useEffect(() => {
    if (currentUser) {
      navigate(redirectTo, { replace: true });
    }
  }, [currentUser, navigate, redirectTo]);

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before continuing.");
      return;
    }

    setSubmitting(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Login successful!");
      // Navigation happens in the useEffect above once currentUser updates.
    } catch (err) {
      const message = mapAuthError(err.code);
      // Attach it to the password field so it shows inline as well as
      // in the toast, without revealing whether the email exists.
      setErrors({ password: message });
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="bg-white rounded-2xl shadow-md px-5 sm:px-6 pt-6 sm:pt-8 pb-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">
            Email
          </label>

          <div
            className={
              errors.email
                ? "flex items-center gap-2 bg-[#f4f7f2] border border-red-500 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-red-200"
                : "flex items-center gap-2 bg-[#f4f7f2] border border-slate-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"
            }
          >
            <Mail size={16} className="text-slate-400 shrink-0" />

            <input
              type="email"
              name="email"
              placeholder="name.regno@unn.edu.ng"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
            />
          </div>

          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">
            Password
          </label>
          <div
            className={
              errors.password
                ? "flex items-center gap-2 bg-[#f4f7f2] border border-red-500 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-red-200"
                : "flex items-center gap-2 bg-[#f4f7f2] border border-slate-200 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"
            }
          >
            <Lock size={16} className="text-slate-400 shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-slate-400 hover:text-slate-600 shrink-0"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
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
          <Link
            to="/forgot-password"
            className="text-green-800 font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
          <LogIn size={16} />
        </button>
      </div>

      <hr className="border-slate-200 my-4" />

      <p className="text-center text-xs text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-green-800 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

// Firebase's raw error codes aren't something to show a stressed user --
// map the ones we expect to plain language, and avoid confirming whether
// an email exists on the wrong-password path.
function mapAuthError(code) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "That email and password combination doesn't match our records.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    default:
      return "Something went wrong while signing in. Please try again.";
  }
}