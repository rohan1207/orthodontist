import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Image } from "@react-three/drei";

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
      className="relative min-h-screen overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
      style={{ fontFamily: HERO_FONT }}
    >
      {/* Subtle green wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5" />
      
      {/* Minimal floating specks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/25 rounded-full animate-pulse"
            style={{
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

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex flex-col justify-center px-4 md:px-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-green-200/50 rounded-full px-6 py-3 shadow-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-700">
                  ✨ Premium Orthodontic Resources
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 
                  className="font-bold tracking-tight leading-[0.95]"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                    background: 'linear-gradient(135deg, #10b981 0%, #22c55e 50%, #84cc16 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 4px 20px rgba(34, 197, 94, 0.15))',
                  }}
                >
                  OrthoChronicles
                </h1>
                
                <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto lg:mx-0 shadow-lg" />
              </div>

              {/* Subtitle */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  <span className="font-semibold text-black">Cracked NEET MDS?</span> Your orthodontic journey starts here! ✨
                </p>
                
                <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  From clinics to exams—we make the tough stuff simple. Get summaries, reviews, strategies & trusted resources.
                </p>
                
                <p className="text-sm md:text-base text-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text font-medium">
                  Your academic anchor, from Braces to Breakthroughs. 🦷
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Start Learning ✨
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                
                <button className="px-8 py-4 bg-white/80 backdrop-blur-md text-slate-700 font-semibold rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 hover:-translate-y-1">
                  Explore Resources 📚
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 opacity-70">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">1000+ Students</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-slate-600 ml-1">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right Visual Space - Reserved for 3D */}
            <div className="flex-1 relative h-96 lg:h-[600px] pointer-events-none">
              {/* 3D element sits behind as background */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 border-2 border-green-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse" />
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
      <HeroScene hovered={hovered} target={target} mousePosition={mousePosition} />
    </Canvas>
  );
}

function HeroScene({ hovered, target, mousePosition }) {
  const group = useRef();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const base = useRef({ x: 0.12, y: -0.35 }); // pleasant angled view
  const [over, setOver] = useState(false); // direct hover over tooth

  useFrame((state) => {
    if (!group.current) return;
    const desiredY = base.current.y + target.current.x * 0.8;
    const desiredX = base.current.x + target.current.y * 0.8;
    group.current.rotation.y += (desiredY - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (desiredX - group.current.rotation.x) * 0.08;

    // Gentle float + parallax
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    group.current.position.x = Math.cos(state.clock.elapsedTime * 0.35) * 0.12;

    // Slight push-back on hover (depth)
    const targetZ = (hovered || over) ? -0.8 : 0;
    group.current.position.z += (targetZ - group.current.position.z) * 0.08;

    // Micro scale reaction
    const s = (hovered || over) ? 1.06 : 1.0;
    group.current.scale.x += (s - group.current.scale.x) * 0.06;
    group.current.scale.y = group.current.scale.x;
    group.current.scale.z = group.current.scale.x;

    if (mousePosition) {
      group.current.position.x += mousePosition.x * 0.001;
      group.current.position.y += mousePosition.y * 0.001;
    }
  });

  // Minimal orb set (premium, subtle)
  const orbData = useMemo(() => [
    { p: isMobile ? [1.6, 1.4, 0.4] : [5.2, 0.9, 0.6], c: "#22c55e", size: 0.14, speed: 1.1 },
    { p: isMobile ? [-1.4, 1.6, 0.2] : [3.6, -0.8, 0.5], c: "#10b981", size: 0.12, speed: 1.3 },
    { p: isMobile ? [0.8, 2.4, -0.1] : [4.6, 2.0, -0.3], c: "#84cc16", size: 0.16, speed: 0.9 },
    // background
    { p: [-6, -2, -2], c: "#10b981", size: 0.22, speed: 0.5 },
    { p: [7, 3, -3], c: "#22c55e", size: 0.24, speed: 0.6 },
  ], [isMobile]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#f0fdf4" />

      <group ref={group}>
        {/* Tooth PNG on the right */}
        <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.35}>
          <group position={isMobile ? [0, 0.4, 0] : [4.0, 0.2, 0]}>
            {/* Soft halo ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.12]}>
              <torusGeometry args={[2.6, 0.02, 16, 120]} />
              <meshStandardMaterial
                color="#22c55e"
                emissive="#22c55e"
                emissiveIntensity={0.22}
                transparent
                opacity={0.45}
              />
            </mesh>

            <Image
              url={TOOTH_URL}
              scale={[4.4, 4.4, 1]}
              transparent
              toneMapped={false}
              onPointerOver={(e) => { e.stopPropagation(); setOver(true); }}
              onPointerOut={(e) => { e.stopPropagation(); setOver(false); target.current.x = 0; target.current.y = 0; }}
              onPointerMove={(e) => {
                e.stopPropagation();
                const uv = e.uv;
                if (uv) {
                  // Map cursor within image to tilt direction (-1..1)
                  const x = (uv.x - 0.5) * 2;
                  const y = (uv.y - 0.5) * 2;
                  target.current.x = Math.max(-1, Math.min(1, x));
                  target.current.y = Math.max(-1, Math.min(1, -y));
                }
              }}
            />
          </group>
        </Float>

        {/* Subtle orbs */}
        {orbData.map((orb, i) => (
          <Float key={`orb-${i}`} speed={orb.speed} rotationIntensity={0.25} floatIntensity={0.6}>
            <mesh position={orb.p}>
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