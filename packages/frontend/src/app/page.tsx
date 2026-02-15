import { getLogtoContext, signIn } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/logto";
import Link from "next/link";
import Navbar from "@/components/landing/navbar";
import LinkPreview from "@/components/landing/link-preview";
import Features from "@/components/landing/features";
import HowItWorks from "@/components/landing/how-it-works";
import CtaSection from "@/components/landing/cta-section";
import Footer from "@/components/landing/footer";

export default async function Home() {
    const { isAuthenticated } = await getLogtoContext(logtoConfig);

    const handleSignIn = async () => {
        "use server";
        await signIn(logtoConfig);
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onSignIn={handleSignIn} />

            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-12 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/8 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/6 rounded-full blur-[100px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900/5 rounded-full blur-[80px]" />
                </div>

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="relative z-10 mx-auto max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left — Copy */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Badge */}
                        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-medium text-surface-200/70">
                                Free & Open Source
                            </span>
                        </div>

                        <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                            Your links,
                            <br />
                            <span className="gradient-text">your way.</span>
                        </h1>

                        <p className="animate-fade-in-up-delayed text-base sm:text-lg text-surface-200/50 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                            Create a beautiful, customizable link-in-bio page in seconds.
                            Share all your important links in one place — exactly how you want.
                        </p>

                        {/* CTA buttons */}
                        <div className="animate-fade-in-up-delayed-2 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                            {isAuthenticated ? (
                                <Link
                                    href="/dashboard"
                                    className="w-full sm:w-auto rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-primary-600/40 hover:scale-105 text-center"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <form action={handleSignIn}>
                                        <button
                                            type="submit"
                                            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-primary-600/40 hover:scale-105 cursor-pointer"
                                        >
                                            Get Started — It&apos;s Free
                                        </button>
                                    </form>
                                    <a
                                        href="#preview"
                                        className="w-full sm:w-auto rounded-full glass px-8 py-3.5 text-sm font-medium text-surface-200 transition-all hover:bg-white/[0.06] text-center"
                                    >
                                        See a Demo ↓
                                    </a>
                                </>
                            )}
                        </div>

                        {/* Social proof */}
                        <div className="animate-fade-in-up-delayed-2 mt-10 flex items-center gap-4 justify-center lg:justify-start">
                            <div className="flex -space-x-2">
                                {["🟣", "🔵", "🟢", "🟡"].map((dot, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-surface-800 border-2 border-surface-950 flex items-center justify-center text-xs"
                                    >
                                        {dot}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-surface-200/40">
                                <span className="text-white font-medium">500+</span> creators already using Lynkify
                            </p>
                        </div>
                    </div>

                    {/* Right — Preview */}
                    <div id="preview" className="flex-shrink-0">
                        <LinkPreview />
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up-delayed-2">
                    <span className="text-[10px] uppercase tracking-widest text-surface-200/20">Scroll</span>
                    <div className="w-5 h-8 rounded-full border border-surface-200/10 flex items-start justify-center p-1">
                        <div className="w-1 h-2 rounded-full bg-primary-400/50 animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Features */}
            <Features />

            {/* How it works */}
            <HowItWorks />

            {/* CTA */}
            <CtaSection onSignIn={handleSignIn} isAuthenticated={isAuthenticated} />

            {/* Footer */}
            <Footer />
        </>
    );
}
