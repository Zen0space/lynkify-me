import type { AvatarConfig } from "./avatar.js";

export interface User {
    id: string;
    logtoId: string;
    username: string | null;
    email: string | null;
    displayName: string | null;
    slug: string | null;
    avatarConfig: AvatarConfig | null;
    onboardingComplete: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserInput {
    email: string;
    name?: string;
    avatarConfig?: AvatarConfig;
}

export interface UpdateUserInput {
    name?: string;
    email?: string;
    avatarConfig?: AvatarConfig;
}
