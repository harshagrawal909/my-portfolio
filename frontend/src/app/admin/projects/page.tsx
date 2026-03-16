"use client"

import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
}

export default function ProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tech, setTech] = useState("");
    const [github, setGithub] = useState("");
    const [demo, setDemo] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
        const data = await res.json();
        setProjects(data);
    }

    const addProject = async() => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    tech: tech.split(",").map(t => t.trim()),
                    github,
                    demo
                })
            });
            const data=await res.json();
            if(!res.ok){
                alert(data.message || "Failed to add project");
                return;
            }
            setTitle("");
            setDescription("");
            setTech("");
            setGithub("");
            setDemo("");
            fetchProjects();
        } catch (error) {
            console.error("Error adding project:", error);
        }
    }

    const deleteProject = async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please log in again.");
            return;
        }
        try{
        const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (!res.ok) {
            alert(data.message || "Failed to delete project");
            return;
        }
        alert(data.message || "Project deleted successfully");
        fetchProjects();
        }catch (error) {
        console.error(error);
        }
    }

    return (
        <div className="relative min-h-screen w-full bg-[#050505] text-white p-10 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                <a 
                href="/admin/dashboard"
                className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 hover:text-white transition-all duration-300 group cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">Back to Dashboard</span>
                </a>

                <a 
                href="/" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 hover:text-purple-300 transition-all duration-300 group cursor-pointer"
                >
                    <span className="text-sm font-medium tracking-wide">Return to Portfolio</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="relative max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent uppercase tracking-wide">
                    Projects Manager
                </h1>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Project Name</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. AI Chatbot"
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Tech Stack (comma separated)</label>
                            <input
                                value={tech}
                                onChange={(e) => setTech(e.target.value)}
                                placeholder="React, Node, MongoDB"
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your masterpiece..."
                            rows={3}
                            className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Github Link</label>
                            <input
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                placeholder="https://github.com/..."
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Demo Link</label>
                            <input
                                value={demo}
                                onChange={(e) => setDemo(e.target.value)}
                                placeholder="https://demo.com/..."
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <button
                            onClick={addProject}
                            className="group relative px-12 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white tracking-widest uppercase overflow-hidden hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer"
                        >
                            <span className="relative z-10">Launch Project</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-pink-500/50 transition-all duration-500 shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                                    {project.title}
                                </h2>
                                <button
                                    onClick={() => deleteProject(project._id)}
                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-[10px] px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 uppercase tracking-wider">
                                    {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <a href={project.github} target="_blank" className="flex-1 text-center py-2 bg-white/5 border border-white/10 rounded-xl text-xs hover:bg-white/10 transition-colors">
                                    Code
                                </a>
                                <a href={project.demo} target="_blank" className="flex-1 text-center py-2 bg-pink-600 rounded-xl text-xs font-bold hover:bg-pink-500 transition-colors">
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    ))}
                </div>




            </div>
        </div>
    )
}