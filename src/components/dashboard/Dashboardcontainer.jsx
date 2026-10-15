import { useEffect, useMemo, useState } from "react";
import StatCards from "../dashboard/Statcards";
import IncidentFilters from "../dashboard/Incidentfilters";
import IncidentTable from "../dashboard/Incidenttable";
import IncidentDetailsPanel from "../dashboard/Incidentdetailspanel";
import { Useincidents } from "../dashboard/Useincidents";
import { formatDateTime } from "../dashboard/Incidentconfig";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile } from "../../lib/userService";

export default function Dashboardcontainer() {
  const { currentUser } = useAuth();
  const { incidents, stats, dispatchSecurity, callContacts, endIncident } = Useincidents();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  // Loaded once so the details panel can show who "you" are without
  // duplicating name/photo data onto every single incident record.
  useEffect(() => {
    if (!currentUser) return;
    getUserProfile(currentUser.uid)
      .then((snapshot) => setProfile(snapshot.val() || {}))
      .catch((err) => console.error("Failed to load profile for dashboard:", err));
  }, [currentUser]);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesFilter = activeFilter === "all" || incident.status === activeFilter;
      if (!matchesFilter) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.trim().toLowerCase();
      return (
        incident.id.toLowerCase().includes(term) ||
        (incident.deviceId || "").toLowerCase().includes(term) ||
        formatDateTime(incident.createdAt).toLowerCase().includes(term)
      );
    });
  }, [incidents, activeFilter, searchTerm]);

  // The signed-in user is always "the user" for every incident on this
  // page, so their profile is merged in here rather than expected to
  // live on the incident record itself.
  const selectedIncident = useMemo(() => {
    const incident = incidents.find((i) => i.id === selectedIncidentId);
    if (!incident) return null;

    return {
      ...incident,
      user: {
        name: profile?.fullName || currentUser?.displayName || "You",
        department: profile?.location || "Location not set",
        photoURL: profile?.profileImageBase64 || null,
      },
    };
  }, [incidents, selectedIncidentId, profile, currentUser]);

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