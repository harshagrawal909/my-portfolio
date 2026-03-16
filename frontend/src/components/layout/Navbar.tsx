"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation"; 
import { useActiveSection } from '../hooks/useActiveSection';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); 
    const pathname = usePathname();
    const links = [
        { href: "/#home", label: "Home", id:"home" },
        { href: "/#about", label: "About", id:"about" },
        { href: "/#skills", label: "Skills", id:"skills" },
        { href: "/#projects", label: "Projects", id:"projects" },
        { href: "/#contact", label: "Contact", id:"contact" },
    ];

    const activeSection = useActiveSection(["home","about", "skills", "projects","contact"]);

    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <nav className="flex justify-between items-center px-10 py-6 fixed w-full z-50 backdrop-blur-xl border-b border-white/10 bg-transparent">
            
            <h1 className="text-xl font-bold tracking-widest cursor-pointer" onClick={()=>{activeSection=="home" ? window.scrollTo({top:0, behavior:"smooth"}) : window.location.href="/"}}>
                HARSH.AGRAWAL
            </h1>

            <button className="md:hidden z-50 text-white" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <div className={`hidden md:flex items-center space-x-8 text-sm`}
            >
                {links.map((link)=>(
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`uppercase tracking-wide font-bold transition-all hover:text-purple-400 ${ activeSection === link.id ? "text-purple-400 underline underline-offset-4" : "text-white/70" }`}
                    >
                            {link.label}
                    </Link>
                ))}
                <button
                    onClick={() => (window.location.href = "/admin/login")}
                    className="hidden md:block px-4 py-2 text-sm border border-purple-500/40 rounded-lg text-purple-300 hover:bg-purple-500/20 transition cursor-pointer"
                >
                    Login as Admin
                </button>
            </div>

            <div
                className={`fixed top-0 right-0 h-screen w-full bg-black/95 flex flex-col items-center justify-center space-y-10 text-xl transform transition-transform duration-300 md:hidden
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`uppercase font-bold transition hover:text-purple-400 ${
                    activeSection === link.id
                        ? "text-purple-400"
                        : "text-white/80"
                    }`}
                >
                    {link.label}
                </Link>
                ))}

                <button
                onClick={() => (window.location.href = "/admin/login")}
                className="px-6 py-3 border border-purple-500/40 rounded-lg text-purple-300"
                >
                Admin Login
                </button>
            </div>
        </nav>
    );
}