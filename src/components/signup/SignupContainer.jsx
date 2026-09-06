import React, { useState, useEffect } from "react";
import { UserPlus, LogIn } from "lucide-react";
import TermsandPrivacy from "./TermsandPrivacy";
import SignupInputs from "./SignupInputs";
import Google from "./Google";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const SignupContainer = () => {
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  // Don't navigate immediately inside handleSubmit -- Firebase updates
  // `currentUser` via a separate async listener that can lag a moment
  // behind the signup() promise resolving. Navigating too early means
  // ProtectedRoute (if it's guarding /dashboard) sees a stale `null` and
  // bounces back to /login, even though signup genuinely succeeded.
  // Waiting for currentUser to actually change guarantees the redirect
  // only fires once the auth state has caught up.
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  // deviceId removed -- device pairing happens later on the Profile page,
  // with proper ownership checks. See the AuthContext notes for why.
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
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

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before continuing.");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setSubmitting(true);
    try {
      await signup({
        fullName: formData.fullname,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Registration successful!");
      // Navigation happens in the useEffect above once currentUser updates.
    } catch (err) {
      const message = mapAuthError(err.code);
      if (err.code === "auth/email-already-in-use") {
        setErrors((prev) => ({ ...prev, email: message }));
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="bg-white w-full max-w-100 text-sm gap-2 rounded-2xl shadow-md flex flex-col items-center justify-center p-6 sm:p-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-0 justify-center">
        <UserPlus
          size={28}
          strokeWidth={1.5}
          className="text-primary-container"
        />
        <h2 className=" font-bold text-center text-title-md">
          Create your Account
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Join in and take control of your safety
        </p>
      </div>
      <div className="w-full">
        <SignupInputs
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      </div>
      <TermsandPrivacy checked={agreedToTerms} onChange={setAgreedToTerms} />
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 bg-primary  text-on-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:outline-none py-2 px-3 rounded-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Creating account…" : "Register Account"}
        <LogIn />
      </button>
      <p className="text-center text-gray-600 text-xs">OR</p>
      <Google />
      <p className="text-center text-gray-600 text-xs">
        Already have an account?{" "}
        <NavLink to="/login" className="text-primary hover:underline">
          Log in here
        </NavLink>
      </p>
    </form>
  );
};

// Firebase's raw error codes aren't something to show a stressed user --
// map the ones we expect to plain language.
function mapAuthError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account already exists with this email.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Please choose a stronger password.";
    default:
      return "Something went wrong while creating your account. Please try again.";
  }
}

export default SignupContainer;