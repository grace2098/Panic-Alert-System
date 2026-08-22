import React from "react";
import { NavLink } from "react-router-dom";
import {
  ShieldPlus,
  LayoutDashboard,
  UserPlus,
  Users,
  BarChart3,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
// import SOSButton from "./SOSButton";
import Logo from "./Logo";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true, path: "/dashboard"  },
  { label: "Profile", icon: UserPlus, path: "/profile" },

];

export default function Sidebar({ open, onClose }) {
  return (
    <div>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-55 lg:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed lg:sticky top-0 left-0 h-screen z-60 lg:z-40 flex flex-col justify-center p-md space-y-sm
       bg-surface-container border-r border-outline-variant shadow-md w-full min-[780px]:w-72 lg:w-64
        transition-transform duration-300 lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between gap-md px-sm py-md">
          <div className="flex items-center gap-md">
            <Logo />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 absolute top-3 right-3 rounded-lg hover:bg-surface-variant"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-on-surface" />
          </button>
        </div>

        <div className="flex-1 space-y-xs mt-lg overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-md px-md py-sm rounded-lg transition-all active:scale-95 duration-150 ${
                  isActive
                    ? "bg-primary text-on-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-label-md">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="px-sm pb-md space-y-sm">
          <div className="pt-md border-t border-outline-variant">
            <a
              href="#"
              className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-error transition-all"
            >
              <LogOut className="w-4 h-4" />
              <NavLink
                to="/login">
              
                <span className="text-label-md" >Sign Out</span>
              </NavLink>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
