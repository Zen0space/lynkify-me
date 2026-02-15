export default function LinkPreview() {
    return (
        <div className="relative animate-float">
            {/* Phone frame */}
            <div className="relative w-[280px] sm:w-[320px] rounded-[2.5rem] glass-strong glow-purple p-3">
                {/* Screen */}
                <div className="rounded-[2rem] bg-surface-900/90 overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 py-2.5">
                        <span className="text-[10px] text-surface-200">9:41</span>
                        <div className="flex gap-1">
                            <div className="w-3.5 h-2 rounded-sm bg-surface-200/60" />
                            <div className="w-1.5 h-2 rounded-sm bg-surface-200/40" />
                        </div>
                    </div>

                    {/* Bio content */}
                    <div className="px-6 pb-8 pt-4 flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 via-primary-600 to-pink-500 p-[3px] mb-4">
                            <div className="w-full h-full rounded-full bg-surface-900 flex items-center justify-center">
                                <span className="text-2xl">✨</span>
                            </div>
                        </div>

                        {/* Name */}
                        <h3 className="text-base font-bold text-white mb-1">@janedoe</h3>
                        <p className="text-xs text-surface-200/70 mb-5 max-w-[200px]">
                            Designer & Content Creator ✦ Building cool things
                        </p>

                        {/* Links */}
                        <div className="w-full flex flex-col gap-2.5">
                            <LinkButton emoji="🎨" label="My Portfolio" color="from-primary-600/20 to-primary-600/5" />
                            <LinkButton emoji="📸" label="Instagram" color="from-pink-600/20 to-pink-600/5" />
                            <LinkButton emoji="🐦" label="Twitter / X" color="from-sky-600/20 to-sky-600/5" />
                            <LinkButton emoji="🎬" label="YouTube Channel" color="from-red-600/20 to-red-600/5" />
                            <LinkButton emoji="☕" label="Buy Me a Coffee" color="from-amber-600/20 to-amber-600/5" />
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex items-center gap-1.5 text-[10px] text-surface-200/40">
                            <div className="w-3 h-3 rounded bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                <span className="text-[6px] text-white font-bold">L</span>
                            </div>
                            Powered by Lynkify
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-12 bg-primary-600/8 rounded-full blur-3xl animate-pulse-glow -z-10" />
        </div>
    );
}

function LinkButton({
    emoji,
    label,
    color,
}: {
    emoji: string;
    label: string;
    color: string;
}) {
    return (
        <div
            className={`w-full rounded-xl bg-gradient-to-r ${color} border border-white/[0.06] px-4 py-3 flex items-center gap-3 transition-all hover:scale-[1.02] hover:border-white/[0.12] cursor-pointer`}
        >
            <span className="text-base">{emoji}</span>
            <span className="text-xs font-medium text-white">{label}</span>
            <svg
                className="w-3.5 h-3.5 ml-auto text-surface-200/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );
}
