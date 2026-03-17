import { useEffect, useState } from "react";

interface Skill {
  _id: string;
  name: string;
  icon?: string;
  category: string;
}
interface SkillCategory {
  category: string;
  skills: Skill[];
}

export default function ListView() {
  const [skills,setSkills] = useState<SkillCategory[]>([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`)
        const data: Skill[] = await  res.json()
        const grouped = data.reduce<Record<string, Skill[]>>((acc, skill) => {
          const category = skill.category;
          if (!acc[category]) acc[category] = [];
          acc[category].push(skill);
          return acc;
        }, {});
        const formattedSkills: SkillCategory[] = Object.keys(grouped).map(cat => ({
          category: cat,
          skills: grouped[cat]
        }));
        setSkills(formattedSkills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally{
        setLoading(false);
      }
    }
    fetchSkills();
  }, [])

  if (loading) return <div className="text-center text-purple-400 py-20 uppercase tracking-widest">Loading Arsenal...</div>;

  return (

    <div className="mx-auto w-full max-w-6xl space-y-14">
      {skills.map((group, index) => (
        <div key={index} className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-purple-500/40 to-transparent" />
            <h3 className="text-sm font-bold text-purple-400 tracking-[0.25em] uppercase">
                {"</>"} {group.category.toUpperCase()}
            </h3>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-purple-500/40 to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-6">
            {group.skills.map((skill, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/4 p-4 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] sm:p-6"
              >
                <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                <p className="text-sm text-gray-200 font-semibold tracking-wide group-hover:text-purple-400 transition">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}