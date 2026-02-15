"use client";

import { useState, useEffect } from "react";
import { genConfig } from "react-nice-avatar";
import { trpc } from "@/lib/trpc";
import { UserAvatar } from "@/components/avatar/user-avatar";

import type { AvatarConfig } from "@lynkify/shared";

const getRandomConfig = (): AvatarConfig => {
    const config = genConfig();
    return {
        sex: config.sex,
        faceColor: config.faceColor,
        earSize: config.earSize,
        hairColor: config.hairColor,
        hairStyle: config.hairStyle,
        hatColor: config.hatColor,
        hatStyle: config.hatStyle,
        eyeStyle: config.eyeStyle,
        eyeBrowStyle: config.eyeBrowStyle,
        glassesStyle: config.glassesStyle,
        noseStyle: config.noseStyle,
        mouthStyle: config.mouthStyle,
        shirtStyle: config.shirtStyle,
        shirtColor: config.shirtColor,
        bgColor: config.bgColor,
        isGradient: config.isGradient ?? false,
    };
};

type Props = {
    logtoId: string;
    email: string;
    username: string;
};

export default function OnboardingFlow({ logtoId, username }: Props) {
    const [step, setStep] = useState(1);
    const [displayName, setDisplayName] = useState(username || "");
    const [slug, setSlug] = useState("");
    const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(getRandomConfig());
    const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);

    // Queries & Mutations
    const checkSlug = trpc.users.checkSlug.useQuery(
        { slug },
        { enabled: slug.length >= 3, retry: false }
    );

    const completeOnboarding = trpc.users.completeOnboarding.useMutation({
        onSuccess: () => {
            // Force refresh to update any server-side validation/redirection logic
            // and go to dashboard
            window.location.href = "/dashboard";
        },
        onError: (err: any) => {
            alert("Failed to create profile: " + err.message);
        }
    });

    // Watch availability
    useEffect(() => {
        if (slug.length < 3) {
            setIsSlugAvailable(null);
            return;
        }
        if (checkSlug.data) setIsSlugAvailable(checkSlug.data.available);
    }, [checkSlug.data, slug]); // user input typing

    const handleComplete = () => {
        completeOnboarding.mutate({
            logtoId,
            displayName,
            slug,
            avatarConfig,
        });
    };

    return (
        <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md animate-fade-in-up z-10">
                {/* Progress */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-primary-500 shadow-glow" : "bg-surface-800"}`} />
                    <div className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-primary-500 shadow-glow" : "bg-surface-800"}`} />
                </div>

                <div className="relative rounded-3xl glass-strong p-8 sm:p-10 shadow-2xl shadow-primary-900/20">
                    {step === 1 ? (
                        /* Step 1: Avatar & Name */
                        <div className="text-center animate-fade-in">
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome! 👋</h1>
                            <p className="text-surface-200/60 text-sm mb-8">
                                Let&apos;s get your profile set up.
                            </p>

                            {/* Avatar Picker */}
                            <div className="relative mx-auto w-32 h-32 mb-8 group">
                                <UserAvatar config={avatarConfig} size="8rem" className="shadow-2xl shadow-primary-500/20 transition-transform duration-300 hover:scale-105" />
                                <button
                                    onClick={() => setAvatarConfig(getRandomConfig())}
                                    type="button"
                                    className="absolute bottom-0 right-0 p-2.5 rounded-full bg-surface-800 border border-surface-700 text-white shadow-xl hover:bg-surface-700 hover:scale-110 transition-all cursor-pointer"
                                    title="Randomize Avatar"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                            </div>

                            {/* Name Input */}
                            <div className="mb-6 text-left">
                                <label className="block text-xs font-bold text-surface-200/80 mb-2 ml-1 tracking-wide">
                                    DISPLAY NAME
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="e.g. Jane Doe"
                                    className="w-full rounded-xl bg-surface-900/50 border border-surface-700/50 px-4 py-3.5 text-white placeholder-surface-200/20 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                                    autoFocus
                                />
                            </div>

                            <button
                                onClick={() => {
                                    if (displayName.trim()) setStep(2);
                                }}
                                disabled={!displayName.trim()}
                                className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 py-3.5 font-bold text-white shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none cursor-pointer"
                            >
                                Continue
                            </button>
                        </div>
                    ) : (
                        /* Step 2: Slug */
                        <div className="text-center animate-fade-in">
                            <button
                                onClick={() => setStep(1)}
                                className="absolute top-8 left-8 text-surface-200/40 hover:text-white transition-colors"
                            >
                                ← Back
                            </button>

                            <h1 className="text-3xl font-bold text-white mb-2">Claim your link 🔗</h1>
                            <p className="text-surface-200/60 text-sm mb-8">
                                This will be your unique URL.
                            </p>

                            <div className="mb-8 text-left">
                                <label className="block text-xs font-bold text-surface-200/80 mb-2 ml-1 tracking-wide">
                                    USERNAME
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-200/40 font-medium z-10 pointer-events-none">
                                        lynkify.me/
                                    </span>
                                    <input
                                        type="text"
                                        value={slug}
                                        onChange={(e) => {
                                            const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
                                            setSlug(val);
                                        }}
                                        placeholder="janedoe"
                                        className={`w-full rounded-xl bg-surface-900/50 border px-4 py-3.5 pl-24 text-white placeholder-surface-200/20 focus:outline-none focus:ring-2 transition-all ${slug.length < 3
                                            ? "border-surface-700/50 focus:ring-primary-500/50"
                                            : isSlugAvailable === false
                                                ? "border-red-500/50 focus:ring-red-500/50 ring-1 ring-red-500/30"
                                                : isSlugAvailable === true
                                                    ? "border-emerald-500/50 focus:ring-emerald-500/50 ring-1 ring-emerald-500/30"
                                                    : "border-surface-700/50 focus:ring-primary-500/50"
                                            }`}
                                        autoFocus
                                    />

                                    {/* Status Indicator */}
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {checkSlug.isLoading ? (
                                            <div className="w-4 h-4 rounded-full border-2 border-surface-200/20 border-t-white animate-spin" />
                                        ) : slug.length >= 3 ? (
                                            isSlugAvailable ? (
                                                <span className="text-emerald-400 drop-shadow-glow">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                            ) : (
                                                <span className="text-red-400 drop-shadow-glow">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </span>
                                            )
                                        ) : null}
                                    </div>
                                </div>

                                {/* Helper text */}
                                <div className="h-6 mt-2 text-left text-xs ml-1 flex items-center gap-1.5 transition-all">
                                    {slug.length > 0 && slug.length < 3 && (
                                        <span className="text-surface-200/40">Must be at least 3 characters</span>
                                    )}
                                    {slug.length >= 3 && isSlugAvailable === false && (
                                        <span className="text-red-400 font-medium">Username is already taken</span>
                                    )}
                                    {slug.length >= 3 && isSlugAvailable === true && (
                                        <span className="text-emerald-400 font-medium">Username is available!</span>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleComplete}
                                disabled={!isSlugAvailable || !displayName || completeOnboarding.isPending}
                                className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 py-3.5 font-bold text-white shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none cursor-pointer flex items-center justify-center gap-2"
                            >
                                {completeOnboarding.isPending ? (
                                    <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                                ) : (
                                    "Create Page 🚀"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
