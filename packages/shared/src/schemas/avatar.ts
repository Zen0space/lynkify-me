import { z } from "zod";

export const avatarConfigSchema = z.object({
    sex: z.enum(["man", "woman"]),
    faceColor: z.string(),
    earSize: z.enum(["small", "big"]),
    hairColor: z.string(),
    hairStyle: z.enum(["normal", "thick", "mohawk", "womanLong", "womanShort"]),
    hatColor: z.string(),
    hatStyle: z.enum(["beanie", "turban", "none"]),
    eyeStyle: z.enum(["circle", "oval", "smile"]),
    eyeBrowStyle: z.enum(["up", "upWoman"]),
    glassesStyle: z.enum(["round", "square", "none"]),
    noseStyle: z.enum(["short", "long", "round"]),
    mouthStyle: z.enum(["laugh", "smile", "peace"]),
    shirtStyle: z.enum(["hoody", "short", "polo"]),
    shirtColor: z.string(),
    bgColor: z.string(),
    isGradient: z.boolean().optional().default(false),
});

export type AvatarConfigSchema = z.infer<typeof avatarConfigSchema>;
