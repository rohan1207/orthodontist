import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Image } from "@react-three/drei";
import gsap from "gsap";

const HERO_FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const TOOTH_URL = "/tooth1.png"; // main right-side PNG

export default function NewHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#D1E7FF] mt-16"
      onMouseMove={handleMouseMove}
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

      {/* 3D Interactive Background */}
      <div className="absolute inset-0 z-0">
        <HeroInteractive mousePosition={mousePosition} />
      </div>

      {/* Mobile readability overlay over 3D (keeps desktop unchanged) */}
      <div className="absolute inset-0 z-[5] pointer-events-none lg:hidden bg-gradient-to-b from-white/90 via-white/70 to-transparent" />

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
                  Your academic anchor, from Braces to Breakthroughs. 🦷
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
                      className="w-12 h-12 group-hover:animate-[spin_6s_linear_infinite]"
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
                      src="/flower.png"
                      alt=""
                      className="w-12 h-12 group-hover:animate-[spin_6s_linear_infinite]"
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

            {/* Right Visual Space - Reserved for 3D */}
            <div className="flex-1 relative h-72 md:h-96 lg:h-[600px] pointer-events-none">
              {/* 3D element sits behind as background */}
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

function HeroInteractive({ mousePosition }) {
  const [hovered, setHovered] = useState(false);
  const target = useRef({ x: 0, y: 0 });

  const onMove = (e) => {
    const rect = e.target?.getBoundingClientRect
      ? e.target.getBoundingClientRect()
      : { left: 0, top: 0, width: 1, height: 1 };
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    target.current.x = x * 0.6; // gentle tilt amount
    target.current.y = -y * 0.4;
  };

  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 12], fov: 40 }}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        target.current.x = 0;
        target.current.y = 0;
      }}
    >
      <HeroScene
        hovered={hovered}
        target={target}
        mousePosition={mousePosition}
      />
    </Canvas>
  );
}

function HeroScene({ hovered, target, mousePosition }) {
  const group = useRef();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const [over, setOver] = useState(false); // direct hover over tooth

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth rotation
      gsap.to(group.current.rotation, {
        x: () => target.current.x,
        y: () => target.current.y,
        duration: 1,
        ease: "power3.out",
      });

      // Gentle float
      gsap.to(group.current.position, {
        y: `+=${Math.sin(Date.now() * 0.001) * 0.1}`,
        x: `+=${Math.cos(Date.now() * 0.0008) * 0.05}`,
        repeat: -1,
        yoyo: true,
        duration: 5,
        ease: "sine.inOut",
      });

      // Parallax effect
      if (mousePosition) {
        gsap.to(group.current.position, {
          x: `+=${mousePosition.x * 0.005}`,
          y: `+=${mousePosition.y * 0.005}`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }, group);
    return () => ctx.revert();
  }, [target.current.x, target.current.y, mousePosition]);

  useEffect(() => {
    const targetZ = hovered || over ? -0.8 : 0;
    const scale = hovered || over ? 1.08 : 1.0;
    gsap.to(group.current.position, { z: targetZ, duration: 0.7, ease: "expo.out" });
    gsap.to(group.current.scale, { x: scale, y: scale, z: scale, duration: 0.7, ease: "expo.out" });
  }, [hovered, over]);

  // Minimal orb set (premium, subtle)
  const orbData = useMemo(
    () => [
      {
        p: isMobile ? [0.8, 1.2, 0.4] : [5.2, 0.9, 0.6],
        c: "#1E5AA5",
        size: isMobile ? 0.1 : 0.14,
        speed: 1.1,
      },
      {
        p: isMobile ? [-0.9, 1.4, 0.2] : [3.6, -0.8, 0.5],
        c: "#004492",
        size: isMobile ? 0.09 : 0.12,
        speed: 1.3,
      },
      {
        p: isMobile ? [0.5, 2.0, -0.1] : [4.6, 2.0, -0.3],
        c: "#60A5FA",
        size: isMobile ? 0.12 : 0.16,
        speed: 0.9,
      },
      // background
      {
        p: [-6, -2, -2],
        c: "#004492",
        size: isMobile ? 0.18 : 0.22,
        speed: 0.5,
      },
      { p: [7, 3, -3], c: "#1E5AA5", size: isMobile ? 0.2 : 0.24, speed: 0.6 },
    ],
    [isMobile]
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.15}
        color="#ffffff"
      />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.6}
        color="#E0F2FE"
      />

      <group ref={group}>
        {/* Tooth PNG on the right */}
        <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.35}>
          <group
            position={isMobile ? [0, 0.6, 0] : [4.0, 0.2, 0]}
            scale={isMobile ? 0.8 : 1}
          >
            {/* Soft halo ring */}
            <mesh 
              rotation={[Math.PI / 2, 0, 0]} 
              position={[0, 0, -0.12]}
              onPointerOver={(e) => { e.stopPropagation(); setOver(true); }}
              onPointerOut={(e) => { e.stopPropagation(); setOver(false); }}
            >
              <torusGeometry args={[isMobile ? 2.0 : 2.6, 0.02, 16, 120]} />
              <meshStandardMaterial
                color="#1E5AA5"
                emissive="#1E5AA5"
                emissiveIntensity={0.22}
                transparent
                opacity={0.45}
              />
            </mesh>

            <Image
              url={TOOTH_URL}
              scale={isMobile ? [3.6, 3.6, 1] : [4.4, 4.4, 1]}
              transparent
              toneMapped={false}
              onPointerOver={(e) => {
                e.stopPropagation();
                setOver(true);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setOver(false);
                target.current.x = 0;
                target.current.y = 0;
              }}
              onPointerMove={(e) => {
                e.stopPropagation();
                const uv = e.uv;
                if (uv) {
                  // Map cursor within image to tilt direction (-1..1)
                  const x = (uv.x - 0.5) * 2;
                  const y = (uv.y - 0.5) * 2;
                  target.current.x = y * 0.4; // Tilt back on Y axis
                  target.current.y = -x * 0.4; // Tilt back on X axis
                }
              }}
            />
          </group>
        </Float>

        {/* Subtle orbs */}
        {orbData.map((orb, i) => (
          <Float
            key={`orb-${i}`}
            speed={orb.speed}
            rotationIntensity={0.25}
            floatIntensity={0.6}
          >
            <mesh 
              position={orb.p}
              onPointerOver={(e) => { e.stopPropagation(); setOver(true); }}
              onPointerOut={(e) => { e.stopPropagation(); setOver(false); }}
            >
              <sphereGeometry args={[orb.size, 32, 32]} />
              <meshStandardMaterial
                color={orb.c}
                emissive={orb.c}
                emissiveIntensity={i < 3 ? 0.08 : 0.04}
                metalness={0.5}
                roughness={0.25}
                transparent
                opacity={i < 3 ? 0.85 : 0.5}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <Environment preset="city" />
    </>
  );
}
