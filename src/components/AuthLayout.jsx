// Shared shell for Login and Signup so the two screens stay visually
// consistent and neither page has to re-implement the brand panel.
//
// The signature element is the pulsing beacon in the left panel: three
// concentric rings expanding outward from a fixed dot, on staggered
// delays, echoing what the physical SOS button does when pressed. It's
// the one place this design spends its "boldness" -- the form panel on
// the right stays quiet and unremarkable on purpose, because a login
// form's job is to be fast and legible, not decorative.

import { Link } from "react-router-dom";

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen bg-ink text-slate-100">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-linear-to-b from-[#0B0F1A] to-[#131B2E] p-12 lg:flex">
        <Link to="/" className="font-display text-xl tracking-tight text-slate-50">
          SENTINOA
        </Link>

        <div className="relative flex flex-1 items-center justify-center" aria-hidden="true">
          <span className="absolute h-3 w-3 rounded-full bg-signal shadow-[0_0_20px_4px_rgba(245,166,35,0.55)]" />
          <span className="absolute h-24 w-24 animate-ping rounded-full border border-signal/40" />
          <span className="absolute h-44 w-44 animate-ping rounded-full border border-signal/25 [animation-delay:600ms]" />
          <span className="absolute h-64 w-64 animate-ping rounded-full border border-signal/10 [animation-delay:1200ms]" />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            UNN Campus Safety Network
          </p>
          <p className="max-w-sm font-display text-2xl leading-snug text-slate-100">
            One press. Location, contacts, and campus security notified in seconds.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">{eyebrow}</p>
          <h1 className="mt-2 font-display text-3xl text-slate-50">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-8 text-sm text-slate-400">{footer}</div>}
        </div>
      </div>
    </div>
  );
}