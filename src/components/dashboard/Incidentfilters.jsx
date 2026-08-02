import { Search } from "lucide-react";
import { FILTERS } from "../dashboard/Incidentconfig";
 
export default function IncidentFilters({ searchTerm, onSearchChange, activeFilter, onFilterChange }) {
  return (
    <section className="mb-lg flex flex-col md:flex-row md:items-center justify-between gap-2">
      <div className="relative">
        <Search className="absolute left-md top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Alert ID, Device ID, or Date..."
          className="w-full pl-3xl pr-md py-sm bg-surface-container border border-outline-variant rounded-full focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md text-body-md"
        />
      </div>
 
      <div className="flex items-center gap-sm overflow-x-auto pb-xs custom-scrollbar">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => onFilterChange(filter.key)}
              className={`px-md py-xs rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}