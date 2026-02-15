"use client";

import Link from "next/link";

type Props = {
    onSignIn: () => Promise<void>;
    isAuthenticated: boolean;
};

export default function CtaSection({ onSignIn, isAuthenticated }: Props) {
    return (
        <section className="relative py-28 px-6">
            <div className="relative mx-auto max-w-3xl">
                {/* Glow */}
                <div className="absolute -inset-12 bg-primary-600/10 rounded-full blur-3xl animate-pulse-glow" />

                {/* Card */}
                <div className="relative rounded-3xl glass-strong glow-purple-strong overflow-hidden p-10 sm:p-14 text-center">
                    {/* Gradient top bar */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent" />

                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Ready to <span className="gradient-text">Lynkify</span> your links?
                    </h2>
                    <p className="text-surface-200/60 max-w-md mx-auto mb-8">
                        Join thousands of creators who use Lynkify to share their links beautifully.
                        Free forever. No credit card required.
                    </p>

                    {isAuthenticated ? (
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-primary-600/40 hover:scale-105"
                        >
                            Go to Dashboard
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    ) : (
                        <button
                            onClick={() => onSignIn()}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-primary-600/40 hover:scale-105 cursor-pointer"
                        >
                            Create Your Page — It&apos;s Free
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    )}

                    <p className="mt-4 text-xs text-surface-200/30">
                        No credit card · Free forever · Setup in 30 seconds
                    </p>
                </div>
            </div>
        </section>
    );
}
