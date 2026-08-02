import React from "react";

const Logo = () => {
  return (
    <div className="relative w-full h-30 flex flex-col items-center justify-center">
      <div className="w-47 h-45 flex items-center justify-center">
        <img
          className=" w-full h-full object-contain"
          src="/sentinoa_wordmark.svg"
          alt="Logo"
        />
      </div>
      <p className="absolute bottom-0 z-10 text-center tracking-[1px] text-md sm:text-xs text-on-surface-variant">
        Your personal safety companion
      </p>
    </div>
  );
};

export default Logo;
