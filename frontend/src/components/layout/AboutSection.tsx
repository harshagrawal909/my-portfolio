"use client"

import {useState,useEffect} from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface Resume {
    _id: string;
    fileUrl:string;
}


const abouts = [
    { label: "Location", val: "Bhubaneswar, IN" },
    { label: "Education", val: "B.Tech CSE — KIIT University" },
    { label: "Focus", val: "Full-Stack & AI Systems" },
    { label: "Status", val: "Open to Opportunities" }
]

export default function AboutSection() {
    const [showCV, setShowCV] = useState(false);
    const [resume,setResume] = useState<Resume | null>(null);
    
    useEffect(() => {
        const fetchResume = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`);
            const data = await res.json();
            setResume(data);
        } catch (error) {
            console.log("Error fetching resume:", error);
        }
        };
        fetchResume();
    }, []);

    useEffect(() => {
        document.body.style.overflow = showCV ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [showCV]);

    return (
        <section id="about" className="relative min-h-screen px-10 py-16 flex items-center justify-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-600/10 rounded-full blur-[120px] -z-10" />
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Turning Curiosity into Code.
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Hi, I'm <span className="text-purple-400 font-medium">Harsh Agrawal</span>, a <span className="text-purple-400">Computer Science engineer</span> fascinated by how ideas evolve into real systems people use every day. 
                        I build <span className="text-purple-400">full-stack applications</span>, explore <span className="text-purple-400">AI-driven solutions</span>, and enjoy designing <span className="text-purple-400">digital experiences</span> that feel simple, fast, and meaningful. 
                        What excites me most is solving complex problems and turning them into technology that feels effortless to use.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm text-purple-300">Problem Solver</div>
                        <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-300">Full Stack Builder</div>
                        <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm text-cyan-300">AI Explorer</div>
                        <div className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-lg text-sm text-pink-300">Tech Enthusiast</div>
                    </div>
                    <div className="pt-6 flex items-center gap-6">
                        <button
                            onClick={() => setShowCV(true)}
                            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white font-medium shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] cursor-pointer"
                        >
                            View CV
                        </button>

                        <div className="flex items-center gap-4 text-xl text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
                            <a
                                href="https://github.com/harshagrawal909"
                                target="_blank"
                                className="hover:text-white transition"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://linkedin.com/in/harshagrawal42"
                                target="_blank"
                                className="hover:text-blue-400 transition"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="https://instagram.com/harshagrawal909"
                                target="_blank"
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

                <div className="grid grid-cols gap-6">

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


                    <div className="grid grid-cols-2 gap-2">    
                        {abouts.map((stat, i) => (
                            <div key={i} className="group relative p-7 rounded-2xl bg-linear-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-lg transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] flex flex-col items-center justify-center text-center">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_70%)] rounded-2xl pointer-events-none" />
                                <p className="text-xs font-bold items-center justify-center text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-white font-semibold">{stat.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {showCV && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                    <div className="relative w-full max-w-5xl h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/2">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 px-4">Curriculum Vitae</span>
                            <div className="flex gap-2">
                                <a 
                                    href={resume ? `${process.env.NEXT_PUBLIC_API_URL}${resume.fileUrl}` : "/cv.pdf"} 
                                    target="_blank"
                                    className="px-4 py-2 text-xs bg-white/5 hover:bg-white/10 rounded-lg transition text-gray-300"
                                >
                                    Full View
                                </a>
                                <button
                                    onClick={() => setShowCV(false)}
                                    className="px-4 py-2 text-xs bg-purple-600 hover:bg-purple-700 rounded-lg transition text-white font-bold"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex-1 bg-white/5">
                        <iframe
                            src={resume ? `${process.env.NEXT_PUBLIC_API_URL}${resume.fileUrl}#toolbar=0` : "/cv.pdf#toolbar=0"}
                            className="w-full h-full border-none"
                        />
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}