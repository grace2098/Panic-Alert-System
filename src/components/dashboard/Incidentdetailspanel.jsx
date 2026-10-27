import { X, User, CheckCircle2, Octagon } from "lucide-react";

function UserAvatar({ user }) {
  if (user && user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.name || "User"}
        className="w-12 h-12 rounded-full object-cover border border-outline-variant"
      />
    );
  }
  return (
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <User className="w-6 h-6 text-primary" />
    </div>
  );
}

function TimelineItem({ event, isLast }) {
  const isTriggered = event.title?.toLowerCase().includes("triggered");
  const isAck = event.title?.toLowerCase().includes("acknowledged");
  const isCancelled = event.title?.toLowerCase().includes("cancelled");

  const dotClass = isTriggered
    ? "bg-error border-error-container"
    : isAck
    ? "bg-primary border-primary-fixed"
    : isCancelled
    ? "bg-surface-variant border-outline"
    : "bg-tertiary border-tertiary-fixed";

  const timeFormatted = event.at
    ? new Date(event.at).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "";

  return (
    <div className={`relative pl-6 ${isLast ? "" : "pb-5 border-l-2 border-outline-variant ml-2"}`}>
      <div
        className={`absolute -left-[5px] top-1 w-3 h-3 rounded-full border-2 ${dotClass}`}
      />
      <div className="flex items-center justify-between gap-2">
        <p className="font-bold text-label-md text-on-surface">
          {event.title}
        </p>
        {timeFormatted && (
          <span className="text-label-sm text-on-surface-variant font-mono">
            {timeFormatted}
          </span>
        )}
      </div>
      <p className="text-label-sm text-on-surface-variant mt-0.5">
        {event.description}
      </p>
    </div>
  );
}

function buildMapEmbedUrl(lat, lng) {
  if (typeof lat !== "number" || typeof lng !== "number") return null;
  const delta = 0.006; // small bounding box around the point
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export default function Incidentdetailspanel({
  incident,
  isOpen,
  onClose,
  onAcknowledge,
  onCancelIncident,
}) {
  const embedUrl = incident
    ? buildMapEmbedUrl(incident.location?.lat, incident.location?.lng)
    : null;

  return (
    <>
      <div
        onClick={onClose}
        className={`w-full fixed inset-0 bg-on-background/40 backdrop-blur-sm z-60 transition-opacity overflow-hidden duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-105 max-w-full bg-surface-container-lowest shadow-2xl z-70 custom-scrollbar overflow-y-auto transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {incident && (
          <>
            <div className="p-lg border-b border-outline-variant sticky top-0 bg-surface-container-lowest z-10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-title-md font-title-md text-on-surface">
                  Incident Details
                </h3>
                <p className="text-label-sm text-on-surface-variant">
                  Alert ID:{" "}
                  <span className="font-bold text-primary">{incident.id}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-sm text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-lg flex flex-col gap-5 ">
              <div className="bg-surface p-md rounded-xl border border-outline-variant flex items-center gap-md">
                <UserAvatar user={incident.user} />
                <div>
                  <p className="font-bold text-on-surface">
                    {incident.user?.name || "Device Wearer"}
                  </p>
                  <p className="text-label-sm text-on-surface-variant">
                    Device: {incident.deviceId} • {incident.user?.department || "Campus User"}
                  </p>
                </div>
              </div>

              {incident.acknowledgedBy && (
                <div className="bg-primary/10 border border-primary/30 p-md rounded-xl flex flex-col gap-1">
                  <div className="flex items-center gap-xs text-primary font-bold text-label-md">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Acknowledged by {incident.acknowledgedBy}</span>
                  </div>
                  {incident.acknowledgedPhone && (
                    <p className="text-label-sm text-on-surface-variant">
                      Phone: <span className="font-mono">{incident.acknowledgedPhone}</span>
                    </p>
                  )}
                  {incident.acknowledgedText && (
                    <p className="text-label-sm text-on-surface italic mt-0.5">
                      Reply: "{incident.acknowledgedText}"
                    </p>
                  )}
                </div>
              )}

              {embedUrl ? (
                <div className="relative h-48 rounded-2xl overflow-hidden border border-outline-variant shadow-sm">
                  <iframe
                    title="Incident location"
                    src={embedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                  <div className="absolute bottom-md left-md bg-surface/90 backdrop-blur px-sm py-xs rounded-lg text-label-sm font-bold shadow-sm pointer-events-none">
                    {incident.location?.lat?.toFixed(4)}° N,{" "}
                    {incident.location?.lng?.toFixed(4)}° E
                  </div>
                </div>
              ) : (
                <div className="h-48 rounded-2xl border border-outline-variant flex items-center justify-center text-label-sm text-on-surface-variant">
                  No location data for this incident.
                </div>
              )}

              {incident.mapsLink && (
                <a
                  href={incident.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-label-sm text-primary font-bold hover:underline -mt-3"
                >
                  Open in Google Maps →
                </a>
              )}

              {/* Real-time Timeline Section */}
              <div className="pt-2">
                <h4 className="font-bold text-title-sm text-on-surface mb-3 flex items-center justify-between">
                  <span>Incident Timeline & Logs</span>
                  <span className="text-label-sm font-normal text-on-surface-variant">
                    {incident.timeline?.length || 0} event{(incident.timeline?.length === 1) ? "" : "s"}
                  </span>
                </h4>
                {incident.timeline && incident.timeline.length > 0 ? (
                  <div className="py-2">
                    {incident.timeline.map((event, idx) => (
                      <TimelineItem
                        key={event.id || idx}
                        event={event}
                        isLast={idx === incident.timeline.length - 1}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-label-sm text-on-surface-variant italic">
                    No timeline entries recorded yet.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-md pt-lg border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => onAcknowledge(incident.id)}
                  className="w-full py-md bg-primary text-on-primary font-bold rounded-lg hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Acknowledge
                </button>
                <button
                  type="button"
                  onClick={() => onCancelIncident(incident.id)}
                  className="w-full py-md bg-error text-on-error font-bold rounded-lg hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-xs"
                >
                  <Octagon className="w-4 h-4" />
                  Cancel Incident
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
