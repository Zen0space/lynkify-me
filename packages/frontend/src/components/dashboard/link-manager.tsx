"use client";

import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function LinkManager({ logtoId }: { logtoId: string }) {
    const utils = trpc.useUtils();
    const { data: links, isLoading } = trpc.links.list.useQuery({ logtoId });
    const createLink = trpc.links.create.useMutation({
        onSuccess: () => utils.links.list.invalidate({ logtoId })
    });
    const updateLink = trpc.links.update.useMutation({
        onSuccess: () => utils.links.list.invalidate({ logtoId })
    });
    const deleteLink = trpc.links.delete.useMutation({
        onSuccess: () => utils.links.list.invalidate({ logtoId })
    });

    // State for new link form
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !url) return;

        createLink.mutate({
            logtoId,
            title,
            url
        }, {
            onSuccess: () => {
                setTitle("");
                setUrl("");
            }
        });
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure?")) {
            deleteLink.mutate({ logtoId, id });
        }
    };

    const handleToggleArchive = (id: string, archived: boolean) => {
        updateLink.mutate({ logtoId, id, data: { archived: !archived } });
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Add Link Form */}
            <div className="glass p-6 rounded-2xl border border-white/5">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 text-sm">➕</span>
                    Add New Link
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row md:items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-medium text-surface-200/60 uppercase tracking-wider">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. My Portfolio"
                            className="w-full bg-surface-900/50 border border-surface-700/50 rounded-xl px-4 py-3 text-white placeholder-surface-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
                            required
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-medium text-surface-200/60 uppercase tracking-wider">URL</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-surface-900/50 border border-surface-700/50 rounded-xl px-4 py-3 text-white placeholder-surface-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all font-medium"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={createLink.isPending}
                        className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary-600/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
                    >
                        {createLink.isPending ? "Adding..." : "Add Link"}
                    </button>
                </form>
            </div>

            {/* Links List */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-surface-700/30 flex items-center justify-center text-surface-200 text-sm">🔗</span>
                    Your Links
                </h2>

                {isLoading ? (
                    <div className="text-center py-12 text-surface-400 flex flex-col items-center gap-4">
                        <div className="w-8 h-8 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
                        Loading links...
                    </div>
                ) : links?.length === 0 ? (
                    <div className="text-center py-16 glass rounded-2xl border border-dashed border-surface-700/50 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-800/50 flex items-center justify-center text-2xl">
                            😴
                        </div>
                        <div>
                            <p className="text-white font-medium">No links yet</p>
                            <p className="text-surface-400 text-sm mt-1">Add your first link above to get started!</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {links?.map((link) => (
                            <div key={link.id} className={`glass p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between group transition-all hover:border-surface-600 hover:bg-surface-800/40 gap-4 ${link.archived ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${link.archived ? 'bg-surface-800 text-surface-400' : 'bg-gradient-to-br from-primary-600/20 to-primary-600/5 text-primary-300'}`}>
                                        {link.icon || '🔗'}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-medium text-white truncate">{link.title}</h3>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-surface-400 hover:text-primary-400 transition-colors truncate block hover:underline decoration-primary-400/30 underline-offset-2"
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end sm:self-auto opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                    <div className="flex gap-1 bg-surface-900/50 rounded-lg p-1 border border-surface-700/50">
                                        <button
                                            onClick={() => handleToggleArchive(link.id, link.archived)}
                                            className={`p-2 rounded-md text-xs font-medium transition-colors ${link.archived ? 'text-green-400 hover:bg-green-400/10' : 'text-yellow-400 hover:bg-yellow-400/10'}`}
                                            title={link.archived ? "Unarchive" : "Archive"}
                                        >
                                            {link.archived ? "Restore" : "Archive"}
                                        </button>
                                        <div className="w-px bg-surface-700/50 my-1" />
                                        <button
                                            onClick={() => handleDelete(link.id)}
                                            className="p-2 rounded-md text-red-400 hover:bg-red-400/10 transition-colors text-xs font-medium"
                                            title="Delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
