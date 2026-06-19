"use client";
import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
}

// 1. Futuristic Glowing Projector Platform (Base)
function ProjectorBase() {
  const baseRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (baseRef.current) {
      baseRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={baseRef} position={[0, -1.8, 0]}>
      {/* Dark Metallic Platform */}
      <mesh>
        <cylinderGeometry args={[1.8, 2.0, 0.15, 32]} />
        <meshStandardMaterial color="#090d16" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Outer Glowing Neon Ring */}
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.04, 8, 48]} />
        <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={2.5} />
      </mesh>
      
      {/* Inner Glowing Core */}
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.04, 16]} />
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={3.5} />
      </mesh>
    </group>
  );
}

// 2. Holographic Light Ray Cone
function ProjectorLightCone() {
  return (
    <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
      <coneGeometry args={[1.8, 2.4, 32, 1, true]} />
      <meshBasicMaterial
        color="#a855f7"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// 3. Floating Sparkle Particles rising from the Projector
function HolographicParticles({ count = 60 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 3; // X
      arr[i * 3 + 1] = Math.random() * 4.2 - 1.8; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3; // Z
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const elapsed = state.clock.getElapsedTime();
      
      for (let i = 0; i < count; i++) {
        let y = positionsAttr.getY(i);
        y += 0.012 + Math.sin(elapsed + i) * 0.003;
        
        // Reset to base if it floats too high
        if (y > 2.4) {
          y = -1.8;
          positionsAttr.setX(i, (Math.random() - 0.5) * 2.2);
          positionsAttr.setZ(i, (Math.random() - 0.5) * 2.2);
        }
        positionsAttr.setY(i, y);
      }
      positionsAttr.needsUpdate = true;
      pointsRef.current.rotation.y = elapsed * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#c084fc"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 4. Inner Orbiting Gyroscope Ring
function InnerHUDRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.35;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0.6, 0]}>
      <torusGeometry args={[2.7, 0.012, 8, 64]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.25} wireframe />
    </mesh>
  );
}

// 5. Outer Orbiting Gyroscope Ring
function OuterHUDRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.getElapsedTime() * 0.25;
      ringRef.current.rotation.y = -state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0.6, 0]}>
      <torusGeometry args={[3.0, 0.008, 8, 64]} />
      <meshBasicMaterial color="#d946ef" transparent opacity={0.18} wireframe />
    </mesh>
  );
}

