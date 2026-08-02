import { useCallback, useMemo, useState } from "react";
 
// ---------------------------------------------------------------------------
// MOCK DATA LAYER
// ---------------------------------------------------------------------------
// This whole file is written to mirror the shape data would take coming out
// of Firestore: a flat `incidents` collection, each doc holding a nested
// `user`, `location`, and a `timeline` array (or subcollection, your call
// later). When you wire up Firebase, you should only need to:
//   1. Replace the `useState(initialIncidents)` below with an `onSnapshot`
//      listener into `incidents` state.
//   2. Replace the action functions (dispatchSecurity, callContacts,
//      endIncident) with `updateDoc(...)` / `arrayUnion(...)` calls.
// No component using this hook should need to change.
 
const initialIncidents = [
  {
    id: "ALT-0001",
    deviceId: "SAFE-001",
    status: "active",
    escalationLevel: 0,
    createdAt: "2024-10-24T14:23:05",
    location: {
      lat: 6.8665,
      lng: 7.4119,
      label: "Faculty of Arts Quadrant",
      mapImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAIPxOC70fnullDyloaRmfaqQo_DEpj6UJa06_6EXf4_noePxvr9achDH5DwyrRE6AG1UPJo-8SU16TtJf7oBrogTzp18ldstpj61sTiMYKpKmTcNxA775BteiAeGzpBH7MwcmkSpyKTY9X3QqPEj934tgkg0EfdFEMvCxRF2kxLMgECwLdMDR55Y9S_w1APUU4Twt_k-rr4LavISnQaMuanLQONcg7Icp_fRhj6-9WgghLvc6fSy_AxYFACUBqZaiREfrDt8mAsq0",
    },
    user: {
      name: "Chidubem Okafor",
      department: "Faculty of Arts",
      photoURL: null, // falls back to initials avatar until a real photo exists
    },
    timeline: [
      { id: "t1", time: "14:23:05", title: "SOS Triggered", description: "Manual trigger via GuardianWear device button.", state: "done" },
      { id: "t2", time: "14:23:12", title: "GPS Acquired", description: "Coordinates locked: 6.8665° N, 7.4119° E", state: "done" },
      { id: "t3", time: "14:23:45", title: "SMS Alerts Dispatched", description: "3 emergency contacts notified via automated SMS.", state: "done" },
      { id: "t4", time: null, title: "Waiting for Acknowledgement", description: "Pending contact confirmation or security intercept.", state: "pending" },
    ],
  },
  {
    id: "ALT-0002",
    deviceId: "SAFE-082",
    status: "awaiting",
    escalationLevel: 1,
    createdAt: "2024-10-24T14:15:00",
    location: {
      lat: 6.8671,
      lng: 7.4102,
      label: "Central Library",
      mapImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAIPxOC70fnullDyloaRmfaqQo_DEpj6UJa06_6EXf4_noePxvr9achDH5DwyrRE6AG1UPJo-8SU16TtJf7oBrogTzp18ldstpj61sTiMYKpKmTcNxA775BteiAeGzpBH7MwcmkSpyKTY9X3QqPEj934tgkg0EfdFEMvCxRF2kxLMgECwLdMDR55Y9S_w1APUU4Twt_k-rr4LavISnQaMuanLQONcg7Icp_fRhj6-9WgghLvc6fSy_AxYFACUBqZaiREfrDt8mAsq0",
    },
    user: {
      name: "Amara Nwosu",
      department: "Faculty of Science",
      photoURL: null,
    },
    timeline: [
      { id: "t1", time: "14:15:00", title: "SOS Triggered", description: "Manual trigger via GuardianWear device button.", state: "done" },
      { id: "t2", time: "14:15:09", title: "GPS Acquired", description: "Coordinates locked: 6.8671° N, 7.4102° E", state: "done" },
      { id: "t3", time: null, title: "Awaiting Response", description: "No acknowledgement after 8 minutes — eligible for escalation.", state: "pending" },
    ],
  },
  {
    id: "ALT-0003",
    deviceId: "SAFE-115",
    status: "acknowledged",
    escalationLevel: 0,
    createdAt: "2024-10-24T13:50:00",
    location: {
      lat: 6.8659,
      lng: 7.4131,
      label: "Student Union Building",
      mapImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAIPxOC70fnullDyloaRmfaqQo_DEpj6UJa06_6EXf4_noePxvr9achDH5DwyrRE6AG1UPJo-8SU16TtJf7oBrogTzp18ldstpj61sTiMYKpKmTcNxA775BteiAeGzpBH7MwcmkSpyKTY9X3QqPEj934tgkg0EfdFEMvCxRF2kxLMgECwLdMDR55Y9S_w1APUU4Twt_k-rr4LavISnQaMuanLQONcg7Icp_fRhj6-9WgghLvc6fSy_AxYFACUBqZaiREfrDt8mAsq0",
    },
    user: {
      name: "Tobenna Eze",
      department: "Faculty of Engineering",
      photoURL: null,
    },
    timeline: [
      { id: "t1", time: "13:50:00", title: "SOS Triggered", description: "Manual trigger via GuardianWear device button.", state: "done" },
      { id: "t2", time: "13:50:08", title: "GPS Acquired", description: "Coordinates locked: 6.8659° N, 7.4131° E", state: "done" },
      { id: "t3", time: "13:52:31", title: "Contact Acknowledged", description: "Confirmed safe by primary emergency contact.", state: "done" },
      { id: "t4", time: "13:53:00", title: "Incident Closed", description: "Marked resolved by campus safety desk.", state: "done" },
    ],
  },
];
 
