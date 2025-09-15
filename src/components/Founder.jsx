import { useState } from "react";
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

export default function Founder() {
  const [showServices, setShowServices] = useState(true);

  return (
    <section
      id="founder"
      className="relative isolate overflow-hidden pt-6 pb-8 md:pt-12 md:pb-24 md:-mt-12"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-8 md:gap-10 px-4 md:grid-cols-12 md:px-6">
        {/* Left: portrait / identity card */}
        <div className="order-2 md:order-1 md:col-span-5">
          <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-4 md:p-6 shadow-xl backdrop-blur-md">
            {/* avatar */}
            <div className="mx-auto flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full ">
              <img
                src="/user.jpeg"
                alt="Dr. Shravani"
                className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
              />
            </div>
            <div className="mt-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 py-1 text-[11px] md:text-xs text-stone-700">
                <CheckBadgeIcon className="h-4 w-4 text-teal-700" />
                Founder & Lead Dentist
              </div>
              <h3 className="mt-3 font-display text-xl text-stone-900 md:text-3xl">
                Dr. Shravani
              </h3>
              <p className="mt-2 text-xs md:text-sm text-stone-600">
                BDS, MDS - Orthodontics
              </p>
              <p className="text-xs md:text-sm text-stone-600">Orthodontist</p>
            </div>

            {/* credentials highlights */}
            <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3 text-center">
              <div className="rounded-xl bg-white/80 p-2.5 md:p-3 shadow-sm">
                <ClockIcon className="mx-auto h-5 w-5 text-teal-700" />
                <div className="mt-1 text-xs text-stone-500">Experience</div>
                <div className="text-[13px] md:text-sm font-semibold text-stone-900">
                  10 yrs
                </div>
              </div>
              <div className="rounded-xl bg-white/80 p-2.5 md:p-3 shadow-sm">
                <BriefcaseIcon className="mx-auto h-5 w-5 text-amber-600" />
                <div className="mt-1 text-xs text-stone-500">Specialist</div>
                <div className="text-[13px] md:text-sm font-semibold text-stone-900">
                  8 yrs
                </div>
              </div>
              <div className="rounded-xl bg-white/80 p-2.5 md:p-3 shadow-sm">
                <ShieldCheckIcon className="mx-auto h-5 w-5 text-teal-700" />
                <div className="mt-1 text-xs text-stone-500">Registration</div>
                <div className="text-[13px] md:text-sm font-semibold text-stone-900">
                  Verified
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-stone-100 bg-white/80 p-3 md:p-4 text-[13px] md:text-sm text-stone-700">
              <p>
                Completed BDS from a reputed institution (2014) and MDS in Orthodontics & Dentofacial Orthopedics (2017).
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-[11px] md:text-xs font-medium text-teal-800">
                <AcademicCapIcon className="h-4 w-4" /> Credentials verified
              </div>
            </div>
          </div>
        </div>

        {/* Right: story, services, actions */}
        <div className="order-1 md:order-2 md:col-span-7">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-stone-700">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
              Meet the Founder
            </div>
            <h2 className="font-display text-[28px] leading-[1.15] text-stone-900 sm:text-[38px] md:text-[56px]">
              Crafting beautiful smiles with precision and care
            </h2>

            <p className="mt-4 md:mt-5 text-[15px] leading-relaxed text-stone-700 sm:text-lg">
              Dr. Shravani is an Orthodontist with 10 years of experience,
              known for a patient-first approach and creating beautiful, healthy smiles. She specializes in modern orthodontic treatments that are comfortable and effective.
            </p>

            <div className="mt-5 md:mt-6 flex flex-wrap gap-3">
              <a
                href="/book"
                className="rounded-full bg-green-500 px-4 py-2.5 md:px-5 md:py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
              >
                Book a consultation
              </a>
              <a
                href="#contact"
                className="rounded-full border border-stone-300 bg-white/80 px-4 py-2.5 md:px-5 md:py-3 text-sm font-semibold text-stone-800 backdrop-blur-sm hover:border-stone-400"
              >
                About OrthoChronicles
              </a>
            </div>

            {/* Services */}
            <div className="mt-6 md:mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                  Key Procedures
                </h3>
                <button
                  onClick={() => setShowServices((v) => !v)}
                  className="text-xs font-medium text-stone-600 hover:text-stone-900"
                  aria-expanded={showServices}
                >
                  {showServices ? "Hide" : "Show"}
                </button>
              </div>
              {showServices && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {SERVICES.map((s, i) => (
                    <li key={i}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-3 py-1.5 text-[11px] md:text-xs text-stone-700 shadow-sm transition hover:border-stone-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Trust card */}
            <div className="mt-6 md:mt-8 flex items-center gap-3 rounded-2xl border border-stone-100 bg-white/80 p-3 md:p-4 text-[13px] md:text-sm text-stone-700 shadow-sm">
              <ShieldCheckIcon className="h-5 w-5 text-teal-700" />
              Medical Registration Verified. Evidence‑based care and transparent
              outcomes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
