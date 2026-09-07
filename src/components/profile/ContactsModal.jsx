import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { addEmergencyContact } from "../../lib/Userservice";
import { classifyRelationship } from "../../lib/ContactPriority";

const ContactsModal = ({ onClose }) => {
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phoneNumber.trim() || !relationship.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // The relationship text the user typed decides where this contact
    // lands in the escalation order -- see contactPriority.js.
    const { priority, label } = classifyRelationship(relationship);

    setSubmitting(true);
    try {
      await addEmergencyContact(currentUser.uid, {
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        relationship: relationship.trim(),
        priority,
      });
      toast.success(`${name.trim()} added as ${label} priority.`);
      onClose();
    } catch (err) {
      toast.error("Couldn't save this contact. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="z-100 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm w-full">
      <div className="bg-surface gap-3 p-10 relative rounded-lg flex flex-col justify-center items-center">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer absolute right-5 top-2"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border-[1.5px] w-full border-secondary-fixed-dim focus:outline-none focus:border-primary-container"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="p-3 rounded-lg border-[1.5px] w-full border-secondary-fixed-dim focus:outline-none focus:border-primary-container"
          />
          <input
            type="text"
            placeholder="Relationship (e.g. husband, mom, best friend)"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="p-3 rounded-lg border-[1.5px] w-full border-secondary-fixed-dim focus:outline-none focus:border-primary-container"
          />

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 border-2 border-primary-container p-3 rounded-lg w-full text-title-lg font-bold text-primary-container cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UserPlus size={18} />
            {submitting ? "Adding…" : "Add to Contact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactsModal;