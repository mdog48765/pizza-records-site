import React, { useEffect, useRef, useState } from "react";
import { FAQSection } from "./components/FAQSection";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function NavLink({ target, children }) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(target)}
      className="text-sm font-medium text-slate-200 hover:text-yellow-300 transition-colors"
    >
      {children}
    </button>
  );
}

function SectionReveal({ id, className = "", children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`
        ${className}
        transform transition-all duration-1000 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
    >
      {children}
    </section>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-red-900/70 bg-black/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-3">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-black font-black tracking-tight">
                <img
                  src="/pr-logo.png"
                  alt="Pizza Records Logo"
                  className="h-7 w-7 rounded"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight leading-none">
                  Pizza Records
                </span>
                <span className="mt-0.5 text-[11px] text-slate-400 sm:text-xs">
                  Vinyl · Tapes · CD&apos;s · Instruments
                </span>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 text-sm md:flex">
              <NavLink target="home">Home</NavLink>
              <NavLink target="shop">Shop</NavLink>
              <NavLink target="about">About</NavLink>
              <NavLink target="faq">FAQ</NavLink>
              <NavLink target="visit">Visit</NavLink>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-100 hover:border-yellow-300 hover:text-yellow-200 transition-colors md:hidden"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">
                {mobileOpen ? "Close navigation" : "Open navigation"}
              </span>
              {mobileOpen ? (
                // X icon
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6l-12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile nav links */}
          {mobileOpen && (
            <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm md:hidden">
              <NavLink target="home">Home</NavLink>
              <NavLink target="shop">Shop</NavLink>
              <NavLink target="about">About</NavLink>
              <NavLink target="shows">Shows</NavLink>
              <NavLink target="faq">FAQ</NavLink>
              <NavLink target="visit">Visit</NavLink>
            </nav>
          )}
        </div>
      </header>

      {/* Main */}
      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative h-[300px] sm:h-[380px] md:h-[520px] w-full overflow-hidden border-b border-red-900/60"
        >
          {/* Background Video */}
          <video
            src="/Pr-website-walkthrough.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

          {/* Foreground Content */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-16 md:px-6 md:py-20">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Pizza Records
                <br />
                <span className="text-red-500">
                 Jacksonville, IL's Premiere Record Store
                </span>
              </h1>

              <p className="max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
                Pizza Records is a crate-digger&apos;s shop first and foremost:
                New releases, used gems, band tees; the kind of place where you
                lose an afternoon flipping sleeves. 
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToId("visit")}
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-black/80 px-5 py-2.5 text-sm font-medium text-slate-100 hover:border-yellow-300 hover:text-yellow-200 transition-colors"
                >
                  Store Info &amp; Hours
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Shop */}
        <SectionReveal id="shop" className="border-b border-red-900/60 bg-black">
          <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-16">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl max-w-md">
                  Vinyl, CDs, Tapes &amp; Music Gear
                </h2>

                <ul className="mt-6 space-y-2 text-sm text-slate-100">
                  <li>• New releases and reissues across multiple genres</li>
                  <li>• LP&apos;s, 45&apos;s, Tapes, CD&apos;s, 8-tracks</li>
                  <li>• Local band sections and small-run releases</li>
                  <li>
                    • Record players, speakers, instruments, amps, misc. music
                    gear
                  </li>
                </ul>

                <a
                  href="https://www.discogs.com/seller/PizzaRecordsJville/profile"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-yellow-400 bg-black/90 px-5 py-2.5 text-sm font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  Shop on Discogs
                </a>
              </div>

              {/* RIGHT COLUMN — STORE IMAGE */}
              <div className="w-full h-full">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-red-900 bg-black/80 shadow-xl">
                  <img
                    src="/the-shop.jpg"
                    alt="Inside Pizza Records"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>


        {/* About */}
        <SectionReveal
          id="about"
          className="border-b border-red-900/60 bg-black/98"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <div className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-start">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Meet the Owners, Devin &amp; Heather
                </h2>

                <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-red-900 shadow-lg">
                  <img
                    src="/pr-owners.jpg"
                    alt="Owners of Pizza Records"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>

<p className="mb-4 text-sm leading-relaxed text-slate-300 sm:text-base">
  Pizza Records started with Devin and Heather selling records out of a
  small booth at a local antique mall. After just a few months, sales
  were better than they expected, so they decided to give something
  bigger a shot. They moved into a tiny room in a building shared with
  other local businesses. Eventually, they outgrew that space, moved
  into a larger room, and later found the location they're in today.
  In the beginning, much of the store's inventory came straight from
  their own personal collection of more than 10,000 records.
</p>

<p className="mb-4 text-sm leading-relaxed text-slate-300 sm:text-base">
  For Devin and Heather, opening a record store was never just about
  selling records. They've always loved music and wanted a place
  where they could share that love with other people. What started
  as a hobby grew into a business built around discovering music,
  collecting records, and connecting with people who share that
  same passion.
</p>

<p className="mb-4 text-sm leading-relaxed text-slate-300 sm:text-base">
  Their taste in music covers just about everything. Walk into Pizza
  Records on any given day and you might hear jazz, soul, classic
  rock, punk, old-school rock 'n' roll, outlaw country, or even a
  movie soundtrack. There's really no telling what they'll have
  playing next.
</p>

<p className="text-sm leading-relaxed text-slate-300 sm:text-base">
  At the end of the day, Devin and Heather want Pizza Records to be
  a place people enjoy spending time. Whether you're digging
  through crates looking for an old favorite, discovering an artist
  you've never heard before, or just stopping in to see what's new,
  they want you to feel welcome. It's the same love of music that
  got them started, and it's what keeps the shop going today.
</p>

              </div>

              {/* RIGHT COLUMN (empty for now) */}
              <div />
            </div>
          </div>
        </SectionReveal>

         {/* FAQ Section */}
        <SectionReveal className="border-t border-red-900/60 bg-black/90">
          <FAQSection />
        </SectionReveal>

        {/* Visit / Contact */}
        <SectionReveal id="visit" className="bg-black">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <div className="grid gap-8 md:grid-cols-[3fr,2fr] md:items-start">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Visit Pizza Records in Jacksonville, IL
                </h2>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  Come flip through the racks, talk shop at the counter, and see
                  what&apos;s new on the wall.
                </p>

                <div className="space-y-2 text-sm text-slate-100">
                  <p>
                    <span className="font-semibold text-slate-50">
                      Address:
                    </span>{" "}
                    59 E Central Pk Plz, Jacksonville, IL 62650
                  </p>
                  <p>
                    <span className="font-semibold text-slate-50">
                      Hours:
                      <br />
                    </span>
                    • Mon 12pm–5pm
                    <br />• Tues–Thurs 12pm–7pm
                    <br />• Fri 12pm–8pm
                    <br />• Sat 10am–8pm (Closing hours may vary contingent on
                    shows)
                    <br />• Sun 10am–2pm
                  </p>
                  <p>
                    <span className="font-semibold text-slate-50">Phone:</span>{" "}
                    (217) 200-0896
                  </p>
                  <p>
                    <span className="font-semibold text-slate-50">Email:</span>{" "}
                    pizzarecords@aol.com
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2 text-sm">
                  <a
                    href="https://www.instagram.com/pizzarecords?igsh=cWp4NmQ1eno3Zml3"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-red-800 bg-black/80 px-4 py-1.5 text-slate-200 hover:border-yellow-300 hover:text-yellow-200 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/share/1D2UXPisWA/?mibextid=wwXlfr"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-red-800 bg-black/80 px-4 py-1.5 text-slate-200 hover:border-yellow-300 hover:text-yellow-200 transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              {/* Map card – smaller, centered */}
              <div className="space-y-3">
                <div className="mx-auto max-w-xl">
                  <div className="h-64 w-full overflow-hidden rounded-2xl border border-red-900 bg-black/80 shadow-lg">
                    <iframe
                      title="Pizza Records Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3140.174716509843!2d-90.23048462402264!3d39.73375807155775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87dfebfe22229f6b%3A0xa24f3eeaa41e6bb6!2s59%20E%20Central%20Pk%20Plz%2C%20Jacksonville%2C%20IL%2062650!5e1!3m2!1sen!2sus!4v1764783008172!5m2!1sen!2sus"
                      className="h-full w-full border-0"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Footer */}
        <footer className="border-t border-red-900 bg-black py-4">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-slate-500 md:flex-row md:px-6">
            <span>
              © {new Date().getFullYear()} Pizza Records. All rights reserved.
            </span>

            <span className="text-slate-600">
              Site designed &amp; developed by{" "}
              <span className="text-slate-300">Michael Kyle</span>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
