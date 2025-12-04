import React from "react";
import { useEffect, useRef, useState } from "react";

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
                  src="/pr-logo.jpeg"
                  alt="Pizza Records Logo"
                  className="h-7 w-7 rounded"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-tight leading-none">
                  Pizza Records
                </span>
                <span className="mt-0.5 text-[11px] text-slate-400 sm:text-xs">
                  New &amp; used vinyl · Tapes · CD&apos;s · Instruments · Live
                  Music
                </span>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 text-sm md:flex">
              <NavLink target="home">Home</NavLink>
              <NavLink target="shop">Shop</NavLink>
              <NavLink target="about">About</NavLink>
              <NavLink target="shows">Shows</NavLink>
              <NavLink target="visit">Visit</NavLink>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-100 hover:border-yellow-300 hover:text-yellow-200 md:hidden"
            >
              <span>{mobileOpen ? "Close" : "Menu"}</span>
            </button>
          </div>

          {/* Mobile nav links */}
          {mobileOpen && (
            <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm md:hidden">
              <NavLink target="home">Home</NavLink>
              <NavLink target="shop">Shop</NavLink>
              <NavLink target="about">About</NavLink>
              <NavLink target="shows">Shows</NavLink>
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
          className="relative h-[500px] w-full overflow-hidden border-b border-red-900/60"
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
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Pizza Records.
                <br />
                <span className="text-red-500">Where the music happens.</span>
              </h1>

              <p className="max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
                Pizza Records is a crate-digger&apos;s shop first and foremost:
                New releases, used gems, band tees; The kind of place where you
                lose an afternoon flipping sleeves. We also host a variety of
                shows most weekends!
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
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  The Shop
                </h2>

                <ul className="mt-2 space-y-2 text-sm text-slate-100">
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
                  Meet the owners, Devin &amp; Heather
                </h2>

                <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-red-900 shadow-lg">
                  <img
                    src="/pr-owners.jpg"
                    alt="Owners of Pizza Records"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  Pizza Records started as a small booth in a local antique
                  mall, fueled entirely by Devin and Heather’s shared love of
                  music. After a few months of unexpectedly strong sales, they
                  took a leap — moving into a tiny room inside a local
                  multi-business building. That tiny room eventually became a
                  bigger one, and when the opportunity came to grow again, they
                  moved into the shop’s current location. What started as a
                  booth has now become a full community record store, supported
                  at first by their own massive private collection of over
                  10,000 records.
                </p>

                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  For Devin and Heather, the heart of Pizza Records has always
                  been simple: the music. They opened the shop because they
                  loved records, loved sharing what they loved, and loved the
                  idea of creating a place where music isn’t just bought — it’s
                  felt. Hosting in-store musical performances was a natural part
                  of that dream, and they’ve become passionate supporters of the
                  local music scene. Seeing young musicians find their voice is
                  still one of their favorite parts of the job.
                </p>

                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  Their taste is broad — most days you’ll hear the store move
                  effortlessly from jazz to soul to classic rock. You’ll catch
                  them spinning everything from punk and raw rock ’n’ roll to
                  old rebel country, movie soundtracks, and everything in
                  between!
                </p>

                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  Above all, Devin and Heather want everyone who walks through
                  the doors of Pizza Records to feel comfort, excitement,
                  nostalgia, and love — the same emotions that fueled the shop
                  from day one.
                </p>
              </div>

              {/* RIGHT COLUMN (empty for now) */}
              <div />
            </div>
          </div>
        </SectionReveal>

        {/* Shows (light MKM touch) */}
        <SectionReveal
          id="shows"
          className="border-b border-red-900/60 bg-black/98"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Shows &amp; Events
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  We love live music as much as we love records. That&apos;s why
                  we host shows most weekends, featuring local and touring bands
                  across a variety of genres. From intimate acoustic sets to
                  full band rock shows, there&apos;s always something happening
                  at Pizza Records. Our partnership with MKM Entertainment helps
                  us bring quality sound and production to every event, no
                  matter the size.
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  To stay updated on upcoming shows, click the logo to visit
                  their site for the full calendar of upcoming shows and learn
                  how to book your own event at Pizza Records too!
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://mkmentertainmentllc.com/#shows"
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <img
                    src="/mkm-logo.png"
                    alt="MKM Entertainment"
                    className="h-64 w-auto object-contain hover:opacity-80 transition-opacity"                  />
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Visit / Contact */}
        <SectionReveal id="visit" className="bg-black">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <div className="grid gap-8 md:grid-cols-[3fr,2fr] md:items-start">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Visit Pizza Records
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
