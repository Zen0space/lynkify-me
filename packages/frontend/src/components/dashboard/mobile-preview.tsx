"use client";

import { useState } from "react";

type Props = {
    slug: string;
};

export default function MobilePreview({ slug }: Props) {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    if (!slug) return null;

    return (
        <div className="sticky top-24 w-full flex flex-col items-center">
            {/* Phone Frame */}
            <div className="relative w-[300px] aspect-[9/19] rounded-[3rem] border-8 border-surface-900 bg-surface-950 shadow-2xl overflow-hidden ring-1 ring-white/10">
                {/* Dynamic Notch / Camera */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-surface-900 rounded-b-2xl z-20 flex items-center justify-center">
                    <div className="w-16 h-4 rounded-full bg-black/50" />
                </div>

                {/* Status Bar Mock */}
                <div className="absolute top-3 right-6 z-10 flex gap-1">
                    <div className="w-4 h-2.5 rounded-[1px] border border-white/30" />
                    <div className="w-0.5 h-1 bg-white/30 self-center" />
                </div>

                {/* Content Iframe */}
                <iframe
                    key={refreshKey}
                    src={`/${slug}`}
                    className="w-full h-full bg-white border-0"
                    title="Mobile Preview"
                />

                {/* Reflection/Gloss effect */}
                <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-30 ring-1 ring-white/5" />
            </div>

            {/* Controls */}
            <div className="mt-6 flex gap-4">
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-colors text-xs font-medium text-surface-400 hover:text-white"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
                <a
                    href={`/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-colors text-xs font-medium text-surface-400 hover:text-white"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open
                </a>
            </div>
        </div>
    );
}
