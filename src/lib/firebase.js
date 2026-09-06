// Single source of truth for the Firebase app instance.
// Every other file (AuthContext, database services, storage services)
// imports `auth`, `db`, or `storage` from here instead of calling
// initializeApp() again -- Firebase apps are meant to be singletons.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFEFdkyMQeFEz6t3mN_m2dMmdHtXpxNj8",
  authDomain: "sentinoa-unn.firebaseapp.com",
  projectId: "sentinoa-unn",
  storageBucket: "sentinoa-unn.firebasestorage.app",
  messagingSenderId: "278723352133",
  appId: "1:278723352133:web:40dc654484a1691cc8f52c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;