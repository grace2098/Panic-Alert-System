import { useMemo, useState } from "react";
import StatCards from "../dashboard/Statcards";
import IncidentFilters from "../dashboard/Incidentfilters";
import IncidentTable from "../dashboard/Incidenttable";
import IncidentDetailsPanel from "../dashboard/Incidentdetailspanel";
import { Useincidents } from "../dashboard/Useincidents";
import { formatDateTime } from "../dashboard/Incidentconfig";
 
export default function Dashboardcontainer() {
  const { incidents, stats, dispatchSecurity, callContacts, endIncident } = Useincidents();
 
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
 
  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesFilter = activeFilter === "all" || incident.status === activeFilter;
      if (!matchesFilter) return false;
 
      if (!searchTerm.trim()) return true;
      const term = searchTerm.trim().toLowerCase();
      return (
        incident.id.toLowerCase().includes(term) ||
        incident.deviceId.toLowerCase().includes(term) ||
        formatDateTime(incident.createdAt).toLowerCase().includes(term)
      );
    });
  }, [incidents, activeFilter, searchTerm]);
 
  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) ?? null;
 
  function handleViewIncident(incidentId) {
    setSelectedIncidentId(incidentId);
    setIsPanelOpen(true);
  }
 
  function handleClosePanel() {
    setIsPanelOpen(false);
  }
 
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-lg py-xl">
     
 
      <StatCards stats={stats} />
 
      <IncidentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
 
      <IncidentTable incidents={filteredIncidents} onViewIncident={handleViewIncident} />
 
      <IncidentDetailsPanel
        incident={selectedIncident}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onDispatchSecurity={dispatchSecurity}
        onCallContacts={callContacts}
        onEndIncident={endIncident}
      />
    </main>
  );
}
 