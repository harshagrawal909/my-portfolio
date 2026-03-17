"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); 
    const links = [
        { href: "/#home", label: "Home", id:"home" },
        { href: "/#about", label: "About", id:"about" },
        { href: "/#skills", label: "Skills", id:"skills" },
        { href: "/#projects", label: "Projects", id:"projects" },
        { href: "/#contact", label: "Contact", id:"contact" },
    ];

    const activeSection = useActiveSection(["home","about", "skills", "projects","contact"]);

    const handleLogoClick = () => {
        if (activeSection === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        window.location.href = "/";
    };

    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <nav className="fixed z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/40 px-4 py-4 backdrop-blur-xl sm:px-6 md:px-10 md:py-6">
            
            <h1 className="max-w-[calc(100%-4rem)] truncate text-lg font-bold tracking-[0.2em] cursor-pointer sm:max-w-none sm:text-xl" onClick={handleLogoClick}>
                HARSH.AGRAWAL
            </h1>

            <button className="z-50 text-white md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}>
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
                className={`fixed top-0 right-0 flex h-[100svh] w-full flex-col items-center justify-center space-y-10 overflow-y-auto bg-black/95 px-6 text-xl transform transition-transform duration-300 md:hidden
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