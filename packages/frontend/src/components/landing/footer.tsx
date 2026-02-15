export default function Footer() {
    return (
        <footer className="border-t border-white/[0.04] py-12 px-6">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">L</span>
                        </div>
                        <span className="text-sm font-semibold text-white">
                            Lynk<span className="gradient-text">ify</span>
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-xs text-surface-200/40">
                        <a href="#privacy" className="hover:text-surface-200 transition-colors">Privacy</a>
                        <a href="#terms" className="hover:text-surface-200 transition-colors">Terms</a>
                        <a href="#contact" className="hover:text-surface-200 transition-colors">Contact</a>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-surface-200/30">
                        © {new Date().getFullYear()} Lynkify. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
