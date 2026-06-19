"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

interface Certificate {
  _id: string;
  name: string;
  description: string;
  provider: string;
  link: string;
  verified?: boolean;
  order?: number;
}

export default function CertificatesManager() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [provider, setProvider] = useState("");
    const [link, setLink] = useState("");
    const [verified, setVerified] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [order, setOrder] = useState<number | string>(0);

    async function fetchCertificates() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates`);
        const data = await res.json();
        setCertificates(data);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCertificates();
    }, []);

    const startEdit = (cert: Certificate) => {
        setEditingId(cert._id);
        setName(cert.name);
        setDescription(cert.description || "");
        setProvider(cert.provider);
        setLink(cert.link);
        setVerified(cert.verified || false);
        setOrder(cert.order || 0);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setName("");
        setDescription("");
        setProvider("");
        setLink("");
        setVerified(false);
        setOrder(0);
    };

    const saveCertificate = async () => {
        try {
            const token = localStorage.getItem("token");
            const isEditing = !!editingId;
            const url = isEditing 
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/certificates/${editingId}`
                : `${process.env.NEXT_PUBLIC_API_URL}/api/certificates`;
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    provider,
                    link,
                    verified,
                    order: Number(order) || 0
                })
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || `Failed to ${isEditing ? "update" : "add"} certificate`);
                return;
            }
            setName("");
            setDescription("");
            setProvider("");
            setLink("");
            setVerified(false);
            setOrder(0);
            setEditingId(null);
            fetchCertificates();
        } catch (error) {
            console.error(`Error ${editingId ? "updating" : "adding"} certificate:`, error);
        }
    };

    const deleteCertificate = async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please log in again.");
            return;
        }
        try{
        const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (!res.ok) {
            alert(data.message || "Failed to delete certificate");
            return;
        }
        alert(data.message || "Certificate deleted successfully");
        fetchCertificates();
        }catch (error) {
        console.error(error);
        }
    }

    return (
        <div className="relative min-h-screen w-full bg-[#050505] text-white p-10 overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                <Link 
                href="/admin/dashboard"
                className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 hover:text-white transition-all duration-300 group cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">Back to Dashboard</span>
                </Link>

                <Link 
                href="/" 
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 hover:text-purple-300 transition-all duration-300 group cursor-pointer"
                >
                    <span className="text-sm font-medium tracking-wide">Return to Portfolio</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </Link>
            </div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="relative max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-center bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent uppercase tracking-wide">
                    Certificates Manager
                </h1>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Certificate Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Full Stack Web Development"
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Provider / Issuing Organization</label>
                            <input
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                                placeholder="Eduskills, Microsoft, Coursera..."
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Description <span className="text-purple-400">(Optional)</span></label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your masterpiece..."
                            rows={3}
                            className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                        />
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Certificate Link</label>
                            <input
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="https://image.com/..."
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Display Order</label>
                            <input
                                type="number"
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                placeholder="e.g. 1 (First)"
                                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Is Verified?</label>
                            <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 h-12 hover:border-white/20 transition-all">
                                <input
                                    type="checkbox"
                                    checked={verified}
                                    onChange={(e) => setVerified(e.target.checked)}
                                    className="w-5 h-5 rounded bg-white/10 border border-white/20 cursor-pointer accent-green-500 checked:bg-green-500"
                                />
                                <span className={`font-medium transition-colors ${verified ? "text-green-400" : "text-gray-400"}`}>
                                    {verified ? "✓ Verified" : "○ Not Verified"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={saveCertificate}
                            className="group relative px-12 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white tracking-widest uppercase overflow-hidden hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer"
                        >
                            <span className="relative z-10">{editingId ? "Update Certificate" : "Launch Certificate"}</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                        {editingId && (
                            <button
                                onClick={cancelEdit}
                                className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certificates.map((certificate) => (
                        <div
                            key={certificate._id}
                            className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-pink-500/50 transition-all duration-500 shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4 gap-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                                    {certificate.name}
                                </h2>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => startEdit(certificate)}
                                        className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                                        title="Edit Certificate"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteCertificate(certificate._id)}
                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                        title="Delete Certificate"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <h3 className={`font-semibold text-xl`}>
                                        {certificate.name}
                                    </h3>
                                    {certificate.order !== undefined && certificate.order !== 0 && (
                                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">#{certificate.order}</span>
                                    )}
                                </div>
                                {certificate.verified && (
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/40">Verified</span>
                                )}
                            </div>

                            <p className="text-sm text-purple-300 mb-3 font-medium">
                                {certificate.provider}
                            </p>

                            <p className="text-gray-400 text-sm mb-6 line-clamp-2">
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
            </div>
        </div>
    )
}
