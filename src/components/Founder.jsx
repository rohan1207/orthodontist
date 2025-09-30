import { CheckBadgeIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

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
            <div className="mx-auto flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full">
              <img
                src="/user.jpeg"
                alt="Dr. Shravani Desai"
                className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
              />
            </div>
            <div className="mt-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#006D5B]/20 bg-[#DCE6D5]/80 px-3 py-1 text-[11px] md:text-xs text-[#006D5B] mb-3">
                <CheckBadgeIcon className="h-4 w-4 text-[#006D5B]" />
                Founder
              </div>
              <h3 className="font-display text-xl text-[#006D5B] md:text-3xl">
                Dr. Shravani Desai
              </h3>
              <p className="mt-2 text-xs md:text-sm text-[#4B4B4B]">
                MDS Orthodontics and Dentofacial Orthopaedics
              </p>
            </div>

            {/* Tagline */}
            <div className="mt-6 rounded-2xl border border-[#006D5B]/15 bg-white/90 p-3 md:p-4 text-[13px] md:text-sm text-[#4B4B4B]">
              <p className="italic text-center text-[#006D5B] font-medium">
                "Bright minds, brighter smiles"
              </p>
            </div>
          </div>
        </div>

        {/* Right: story and bio */}
        <div className="order-1 md:order-2 md:col-span-7">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#006D5B]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#006D5B] animate-pulse" />
              Meet the Founder
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#006D5B]">
              Hello, I'm Dr. Shravani
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#4B4B4B] md:mt-6 md:text-base">
              <p>
                My mission is simple: to make your journey through learning smoother and more effective. 
                Having completed my master's degree, I've experienced the highs, the challenges, and the 
                moments that test your patience and perseverance.
              </p>
              <p>
                I know how much a little guidance, encouragement and smart strategies can make a difference, 
                and that's exactly what I'm here to offer, helping you grow, stay motivated, and succeed 
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
