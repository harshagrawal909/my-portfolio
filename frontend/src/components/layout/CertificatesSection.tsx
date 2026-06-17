"use client"
import { useEffect, useState } from "react";

interface Certificate{
    _id:string;
    name:string;
    description:string;
    provider:string;
    link:string;
    verified?:boolean;
}

const getImageUrl = (link: string) => {
    const driveMatch = link.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (driveMatch) {
        // Use image proxy to bypass CORS restrictions
        const directUrl = `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
        return `https://images.weserv.nl/?url=${encodeURIComponent(directUrl)}&output=webp`;
    }
    return `https://api.microlink.io/?url=${encodeURIComponent(link)}&screenshot=true&meta=false&embed=screenshot.url`;
};

export default function CertificatesSection(){

    const [certificates,setCertificates] = useState<Certificate[]>([]);
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("");
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                if (!process.env.NEXT_PUBLIC_API_URL) {
                    throw new Error("API URL is not configured");
                }
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates`)
                if (!res.ok) {
                    throw new Error("Failed to fetch certificates");
                }
                const data: Certificate[] = await res.json()
                setCertificates(data);
            } catch (error) {
                console.error("Error fetching certificates:", error);
                setError("Unable to load certificates right now.");
            } finally{
                setLoading(false);
            }
        }
        fetchCertificates();
    }, [])

    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <div className="animate-pulse text-purple-400 tracking-widest uppercase">
            Loading Certifcates...
            </div>
        </div>
        );
    }
    return (
        <section id="certificates" className="relative min-h-screen overflow-hidden bg-transparent px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-32">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)]" />

            <div className="relative z-20 flex flex-col items-center gap-6 mb-20">
                <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] pb-2">
                    Certificates
                </h2>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {error && (
                    <p className="col-span-full text-center text-gray-400">{error}</p>
                )}
                {!error && certificates.length === 0 && (
                    <p className="col-span-full text-center text-gray-400">Certificates will appear here soon.</p>
                )}
                {certificates.map((certificate) => (
                    <div
                        key={certificate._id}
                        className={`group relative rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 p-5 backdrop-blur-lg transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] sm:p-7
                        `}
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_70%)] rounded-2xl pointer-events-none" />

                        <div className="h-40 rounded-lg overflow-hidden mb-6">
                            <a href={certificate.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={getImageUrl(certificate.link)}
                                    alt={certificate.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500 cursor-pointer"
                                />
                            </a>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold text-xl`}>
                                {certificate.name}
                            </h3>
                            {certificate.verified && (
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/40">Verified</span>
                            )}
                        </div>

                        <p className="text-sm text-purple-300 mb-3 font-medium">
                            {certificate.provider}
                        </p>

                        <p className="text-gray-300 mb-4">
                            {certificate.description}
                        </p>

                        <div className="mt-4">
                            <a
                                href={certificate.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 transition"
                            >
                                View Certificate
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
