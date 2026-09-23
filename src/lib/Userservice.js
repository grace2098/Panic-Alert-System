import { ref, get, update, push, serverTimestamp, remove } from "firebase/database";
import { db } from "./firebase";

export function getUserProfile(uid) {
  return get(ref(db, `users/${uid}`));
}

export function updateUserProfile(uid, fields) {
  return update(ref(db, `users/${uid}`), fields);
}

export async function addEmergencyContact(uid, { name, phoneNumber, relationship, priority }) {
  const contactsRef = ref(db, `users/${uid}/emergencyContacts`);
  const newContactRef = push(contactsRef);

  await update(newContactRef, {
    name,
    phoneNumber,
    relationship,
    priority,
    addedAt: serverTimestamp(),
  });

  return newContactRef.key;
}

// Claiming a device touches two separate top-level paths -- the device's
// own ownership record, and the user's own `deviceId` field -- and they
// need to succeed or fail together, so this uses a single multi-location
// update() call rather than two separate writes. The security rules
// enforce that this only succeeds if the device exists and is currently
// unclaimed; if either path's rule check fails, Firebase rejects the
// whole update, so nothing is left half-paired.
export function claimDevice(uid, deviceId) {
  const updates = {};
  updates[`devices/${deviceId}/ownerUid`] = uid;
  updates[`users/${uid}/deviceId`] = deviceId;
  return update(ref(db), updates);
}
export function updateEmergencyContact(uid, contactId, { name, phoneNumber, relationship, priority }) {
  const contactRef = ref(db, `users/${uid}/emergencyContacts/${contactId}`);
  return update(contactRef, {
    name,
    phoneNumber,
    relationship,
    priority,
  });
}
export function deleteEmergencyContact(uid, contactId) {
  const contactRef = ref(db, `users/${uid}/emergencyContacts/${contactId}`);
  return remove(contactRef);
}