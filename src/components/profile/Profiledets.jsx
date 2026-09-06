import React, { useRef, useState } from "react";
import { Pencil } from "lucide-react";

const Profiledets = () => {
  const [imageUpdated, setImageUpdated] = useState(false);
  const [profilePic, setProfilePic] = useState(false);
  const fileInputRef = useRef(null);

  const handleChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target?.result);
        setImageUpdated(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-on-primary border border-primary-container p-5 rounded-lg flex flex-col gap-5 h-full w-full md:w-1/2">
      <div className="flex justify-center w-full relative">
        <div className="flex flex-col justify-center items-center w-1/2 relative">
          <div className="w-30 h-30.5 rounded-full border border-primary-container flex justify-center items-center relative">
            <img
              src={profilePic}
              className="w-30 h-30 rounded-full object-cover"
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={handleChangeClick}
            className="bg-on-primary-fixed-variant p-1 rounded-full w-6 h-6 flex items-center justify-center absolute bottom-0 right-1/5 cursor-pointer"
          >
            <Pencil className="text-on-primary" size={18} />
          </button>
        </div>
      </div>
      <form className="flex flex-col gap-2 justify-between">
        <label className="text-label-md font-medium text-on-surface">
          Full Name
        </label>
        <input
          type="text"
          className="bg-surface h-10 p-5 border w-full border-outline-variant rounded focus:outline-none focus:border-teal-500"
        />
        <label className="text-label-md font-medium text-on-surface">
          Email
        </label>
        <input
          type="email"
          className="bg-surface h-10 p-5 border w-full border-outline-variant rounded focus:outline-none focus:border-teal-500"
        />
        <label className="text-label-md font-medium text-on-surface">
          Password
        </label>
        <input
          type="password"
          className="bg-surface h-10 p-5 border w-full border-outline-variant rounded focus:outline-none focus:border-teal-500"
        />
        <label className="text-label-md font-medium text-on-surface">
          Location
        </label>
        <input
          type="text"
          className="bg-surface h-10 p-5 border w-full border-outline-variant rounded focus:outline-none focus:border-teal-500"
        />
        <label className="text-label-md font-medium text-on-surface">
          Device ID
        </label>
        <input
          type="text"
          className="bg-surface h-10 p-5 border w-full border-outline-variant rounded focus:outline-none focus:border-teal-500"
        />
      </form>
      <button
        type="button"
        className="border border-primary p-3 rounded w-full text-title-lg font-bold text-on-primary-fixed-variant cursor-pointer"
      >
        Update Profile Details
      </button>
    </div>
  );
};

export default Profiledets;
