import { handleSignIn, getLogtoContext } from "@logto/next/server-actions";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { logtoConfig } from "@/lib/logto";
import { trpcServer } from "@/lib/trpc-server";

export async function GET(request: NextRequest) {
    console.log("\n🔐 Frontend: Callback route hit!");
    console.log("📍 URL:", request.url);

    const searchParams = request.nextUrl.searchParams;
    console.log("📝 Search params:", {
        hasCode: searchParams.has('code'),
        hasState: searchParams.has('state'),
        hasIss: searchParams.has('iss')
    });

    console.log("🍪 Request cookies:", request.cookies.getAll().map(c => ({
        name: c.name,
        hasValue: !!c.value
    })));

    console.log("🔑 Calling handleSignIn...");
    const signInResult = await handleSignIn(logtoConfig, searchParams);
    console.log("✅ handleSignIn completed");
    console.log("📝 Sign in result:", signInResult);

    console.log("🍪 Cookies after handleSignIn:", request.cookies.getAll().map(c => ({
        name: c.name,
        hasValue: !!c.value
    })));

    console.log("🔍 Calling getLogtoContext...");
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

    console.log("📊 Authentication status:", {
        isAuthenticated,
        hasClaims: !!claims,
        sub: claims?.sub,
        email: claims?.email,
        username: claims?.username,
        allClaims: claims
    });

    const hasIdentifier = claims?.email || claims?.username;
    let redirectUrl = "/dashboard";

    if (isAuthenticated && claims?.sub && hasIdentifier) {
        console.log("✅ Frontend: User is authenticated, proceeding with sync...");

        try {
            console.log("🌐 Frontend: Attempting to sync user with backend...", {
                logtoId: claims.sub,
                username: claims.username,
                email: claims.email
            });

            await trpcServer.users.sync.mutate({
                logtoId: claims.sub,
                username: claims.username ?? undefined,
                email: claims.email ?? undefined,
            });

            console.log("✅ Frontend: User synced successfully, fetching user data...");

            const fullUser = await trpcServer.users.byLogtoId.query({ logtoId: claims.sub });

            console.log("📊 Frontend: User data received:", {
                userExists: !!fullUser,
                username: fullUser?.username,
                email: fullUser?.email,
                onboardingComplete: fullUser?.onboardingComplete,
                hasDisplayName: !!fullUser?.displayName,
                hasSlug: !!fullUser?.slug
            });

            if (fullUser && !fullUser.onboardingComplete) {
                redirectUrl = "/onboarding";
            }
        } catch (error) {
            console.error("❌ Frontend: Failed to sync user:", error);
            throw error;
        }
    }

    console.log(`🎯 Frontend: Redirecting to ${redirectUrl}`);
    console.log("=".repeat(60) + "\n");
    redirect(redirectUrl);
}
