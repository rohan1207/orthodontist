import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Image } from "@react-three/drei";

const HERO_FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
// Right-side visual uses hero.png card with torus + orbs (from Hero.jsx logic)

// Braces-like underline SVG under the title
function BracesUnderline() {
  const brackets = [60, 140, 220, 300, 360];
  return (
    <div
      className="mx-auto lg:mx-[110px] group"
      style={{ width: "clamp(160px, 38vw, 360px)", height: 32 }}
    >
      <svg
        viewBox="0 0 400 40"
        width="100%"
        height="100%"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#006D5B" />
            <stop offset="100%" stopColor="#B6E2D3" />
          </linearGradient>
        </defs>
        {/* Brackets */}
        {brackets.map((x, i) => (
          <g key={i}>
            {/* Side wings */}
            <rect
              x={x - 18}
              y={20}
              width={6}
              height={4}
              rx={1}
              fill="#ffffff"
              stroke="#006D5B"
              strokeWidth={1}
            />
            <rect
              x={x + 12}
              y={20}
              width={6}
              height={4}
              rx={1}
              fill="#ffffff"
              stroke="#006D5B"
              strokeWidth={1}
            />

            {/* Main bracket body */}
            <rect
              x={x - 10}
              y={15}
              width={20}
              height={14}
              rx={2}
              fill="#ffffff"
              opacity={0.98}
              stroke="#006D5B"
              strokeWidth={1.5}
            />
            {/* Slot */}
            <rect
              x={x - 6}
              y={19}
              width={12}
              height={6}
              rx={1.5}
              fill="#B6E2D3"
            />
            {/* Ligature */}
            <circle cx={x} cy={22} r={2} fill="#76c8b2" />
          </g>
        ))}
        {/* Straight archwire on top for visibility */}
        <line
          x1="0"
          y1="22"
          x2="400"
          y2="22"
          stroke="#006D5B"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 1px 3px rgba(0,109,91,0.25))" }}
          className="transition-transform duration-300 group-hover:-translate-y-[1px]"
        />
      </svg>
    </div>
  );
}

export default function NewHero() {
  const navigate = useNavigate();

  const scrollToFounder = () => {
    const founderSection = document.getElementById("founder");
    if (founderSection) {
      founderSection.scrollIntoView({ behavior: "smooth" , block: "center" });
    }
  };
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#DCE6D5] mt-16"
      style={{ fontFamily: HERO_FONT }}
    >
      {/* Subtle green wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#006D5B]/5 via-[#4B4B4B]/5 to-[#B6E2D3]/5" />

      {/* Minimal floating specks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.25)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-12 lg:pt-0">
            {/* === Left: Text Content === */}
            <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 relative">
              {/* Title */}
              <div className="space-y-2">
                <h1
                  className="font-bold tracking-tight leading-[1.1]"
                  style={{
                    fontSize: "clamp(2.5rem, 10vw, 5rem)",
                    background:
                      "linear-gradient(135deg, #006D5B 0%, #004B3F 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 4px 20px rgba(0, 109, 91, 0.15))",
                  }}
                >
                  OrthoChronicles
                </h1>

                <BracesUnderline />
              </div>

              {/* Sub-text */}
              <div className="space-y-3 ">
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Welcome to your one‑stop destination for a smoother, smarter, and more connected journey through Orthodontics.
                </p>

                <ul className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-semibold text-[#004B3F]">For BDS students:</span> master the basics with concise, evidence‑based articles and trusted resources.
                  </li>
                  <li>
                    <span className="font-semibold text-[#004B3F]">For postgraduates:</span> get strategic study tips, focused summaries, and exam‑oriented guidance.
                  </li>
                  <li>
                    <span className="font-semibold text-[#004B3F]">For practising clinicians:</span> stay current with breakthroughs, new technologies, AI‑driven products, and global trends.
                  </li>
                </ul>

                <p className="text-sm md:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Whether tackling coursework or upgrading treatment protocols, everything here is designed to make learning and practising orthodontics simpler, more efficient, and always up to date.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start -mt-8 ">
                <button
                  onClick={scrollToFounder}
                  className="group relative flex items-center justify-center bg-[#D6EDDS] text-[#006D5B] font-semibold border border-[#006D5B]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-visible"
                  style={{
                    width: "280px",
                    height: "65px",
                    borderRadius: "50px",
                  }}
                >
                  {/* Tooth peeks from top center on hover/click */}
                  <div className="pointer-events-none absolute left-1/2 top-0 z-[3] -translate-x-1/2 -translate-y-2 opacity-0 scale-90 transition-all duration-300 ease-out group-hover:-translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-active:translate-y-10 text-xl">
                    <img
                      src="/tooth_peak.png"
                      alt=""
                      className="w-16 h-16 drop-shadow-lg"
                    />
                  </div>
                  <span className="relative z-[2] flex items-center gap-2 text-lg">
                    Explore
                  </span>
                </button>

                <button
                  onClick={() => navigate("/exam-prep")}
                  className="group relative flex items-center justify-center bg-[#006D5B] text-white font-semibold border border-[#006D5B]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-visible"
                  style={{
                    width: "280px",
                    height: "65px",
                    borderRadius: "50px",
                  }}
                >
                  {/* Tooth peeks from top center on hover/click */}
                  <div className="pointer-events-none absolute left-1/2 top-0 z-[3] -translate-x-1/2 -translate-y-2 opacity-0 scale-90 transition-all duration-300 ease-out group-hover:-translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-active:translate-y-10 text-xl">
                    <img
                      src="/tooth_peak.png"
                      alt=""
                      className="w-16 h-16 drop-shadow-lg"
                    />
                  </div>
                  <span className="relative z-[2] text-lg">Start Learning</span>
                </button>
              </div>

            </div>

            {/* === Right: Interactive Visual === */}
            <div className="flex-1 w-full h-[350px] sm:h-[400px] lg:h-[550px] relative mt-8 lg:mt-0">
              <div className="absolute inset-0 rounded-2xl overflow-visible">
                <HeroInteractive />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <div
          className="w-8 h-12 border-2 rounded-full flex justify-center"
          style={{ borderColor: "#006D5B" }}
        >
          <div
            className="w-1 h-3 rounded-full mt-2 animate-pulse"
            style={{ backgroundColor: "#006D5B" }}
          />
        </div>
      </div>
    </section>
  );
}

