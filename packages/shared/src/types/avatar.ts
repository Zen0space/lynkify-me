/**
 * Avatar configuration for react-nice-avatar.
 * Stored as JSON in the database, rendered on the frontend.
 */

export type AvatarSex = "man" | "woman";
export type AvatarEarSize = "small" | "big";
export type AvatarHairStyle = "normal" | "thick" | "mohawk" | "womanLong" | "womanShort";
export type AvatarHatStyle = "beanie" | "turban" | "none";
export type AvatarEyeStyle = "circle" | "oval" | "smile";
export type AvatarGlassesStyle = "round" | "square" | "none";
export type AvatarNoseStyle = "short" | "long" | "round";
export type AvatarMouthStyle = "laugh" | "smile" | "peace";
export type AvatarShirtStyle = "hoody" | "short" | "polo";
export type AvatarEyeBrowStyle = "up" | "upWoman";

export interface AvatarConfig {
    sex: AvatarSex;
    faceColor: string;
    earSize: AvatarEarSize;
    hairColor: string;
    hairStyle: AvatarHairStyle;
    hatColor: string;
    hatStyle: AvatarHatStyle;
    eyeStyle: AvatarEyeStyle;
    eyeBrowStyle: AvatarEyeBrowStyle;
    glassesStyle: AvatarGlassesStyle;
    noseStyle: AvatarNoseStyle;
    mouthStyle: AvatarMouthStyle;
    shirtStyle: AvatarShirtStyle;
    shirtColor: string;
    bgColor: string;
    isGradient: boolean;
}
