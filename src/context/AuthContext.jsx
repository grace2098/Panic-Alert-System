// AuthContext is the single place that talks to Firebase Auth.
//
// Why Context instead of just calling `auth.currentUser` wherever needed:
// Firebase's auth state is asynchronous and event-driven (onAuthStateChanged
// fires whenever a session is restored from storage, a login/logout happens,
// or a token refreshes). If every component queried `auth.currentUser`
// directly, you'd get stale reads before the initial check completes, and
// you'd attach a listener per component. Context lets us attach ONE
// listener at the top of the app and hand every descendant the same,
// always-current session state.

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { ref, set, get, serverTimestamp } from "firebase/database";
import { auth, db } from "../lib/firebase";

const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // This fires once on mount with the restored session (or null), then
    // again on every login/logout for the lifetime of the app.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // phoneNumber is optional here because the current Signup form doesn't
  // collect it -- it gets filled in later on the Profile page. Don't add
  // it back to signup() itself; see the Profile page notes for why.
  async function signup({ fullName, email, password, phoneNumber = null }) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = credential;

    // Store the display name on the Auth record itself (useful for things
    // like Firebase's own emails), separate from the richer profile we
    // keep in the Realtime Database.
    await updateProfile(user, { displayName: fullName });

    // Create the user's database node immediately at signup, not lazily
    // on first profile visit. Every other feature (device pairing,
    // emergency contacts, incidents) attaches under users/{uid}, so this
    // node needs to exist from the start rather than being created
    // conditionally later.
    await set(ref(db, `users/${user.uid}`), {
      uid: user.uid,
      fullName,
      email,
      phoneNumber,
      profileImageBase64: null,
      deviceId: null,
      createdAt: serverTimestamp(),
    });

    return user;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Google sign-in has no separate "create account" step to hook a
  // profile write into -- the same call handles both first-time users
  // and returning ones. So we check whether users/{uid} already exists,
  // and only create it if this is genuinely the first sign-in.
  async function loginWithGoogle() {
    const credential = await signInWithPopup(auth, googleProvider);
    const { user } = credential;

    const profileRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(profileRef);

    if (!snapshot.exists()) {
      await set(profileRef, {
        uid: user.uid,
        fullName: user.displayName || "",
        email: user.email,
        phoneNumber: null,
        profileImageBase64: null,
        deviceId: null,
        createdAt: serverTimestamp(),
      });
    }

    return user;
  }

  function logout() {
    return signOut(auth);
  }

  const value = { currentUser, authLoading, signup, login, loginWithGoogle, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}