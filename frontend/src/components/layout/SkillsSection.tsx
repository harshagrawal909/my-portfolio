"use client";
import { useState } from "react";
import StarField from "../effects/StarField";
import ListView from "../skills/ListView";
import SolarSystemSkills from "../skills/SolarSystemSkills";

export default function SkillsSection() {
    const [viewMode, setViewMode] = useState<"list" | "orbit">("list");

    return (
        <section
            id="skills"
            className="relative flex w-full flex-col items-center overflow-visible bg-transparent px-4 pt-20 perspective-1000 sm:px-6 lg:px-10"
        >
            <StarField />
            <div className="relative z-20 flex flex-col items-center gap-6 mb-8">
                <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    Skills
                </h2>
            </div>

            <div className="relative z-30 flex gap-4 p-1.5 bg-white/5 border border-white/10 rounded-2xl mb-12 shadow-lg backdrop-blur-md">
                <button
                    onClick={() => setViewMode("list")}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                        viewMode === "list"
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                            : "text-gray-400 hover:text-white"
                    }`}
                >
                    📋 List View
                </button>
                <button
                    onClick={() => setViewMode("orbit")}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                        viewMode === "orbit"
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                            : "text-gray-400 hover:text-white"
                    }`}
                >
                    🌌 3D Orbit View
                </button>
            </div>

            <div className="h-px w-40 bg-linear-to-r mb-10 from-transparent via-purple-500/50 to-transparent"/>

            <div className="w-full relative z-20 transition-all duration-500">
                {viewMode === "orbit" ? <SolarSystemSkills /> : <ListView />}
            </div>
        </section>
    );
}