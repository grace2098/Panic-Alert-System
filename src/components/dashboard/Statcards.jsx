import { ListChecks, TriangleAlert, CircleCheck, CircleAlert } from "lucide-react";
 
function StatCard({ icon: Icon, label, value, tint, valueClass = "text-on-surface" }) {
  return (
    <div className="bg-surface-container-lowest p-xl rounded-2xl shadow-sm border border-outline-variant flex items-center gap-lg">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${tint}`}>
        <Icon className="w-6 h-5" strokeWidth={2} />
      </div>
      <div>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          {label}
        </p>
        <p className={`font-bold text-headline-lg font-headline-lg ${valueClass}`}>{value}</p>
      </div>
    </div>
  );
}
 
export default function StatCards({ stats }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-3xl">
      <StatCard
        icon={ListChecks}
        label="Total Alerts"
        value={stats.totalAlerts.toLocaleString()}
        tint="bg-primary-container/20 text-primary"
      />
      <StatCard
        icon={TriangleAlert}
        label="Active Alerts"
        value={String(stats.activeAlerts).padStart(2, "0")}
        tint="bg-error-container/20 text-error"
        valueClass="text-error"
      />
      <StatCard
        icon={CircleCheck}
        label="Acknowledged"
        value={stats.acknowledged.toLocaleString()}
        tint="bg-primary-container/20 text-primary"
      />
      <StatCard
        icon={CircleAlert}
        label="Escalated"
        value={stats.escalated}
        tint="bg-tertiary-container/20 text-tertiary"
      />
    </section>
  );
}
 
