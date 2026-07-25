import React from 'react'
import { Menu } from 'lucide-react'

const Header = ({ onMenuClick, writings }) => {
  return (
    <div className="flex items-center justify-between w-full py-3 px-5 bg-surface border-r border-outline-variant shadow-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-surface-variant"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-on-primary-fixed-variant" />
        </button>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-on-primary-fixed-variant">{writings[0]}</h1>
          <p className="hidden sm:block text-xs text-gray-600 ">{writings[1]}</p>
        </div>
     
      </div>
      <div className="flex items-center justify-center gap-3">
        <div>
         <img src="/wallhaven-4ygl6g.jpg" alt="Profile" className="w-11 h-11 rounded-full border object-cover" />
        </div>
        <p className="text-label-md font-medium text-on-surface">Jane Doe</p>
      </div>
    </div>
  )
}

export default Header
