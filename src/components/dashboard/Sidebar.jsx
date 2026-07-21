import React from "react";
import {
  ShieldPlus,
  LayoutDashboard,
  Watch,
  ListChecks,
  Users,
  BarChart3,
  HelpCircle,
  LogOut,
} from "lucide-react";
// import SOSButton from "./SOSButton";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Devices", icon: Watch },
  { label: "Alert Logs", icon: ListChecks },
  { label: "Contacts", icon: Users },
  { label: "Analytics", icon: BarChart3 },
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
        className={`fixed lg:sticky top-0 left-0 h-screen z-60 lg:z-40 flex flex-col p-md space-y-sm
        bg-surface-container border-r border-outline-variant shadow-md w-72 lg:w-64
        transition-transform duration-300 lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-md px-sm py-md">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <ShieldPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-title-md font-black text-on-surface">
              SENTINOA
            </h1>
            <p className="text-label-sm text-outline">All Systems Nominal</p>
          </div>
        </div>

        <div className="flex-1 space-y-xs mt-lg overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-md px-md py-sm rounded-lg transition-all active:scale-95 duration-150 ${
                active
                  ? "bg-primary text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-label-md">{label}</span>
            </a>
          ))}
        </div>

        <div className="px-sm pb-md space-y-sm">
          <div className="pt-md border-t border-outline-variant">
            <a
              href="#"
              className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-primary transition-all"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-label-md">Help Center</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-error transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-label-md">Sign Out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
