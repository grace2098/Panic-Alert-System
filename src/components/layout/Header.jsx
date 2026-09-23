import React, { useEffect, useState } from "react";
import { Menu, User } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext"

const Header = ({ onMenuClick, writings }) => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: currentUser?.displayName || "User",
    photoURL: currentUser?.photoURL || null,
  });

  useEffect(() => {
    if (!currentUser?.uid) return;

    // Listen directly to users/{uid} in Realtime Database
    const userRef = ref(db, `users/${currentUser.uid}`);
    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProfileData({
            fullName: data.fullName || currentUser.displayName || "User",
            photoURL:
              data.profileImageBase64 ||
              data.photoURL ||
              currentUser.photoURL ||
              null,
          });
        }
      },
      (err) => {
        console.error("Failed to load header user profile:", err);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Extract the first name (e.g., "Grace" from "Grace Hopper")
  const firstName = profileData.fullName.trim().split(/\s+/)[0] || "User";

  // Generate fallback initials if no profile picture is set
  const initials = profileData.fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  // Check if writing[0] is a "Hello" greeting and format dynamically
  const headingText = writings[0]?.toLowerCase().startsWith("hello")
    ? `Hello ${firstName}`
    : writings[0];
  return (
    <div className="flex items-center justify-between w-full py-3 px-6 bg-surface border-r border-outline-variant shadow-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-variant"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-on-primary-fixed-variant" />
        </button>
      <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-on-primary-fixed-variant">
            {headingText}
          </h1>
          {writings[1] && (
            <p className="hidden sm:block text-xs text-gray-600">
              {writings[1]}
            </p>
          )}
        </div>
     
      </div>
     <div className="flex items-center justify-center gap-3">
        <div>
          {profileData.photoURL ? (
            <img
              src={profileData.photoURL}
              alt={profileData.fullName}
              className="w-11 h-11 rounded-full border border-outline-variant object-cover"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm border border-outline-variant">
              {initials || <User className="w-5 h-5" />}
            </div>
          )}
        </div>
        <p className="text-label-md font-medium text-on-surface">
          {profileData.fullName}
        </p>
      </div>
    </div>
  )
}

export default Header