// === Interactive 3D cluster (hover/touch reactive) — ported from Hero.jsx ===
function HeroInteractive() {
  const [hovered, setHovered] = useState(false);
  const target = useRef({ x: 0, y: 0 });

  const onMove = (e) => {
    const rect = e.target?.getBoundingClientRect
      ? e.target.getBoundingClientRect()
      : { left: 0, top: 0, width: 1, height: 1 };
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    target.current.x = x * 0.8;
    target.current.y = -y * 0.6;
  };

  return (
    <Canvas
      className="absolute inset-0 bg-transparent"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0);
        if (state.scene) state.scene.background = null;
      }}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        target.current.x = 0;
        target.current.y = 0;
      }}
      onPointerDown={() => setHovered(true)}
      onPointerUp={() => setHovered(false)}
    >
      <HeroScene hovered={hovered} target={target} />
    </Canvas>
  );
}

function HeroScene({ hovered, target }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y +=
      (target.current.x - group.current.rotation.y) * 0.1;
    group.current.rotation.x +=
      (target.current.y - group.current.rotation.x) * 0.1;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    const s = hovered ? 1.05 : 1.0;
    group.current.scale.x += (s - group.current.scale.x) * 0.08;
    group.current.scale.y = group.current.scale.x;
    group.current.scale.z = group.current.scale.x;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 5]} intensity={0.8} />
      <group ref={group} position={[0, -0.15, 0]}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
          {/* Display hero.png from public as a floating card */}
          <group position={[0, 0, 0]}>
            <Image
              url="/tooth2.png"
              scale={[3.1, 3.1, 1]}
              transparent
              toneMapped={false}
            />
          </group>
        </Float>
        {useMemo(
          () => [
            // Tailwind token names like 'green-100' are not valid CSS colors in three.js;
            // use our new color palette
            { p: [1.8, 0.2, 0], c: "#006D5B" },
            { p: [-1.6, -0.3, 0.2], c: "#006D5B" },
            { p: [0.6, 1.4, -0.2], c: "#006D5B" },
          ],
          []
        ).map((s, i) => (
          <Float
            key={`orb-${i}`}
            speed={1.6 + i * 0.3}
            rotationIntensity={0.2}
            floatIntensity={0.6}
          >
            <mesh position={s.p}>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial
                color={s.c}
                metalness={0.1}
                roughness={0.75}
              />
            </mesh>
          </Float>
        ))}
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[1.85, 0.03, 16, 180]} />
          <meshStandardMaterial
            color="#006D5B"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </group>
      <Environment preset="studio" />
    </>
  );
}
