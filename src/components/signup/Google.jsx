import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Google = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleClick = async () => {
    setSubmitting(true);
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google!");
      navigate("/dashboard");
    } catch (err) {
      // Don't show an error toast if the user just closed the popup
      // themselves -- that's not a failure worth interrupting them for.
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Google sign-in failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={submitting}
      className="w-full flex items-center justify-center gap-2 text-gray-600 text-sm border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? "Connecting…" : "Continue with Google"}
    </button>
  );
};

export default Google;