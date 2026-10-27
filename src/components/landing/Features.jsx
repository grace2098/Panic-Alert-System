import { Hand, Send, CloudUpload, ClipboardList, ShieldCheck, Radio } from "lucide-react";
const VITALS_IMG =
  "/public/Education concept smiling black female student showing thumb up while posing outdoors _ Premium Photo.jpg";

const steps = [
  {
    icon: Hand,
    title: "1. Activate SOS",
    text: "When the user presses the device's SOS button, SENTINOA initiates the emergency alert process and provides a vibration as feedback to indicate activation.",
  },
  {
    icon: Send,
    title: "2. Send Emergency Alert",
    text: "The device retrieves the user's GPS coordinates and sends an SMS containing their location and the alert time to a registered emergency contact, without requiring a smartphone or internet connection.",
  },
  {
    icon: CloudUpload,
    title: "3. Log and Monitor Incidents",
    text: "When internet connectivity is available, incident details can be recorded on the SENTINOA web dashboard, allowing authorised users to review alerts, track their status, and access incident history.",
  },
];
const smallFeatures = [
  {
    icon: ClipboardList,
    bg: "bg-tertiary-fixed",
    fg: "text-on-tertiary-fixed",
    title: "Actionable Insights",
    text: "Stores emergency incident records on the web dashboard when internet connectivity is available, allowing authorised users to review alert details, locations, timestamps, and incident statuses.",
  },
  {
    icon: ShieldCheck,
    bg: "bg-primary-fixed",
    fg: "text-on-primary-fixed",
    title: "Seamless Integration",
    text: "Provides security personnel with access to reported incident locations and alert information to support incident assessment, follow-up, and emergency response.",
  },
  {
    icon: Radio,
    bg: "bg-surface-container-highest",
    fg: "text-on-surface",
    title: "7-Day Endurance",
    text: "Sends emergency SMS notifications containing the user's location and alert time to a registered contact without requiring a smartphone or internet connection.",
  },
];

export default function Features() {
  return (
    <>
      <section id="how-it-works" className="py-3xl bg-surface">
        <div className="max-w-container-max justify-center gap-5 mx-auto px-md sm:px-lg">
          <div className="text-center mt-2xl mb-xl md:mb-2xl">
            <h2 className="font-headline-lg text-[26px] leading-8 sm:text-headline-lg  font-semibold pb-5">
              How It Works
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Three layers of redundant communication ensuring no signal is ever
              lost when it matters most.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg md:gap-xl">
            {steps.map((s, i) => {
              const Icon = s.icon;

              return (
                <div
                  key={s.title}
                  className={`glass-card p-lg md:p-xl rounded-2xl shadow-sm hover:shadow-md border-b-4 border-primary ${
                    i === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="w-16 h-16 bg-surface-container rounded-xl flex items-center justify-center mb-lg">
                    <Icon
                      className="text-primary"
                      size={32}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="font-title-md text-title-md font-semibold mb-sm">
                    {s.title}
                  </h3>

                  <p className="text-on-surface-variant text-body-md">
                    {s.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="p-xl rounded-2xl  bg-surface-container-low">
        <div className=" ">
          <div className="">
            <div className="">
              <h2 className="font-headline-lg text-[20px] leading-8 sm:text-headline-lg mb-md font-semibold">
                Safety Features
              </h2>
              <p className="text-[13px] text-on-surface-variant">
                The SENTINOA ecosystem is built on the pillars of reliability,
                integration, and user-centric design.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-lg md:gap-xl mt-2xl">
            <div className="glass-card col-span-12 lg:col-span-7 p-lg md:p-xl rounded-3xl md:rounded-4xl flex flex-col justify-between lg:min-h-100">
              <div>
                <div className="flex justify-between items-start gap-md mb-lg md:mb-xl">
                  <span className="bg-primary/10 text-primary px-md py-xs rounded-full text-label-sm">
                    EMERGENCY INCIDENT LOGGING
                  </span>
                </div>
                <h3 className="text-[26px] leading-8 sm:text-headline-lg font-bold mb-md">
                  Incident Tracking & Monitoring
                </h3>
                <p className="text-s text-on-surface-variant ">
                  SENTINOA records emergency incidents on its web dashboard when
                  internet connectivity is available. Authorised users can
                  review alert details, view reported locations, monitor
                  incident statuses, and access past records to support
                  emergency response and follow-up.
                </p>
              </div>
              <div className="mt-xl h-70 bg-surface-container rounded-2xl overflow-hidden relative border border-outline-variant">
                <img
                  className="w-full h-full object-cover"
                  src={VITALS_IMG}
                  alt="A university student's hand holding a sleek, rectangular smart key card."
                />
              </div>
            </div>

            {/* SOS */}
            <div className="col-span-12 lg:col-span-5 bg-error text-on-error p-lg md:p-xl rounded-3xl md:rounded-4xl flex flex-col items-center justify-center text-center space-y-lg relative overflow-hidden min-h-80">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size-[20px_20px]" />
              </div>
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center emergency-pulse shadow-2xl relative z-10">
                <span
                  className="material-symbols-outlined text-error text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sos
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-title-md font-bold mb-sm">
                  One-Touch Rescue
                </h3>
                <p className="text-on-error/80 text-body-md px-md">
                  With a single press of the SOS button, SENTINOA sends an
                  emergency SMS containing the user's location and alert time to
                  a registered contact, without relying on a smartphone or
                  internet connection.
                </p>
              </div>
            </div>

            {/* Small cards */}
            {smallFeatures.map((f, i) => (
              <div
                key={f.title}
                className={`glass-card col-span-12 sm:col-span-6 lg:col-span-4 p-lg rounded-3xl md:rounded-4xl border border-outline-variant ${
                  i === 2 ? "sm:col-span-12" : ""
                } ${i === 2 ? "lg:col-span-4" : ""}`}
              >
                <div
                  className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-md`}
                >
                  <f.icon className={f.fg} size={24} strokeWidth={1.8} />
                </div>
                <h4 className="font-title-md text-title-md mb-xs">{f.title}</h4>
                <p className="text-on-surface-variant text-label-md">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
