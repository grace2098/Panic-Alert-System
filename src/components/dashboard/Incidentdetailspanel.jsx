import { X, User, ShieldCheck, Phone, Octagon } from "lucide-react";

function UserAvatar({ user }) {
  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover border border-outline-variant"
      />
    );
  }
  // No uploaded photo yet — fall back to an icon avatar rather than a broken image.
  return (
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <User className="w-6 h-6 text-primary" />
    </div>
  );
}

function TimelineItem({ event, isLast }) {
  const dotClass =
    event.state === "pending"
      ? "bg-surface-dim border-4 border-outline-variant"
      : event.title.toLowerCase().includes("triggered")
        ? "bg-error border-4 border-error-container"
        : "bg-primary border-4 border-primary-fixed";

  return (
    <div className={`relative pl-xl ${isLast ? "" : "pb-lg"}`}>
      <div
        className={`absolute left-0 top-1 w-4 h-4 rounded-full ${dotClass}`}
      />
      <p className="font-bold text-label-md text-on-surface">
        {event.time ? `${event.time} - ${event.title}` : event.title}
      </p>
      <p className="text-label-sm text-on-surface-variant">
        {event.description}
      </p>
    </div>
  );
}

export default function Incidentdetailspanel({
  incident,
  isOpen,
  onClose,
  onDispatchSecurity,
  onCallContacts,
  onEndIncident,
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`w-full fixed inset-0 bg-on-background/40 backdrop-blur-sm z-60 transition-opacity  overflow-hidden duration-300 ${
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
                    {incident.user.name}
                  </p>
                  <p className="text-label-sm text-on-surface-variant">
                    Device: {incident.deviceId} • {incident.user.department}
                  </p>
                </div>
              </div>

              <div className="relative  h-48 rounded-2xl overflow-hidden border border-outline-variant shadow-sm group">
                <div
                  className="absolute inset-0  bg-cover bg-center transition-transform group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${incident.location.mapImageUrl}')`,
                  }}
                />
                <div className="absolute bottom-md left-md bg-surface/90 backdrop-blur px-sm py-xs rounded-lg text-label-sm font-bold shadow-sm">
                  {incident.location.lat.toFixed(4)}° N,{" "}
                  {incident.location.lng.toFixed(4)}° E
                </div>
              </div>

              <div className="">
                <h4 className="font-bold text-label-md text-on-surface-variant uppercase tracking-widest">
                  Incident Timeline
                </h4>
                <div className="relative pl-sm">
                  <div className="absolute left-1.75 top-2 bottom-2 w-0.5 bg-outline-variant" />
                  {incident.timeline.map((event, i) => (
                    <TimelineItem
                      key={event.id}
                      event={event}
                      isLast={i === incident.timeline.length - 1}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-md pt-lg">
                <button
                  type="button"
                  onClick={() => onDispatchSecurity(incident.id)}
                  className="w-full py-md bg-primary text-on-primary font-bold rounded-lg hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Dispatch Security
                </button>
                <button
                  type="button"
                  onClick={() => onCallContacts(incident.id)}
                  className="w-full py-md border border-primary text-primary font-bold rounded-lg hover:bg-primary-container/10 transition-all active:scale-95 flex items-center justify-center gap-xs"
                >
                  <Phone className="w-4 h-4" />
                  Call Contacts
                </button>
                <button
                  type="button"
                  onClick={() => onEndIncident(incident.id)}
                  className="w-full py-md bg-error text-on-error font-bold rounded-lg hover:shadow-md transition-all active:scale-95 col-span-2 flex items-center justify-center gap-xs"
                >
                  <Octagon className="w-4 h-4" />
                  End Incident
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