// 6. Floating Holographic Portal Glass Screen
function FloatingHologramScreen({ screenshotUrl }: { screenshotUrl: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.12 + 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glass Panel Frame */}
      <mesh>
        <boxGeometry args={[4.2, 2.6, 0.03]} />
        <meshPhysicalMaterial
          color="#0f172a"
          transparent
          opacity={0.25}
          roughness={0.15}
          metalness={0.1}
          transmission={0.7}
          thickness={1.0}
        />
      </mesh>
      
      {/* Outer Glowing Neon Rim */}
      <Line
        points={[
          [-2.1, -1.3, 0.02],
          [2.1, -1.3, 0.02],
          [2.1, 1.3, 0.02],
          [-2.1, 1.3, 0.02],
          [-2.1, -1.3, 0.02]
        ]}
        color="#d946ef"
        lineWidth={2.2}
        opacity={0.8}
        transparent
      />

      {/* Cyber Corner HUD Highlights */}
      <Line points={[[-2.2, -1.0, 0.025], [-2.2, -1.4, 0.025], [-1.8, -1.4, 0.025]]} color="#60a5fa" lineWidth={3} />
      <Line points={[[2.2, -1.0, 0.025], [2.2, -1.4, 0.025], [1.8, -1.4, 0.025]]} color="#60a5fa" lineWidth={3} />
      <Line points={[[-2.2, 1.0, 0.025], [-2.2, 1.4, 0.025], [-1.8, 1.4, 0.025]]} color="#60a5fa" lineWidth={3} />
      <Line points={[[2.2, 1.0, 0.025], [2.2, 1.4, 0.025], [1.8, 1.4, 0.025]]} color="#60a5fa" lineWidth={3} />

      {/* Embedded CSS3D Screen */}
      <Html
        transform
        occlude
        position={[0, 0, 0.025]}
        className="w-[760px] h-[480px] rounded overflow-hidden select-none bg-black/70 pointer-events-none"
        distanceFactor={1.28}
      >
        <div className="relative w-full h-full">
          <img 
            src={screenshotUrl} 
            alt="Project Screen" 
            className="w-full h-full object-cover opacity-90 filter brightness-110 saturate-110"
          />
          {/* Cyber scanner grid and CRT scan line overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_3px] pointer-events-none opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
          <div className="absolute inset-x-0 h-[2px] bg-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.9)] animate-scan pointer-events-none" />
        </div>
      </Html>
    </group>
  );
}

export default function ProjectShowroom({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeProject = projects[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!activeProject) return null;

  // Microlink screenshot generator API
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(activeProject.demo)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
      {/* Inject Keyframes for the scanner scan line */}
      <style>{`
        @keyframes scan {
          0% { top: -2%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 102%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>

      {/* Main 3D and Information Display Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-black/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden select-none relative">
        
        {/* Instructions Overlay */}
        <div className="absolute top-4 left-6 z-30 pointer-events-none">
          <span className="text-[10px] text-white/40 uppercase tracking-widest bg-black/50 px-3 py-1.5 rounded-full border border-white/5">
            Drag to Rotate / Scroll sides to page
          </span>
        </div>

        {/* 1. Left Column: 3D Holographic Display Portal (8 columns) */}
        <div className="lg:col-span-8 h-[380px] md:h-[480px] relative w-full bg-radial from-purple-950/5 to-black/30 rounded-2xl border border-white/5 overflow-hidden">
          <Canvas camera={{ position: [0, 1.2, 5.8], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} />
            <pointLight position={[-5, 5, -5]} intensity={0.4} />
            
            {/* Projector Base Platform */}
            <ProjectorBase />
            
            {/* Projected Light Cone */}
            <ProjectorLightCone />
            
            {/* Sparkles / Data Particles */}
            <HolographicParticles />
            
            {/* Gyroscopic HUD Rings */}
            <InnerHUDRing />
            <OuterHUDRing />
            
            {/* Hologram Glass Screen with Embedded CSS3D */}
            <FloatingHologramScreen screenshotUrl={screenshotUrl} />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              maxDistance={8}
              minDistance={3.5}
              maxPolarAngle={Math.PI / 2 + 0.1} // Allows looking slightly upwards from underneath base
              autoRotate={true}
              autoRotateSpeed={0.25}
            />
          </Canvas>
          
          {/* Slide Arrow Navigation Overlays */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-black/70 border border-white/10 text-white hover:border-purple-500 hover:text-purple-300 transition-all flex items-center justify-center pointer-events-auto cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-black/70 border border-white/10 text-white hover:border-purple-500 hover:text-purple-300 transition-all flex items-center justify-center pointer-events-auto cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 2. Right Column: Info Terminal Panel (4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.2em] bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
                Hologram {currentIndex + 1} of {projects.length}
              </span>
              <span className="text-[9px] text-blue-400 font-mono tracking-widest uppercase animate-pulse">
                SYS.STATUS: ONLINE
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-purple-100 to-purple-400">
              {activeProject.title}
            </h3>
            
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              {activeProject.description}
            </p>

            <div className="pt-2">
              <h4 className="text-xs text-white/50 uppercase tracking-widest mb-3 font-semibold">Core Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 rounded-md border border-purple-500/20 text-purple-300 bg-purple-950/20 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
            <a
              href={activeProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-purple-500 text-gray-300 hover:text-white bg-white/5 hover:bg-purple-950/10 transition-all font-semibold text-sm cursor-pointer"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>

            <a
              href={activeProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20 text-white transition-all font-bold text-sm cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          </div>
        </div>

      </div>

      {/* Index Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? "w-8 bg-purple-500" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
