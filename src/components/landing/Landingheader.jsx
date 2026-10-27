
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Menu, X, ArrowRight } from "lucide-react";

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the screen gets wider
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      id="top-nav"
      className={`sticky top-0 z-50 w-full border-b border-outline-variant/60 bg-surface/95 backdrop-blur-lg transition-all duration-300 ${
        scrolled
          ? "shadow-lg shadow-black/5"
          : "shadow-sm shadow-black/2"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "py-3" : "py-4 sm:py-5"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="SENTINOA home"
          className="group flex shrink-0 items-center gap-2.5"
        >

          <span className="flex flex-col">
            <span className="text-xl font-extrabold tracking-[0.08em] text-primary sm:text-2xl">
              SENTINOA
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant sm:text-[10px]">
              Your safety, connected
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <a
            href="#top-nav"
            className="group relative rounded-lg px-4 py-2 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/5"
          >
            Home
            <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-110" />
          </a>

          <a
            href="#about"
            className="rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant transition-all duration-200 hover:bg-primary/5 hover:text-primary"
          >
            About
          </a>

          <a
            href="#features"
            className="rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant transition-all duration-200 hover:bg-primary/5 hover:text-primary"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant transition-all duration-200 hover:bg-primary/5 hover:text-primary"
          >
            How It Works
          </a>
        </nav>

        {/* Desktop authentication buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-on-surface-variant transition-all duration-200 hover:bg-primary/5 hover:text-primary"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0"
          >
            Get Started
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((previous) => !previous)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-outline-variant/70 text-on-surface transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-95 md:hidden"
        >
          <span
            className={`transition-transform duration-200 ${
              open ? "rotate-90" : "rotate-0"
            }`}
          >
            {open ? <X size={23} /> : <Menu size={25} />}
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-navigation"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="border-t border-outline-variant/60 bg-surface px-4 pb-5 pt-3 sm:px-6">
            <div className="flex flex-col gap-1">
              {[
                { label: "Home", href: "#top-nav" },
                { label: "About", href: "#about" },
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={open ? 0 : -1}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-on-surface-variant transition-all duration-200 hover:translate-x-1 hover:bg-primary/5 hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-outline-variant/50 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                tabIndex={open ? 0 : -1}
                className="flex items-center justify-center rounded-xl border border-outline-variant px-4 py-3 text-sm font-semibold text-on-surface transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                tabIndex={open ? 0 : -1}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Get Started
                <ArrowRight size={17} />
              </Link>
            </div>

            <p className="mt-4 text-center text-xs text-on-surface-variant">
              Your safety, connected.
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
