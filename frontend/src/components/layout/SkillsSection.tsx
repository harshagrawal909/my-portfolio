"use client";
import StarField from "../effects/StarField";
import ListView from "../skills/ListView";

export default function SkillsSection() {
    return (
        <section
            id="skills"
            className="relative w-full flex flex-col items-center overflow-visible perspective-1000 pt-20 bg-transparent"
        >
            <StarField />
            <div className="relative z-20 flex flex-col items-center gap-6 mb-20">
                <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    Skills
                </h2>
            </div>

            <div className="h-px w-40 bg-linear-to-r mb-10 from-transparent via-purple-500/50 to-transparent"/>

            <ListView />


        </section>
    );
}