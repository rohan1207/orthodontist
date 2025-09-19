import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Image } from "@react-three/drei";

const HERO_FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
// Right-side visual uses hero.png card with torus + orbs (from Hero.jsx logic)

export default function NewHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-visible bg-[#D1E7FF] mt-16"
      style={{ fontFamily: HERO_FONT }}
    >
  {/* Subtle blue wash */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#004492]/5 via-[#1E5AA5]/5 to-[#60A5FA]/5" />

      {/* Minimal floating specks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: "rgba(0, 68, 146, 0.25)",
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
        className={`relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-8 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/85 backdrop-blur-md border border-[#004492]/30 rounded-full px-5 py-2.5 md:px-6 md:py-3 shadow-lg">
                <div className="w-2 h-2 bg-[#004492] rounded-full animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-slate-700">
                Trusted Orthodontic Resources
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1
                  className="font-bold tracking-tight leading-[0.95]"
                  style={{
                    // Smaller minimum on phones, unchanged on larger screens
                    fontSize: "clamp(1.8rem, 8vw, 5rem)",
                    background:
                      "linear-gradient(135deg, #004492 0%, #1E5AA5 50%, #60A5FA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 4px 20px rgba(0, 68, 146, 0.15))",
                  }}
                >
                  OrthoChronicles
                </h1>

                <div className="h-1 w-24 bg-gradient-to-r from-[#004492] to-[#60A5FA] rounded-full mx-auto lg:mx-0 shadow-lg" />
              </div>

              {/* Subtitle */}
              <div className="space-y-6">
                <p className="text-base md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  <span className="font-semibold text-black">
                    Cracked NEET MDS?
                  </span>{" "}
                  Your orthodontic journey starts here! 
                </p>

                <p className="text-sm md:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  From clinics to exams—we make the tough stuff simple. Get
                  summaries, reviews, strategies & trusted resources.
                </p>

                <p className="text-xs md:text-base text-transparent bg-gradient-to-r from-[#004492] to-[#1E5AA5] bg-clip-text font-medium">
                  Your academic anchor 🦷
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="group relative flex items-center justify-center bg-gradient-to-r from-[#1E5AA5] to-[#004492] text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{
                    width: "300px",
                    height: "79px",
                    borderRadius: "50px",
                  }}
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#004492] to-[#00306A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Flower enters from behind to top-right and spins while hovered */}
                  <div
                    className="pointer-events-none absolute top-2 right-2 z-[1] transform translate-x-6 -translate-y-6 opacity-0 scale-75 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:opacity-100 group-hover:scale-100"
                  >
                    <img
                      src="/flower.png"
                      alt=""
                      className="w-14 h-14 group-hover:animate-[spin_6s_linear_infinite]"
                    />
                  </div>
                  <span className="relative z-[2] flex items-center gap-2">
                    Explore
                  </span>
                </button>

                <button
                  className="group relative flex items-center justify-center bg-white/80 backdrop-blur-md text-slate-700 font-semibold border border-slate-200/50 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{
                    width: "300px",
                    height: "79px",
                    borderRadius: "50px",
                  }}
                >
                  {/* Flower enters from behind to top-right and spins while hovered */}
                  <div
                    className="pointer-events-none absolute top-2 right-2 z-[1] transform translate-x-6 -translate-y-6 opacity-0 scale-75 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:-translate-y-0 group-hover:opacity-100 group-hover:scale-100"
                  >
                    <img
                      src="/flower2.png"
                      alt=""
                      className="w-14 h-14 group-hover:animate-[spin_6s_linear_infinite]"
                    />
                  </div>
                  <span className="relative z-[2]">Start Learning</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 opacity-70">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-[#60A5FA] to-[#1E5AA5] rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">1000+ Students</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-slate-600 ml-1">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right Visual Space - 3D Canvas embedded (receives hover events) */}
            <div className="flex-1 relative h-68 md:h-95 lg:h-[550px]">
              <div className="absolute inset-0 rounded-2xl overflow-visible">
                <HeroInteractive />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 border-2 rounded-full flex justify-center"
             style={{ borderColor: "#60A5FA" }}>
          <div className="w-1 h-3 rounded-full mt-2 animate-pulse"
               style={{ backgroundColor: "#004492" }} />
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
            { p: [1.8, 0.2, 0], c: "#004492" },
            { p: [-1.6, -0.3, 0.2], c: "#004492" },
            { p: [0.6, 1.4, -0.2], c: "#004492" },
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
                metalness={0.4}
                roughness={0.3}
              />
            </mesh>
          </Float>
        ))}
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[1.85, 0.03, 16, 180]} />
          <meshStandardMaterial
            color="#004492"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </group>
      <Environment preset="studio" />
    </>
  );
}
