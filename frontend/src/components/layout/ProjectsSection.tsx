"use client"
import { useEffect, useState } from "react";

interface Project{
    _id:string;
    title:string;
    description:string;
    tech:string[];
    github:string;
    demo:string;
}

export default function ProjectsSection() {
    const [projects,setProjects] = useState<Project[]>([]);
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
                if (!res.ok) {
                    throw new Error("Failed to fetch projects");
                }
                const data: Project[] = await res.json()
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally{
                setLoading(false);
            }
        }
        fetchProjects();
    }, [])

    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <div className="animate-pulse text-purple-400 tracking-widest uppercase">
            Loading Masterpieces...
            </div>
        </div>
        );
    }

    return (
        <section
        id="projects"
        className="relative min-h-screen px-10 py-32 text-white bg-transparent"
        >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)]" />

            <div className="relative z-20 flex flex-col items-center gap-6 mb-20">
                <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] pb-2">
                    Projects
                </h2>
            </div>
            

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className={`group relative p-7 rounded-2xl bg-linear-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-lg transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]
                        `}
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_70%)] rounded-2xl pointer-events-none" />

                        <div className="h-40 rounded-lg overflow-hidden mb-6">
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`https://api.microlink.io/?url=${project.demo}&screenshot=true&meta=false&embed=screenshot.url`}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500 cursor-pointer"
                                />
                            </a>
                        </div>

                        <h3 className={`font-semibold mb-4 text-xl`}>
                            {project.title}
                        </h3>

                        <p className="text-gray-300 mb-4">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-3 py-1 rounded-full border border-purple-500/40 text-purple-300 bg-purple-500/10"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-4">
                            <a
                                href={project.github}
                                target="_blank"
                                className="px-4 py-2 text-sm rounded-lg border border-purple-500/40 text-purple-300 hover:bg-purple-500/20 transition"
                            >
                                GitHub
                            </a>

                            <a
                                href={project.demo}
                                target="_blank"
                                className="px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 transition"
                            >
                                Live Demo
                            </a>
                        </div>
                    </div>
                ))}
            </div>


        </section>

        
    );
}