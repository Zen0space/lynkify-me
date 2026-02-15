"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Props = {
    isAuthenticated: boolean;
    onSignIn: () => Promise<void>;
};

export default function Navbar({ isAuthenticated, onSignIn }: Props) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10); // Lower threshold
        };
        // Initial check
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
                ? "glass-strong py-3 shadow-lg shadow-primary-900/10"
                : "bg-transparent py-6"
                }`}
        >
            <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-primary-500/20">
                        <span className="text-white font-bold text-sm">L</span>
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">
                        Lynk<span className="gradient-text">ify</span>
                    </span>
                </Link>

                {/* ... rest of nav ... */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-surface-200 hover:text-white transition-colors">
                        Features
                    </a>
                    <a href="#how-it-works" className="text-sm font-medium text-surface-200 hover:text-white transition-colors">
                        How it Works
                    </a>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <Link
                            href="/dashboard"
                            className="rounded-full bg-surface-800 border border-surface-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-surface-700 hover:scale-105"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <button
                                onClick={() => onSignIn()}
                                className="hidden sm:block text-sm font-medium text-surface-200 hover:text-white transition-colors cursor-pointer"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => onSignIn()}
                                className="rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:shadow-primary-600/40 hover:scale-105 cursor-pointer"
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
