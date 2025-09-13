import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Import the font from Google Fonts (Montserrat)
const fontUrl =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap";
if (typeof window !== "undefined") {
  const link = document.createElement("link");
  link.href = fontUrl;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

const HERO_BG = "#6ee7ef"; // Exact color from image (sampled)
const HEADLINE_FONT = "Montserrat, Arial, Helvetica, sans-serif";

const Hero = () => {
  const leftElementRef = useRef(null);
  const rightElementRef = useRef(null);

  useEffect(() => {
    // Scroll-based animation for decorative elements
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
      // Left element moves right, right element moves left
      if (leftElementRef.current) {
        gsap.to(leftElementRef.current, {
          x: scrollProgress * 220,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      if (rightElementRef.current) {
        gsap.to(rightElementRef.current, {
          x: -scrollProgress * 220,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16"
      style={{ backgroundColor: HERO_BG }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Rounded Button-like Element */}
        <div
          ref={leftElementRef}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: "50%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "2px solid #e0f7fa",
          }}
        >
          <span
            className="text-3xl font-bold text-teal-500"
            style={{ fontFamily: HEADLINE_FONT }}
          >
            OD
          </span>
        </div>
        {/* Bottom Right Rounded Button-like Element */}
        <div
          ref={rightElementRef}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: "rgba(13,148,136,0.15)",
            borderRadius: "50%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "2px solid #b2f5ea",
          }}
        >
          <span
            className="text-3xl font-bold text-white"
            style={{ fontFamily: HEADLINE_FONT }}
          >
            Smile
          </span>
        </div>
        {/* Small Dot */}
        <div
          className="absolute bottom-32 right-1/2 w-5 h-5 rounded-full"
          style={{ backgroundColor: "#0D9488", opacity: 0.7 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Headline */}
        <h1
          className="mb-8 tracking-tight"
          style={{
            fontFamily: HEADLINE_FONT,
            fontWeight: 900,
            fontSize: "6rem", // ~96px
            color: "#18344A",
            letterSpacing: "-0.04em",
            lineHeight: "0.95",
            textShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          Credible Ortho & Dental
          <br />
          <span style={{ color: "#fff", fontWeight: 900 }}>Education</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed font-normal"
          style={{
            fontFamily: HEADLINE_FONT,
            color: "#18344A",
            fontWeight: 400,
            fontSize: "1.25rem",
          }}
        >
          Trusted insights, modern solutions, and beautiful smiles.
        </p>

        {/* CTA Button */}
        <button
          className="bg-[#18344A] hover:bg-[#0D9488] text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg transition-all duration-300"
          style={{ fontFamily: HEADLINE_FONT, fontWeight: 700 }}
        >
          Start Learning
        </button>
      </div>
    </section>
  );
};

export default Hero;
