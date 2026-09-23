import React, { useState, useEffect } from "react";
import { UserPlus, Save, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { 
  addEmergencyContact, 
  updateEmergencyContact, 
  deleteEmergencyContact 
} from "../../lib/Userservice";
import { classifyRelationship } from "../../lib/ContactPriority";

const ContactsModal = ({ onClose, contactToEdit = null }) => {
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isEditing = Boolean(contactToEdit);

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name || "");
      setPhoneNumber(contactToEdit.phoneNumber || "");
      setRelationship(contactToEdit.relationship || "");
    }
  }, [contactToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phoneNumber.trim() || !relationship.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const { priority, label } = classifyRelationship(relationship);

    setSubmitting(true);
    try {
      if (isEditing) {
        await updateEmergencyContact(currentUser.uid, contactToEdit.id, {
          name: name.trim(),
          phoneNumber: phoneNumber.trim(),
          relationship: relationship.trim(),
          priority,
        });
        toast.success("Contact updated.");
      } else {
        await addEmergencyContact(currentUser.uid, {
          name: name.trim(),
          phoneNumber: phoneNumber.trim(),
          relationship: relationship.trim(),
          priority,
        });
        toast.success(`${name.trim()} added as ${label} priority.`);
      }
      onClose();
    } catch (err) {
      toast.error("Couldn't save this contact. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!contactToEdit?.id) return;
    
    setDeleting(true);
    try {
      await deleteEmergencyContact(currentUser.uid, contactToEdit.id);
      toast.success("Contact deleted.");
      onClose();
    } catch (err) {
      toast.error("Couldn't delete contact. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="z-100 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm w-full">
      <div className="bg-surface gap-3 p-10 relative rounded-lg flex flex-col justify-center items-center min-w-80 max-w-md w-full">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer absolute right-5 top-2 text-gray-500 hover:text-black"
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
            disabled={submitting || deleting}
            className="flex items-center justify-center gap-2 border-2 border-primary-container p-3 rounded-lg w-full text-title-lg font-bold text-primary-container cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isEditing ? <Save size={18} /> : <UserPlus size={18} />}
            {submitting ? "Saving…" : isEditing ? "Update Contact" : "Add to Contact"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting || deleting}
              className="flex items-center justify-center gap-2 border-2 border-error p-3 rounded-lg w-full text-title-lg font-bold text-error hover:bg-error/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
            >
              <Trash2 size={18} />
              {deleting ? "Deleting…" : "Delete Contact"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactsModal;