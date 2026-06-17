"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminLogin() {
  const [isAccessing, setIsAccessing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAccessing(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict`;
        window.location.href = "/admin/dashboard";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    } finally {
      setIsAccessing(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative z-10 mx-4 w-full max-w-md p-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div className="mb-5 text-center">
            <div className="mb-4 inline-block rounded-2xl border border-purple-500/20 bg-purple-500/10 p-3">
              <span className="text-2xl">Lock</span>
            </div>
            <h1 className="bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-4xl font-bold uppercase leading-tight text-transparent">
              Admin Access
            </h1>
            <p className="mt-2 text-lg uppercase leading-relaxed tracking-wide text-gray-400">
              Identity Verification Required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <label className="ml-2 text-[10px] font-bold uppercase tracking-widest text-purple-400">
                  Login ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="Username..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="group">
                <label className="ml-2 text-[10px] font-bold uppercase tracking-widest text-purple-400">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAccessing}
              className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-linear-to-r from-purple-600 to-blue-600 py-4 font-bold uppercase leading-tight tracking-wide text-white transition-all active:scale-95 disabled:opacity-50"
            >
              <span className="relative z-10">{isAccessing ? "Authorizing..." : "Initialize Link"}</span>
              <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs uppercase leading-tight tracking-wide text-gray-500 transition-colors underline-offset-4 hover:text-white hover:underline"
            >
              &lt;- Abort Mission (Back to Galaxy)
            </Link>
          </div>
        </div>

        <div className="absolute -left-2 -top-2 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-purple-500/50" />
        <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-blue-500/50" />
      </div>
    </div>
  );
}
