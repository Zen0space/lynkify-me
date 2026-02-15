import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc";

export const metadata: Metadata = {
    title: "Lynkify — Your Links, Your Way",
    description:
        "Create a stunning link-in-bio page in seconds. Share all your important links, social profiles, and content in one beautiful, customizable page.",
    keywords: ["link in bio", "linktree alternative", "social links", "bio link", "lynkify"],
    openGraph: {
        title: "Lynkify — Your Links, Your Way",
        description: "Create a stunning link-in-bio page in seconds.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className="antialiased overflow-x-hidden">
                <TRPCProvider>{children}</TRPCProvider>
            </body>
        </html>
    );
}
