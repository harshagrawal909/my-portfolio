"use client"
export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center h-screen text-center px-6" id="home">
        <div className="absolute w-150 h-150 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-ping"></div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Code the Future. <br /> Design the Experience.
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed tracking-wide">
            Merging deep system thinking with the power of Artificial Intelligence to architect the next generation of digital experiences. I turn complex logic into elegant, future-ready solutions.
        </p>

        <button 
            className="group mt-10 px-8 py-3 border border-purple-500 rounded-full text-white font-medium shadow-lg transition-transform duration-500 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            onClick={() => {window.location.href="#about"}}
        >
            Explore My Universe
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
    </section>
  );
}