import React, { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebase";
import { getUserProfile, updateUserProfile, claimDevice } from "../../lib/Userservice";
import { resizeAndCompressImage } from "../../lib/Imageutils";

const inputClass =
  "bg-surface h-10 p-5 border w-full border-outline-variant rounded focus:outline-none focus:border-teal-500";

const Profiledets = () => {
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [location, setLocation] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [originalDeviceId, setOriginalDeviceId] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  // Load the existing profile once on mount, so the form reflects what's
  // actually saved instead of starting blank every visit.
  useEffect(() => {
    if (!currentUser) return;

    getUserProfile(currentUser.uid)
      .then((snapshot) => {
        const data = snapshot.val() || {};
        setFullName(data.fullName || "");
        setEmail(data.email || currentUser.email || "");
        setOriginalEmail(data.email || currentUser.email || "");
        setLocation(data.location || "");
        setDeviceId(data.deviceId || "");
        setOriginalDeviceId(data.deviceId || "");
        setProfilePic(data.profileImageBase64 || null);
      })
      .catch(() => {
        toast.error("Couldn't load your profile. Please refresh the page.");
      })
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resized = await resizeAndCompressImage(file);
      setProfilePic(resized);
      setImageChanged(true);
    } catch (err) {
      toast.error("Couldn't process that image. Please try another.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    const emailChanged = email.trim() !== originalEmail;
    const wantsPasswordChange = newPassword.length > 0;

    if (wantsPasswordChange) {
      if (newPassword.length < 8) {
        toast.error("New password must be at least 8 characters.");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast.error("New passwords do not match.");
        return;
      }
    }

    if ((emailChanged || wantsPasswordChange) && !currentPassword) {
      toast.error("Enter your current password to change your email or password.");
      return;
    }

    setSubmitting(true);

    // Each step below is its own try/catch on purpose. A wrong current
    // password, or a Device ID that's already claimed, should not block
    // the parts of the form that were entered correctly -- the user finds
    // out exactly what succeeded and what didn't, rather than an
    // all-or-nothing save.

    // 1. Re-authenticate once, if either email or password is changing --
    // Firebase requires a "recent login" for both of these operations.
    let reauthOk = true;
    if (emailChanged || wantsPasswordChange) {
      try {
        const credential = EmailAuthProvider.credential(originalEmail, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
      } catch (err) {
        reauthOk = false;
        toast.error("Current password is incorrect -- email/password changes were not saved.");
      }
    }

    // 2. Email change.
    if (emailChanged && reauthOk) {
      try {
        await updateEmail(auth.currentUser, email.trim());
        toast.success("Email updated.");
      } catch (err) {
        toast.error(mapEmailError(err.code));
      }
    }

    // 3. Password change.
    if (wantsPasswordChange && reauthOk) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        toast.success("Password updated.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } catch (err) {
        toast.error("Couldn't update password. Please try again.");
      }
    }

    // 4. Always-safe profile fields -- attempted regardless of whether
    // the sensitive changes above succeeded.
    try {
      await updateProfile(auth.currentUser, { displayName: fullName.trim() });
      await updateUserProfile(currentUser.uid, {
        fullName: fullName.trim(),
        location: location.trim() || null,
        ...(emailChanged && reauthOk ? { email: email.trim() } : {}),
        ...(imageChanged ? { profileImageBase64: profilePic } : {}),
      });
      toast.success("Profile details saved.");
      setImageChanged(false);
    } catch (err) {
      toast.error("Couldn't save your profile details. Please try again.");
    }

    // 5. Device pairing -- only attempted if the field actually changed,
    // kept separate so a rejected claim never blocks anything else above.
    if (deviceId.trim() && deviceId.trim() !== originalDeviceId) {
      try {
        await claimDevice(currentUser.uid, deviceId.trim());
        setOriginalDeviceId(deviceId.trim());
        toast.success(`Device ${deviceId.trim()} paired to your account.`);
      } catch (err) {
        toast.error(
          "Couldn't pair that device. It may already belong to another account, or the Device ID may be incorrect."
        );
      }
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="bg-on-primary border border-primary-container p-5 rounded-lg flex items-center justify-center h-full w-full md:w-1/2">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500/30 border-t-teal-500" />
      </div>
    );
  }

  return (
    <div className="bg-on-primary border border-primary-container p-5 rounded-lg flex flex-col gap-5 h-full w-full md:w-1/2">
      <div className="flex justify-center w-full relative">
        <div className="flex flex-col justify-center items-center w-1/2 relative">
          <div className="w-30 h-30.5 rounded-full border border-primary-container flex justify-center items-center relative overflow-hidden">
            {profilePic ? (
              <img src={profilePic} className="w-30 h-30 rounded-full object-cover" alt="Profile" />
            ) : (
              <div className="w-30 h-30 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-title-lg">
                {initials(fullName)}
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={handleChangeClick}
            className="bg-on-primary-fixed-variant p-1 rounded-full w-6 h-6 flex items-center justify-center absolute bottom-0 right-1/5 cursor-pointer"
          >
            <Pencil className="text-on-primary" size={18} />
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-2 justify-between" onSubmit={handleSubmit}>
        <label className="text-label-md font-medium text-on-surface">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
        />

        <label className="text-label-md font-medium text-on-surface">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />

        <label className="text-label-md font-medium text-on-surface">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Required only to change email or password"
          className={inputClass}
        />

        <label className="text-label-md font-medium text-on-surface">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Leave blank to keep current password"
          className={inputClass}
        />

        <label className="text-label-md font-medium text-on-surface">Confirm New Password</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className={inputClass}
        />

        <label className="text-label-md font-medium text-on-surface">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Alvan Ikoku Hall, UNN"
          className={inputClass}
        />

        <label className="text-label-md font-medium text-on-surface">Device ID</label>
        <input
          type="text"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          placeholder="e.g. SENT-001"
          className={inputClass}
        />

        <button
          type="submit"
          disabled={submitting}
          className="border border-primary p-3 rounded w-full text-title-lg font-bold text-on-primary-fixed-variant cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 mt-2"
        >
          {submitting ? "Saving…" : "Update Profile Details"}
        </button>
      </form>
    </div>
  );
};

function initials(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function mapEmailError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already in use by another account.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/operation-not-allowed":
      return "Direct email changes aren't enabled -- this needs the verify-before-update flow instead.";
    default:
      return "Couldn't update email. Please try again.";
  }
}

export default Profiledets;