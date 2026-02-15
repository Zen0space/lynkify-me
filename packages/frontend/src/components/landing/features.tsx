const features = [
    {
        icon: "🎨",
        title: "Fully Customizable",
        description:
            "Customize colors, fonts, layouts, and themes to match your brand perfectly.",
    },
    {
        icon: "⚡",
        title: "Lightning Fast",
        description:
            "Optimized for speed. Your page loads instantly, no matter where your audience is.",
    },
    {
        icon: "📊",
        title: "Detailed Analytics",
        description:
            "Track clicks, views, and engagement. Know exactly what your audience loves.",
    },
    {
        icon: "🔗",
        title: "Unlimited Links",
        description:
            "Add as many links as you need. Social profiles, websites, shops — all in one place.",
    },
    {
        icon: "🌙",
        title: "Dark & Light Modes",
        description:
            "Beautiful themes for every preference. Your page adapts to your audience.",
    },
    {
        icon: "🎭",
        title: "Custom Avatars",
        description:
            "Generate unique avatars or upload your own. Stand out from the crowd.",
    },
];

export default function Features() {
    return (
        <section id="features" className="relative py-28 px-6">
            <div className="mx-auto max-w-6xl">
                {/* Section header */}
                <div className="text-center mb-16">
                    <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-medium text-primary-300 mb-4">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Everything you need to{" "}
                        <span className="gradient-text">stand out</span>
                    </h2>
                    <p className="text-surface-200/60 max-w-xl mx-auto">
                        Powerful tools to create, customize, and share your link-in-bio page.
                        No coding required.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature, i) => (
                        <div
                            key={feature.title}
                            className="group rounded-2xl glass p-6 transition-all duration-300 hover:glass-strong hover:glow-purple hover:scale-[1.02]"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600/20 to-primary-600/5 border border-primary-500/10 flex items-center justify-center text-xl mb-4 transition-transform group-hover:scale-110">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-surface-200/50 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
