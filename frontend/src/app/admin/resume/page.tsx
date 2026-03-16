"use client";
import {useState,useEffect} from "react"
import { FaCloudUploadAlt, FaRegFilePdf, FaEye, FaDownload } from "react-icons/fa";

interface Resume{
    fileUrl:string;
}

export default function ResumeManager(){
    const [resume,setResume] = useState<Resume | null>(null);
    const [file,setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const resumeUrl = resume?.fileUrl
        ? (resume.fileUrl.startsWith("http")
            ? resume.fileUrl
            : `${process.env.NEXT_PUBLIC_API_URL}${resume.fileUrl}`)
        : null;

    useEffect(() => {
        fetchResume();
    },[])

    const fetchResume = async() => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`);
            const data = await res.json();
            setResume(data);
        } catch (error) {
            console.log("Error fetching resume:", error);
        }
    }

    const uploadResume = async() => {
        if(!file) return;
        setIsUploading(true);
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("resume", file);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();
    
            if (!res.ok) {
                alert(data.message || "Upload failed");
                return;
            }
            alert("Resume uploaded successfully");
            setFile(null);
            fetchResume();
        } catch (error: any) {
            alert(error.message);
        } finally{
            setIsUploading(false);
        }
    }

    return (
        <div className="relative min-h-screen bg-[#050505] text-white p-10 overflow-hidden">
            
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

            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

            <div className="relative max-w-4xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent uppercase tracking-tighter">
                        Resume Control Center
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-[0.3em]">Manage your professional identity</p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                <FaCloudUploadAlt className="text-purple-400" /> Upload New
                            </h2>

                            <label className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all mb-6">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FaRegFilePdf className={`text-3xl mb-3 ${file ? 'text-green-400' : 'text-gray-500 group-hover:text-purple-400'}`} />
                                    <p className="text-sm text-gray-400 text-center px-4">
                                        {file ? <span className="text-white font-medium">{file.name}</span> : "Click to select or drag PDF"}
                                    </p>
                                </div>
                                <input
                                    type="file" 
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                                />
                            </label>
                            <button
                                onClick={uploadResume}
                                disabled={!file || isUploading}
                                className="w-full py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all cursor-pointer"
                            >
                                {isUploading ? "Syncing..." : "Update Resume"}
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-2 h-full min-h-125 flex flex-col overflow-hidden">
                            <div className="p-4 flex justify-between items-center border-b border-white/5">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                </span>
                                
                                {resume && (
                                    <div className="flex gap-2">
                                        <a
                                            href={resumeUrl || undefined}
                                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition"
                                            title="Open in same tab"
                                        >
                                        <FaEye />
                                        </a>
                                        <a
                                            href={resumeUrl || undefined}
                                            download
                                            className="p-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white rounded-lg transition"
                                        >
                                        <FaDownload />
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 bg-black/20 rounded-2xl overflow-hidden relative">
                                {resume ? (
                                    <iframe
                                        src={`${resumeUrl}#toolbar=0`}
                                        className="w-full h-full border-none"
                                    />
                                    ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
                                        No resume found in database.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}