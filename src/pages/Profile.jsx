import React from "react";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Profiledets from "../components/profile/Profiledets";
import EmergencyContacts from "../components/profile/EmergencyContacts";
import { UserPlus } from "lucide-react";

export const ContactsModal = ({ onClose }) => (
  <div className=" z-100 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm w-full  ">
    <div className="bg-surface  gap-3 p-10 relative rounded-lg flex flex-col justify-center items-center ">
      <button onClick={onClose} className="cursor-pointer absolute right-5 top-2 ">
        ✕
      </button>
      <div className="flex flex-col gap-3">
        <input type="text" placeholder="Name" className="p-3 rounded-lg border-[1.5px] w-full border-secondary-fixed-dim focus:outline-none
             focus:border-primary-container" />
        <input type="tel" placeholder="Phone Number" className="p-3 rounded-lg border-[1.5px] w-full border-secondary-fixed-dim focus:outline-none
             focus:border-primary-container" />
      </div>
      <button
        type="button"
          className="flex items-center justify-center gap-2 border-2 border-primary-container p-3 rounded-lg w-full text-title-lg font-bold text-primary-container cursor-pointer"
        >
          <UserPlus size={18} />
          Add to Contact
        </button>
    </div>
  </div>
);
const Profile = () => {
  const [showAddContact, setShowAddContact] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex w-full h-full relative bg-surface">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="w-full">
        <div className="fixed top-0 left-0 z-10 right-0 lg:left-62.5">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            writings={[
              "Your Profile",
              "Manage your personal information and details",
            ]}
          />
        </div>
        <div className="px-4 sm:px-10 py-30 flex flex-col md:flex-row gap-5 justify-between items-start w-full h-full relative">
          <Profiledets />
          <EmergencyContacts onAddContact={() => setShowAddContact(true)} />
        </div>
        <div
          className="fixed bottom-0 left-0 right-0 z-10
            flex justify-center items-center
            lg:left-62.5"
        >
          <Footer />
        </div>
      </div>
      {showAddContact && (
        <ContactsModal onClose={() => setShowAddContact(false)} />
      )}
    </div>
  );
};

export default Profile;
