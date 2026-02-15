import { z } from "zod";
import { avatarConfigSchema } from "./avatar.js";

// Reserved slugs that can't be used as user profiles
const RESERVED_SLUGS = [
    "admin", "api", "auth", "callback", "dashboard", "login", "logout",
    "onboarding", "settings", "signup", "signin", "app", "help", "support",
    "about", "terms", "privacy", "contact", "blog", "docs", "pricing",
];

export const createUserSchema = z.object({
    email: z.string().email("Invalid email address").optional(),
    username: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    avatarConfig: avatarConfigSchema.optional(),
});

export const updateUserSchema = z.object({
    email: z.string().email("Invalid email address").optional(),
    username: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    avatarConfig: avatarConfigSchema.optional(),
});

/** Sync user from Logto on sign-in */
export const syncUserSchema = z.object({
    logtoId: z.string(),
    username: z.string().optional(),
    email: z.string().email().optional(),
});

/** Slug validation */
export const slugSchema = z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be at most 30 characters")
    .regex(
        /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/,
        "Only lowercase letters, numbers, and hyphens. Must start and end with a letter or number."
    )
    .refine((val) => !RESERVED_SLUGS.includes(val), {
        message: "This URL is reserved. Please choose another.",
    });

/** Complete onboarding */
export const completeOnboardingSchema = z.object({
    logtoId: z.string(),
    displayName: z.string().min(1, "Display name is required").max(50, "Too long"),
    slug: slugSchema,
    avatarConfig: avatarConfigSchema,
});

/** Check slug availability */
export const checkSlugSchema = z.object({
    slug: z.string().min(3).max(30),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type SyncUserSchema = z.infer<typeof syncUserSchema>;
export type CompleteOnboardingSchema = z.infer<typeof completeOnboardingSchema>;
export type CheckSlugSchema = z.infer<typeof checkSlugSchema>;
