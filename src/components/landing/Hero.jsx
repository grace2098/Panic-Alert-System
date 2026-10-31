const HERO_IMG =
  "/Group Of Students With Backpacks Walking On Campus.jpg";

export default function Hero() {
  return (
    <section id="about" className="relative  flex items-center justify-center overflow-hidden bg-surface-container-lowest p-5 rounded-4xl sm:rounded-5xl shadow-2xl  w-full">
      <div className="max-w-container-max mx-auto px-md sm:px-lg grid lg:grid-cols-2 items-center relative z-10 w-full ">
        <div className="space-y-lg gap-xl sm:space-y-xl  p-7">
          <div className="inline-flex items-center bg-primary/10 px-md py-xs rounded-full">
            <span className="text-label-sm text-primary uppercase">
              University Safety Standard
            </span>
          </div>
          <h1 className="font-display-lg text-[30px] leading-11 tracking-[-0.02em] font-bold sm:text-display-lg text-on-surface">
            Your Safety, <br />
            <span className="text-primary"> One Press Away.</span>
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-120 text-base">
            SENTINOA is a wearable emergency alert system designed to help you
            call for assistance when you need it most. With a simple press of a
            button, it sends an emergency alert with your location to your
            registered contacts, while incidents can be monitored through our
            web-based dashboard. Stay prepared. Stay connected. Stay safer.
          </p>
          <div className="flex flex-wrap items-center gap-lg sm:gap-xl pt-xl border-t border-outline-variant">
            <div>
              <p className="text-[26px] leading-8 sm:text-headline-lg font-black text-on-surface">
                99.9%
              </p>
              <p className="text-label-sm text-on-surface-variant">
                UPTIME RELIABILITY
              </p>
            </div>
            <div>
              <p className="text-[26px] leading-8 sm:text-headline-lg font-black text-on-surface">
                &lt;1m
              </p>
              <p className="text-label-sm text-on-surface-variant">
                ALERT LATENCY
              </p>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/5 rounded-4xl blur-3xl group-hover:bg-primary/10 transition-colors" />
          <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden mb-5 shadow-2xl border border-outline-variant">
            <img
              className="w-full h-auto object-cover"
              src={HERO_IMG}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