const STATS_BASE = {
  totalAlerts: 1284,
  acknowledged: 1245,
  escalated: 36,
};
 
export function Useincidents() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [loading] = useState(false);
  const [error] = useState(null);
 
  const stats = useMemo(() => {
    const active = incidents.filter((i) => i.status === "active").length;
    return {
      totalAlerts: STATS_BASE.totalAlerts,
      activeAlerts: active,
      acknowledged: STATS_BASE.acknowledged,
      escalated: STATS_BASE.escalated,
    };
  }, [incidents]);
 
  const updateStatus = useCallback((incidentId, nextStatus) => {
    // TODO(firebase): replace with updateDoc(doc(db, "incidents", incidentId), { status: nextStatus })
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === incidentId ? { ...incident, status: nextStatus } : incident
      )
    );
  }, []);
 
  const appendTimelineEvent = useCallback((incidentId, event) => {
    // TODO(firebase): replace with arrayUnion(...) update, or a write to a timeline subcollection
    setIncidents((prev) =>
      prev.map((incident) => {
        if (incident.id !== incidentId) return incident;
        const timeline = incident.timeline.map((t) =>
          t.state === "pending" ? { ...t, state: "done" } : t
        );
        return {
          ...incident,
          timeline: [...timeline, { ...event, state: "pending" }],
        };
      })
    );
  }, []);
 
  const dispatchSecurity = useCallback(
    (incidentId) => {
      const now = new Date().toLocaleTimeString("en-US", { hour12: false });
      appendTimelineEvent(incidentId, {
        id: `t-${Date.now()}`,
        time: now,
        title: "Security Dispatched",
        description: "Campus security team notified and en route.",
      });
      updateStatus(incidentId, "escalated");
    },
    [appendTimelineEvent, updateStatus]
  );
 
  const callContacts = useCallback(
    (incidentId) => {
      const now = new Date().toLocaleTimeString("en-US", { hour12: false });
      appendTimelineEvent(incidentId, {
        id: `t-${Date.now()}`,
        time: now,
        title: "Contacts Called",
        description: "Outbound call initiated to emergency contacts.",
      });
    },
    [appendTimelineEvent]
  );
 
  const endIncident = useCallback(
    (incidentId) => {
      updateStatus(incidentId, "acknowledged");
    },
    [updateStatus]
  );
 
  return {
    incidents,
    stats,
    loading,
    error,
    dispatchSecurity,
    callContacts,
    endIncident,
  };
}