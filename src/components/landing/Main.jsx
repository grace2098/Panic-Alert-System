import { useEffect, useRef } from "react";
import Hero from "../landing/Hero.jsx";
import Features from "../landing/Features.jsx";
import Cta from "../landing/Cta.jsx";


function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 }
    );

    root.querySelectorAll(".glass-card").forEach((el) => {
      el.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-10");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ref]);
}

export default function Main() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <main ref={ref} className="w-full px-6 ">
      <Hero />
      <Features />
      <Cta />
    </main>
  );
}