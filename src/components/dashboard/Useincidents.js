import { useCallback, useEffect, useMemo, useState } from "react";
import { ref, onValue, update, push, remove } from "firebase/database";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export function Useincidents() {
  const { currentUser } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    // Scoped directly to your UID node matching your security rules
    const incidentsRef = ref(db, `incidents/${currentUser.uid}`);

    const unsubscribe = onValue(
      incidentsRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, incident]) => {
          let timeline = incident.timeline
            ? Object.entries(incident.timeline)
                .map(([entryId, entry]) => ({ id: entryId, ...entry }))
                .sort((a, b) => (a.at || 0) - (b.at || 0))
            : [];

          if (timeline.length === 0 && incident.createdAt) {
            timeline = [
              {
                id: "initial_sos",
                title: "SOS Alert Triggered",
                description: `Alert sent from hardware device ${incident.deviceId || "SENT-001"}`,
                state: "done",
                at: incident.createdAt,
              },
            ];
          }

          return {
            id,
            ...incident,
            timeline,
          };
        });

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
    const timelineRef = ref(db, `incidents/${currentUser.uid}/${incidentId}/timeline`);
    const newEntryRef = push(timelineRef);
    await update(newEntryRef, {
      at: Date.now(),
      title: event.title,
      description: event.description,
      state: "done",
    });
  }, [currentUser]);

  const updateStatus = useCallback(async (incidentId, nextStatus) => {
    await update(ref(db, `incidents/${currentUser.uid}/${incidentId}`), { status: nextStatus });
  }, [currentUser]);

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


const cancelIncident = useCallback(
    async (incidentId) => {
      await updateStatus(incidentId, "cancelled");
      await appendTimelineEvent(incidentId, {
        title: "Incident Cancelled",
        description: "The alert was cancelled by the user.",
      });
    },
    [updateStatus, appendTimelineEvent]
  );
const deleteIncident = useCallback(
    async (incidentId) => {
      const incidentRef = ref(db, `incidents/${currentUser.uid}/${incidentId}`);
      await remove(incidentRef);
    },
    [currentUser]
  );
  return {
    incidents,
    stats,
    loading,
    error,
    dispatchSecurity,
    callContacts,
    cancelIncident, 
    endIncident,     
    updateStatus,   
    deleteIncident
  };
  
}