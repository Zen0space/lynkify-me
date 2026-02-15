import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/logto";
import { redirect } from "next/navigation";
import LinkManager from "@/components/dashboard/link-manager";
import MobilePreview from "@/components/dashboard/mobile-preview";
import { trpcServer } from "@/lib/trpc-server";
import { UserAvatar } from "@/components/avatar/user-avatar";
import type { AvatarConfig } from "@lynkify/shared";

export default async function DashboardPage() {
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

    if (!isAuthenticated || !claims?.sub) {
        redirect("/");
    }

    const userData = await trpcServer.users.byLogtoId.query({ logtoId: claims.sub });
    const user = userData as {
        displayName: string | null;
        username: string | null;
        slug: string | null;
        avatarConfig: unknown;
    } | null;

    const displayName = user?.displayName || claims.name || "User";
    const username = user?.username || claims.username || "username";
    const slug = user?.slug || "";
    const avatarConfig = (user?.avatarConfig as AvatarConfig | null) ?? null;

    return (
        <div className="min-h-screen bg-surface-950 text-white px-6 py-10 md:p-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
                {/* Left Column: Editor */}
                <div className="min-w-0">
                    <header className="mb-12 flex items-center justify-between border-b border-white/5 pb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">My Links</h1>
                            <p className="text-surface-200/60">Manage your link-in-bio page.</p>
                        </div>
                        {/* User Profile Snippet */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">{displayName}</p>
                                <p className="text-xs text-surface-400">@{username}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full ring-2 ring-surface-800 overflow-hidden bg-surface-800">
                                <UserAvatar config={avatarConfig} size="100%" />
                            </div>
                        </div>
                    </header>

                    <LinkManager logtoId={claims.sub} />
                </div>

                {/* Right Column: Preview (Desktop Only) */}
                <aside className="hidden lg:block relative pl-8 border-l border-white/5">
                    <div className="sticky top-12">
                        <div className="text-center mb-8">
                            <h2 className="text-sm font-semibold text-surface-200 uppercase tracking-widest mb-1">Live Preview</h2>
                            <p className="text-xs text-surface-400">Updates in real-time</p>
                        </div>
                        <MobilePreview slug={slug} />
                    </div>
                </aside>
            </div>
        </div>
    );
}
