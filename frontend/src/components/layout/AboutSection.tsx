"use client"

import {useState,useEffect} from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const abouts = [
    { label: "Location", val: "Bhubaneswar, IN" },
    { label: "Education", val: "B.Tech CSE — KIIT University" },
    { label: "Focus", val: "Full-Stack & AI Systems" },
    { label: "Status", val: "Open to Opportunities" }
]

export default function AboutSection() {
    const [showCV, setShowCV] = useState(false);
    const resumeUrl = "/harsh_agrawal.pdf";
    
    // useEffect(() => {
    //     const fetchResume = async () => {
    //     try {
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`);
    //         const data = await res.json();
    //         setResume(data);
    //     } catch (error) {
    //         console.log("Error fetching resume:", error);
    //     }
    //     };
    //     fetchResume();
    // }, []);

    useEffect(() => {
        document.body.style.overflow = showCV ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [showCV]);

    return (
        <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
            <div className="absolute top-1/2 left-1/2 -z-10 h-[70vw] w-[70vw] max-h-[38rem] max-w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
                        Turning Curiosity into Code.
                    </h2>
                    <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
                        Hi, I&apos;m <span className="text-purple-400 font-medium">Harsh Agrawal</span>, a <span className="text-purple-400">Computer Science engineer</span> fascinated by how ideas evolve into real systems people use every day. 
                        I build <span className="text-purple-400">full-stack applications</span>, explore <span className="text-purple-400">AI-driven solutions</span>, and enjoy designing <span className="text-purple-400">digital experiences</span> that feel simple, fast, and meaningful. 
                        What excites me most is solving complex problems and turning them into technology that feels effortless to use.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-4">
                        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">Problem Solver</div>
                        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">Full Stack Builder</div>
                        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">AI Explorer</div>
                        <div className="rounded-lg border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm text-pink-300">Tech Enthusiast</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-6 sm:gap-6">
                        <button
                            onClick={() => setShowCV(true)}
                            className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] transition hover:bg-purple-700 hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] cursor-pointer"
                        >
                            View CV
                        </button>

                        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xl text-gray-400 backdrop-blur-md">
                            <a
                                href="https://github.com/harshagrawal909"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://linkedin.com/in/harshagrawal42"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="https://instagram.com/harshagrawal909"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-400 transition"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="mailto:harshagrawal5843@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-400 transition"
                            >
                                <MdEmail />
                            </a>
                        </div>

                    </div>
                </div>

                <div className="grid gap-4 sm:gap-6">

                    <div className="group relative w-full aspect-square md:aspect-auto md:h-80 rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        <img
                            src="/my-photo.jpeg" 
                            alt="Harsh Agrawal" 
                            className="w-full h-full object-contain grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                         />
                         <div className="absolute bottom-6 left-6 z-20">
                            <p className="text-white font-bold text-2xl tracking-tight opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                Harsh Agrawal
                            </p>
                            <p className="text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                                Software Engineer
                            </p>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">    
                        {abouts.map((stat, i) => (
                            <div key={i} className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 p-5 text-center backdrop-blur-lg transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] sm:p-7">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_70%)] rounded-2xl pointer-events-none" />
                                <p className="mb-1 text-[11px] font-bold items-center justify-center text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-sm font-semibold text-white sm:text-base">{stat.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {showCV && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                    <div className="relative flex h-[85svh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
                        <div className="flex flex-col gap-3 border-b border-white/5 bg-white/2 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <span className="px-1 text-xs font-bold uppercase tracking-widest text-gray-400 sm:px-4">Curriculum Vitae</span>
                            <div className="flex flex-wrap gap-2">
                                <a 
                                    href={resumeUrl} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg bg-white/5 px-4 py-2 text-xs text-gray-300 transition hover:bg-white/10"
                                >
                                    Full View
                                </a>
                                <button
                                    onClick={() => setShowCV(false)}
                                    className="rounded-lg bg-purple-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-purple-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex-1 bg-white/5">
                            <iframe
                                src={`${resumeUrl}#toolbar=0`}
                                className="w-full h-full border-none"
                            />
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}