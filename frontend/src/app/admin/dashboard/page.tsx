"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    }else {
      setUser({ email: "commander@galaxy.dev" });
    }

  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
    router.push("/admin/login");
  };

  const modules = [
    { name: "Manage Projects", route: "/admin/projects" },
    { name: "Edit Skills", route: "/admin/skills" },
    { name: "Manage Resume", route: "/admin/resume" },
  ];

  if (!user) return null;

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden font-sans">
      
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-purple-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-blue-600/10 rounded-full blur-[120px]" />

      <nav className="relative z-20 border-b border-white/10 bg-black/20 backdrop-blur-md px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
          <h2 className="text-xl font-bold tracking-widest cursor-pointer">
            System.Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all cursor-pointer hover:underline underline-offset-1"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Return to Portfolio
          </Link>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="relative z-10 p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-8 mb-4">
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight uppercase">
            WELCOME BACK, Admin
          </h1>
        </div>

        {modules.map((module) => (
          <div 
            key={module.name}
            onClick = {() => router.push(module.route)}
            className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-500 cursor-pointer"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl border border-purple-500/20 mb-6 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🚀
            </div>
            <h3 className="text-xl font-bold mb-2">{module.name}</h3>
            <p className="text-gray-400 text-sm">Initialize system module to modify portfolio data structures.</p>
            <div className="mt-6 flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Access Module <span>→</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}