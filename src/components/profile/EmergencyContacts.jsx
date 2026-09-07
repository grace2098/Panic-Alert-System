import React, { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { priorityLabel } from "../../lib/ContactPriority";

const AVATAR_PALETTE = [
  "bg-primary-container text-on-primary-container",
  "bg-teal-500 text-on-primary",
  "bg-on-tertiary-fixed text-on-tertiary",
  "bg-amber-500 text-on-primary",
  "bg-rose-500 text-on-primary",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function avatarClass(seed) {
  const index = Math.abs(hashString(seed)) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

function initials(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const EmergencyContacts = ({ onAddContact }) => {
  const { currentUser } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const contactsRef = ref(db, `users/${currentUser.uid}/emergencyContacts`);
    const unsubscribe = onValue(
      contactsRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, contact]) => ({ id, ...contact }));

        // This sort IS the escalation order: tier first, then whenever they
        // were added within the same tier.
        list.sort((a, b) => {
          if (a.priority !== b.priority) return a.priority - b.priority;
          return (a.addedAt || 0) - (b.addedAt || 0);
        });

        setContacts(list);
        setLoading(false);
      },
      (err) => {
        // Without this, a permission-denied or connectivity error leaves
        // `loading` stuck true forever with no feedback at all.
        console.error("Failed to load emergency contacts:", err);
        toast.error("Couldn't load emergency contacts. Please refresh the page.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  return (
    <div className="bg-surface border border-primary-container py-10 px-5 rounded-lg flex flex-col gap-5 justify-between h-full w-full md:w-1/2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-col gap-1 w-full sm:w-1/2">
          <h2 className="text-title-lg font-bold text-on-primary-fixed-variant">
            Emergency Contacts
          </h2>
          <p className="text-xs text-gray-600">
            Authorised individuals who are to contacted in case of an emergency.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddContact}
          className="flex items-center gap-2 bg-primary text-on-primary p-4 rounded-4xl hover:bg-primary/90 cursor-pointer text-title-lg"
        >
          <UserPlus size={18} />
          Add to Contact
        </button>
      </div>

      <div className="bg-on-primary py-3 px-3 rounded-lg border border-primary-container">
        {loading && (
          <p className="text-sm text-gray-500 text-center py-6">Loading contacts…</p>
        )}

        {!loading && contacts.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-6">
            No emergency contacts yet. Add your first one above.
          </p>
        )}

        {contacts.map((contact, index) => (
          <div
            key={contact.id}
            className={`flex gap-15 items-center py-6 ${
              index < contacts.length - 1 ? "border-b border-outline-variant" : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${avatarClass(
                contact.id
              )}`}
            >
              {initials(contact.name)}
            </div>
            <div className="flex flex-col gap-1">
              <p>{contact.name}</p>
              <div className="flex gap-1">
                <p className="text-xs font-bold text-on-primary-fixed-variant">
                  {priorityLabel(contact.priority)}
                </p>
                <p className="text-xs text-gray-600">{contact.phoneNumber}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs font-bold text-on-primary-fixed-variant text-center">
          In an emergency, SENTINOA will attempt to make contact with your
          emergency contacts in order of priority set by you.
        </p>
      </div>
    </div>
  );
};

export default EmergencyContacts;