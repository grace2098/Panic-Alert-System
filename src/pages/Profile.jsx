import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Profiledets from "../components/profile/Profiledets";
import EmergencyContacts from "../components/profile/EmergencyContacts";
import ContactsModal from "../components/profile/ContactsModal";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleOpenAdd = () => {
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

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
          <EmergencyContacts
            onAddContact={handleOpenAdd}
            onEditContact={handleOpenEdit}
          />
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center items-center lg:left-62.5">
          <Footer />
        </div>
      </div>
      {isModalOpen && (
        <ContactsModal
          onClose={() => setIsModalOpen(false)}
          contactToEdit={selectedContact}
        />
      )}
    </div>
  );
};

export default Profile;