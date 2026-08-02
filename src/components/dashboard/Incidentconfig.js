// Central display config for incident status + escalation levels.
// Keeping this in one place means the table, filters, and details panel
// can never drift out of sync on colors/labels.
 
export const STATUS = {
  active: {
    label: "Active",
    badgeClass: "bg-error-container text-on-error-container",
    dotClass: "bg-error animate-pulse-red",
  },
  awaiting: {
    label: "Awaiting",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    dotClass: null,
  },
  acknowledged: {
    label: "Acknowledged",
    badgeClass: "bg-primary-container text-on-primary-container",
    dotClass: null,
  },
  cancelled: {
    label: "Cancelled",
    badgeClass: "bg-surface-container-high text-on-surface-variant",
    dotClass: null,
  },
  escalated: {
    label: "Escalated",
    badgeClass: "bg-error text-on-error",
    dotClass: null,
  },
};
 
export const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "awaiting", label: "Awaiting Response" },
  { key: "acknowledged", label: "Acknowledged" },
  { key: "cancelled", label: "Cancelled" },
  { key: "escalated", label: "Escalated" },
];
 
export const ESCALATION_LABELS = {
  0: "Immediate Local Response",
  1: "Regional Security Dispatch",
  2: "Campus-Wide Alert",
};
 
export function formatDateTime(isoString) {
  const d = new Date(isoString);
  const datePart = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${datePart} · ${timePart}`;
}
 