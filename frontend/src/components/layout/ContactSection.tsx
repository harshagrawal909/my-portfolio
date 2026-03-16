"use client"
import {useState } from "react";

export default function ContactSection() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Transmitting...");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "9efb036a-f746-483f-aa37-487ce74f7187");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Transmission Received!");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult("Transmission Failed. Interruption detected.");
        console.error("Error", data);
      }
    } catch (error) {
      setResult("Offline. Check your connection.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent mb-8">

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 w-full max-w-lg mx-4">

        <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-r from-purple-600/20 to-blue-600/20 opacity-40 blur-xl pointer-events-none" />

        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight uppercase">
            Transmit Message
          </h2>

          <p className="text-gray-400 text-lg tracking-wide mt-2 leading-relaxed uppercase">Frequency: Open for Transmission</p>
          <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full mt-4" />
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="text-[10px] text-purple-400 uppercase font-bold ml-2 tracking-widest">Name</label>
            <input 
              name="name"
              type="text" 
              placeholder="Identity..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300" 
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] text-purple-500 uppercase font-bold ml-2 tracking-widest">Email</label>
            <input 
              name="email"
              type="email" 
              placeholder="comms@universe.com"
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] text-purple-400 uppercase font-bold ml-2 tracking-widest">Message</label>
            <textarea 
              name="message"
              rows={4} 
              placeholder="Your transmission details here..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all duration-300" 
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative group overflow-hidden py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl text-white font-bold uppercase tracking-wide leading-tight transition-all active:scale-95 disabled:opacity-50 cursor-pointer hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]">
            <span className="relative z-10">
              {isSubmitting ? "Processing..." : "Send Message"}
            </span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
          </button>
        </form>
        {result && (
          <div className={`mt-6 text-center text-xs font-bold uppercase tracking-widest animate-bounce ${result.includes("Success") || result.includes("Received") ? "text-green-400" : "text-purple-400"}`}>
            {result}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm tracking-wide uppercase">© 2026 Harsh Agrawal. Finalizing Connection...</p>
        </div>
      </div>
    </section>
  );
}