import { MapPin, Eye, Download, Inbox } from "lucide-react";
import { STATUS, ESCALATION_LABELS, formatDateTime } from "../dashboard/Incidentconfig";
 
function StatusBadge({ status }) {
  const config = STATUS[status];
  return (
    <span
      className={`inline-flex items-center gap-xs px-md py-xs rounded-full text-label-sm font-bold ${config.badgeClass}`}
    >
      {config.dotClass && <div className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />}
      {config.label}
    </span>
  );
}
 
function EmptyState() {
  return (
    <tr>
      <td colSpan={7} className="px-lg py-3xl text-center">
        <div className="flex flex-col items-center gap-sm text-on-surface-variant">
          <Inbox className="w-10 h-10" strokeWidth={1.5} />
          <p className="font-bold text-on-surface">No incidents match your search</p>
          <p className="text-label-sm">Try a different filter or clear your search.</p>
        </div>
      </td>
    </tr>
  );
}
 
export default function IncidentTable({ incidents, onViewIncident }) {
  return (
    <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse text-left">
          <thead className="bg-surface-container border-b border-outline-variant">
            <tr>
              <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Alert ID</th>
              <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Date & Time</th>
              <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Device ID</th>
              <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Escalation</th>
              <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Location</th>
              <th className="px-lg py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {incidents.length === 0 && <EmptyState />}
            {incidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-surface transition-colors">
                <td className="px-lg py-lg font-label-md text-label-md text-primary font-bold">
                  {incident.id}
                </td>
                <td className="px-lg py-lg font-body-md text-body-md text-on-surface">
                  {formatDateTime(incident.createdAt)}
                </td>
                <td className="px-lg py-lg font-body-md text-body-md text-on-surface">
                  {incident.deviceId}
                </td>
                <td className="px-lg py-lg">
                  <StatusBadge status={incident.status} />
                </td>
                <td className="px-lg py-lg">
                  <div className="flex flex-col">
                    <span className="text-label-md font-bold text-tertiary">
                      Level {incident.escalationLevel}
                    </span>
                    <span className="text-label-sm text-on-surface-variant">
                      {ESCALATION_LABELS[incident.escalationLevel]}
                    </span>
                  </div>
                </td>
                <td className="px-lg py-lg">
                  <button
                    type="button"
                    onClick={() => onViewIncident(incident.id)}
                    className="flex items-center gap-xs px-md py-xs border border-outline-variant hover:bg-surface-variant transition-colors rounded-lg font-label-md text-label-md"
                  >
                    <MapPin className="w-4 h-4" />
                    View Map
                  </button>
                </td>
                <td className="px-lg py-lg text-right">
                  <div className="flex items-center justify-end gap-sm">
                    <button
                      type="button"
                      onClick={() => onViewIncident(incident.id)}
                      title="View incident details"
                      className="p-xs text-primary hover:bg-primary-container/20 rounded transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      title="Download report"
                      className="p-xs text-on-surface-variant hover:bg-surface-variant rounded transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
