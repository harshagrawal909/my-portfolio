"use client";
import React, { useState, useRef } from "react";
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

function StylizedLaptop({ screenshotUrl }: { screenshotUrl: string }) {
  const laptopRef = useRef<THREE.Group>(null);

  // Gentle floating animation
  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.12 - 0.5;
    }
  });

  return (
    <group ref={laptopRef}>
      {/* LAPTOP BASE */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[4.2, 0.1, 3.0]} />
        <meshStandardMaterial 
          color="#0f172a" // Dark slate base
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* GLOWING TRACKPAD */}
      <mesh position={[0, 0.01, 1.0]}>
        <boxGeometry args={[1.2, 0.01, 0.75]} />
        <meshStandardMaterial 
          color="#312e81" 
          emissive="#a855f7"
          emissiveIntensity={0.4}
          roughness={0.4}
        />
      </mesh>
      
      {/* KEYBOARD INNER PLATE */}
      <mesh position={[0, 0.01, -0.3]}>
        <boxGeometry args={[3.8, 0.015, 1.5]} />
        <meshStandardMaterial 
          color="#020617" 
          roughness={0.9}
        />
      </mesh>

      {/* BASE FRONT CHAMFER STRIP (aesthetic trim) */}
      <mesh position={[0, -0.02, 1.51]}>
        <boxGeometry args={[4.2, 0.04, 0.02]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>

      {/* LAPTOP HINGE */}
      <mesh position={[0, 0, -1.45]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 4.0, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>

      {/* LAPTOP SCREEN (Lid tilted back 15 degrees) */}
      <group position={[0, 0.05, -1.45]} rotation={[0.26, 0, 0]}>
        {/* Screen Back Lid */}
        <mesh position={[0, 1.35, -0.04]}>
          <boxGeometry args={[4.2, 2.7, 0.08]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Screen Bezel & Glass */}
        <mesh position={[0, 1.35, 0.01]}>
          <boxGeometry args={[4.0, 2.5, 0.02]} />
          <meshStandardMaterial 
            color="#090d16" 
            roughness={0.1}
          />
        </mesh>

        {/* Cyber Neon Glow Border around screen */}
        <Line
          points={[
            [-2.0, 0.1, 0.02],
            [2.0, 0.1, 0.02],
            [2.0, 2.6, 0.02],
            [-2.0, 2.6, 0.02],
            [-2.0, 0.1, 0.02]
          ]}
          color="#d946ef"
          lineWidth={1.5}
          opacity={0.7}
          transparent
        />

        {/* Live CSS3D Html Screen */}
        <Html
          transform
          occlude
          position={[0, 1.35, 0.03]}
          className="w-[760px] h-[480px] rounded overflow-hidden select-none bg-black pointer-events-none"
          distanceFactor={1.28}
        >
          <img 
            src={screenshotUrl} 
            alt="Project Screenshot" 
            className="w-full h-full object-cover"
          />
        </Html>
      </group>
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

  // Microlink high-quality live screenshot url
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(activeProject.demo)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
      {/* 3D Showcase and Info Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-black/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden select-none relative">
        
        {/* Instructions Overlay */}
        <div className="absolute top-4 left-6 z-30 pointer-events-none">
          <span className="text-[10px] text-white/40 uppercase tracking-widest bg-black/50 px-3 py-1.5 rounded-full border border-white/5">
            Drag to Orbit / Scroll sides to page
          </span>
        </div>

        {/* 1. Left Column: 3D Interactive Screen (8 cols on lg) */}
        <div className="lg:col-span-8 h-[380px] md:h-[450px] relative w-full bg-black/20 rounded-2xl border border-white/5">
          <Canvas camera={{ position: [0, 2.5, 6.0], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -5, -10]} intensity={0.5} />

            <StylizedLaptop screenshotUrl={screenshotUrl} />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              maxDistance={10}
              minDistance={4}
              maxPolarAngle={Math.PI / 2 - 0.05} // Prevents going under base table
              autoRotate={true}
              autoRotateSpeed={0.3}
            />
          </Canvas>
          
          {/* Quick Slider Arrow overlays */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:border-purple-500 hover:text-purple-300 transition-all flex items-center justify-center pointer-events-auto cursor-pointer text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:border-purple-500 hover:text-purple-300 transition-all flex items-center justify-center pointer-events-auto cursor-pointer text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Right Column: Info Panel (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.2em] bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit block">
              Project {currentIndex + 1} of {projects.length}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-purple-100 to-purple-400">
              {activeProject.title}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              {activeProject.description}
            </p>

            <div className="pt-2">
              <h4 className="text-xs text-white/50 uppercase tracking-widest mb-3 font-semibold">Technologies</h4>
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

      {/* Index Bullet Nav */}
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
