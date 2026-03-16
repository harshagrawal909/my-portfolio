"use client";

import { useEffect, useState } from "react";

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon:string;
}

export default function SkillsManager() {

  const [skills, setSkills] = useState<Skill[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Language");
  const [icon,setIcon] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);
    const data = await res.json();

    setSkills(data);

  };

  const addSkill = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          category,
          icon
        })
      });
      const data=await res.json();
      if(!res.ok){
        alert(data.message || "Failed to add skill");
        return;
      }
      setName("");
      setIcon("");
      fetchSkills();
    }catch (error) {
      console.error(error);
    }
  };

  const deleteSkill = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Session expired. Please log in again.");
        return;
    }
    try{
      const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete skill");
        return;
      }
      alert(data.message || "Skill deleted successfully");
      fetchSkills();
    }catch (error) {
      console.error(error);
    }
  };

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
          Skills Manager
        </h1>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Skill Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. React"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none cursor-pointer"
              >
                <option className="bg-gray-900">Language</option>
                <option className="bg-gray-900">Frontend</option>
                <option className="bg-gray-900">Backend</option>
                <option className="bg-gray-900">Tools</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 ml-1 uppercase tracking-widest">Icon URL</label>
              <input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="https://..."
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={addSkill}
              className="group relative px-12 py-3 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white tracking-widest uppercase overflow-hidden hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              <span className="relative z-10">Add New Skill</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>

        {["Language", "Frontend", "Backend", "Tools"].map((cat) => {
          const filteredSkills = skills.filter((s) => s.category === cat);
          if (filteredSkills.length === 0) return null;

          return (
            <div key={cat} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-widest">
                  {cat}
                </h3>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill._id}
                    className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.2)] transition-all duration-300"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_70%)] rounded-2xl pointer-events-none" />
                    
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-purple-500/30 transition-colors">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/25/25231.png")} 
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {skill.name}
                          </h2>
                          <p className="text-xs text-gray-500 uppercase tracking-tighter">
                            Ready to deploy
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteSkill(skill._id)}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                        title="Delete Skill"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}