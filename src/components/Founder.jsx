import {
  CheckBadgeIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const SERVICES = [
  "Metal Braces",
  "Ceramic Braces",
  "Invisalign Aligners",
  "Retainers",
  "Jaw Surgery Consultation",
];

const HERO_FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative isolate overflow-hidden pt-6 pb-8 md:pt-12 md:pb-24 mt-0 bg-[#DCE6D5]/40"
      style={{ fontFamily: HERO_FONT }}
    >
      <div className="mx-auto grid max-w-7xl items-start gap-8 md:gap-10 px-4 md:grid-cols-12 md:px-6">
        {/* Left: portrait / identity card */}
        <div className="order-2 md:order-1 md:col-span-5">
          <div className="group relative overflow-hidden rounded-3xl border border-[#006D5B]/10 bg-[#DCE6D5]/70 p-4 md:p-6 shadow-xl backdrop-blur-md">
            {/* avatar */}
            <div className="mx-auto flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full ">
              <img
                src="/user.jpeg"
                alt="Dr. Shravani"
                className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
              />
            </div>
            <div className="mt-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#006D5B]/20 bg-[#DCE6D5]/80 px-3 py-1 text-[11px] md:text-xs text-[#006D5B]">
                <CheckBadgeIcon className="h-4 w-4 text-[#006D5B]" />
                Founder & Lead Dentist
              </div>
              <h3 className="mt-3 font-display text-xl text-[#006D5B] md:text-3xl">
                Dr. Shravani
              </h3>
              <p className="mt-2 text-xs md:text-sm text-[#4B4B4B]">
                BDS, MDS - Orthodontics
              </p>
              <p className="text-xs md:text-sm text-[#4B4B4B]">Orthodontist</p>
            </div>

            {/* credentials highlights */}
            <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3 text-center">
              <div className="rounded-xl bg-white/90 p-2.5 md:p-3 shadow-sm border border-[#006D5B]/10">
                <ClockIcon className="mx-auto h-5 w-5 text-[#006D5B]" />
                <div className="mt-1 text-xs text-[#4B4B4B]">Experience</div>
                <div className="text-[13px] md:text-sm font-semibold text-[#006D5B]">
                  10 yrs
                </div>
              </div>
              <div className="rounded-xl bg-white/90 p-2.5 md:p-3 shadow-sm border border-[#006D5B]/10">
                <BriefcaseIcon className="mx-auto h-5 w-5 text-[#006D5B]" />
                <div className="mt-1 text-xs text-[#4B4B4B]">Specialist</div>
                <div className="text-[13px] md:text-sm font-semibold text-[#006D5B]">
                  8 yrs
                </div>
              </div>
              <div className="rounded-xl bg-white/90 p-2.5 md:p-3 shadow-sm border border-[#006D5B]/10">
                <ShieldCheckIcon className="mx-auto h-5 w-5 text-[#006D5B]" />
                <div className="mt-1 text-xs text-[#4B4B4B]">Registration</div>
                <div className="text-[13px] md:text-sm font-semibold text-[#006D5B]">
                  Verified
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#006D5B]/15 bg-white/90 p-3 md:p-4 text-[13px] md:text-sm text-[#4B4B4B]">
              <p>
                Completed BDS from a reputed institution (2014) and MDS in
                Orthodontics & Dentofacial Orthopedics (2017).
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#B6E2D3]/30 px-3 py-1 text-[11px] md:text-xs font-medium text-[#006D5B]">
                <AcademicCapIcon className="h-4 w-4" /> Credentials verified
              </div>
            </div>
          </div>
        </div>

        {/* Right: story, services, actions */}
        <div className="order-1 md:order-2 md:col-span-7">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#006D5B]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#006D5B] animate-pulse" />
              Meet the Founder
            </div>
            <h2
              className="font-display text-[28px] leading-[1.15] sm:text-[38px] md:text-[56px] font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #006D5B 0%, #004B3F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 4px 16px rgba(0, 109, 91, 0.12))",
              }}
            >
              Crafting beautiful smiles with precision and care
            </h2>

            <p className="mt-4 md:mt-5 text-[15px] leading-relaxed text-[#4B4B4B] sm:text-lg">
              Dr. Shravani is an Orthodontist with 10 years of experience, known
              for a patient-first approach and creating beautiful, healthy
              smiles. She specializes in modern orthodontic treatments that are
              comfortable and effective.
            </p>

            <div className="mt-5 md:mt-6 flex flex-wrap gap-3">
              <a
                href="/about"
                className="rounded-full border border-[#006D5B]/20 bg-[#DCE6D5]/70 px-5 py-3 text-sm font-semibold text-[#006D5B] backdrop-blur-sm shadow hover:shadow-md hover:bg-[#DCE6D5]/90 transition-all"
              >
                About OrthoChronicles
              </a>
              <a
                href="/book"
                className="rounded-full bg-[#006D5B] px-5 py-3 text-sm font-semibold text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-[#004B3F]"
              >
                Book a consultation
              </a>
            </div>

            {/* Services */}
            <div className="mt-6 md:mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#006D5B]">
                  Key Procedures
                </h3>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SERVICES.map((s, i) => (
                  <li key={i}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#006D5B]/20 bg-white/80 px-3 py-1.5 text-[11px] md:text-xs text-[#006D5B] shadow-sm transition hover:border-[#006D5B]/30 hover:bg-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#006D5B]" />
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust card */}
            <div className="mt-6 md:mt-8 flex items-center gap-3 rounded-2xl border border-[#006D5B]/15 bg-white/90 p-3 md:p-4 text-[13px] md:text-sm text-[#4B4B4B] shadow-sm">
              <ShieldCheckIcon className="h-5 w-5 text-[#006D5B]" />
              Medical Registration Verified. Evidence‑based care and transparent
              outcomes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
