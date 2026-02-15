import type { AvatarConfig } from "./avatar.js";

export interface User {
    id: string;
    logtoId: string;
    email: string;
    displayName: string | null;
    slug: string | null;
    avatarConfig: AvatarConfig | null;
    onboardingComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
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
