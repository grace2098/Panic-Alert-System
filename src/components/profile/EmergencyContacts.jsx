import React from "react";
import { UserPlus } from "lucide-react";
const EmergencyContacts = () => {
  return (
    <div className="bg-surface border  border-primary-container py-10 px-5 rounded-lg flex flex-col gap-5  justify-between h-full   w-full md:w-1/2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex flex-col gap-1 w-full sm:w-1/2">
          <h2 className="text-title-lg font-bold text-on-primary-fixed-variant">
            Emergency Contacts
          </h2>
          <p className=" text-xs text-gray-600">
            Authorised individuals who are to contacted in case of an emergency.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-on-primary p-4 rounded-4xl hover:bg-primary/90 cursor-pointer text-title-lg">
          <UserPlus size={18} />
          Add Contact
        </button>
      </div>
        <div className="bg-on-primary py-3 px-3 rounded-lg border border-primary-container">
          <div className="flex gap-15 items-center py-6 border-b border-outline-variant">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                MJ
              </div>
              <div className="flex flex-col gap-1 ">
                  <p>Michael Jackson</p>
                  <div className="flex gap-1">
                    <p className="text-xs font-bold text-on-primary-fixed-variant">Spouse</p>
                    <p className="text-xs text-gray-600">+234 123 456 7890</p>
                  </div>
              </div>
          </div>
          <div className="flex gap-15 items-center py-6 border-b border-outline-variant">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-on-primary">MM</div>
              <div className="flex flex-col gap-1">
                  <p >Mommy</p>
                  <div className="flex gap-1">
                    <p className=" text-xs font-bold text-on-tertiary-fixed-variant">Mother</p>
                    <p className="text-xs text-gray-600">+234 123 456 7890</p>
                  </div>
              </div>
          </div>
          <div className="flex gap-15 items-center py-6">
              <div className="w-10 h-10 rounded-full bg-on-tertiary-fixed flex items-center justify-center text-on-tertiary">SU</div>
              <div className="flex flex-col gap-1">
                  <p>Susan</p>
                  <div className="flex gap-1">
                    <p className="text-xs font-bold text-on-surface-variant">My Babe</p>
                    <p className="text-xs text-gray-600">+234 123 46 7890</p>
                  </div>
              </div>
          </div>
       
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
