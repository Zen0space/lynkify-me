import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/logto";
import { redirect } from "next/navigation";
import OnboardingFlow from "./flow";

export default async function OnboardingPage() {
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

    if (!isAuthenticated || !claims?.sub) {
        redirect("/");
    }

    return (
        <OnboardingFlow
            logtoId={claims.sub}
            email={claims.email || ""}
            username={claims.username || ""}
        />
    );
}
