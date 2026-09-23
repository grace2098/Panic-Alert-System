import { useCallback, useEffect, useMemo, useState } from "react";
import { ref, query, orderByChild, equalTo, onValue, update, push } from "firebase/database";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

// This is the real counterpart to the mock hook it replaced. Same public
// shape (incidents, stats, loading, error, dispatchSecurity, callContacts,
// endIncident) so nothing that consumes this hook needs to change --
// only what happens inside it.

export function Useincidents() {
  const { currentUser } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    // Scoped to just this user's own incidents -- matches the security
    // rules, which only ever grant read access to incidents you own.
    const incidentsQuery = query(
      ref(db, "incidents"),
      orderByChild("userId"),
      equalTo(currentUser.uid)
    );

    const unsubscribe = onValue(
      incidentsQuery,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, incident]) => ({
          id,
          ...incident,
          // Timeline is stored as an object of push-keyed entries (safer
          // for concurrent writes than a raw array), converted here into
          // a sorted array for the UI, ordered by when each event happened
          // rather than by key -- so a manually-seeded test entry sorts
          // correctly even if its key isn't a real push ID.
          timeline: incident.timeline
            ? Object.entries(incident.timeline)
                .map(([entryId, entry]) => ({ id: entryId, ...entry }))
                .sort((a, b) => (a.at || 0) - (b.at || 0))
            : [],
        }));

        list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setIncidents(list);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load incidents:", err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const stats = useMemo(() => {
    return {
      totalAlerts: incidents.length,
      activeAlerts: incidents.filter((i) => i.status === "active").length,
      acknowledged: incidents.filter((i) => i.status === "acknowledged").length,
      escalated: incidents.filter((i) => i.status === "escalated").length,
    };
  }, [incidents]);

  const appendTimelineEvent = useCallback(async (incidentId, event) => {
    const timelineRef = ref(db, `incidents/${incidentId}/timeline`);
    const newEntryRef = push(timelineRef);
    await update(newEntryRef, {
      at: Date.now(),
      title: event.title,
      description: event.description,
      state: "done",
    });
  }, []);

  const updateStatus = useCallback(async (incidentId, nextStatus) => {
    // A patch update on just the `status` child -- this only needs the
    // write permission defined on that specific field in the rules, not
    // permission over the whole incident node.
    await update(ref(db, `incidents/${incidentId}`), { status: nextStatus });
  }, []);

  const dispatchSecurity = useCallback(
    async (incidentId) => {
      await appendTimelineEvent(incidentId, {
        title: "Security Dispatched",
        description: "Campus security team notified.",
      });
      await updateStatus(incidentId, "escalated");
    },
    [appendTimelineEvent, updateStatus]
  );

  const callContacts = useCallback(
    async (incidentId) => {
      await appendTimelineEvent(incidentId, {
        title: "Contacts Called",
        description: "Outbound call initiated to your emergency contacts.",
      });
    },
    [appendTimelineEvent]
  );

  const endIncident = useCallback(
    async (incidentId) => {
      await updateStatus(incidentId, "acknowledged");
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