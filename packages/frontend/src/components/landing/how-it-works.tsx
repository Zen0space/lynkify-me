const steps = [
    {
        step: "01",
        title: "Create Your Account",
        description: "Sign up in seconds. No credit card required. Start building your page immediately.",
        icon: "🚀",
    },
    {
        step: "02",
        title: "Add Your Links",
        description: "Add all your important links — social profiles, websites, music, shops, and more.",
        icon: "🔗",
    },
    {
        step: "03",
        title: "Share Everywhere",
        description: "Copy your unique Lynkify URL and add it to your social bios. That's it!",
        icon: "🌍",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-28 px-6">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/5 to-transparent" />

            <div className="relative mx-auto max-w-6xl">
                {/* Section header */}
                <div className="text-center mb-16">
                    <span className="inline-block rounded-full glass px-4 py-1.5 text-xs font-medium text-primary-300 mb-4">
                        How it Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Up and running in{" "}
                        <span className="gradient-text">3 simple steps</span>
                    </h2>
                    <p className="text-surface-200/60 max-w-xl mx-auto">
                        No setup headaches. No complex configurations. Just simplicity.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={step.step} className="relative">
                            {/* Connector line */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[1px] bg-gradient-to-r from-primary-600/30 to-primary-600/5" />
                            )}

                            <div className="flex flex-col items-center text-center">
                                {/* Step number + icon */}
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-2xl glass-strong flex items-center justify-center text-3xl transition-transform hover:scale-110 hover:glow-purple">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-white">{step.step}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-surface-200/50 leading-relaxed max-w-xs">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
