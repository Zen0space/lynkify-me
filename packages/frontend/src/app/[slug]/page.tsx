import { notFound } from "next/navigation";
import { trpcServer } from "@/lib/trpc-server";
import type { Metadata } from "next";
import Link from "next/link";
import { UserAvatar } from "@/components/avatar/user-avatar";
import type { AvatarConfig } from "@lynkify/shared";

type Props = {
    params: Promise<{ slug: string }>;
};

// SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const user = await trpcServer.users.bySlug.query({ slug });
        return {
            title: `${user.displayName} (@${user.slug}) | Lynkify`,
            description: `Check out ${user.displayName}'s links on Lynkify.`,
        };
    } catch {
        return { title: "User Not Found | Lynkify" };
    }
}

export default async function UserProfilePage({ params }: Props) {
    const { slug } = await params;

    let user: {
        displayName: string | null;
        slug: string | null;
        logtoId: string;
        avatarConfig: unknown;
    } | null = null;
    let links: { id: string; url: string; title: string; icon: string | null; archived: boolean }[] = [];

    try {
        const userData = await trpcServer.users.bySlug.query({ slug });
        user = userData;
        if (!user) notFound();
        const allLinks = await trpcServer.links.list.query({ logtoId: user.logtoId });
        links = allLinks.filter((l) => !l.archived);
    } catch {
        notFound();
    }

    const avatarConfig = (user?.avatarConfig as AvatarConfig | null) ?? null;

    return (
        <div className="min-h-screen bg-surface-950 text-white overflow-x-hidden">
            {/* Background Effect */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/10 blur-[120px]" />
            </div>

            <div className="relative max-w-2xl mx-auto px-6 py-16 flex flex-col items-center min-h-screen">
                {/* Profile Card */}
                <div className="w-full flex flex-col items-center animate-fade-in-up">
                    {/* Avatar */}
                    <div className="relative mb-6 group">
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-pink-500 rounded-full opacity-75 blur transition-opacity group-hover:opacity-100 animate-pulse-glow" />
                        <div className="relative w-32 h-32 rounded-full border-4 border-surface-950 bg-surface-900 overflow-hidden ring-4 ring-primary-500/20">
                            <UserAvatar config={avatarConfig} size="100%" />
                        </div>
                    </div>

                    {/* User Info */}
                    <h1 className="text-2xl font-bold text-white mb-2 text-center">
                        {user.displayName}
                    </h1>
                    <p className="text-surface-200/60 font-medium mb-8 text-center bg-surface-800/50 px-3 py-1 rounded-full text-sm">
                        @{user.slug}
                    </p>

                    {/* Links List */}
                    <div className="w-full space-y-4 mb-16">
                        {links.length === 0 ? (
                            <div className="p-6 rounded-2xl glass-strong border-dashed border-2 border-surface-700/50 text-center">
                                <p className="text-surface-200/40 text-sm">No links added yet.</p>
                            </div>
                        ) : (
                            links.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 rounded-xl glass-strong border border-white/5 hover:bg-surface-800/60 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600/20 to-primary-600/5 text-primary-300 flex items-center justify-center text-xl shrink-0">
                                                {link.icon || '🔗'}
                                            </div>
                                            <div className="text-left w-full min-w-0">
                                                <h3 className="font-semibold text-white group-hover:text-primary-200 transition-colors truncate pr-4">{link.title}</h3>
                                            </div>
                                        </div>

                                        {/* External Link Icon */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 text-primary-400">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto">
                        <Link href="/" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                <span className="text-white font-bold text-[10px]">L</span>
                            </div>
                            <span className="text-xs font-medium text-white">Create your own Lynkify</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
