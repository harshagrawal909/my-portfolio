"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [hasToken] = useState(() =>
    typeof window !== "undefined" ? Boolean(localStorage.getItem("token")) : false
  );

  useEffect(() => {
    if (!hasToken) {
      router.push("/admin/login");
    }
  }, [hasToken, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
    router.push("/admin/login");
  };

  const modules = [
    { name: "Manage Projects", route: "/admin/projects" },
    { name: "Edit Skills", route: "/admin/skills" },
    { name: "Manage Resume", route: "/admin/resume" },
    { name: "Manage Certificates", route: "/admin/certificates" },
  ];

  if (!hasToken) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] font-sans text-white">
      <div className="absolute right-[-10%] top-[-10%] h-125 w-125 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] h-125 w-125 rounded-full bg-blue-600/10 blur-[120px]" />

      <nav className="relative z-20 flex items-center justify-between border-b border-white/10 bg-black/20 px-8 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
          <h2 className="cursor-pointer text-xl font-bold tracking-widest">System.Dashboard</h2>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 transition-all hover:text-white hover:underline underline-offset-1"
          >
            <span className="transition-transform group-hover:-translate-x-1">&lt;-</span>
            Return to Portfolio
          </Link>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-full border border-red-500/20 bg-red-500/10 px-6 py-2 text-xs font-bold uppercase tracking-widest text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 p-8 md:grid-cols-3">
        <div className="mb-4 rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:col-span-3">
          <h1 className="bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-4xl font-bold uppercase leading-tight text-transparent">
            Welcome Back, Admin
          </h1>
        </div>

        {modules.map((module) => (
          <div
            key={module.name}
            onClick={() => router.push(module.route)}
            className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all duration-500 hover:border-purple-500/50 hover:bg-white/10"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-xl transition-transform group-hover:scale-110">
              *
            </div>
            <h3 className="mb-2 text-xl font-bold">{module.name}</h3>
            <p className="text-sm text-gray-400">Initialize system module to modify portfolio data structures.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 opacity-0 transition-opacity group-hover:opacity-100">
              Access Module <span>-&gt;</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
