import React from "react";

const Logo = () => {
  return (
    <div className="relative w-full h-25 flex flex-col items-center justify-center">
      <div className="w-50 h-50 flex items-center justify-center">
        <img
          className=" w-full h-full object-contain"
          src="/public/sentinoa_wordmark.svg"
          alt="Logo"
        />
      </div>
      <p className="absolute bottom-1 z-10 text-center tracking-[1px] text-md text-on-surface-variant">
        Your personal safety companion
      </p>
    </div>
  );
};

export default Logo;
