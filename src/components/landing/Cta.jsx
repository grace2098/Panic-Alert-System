export default function Cta() {
  return (
    <section className="py-3xl mt-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary rounded-3xl" />
      <div className="max-w-container-max mx-auto px-md sm:px-lg relative z-10 text-center text-on-primary">
        <h2 className="font-display-lg text-[30px] leading-9.5 tracking-[-0.02em] font-bold sm:text-display-lg mb-lg md:mb-xl">
          A Safer Campus Starts with SENTINOA
        </h2>
        <p className="text-body-lg mb-xl md:mb-2xl  mx-auto opacity-90">
          Strengthen campus safety with a wearable emergency alert system that
          sends SOS notifications with location details and supports incident
          monitoring through a dedicated web dashboard.
        </p>
      </div>
    </section>
  );
}
