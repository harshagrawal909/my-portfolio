"use client";
import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";

interface Skill {
  _id: string;
  name: string;
  icon?: string;
  category: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

function SkillPlanet({
  name,
  icon,
  radius,
  speed,
  angleOffset,
}: {
  name: string;
  icon?: string;
  radius: number;
  speed: number;
  angleOffset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const currentAngle = elapsed * speed + angleOffset;
    
    if (meshRef.current) {
      meshRef.current.position.x = radius * Math.cos(currentAngle);
      meshRef.current.position.z = radius * Math.sin(currentAngle);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color="#c084fc"
        emissive="#a855f7"
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.8}
      />
      <Html distanceFactor={8} center pointerEvents="none">
        <div className="flex items-center justify-center w-8 h-8 bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-full shadow-lg hover:scale-125 transition-transform duration-300 pointer-events-none select-none">
          {icon ? (
            <img src={icon} alt={name} className="w-5 h-5 object-contain" />
          ) : (
            <span className="text-[9px] font-bold text-purple-300 uppercase">{name.substring(0, 2)}</span>
          )}
        </div>
      </Html>
    </mesh>
  );
}

function OrbitLine({ radius }: { radius: number }) {
  const points: [number, number, number][] = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push([radius * Math.cos(theta), 0, radius * Math.sin(theta)]);
  }

  return (
    <Line
      points={points}
      color="#a855f7"
      opacity={0.15}
      transparent
      lineWidth={1}
    />
  );
}

function OrbitGroup({
  category,
  skills,
  radius,
  index,
}: {
  category: string;
  skills: Skill[];
  radius: number;
  index: number;
}) {
  const tiltX = (index * 0.12) - 0.2;
  const tiltZ = (index * -0.08) + 0.1;

  const baseSpeed = 0.15;
  const speed = index % 2 === 0 ? baseSpeed / (index + 1.2) : -baseSpeed / (index + 1.2);

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <OrbitLine radius={radius} />

      <Html position={[radius, 0, 0]} distanceFactor={10} center pointerEvents="none">
        <div className="px-2 py-0.5 bg-purple-950/80 border border-purple-500/30 text-[9px] font-bold text-purple-300 rounded uppercase tracking-widest whitespace-nowrap pointer-events-none select-none">
          {category}
        </div>
      </Html>

      {skills.map((skill, i) => {
        const angleOffset = (i / skills.length) * Math.PI * 2;
        return (
          <SkillPlanet
            key={skill._id || i}
            name={skill.name}
            icon={skill.icon}
            radius={radius}
            speed={speed}
            angleOffset={angleOffset}
          />
        );
      })}
    </group>
  );
}

// Center Glowing Core (Sun)
function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      coreRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color="#e879f9"
        emissive="#d946ef"
        emissiveIntensity={1.5}
        wireframe
      />
      <pointLight color="#d946ef" intensity={3} distance={20} decay={2} />
      <Html distanceFactor={6} center pointerEvents="none">
        <div className="px-3 py-1.5 bg-purple-600/20 backdrop-blur-xl border border-pink-500/30 rounded-xl text-center select-none pointer-events-none shadow-[0_0_25px_rgba(217,70,239,0.3)]">
          <span className="text-[10px] md:text-[11px] font-black text-pink-400 tracking-[0.2em] uppercase whitespace-nowrap">Core</span>
        </div>
      </Html>
    </mesh>
  );
}

export default function SolarSystemSkills() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("API URL is not configured");
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);
        if (!res.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data: Skill[] = await res.json();
        
        // Group by category
        const grouped = data.reduce<Record<string, Skill[]>>((acc, skill) => {
          const category = skill.category;
          if (!acc[category]) acc[category] = [];
          acc[category].push(skill);
          return acc;
        }, {});

        const formattedSkills: SkillCategory[] = Object.keys(grouped).map((cat) => ({
          category: cat,
          skills: grouped[cat],
        }));

        setSkills(formattedSkills);
      } catch (err) {
        console.error("Failed to fetch skills for 3D view:", err);
        setError("Unable to load 3D view right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return <div className="text-center text-purple-400 py-20 uppercase tracking-widest">Calibrating Orbits...</div>;
  if (error) return <div className="text-center text-gray-400 py-20">{error}</div>;
  if (skills.length === 0) return <div className="text-center text-gray-400 py-20">Skills will appear here soon.</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="relative w-full h-[550px] md:h-[650px] bg-black/30 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm select-none">
        {/* Instructions Overlay */}
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <span className="text-[10px] text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
            Drag to Orbit
          </span>
        </div>
        <div className="absolute top-4 right-4 z-30 pointer-events-none">
          <span className="text-[10px] text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
            Scroll sides to scroll page
          </span>
        </div>

        <Canvas camera={{ position: [0, 8, 14], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={0.6} />

          {/* Central Core (Sun) */}
          <CentralCore />

          {/* Categories as Orbital Planes */}
          {skills.map((group, index) => {
            // Equally spaced radii starting at 3.5
            const radius = (index * 2.3) + 3.5;
            return (
              <OrbitGroup
                key={group.category || index}
                category={group.category}
                skills={group.skills}
                radius={radius}
                index={index}
              />
            );
          })}

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxDistance={25}
            minDistance={6}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
    </div>
  );
}
