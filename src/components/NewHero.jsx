import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Image } from "@react-three/drei";

// Import font (e.g., 'Inter', 'Montserrat', or 'Helvetica Neue')
const fontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap";
if (typeof window !== "undefined") {
  const link = document.createElement("link");
  link.href = fontUrl;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

const HERO_FONT = "Inter, Helvetica Neue, Arial, sans-serif";

export default function NewHero() {
  return (
    <section
      className="relative min-h-screen bg-white flex flex-col justify-center items-center px-4 md:px-8"
      style={{ fontFamily: HERO_FONT }}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto pt-32 md:pt-0">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mb-12 md:mb-0">
          <h1
            className="text-black font-[400] tracking-tight mb-8 text-center md:text-left"
            style={{
              fontFamily: HERO_FONT,
              fontWeight: 400,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            OrthoEdge
          </h1>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            <div className="flex-shrink-0">
              <div className="w-16 md:w-24 h-16 md:h-24 flex items-center justify-center">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 80 80"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="40" y1="10" x2="40" y2="70" />
                  <line x1="10" y1="40" x2="70" y2="40" />
                </svg>
              </div>
            </div>
            <div className="max-w-xl text-black text-base md:text-lg font-normal leading-relaxed text-center md:text-left">
              <p>
                Smiles, Simplified
                <br className="hidden md:block" />
                Your trusted source for orthodontic education, tips, and expert insights.
                <br className="hidden md:block" />
                Explore credible resources, actionable dental solutions, and
                expert-curated blogs designed to help you make informed choices
                for your smile.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="w-72 h-72 md:w-96 md:h-96 relative rounded-2xl overflow-hidden">
            {/* Subtle gradient fallback behind the canvas */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#f3f4f6,transparent_40%),radial-gradient(circle_at_70%_70%,#e5e7eb,transparent_40%)]" />
            <HeroInteractive />
          </div>
        </div>
      </div>
    </section>
  );
}

// === Interactive 3D cluster (hover/touch reactive) ===
function HeroInteractive() {
  const [hovered, setHovered] = useState(false);
  const target = useRef({ x: 0, y: 0 });

  const onMove = (e) => {
    const rect = e.target?.getBoundingClientRect ? e.target.getBoundingClientRect() : { left: 0, top: 0, width: 1, height: 1 };
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    target.current.x = x * 0.8;
    target.current.y = -y * 0.6;
  };

  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.5], fov: 50 }}
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
    group.current.rotation.y += (target.current.x - group.current.rotation.y) * 0.1;
    group.current.rotation.x += (target.current.y - group.current.rotation.x) * 0.1;
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
      <group ref={group}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
          {/* Display hero.png from public as a floating card */}
          <group position={[0, 0, 0]}>
            <Image url="/hero.png" scale={[3.1, 3.1, 1]} transparent toneMapped={false} />
          </group>
        </Float>
        {useMemo(() => [
          { p: [1.8, 0.2, 0], c: "#2563eb" },
          { p: [-1.6, -0.3, 0.2], c: "#10b981" },
          { p: [0.6, 1.4, -0.2], c: "#f59e0b" },
        ], []).map((s, i) => (
          <Float key={`orb-${i}`} speed={1.6 + i * 0.3} rotationIntensity={0.2} floatIntensity={0.6}>
            <mesh position={s.p}>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color={s.c} metalness={0.4} roughness={0.3} />
            </mesh>
          </Float>
        ))}
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[1.7, 0.03, 16, 180]} />
          <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.3} />
        </mesh>
      </group>
  <Environment preset="studio" />
    </>
  );
}
