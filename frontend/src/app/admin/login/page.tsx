"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminLogin() {
  const [isAccessing, setIsAccessing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAccessing(true);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }); 

        const data = await res.json();
        if(res.ok){
            setIsAccessing(false);
            localStorage.setItem("token", data.token);
            document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Strict`;
            window.location.href = "/admin/dashboard";
        }else{
            alert(data.message || "Login failed");
            setIsAccessing(false);
        }
    } catch (err) {
        console.error(err);
        setIsAccessing(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-5">
            <div className="inline-block p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight uppercase">
              Admin Access
            </h1>
            <p className="text-lg text-gray-400 uppercase leading-relaxed tracking-wide mt-2">
              Identity Verification Required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] text-purple-400 uppercase font-bold ml-2 tracking-widest">
                  Login ID
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Username..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300"
                />
              </div>

              <div className="group">
                <label className="text-[10px] text-purple-400 uppercase font-bold ml-2 tracking-widest">
                    Password
                </label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isAccessing}
              className="w-full relative group overflow-hidden py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl text-white font-bold uppercase tracking-wide leading-tight transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <span className="relative z-10">
                {isAccessing ? "Authorizing..." : "Initialize Link"}
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-wide leading-tight hover:underline underline-offset-4"
            >
              ← Abort Mission (Back to Galaxy)
            </Link>
          </div>
        </div>

        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-xl" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 rounded-br-xl" />
      </div>
    </div>
  );
}