"use client"
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 text-center sm:px-6 md:px-10" id="home">
        <div className="absolute -z-10 h-[65vw] w-[65vw] max-h-[38rem] max-w-[38rem] rounded-full bg-purple-600/20 blur-[120px] animate-ping"></div>

        <h1 className="max-w-5xl text-4xl font-bold leading-tight bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent sm:text-5xl md:text-7xl">
            Code the Future. <br /> Design the Experience.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed tracking-wide text-gray-400 sm:text-lg md:text-xl">
            Merging deep system thinking with the power of Artificial Intelligence to architect the next generation of digital experiences. I turn complex logic into elegant, future-ready solutions.
        </p>

        <button 
            className="group mt-10 flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-purple-500 px-6 py-3 text-base font-medium text-white shadow-lg transition-transform duration-500 hover:scale-105 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] active:scale-95 sm:w-auto sm:px-8"
            onClick={() => {window.location.href="#about"}}
        >
            Explore My Universe
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
    </section>
  );
}