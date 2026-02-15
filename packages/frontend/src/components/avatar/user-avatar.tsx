"use client";

import Avatar, { genConfig } from "react-nice-avatar";
import type { AvatarConfig } from "@lynkify/shared";

interface UserAvatarProps {
    config: AvatarConfig | null;
    size?: string;
    shape?: "circle" | "rounded" | "square";
    className?: string;
}

/**
 * Renders a react-nice-avatar from a stored config.
 * If no config is provided, generates a random one.
 */
export function UserAvatar({
    config,
    size = "3rem",
    shape = "circle",
    className,
}: UserAvatarProps) {
    const avatarConfig = config ?? genConfig();

    return (
        <Avatar
            style={{ width: size, height: size }}
            shape={shape}
            className={className}
            {...avatarConfig}
        />
    );
}

/**
 * Generate a random avatar config to store in the database.
 */
export function generateAvatarConfig(): AvatarConfig {
    const config = genConfig();
    return {
        sex: config.sex,
        faceColor: config.faceColor,
        earSize: config.earSize,
        hairColor: config.hairColor,
        hairStyle: config.hairStyle,
        hatColor: config.hatColor,
        hatStyle: config.hatStyle,
        eyeStyle: config.eyeStyle,
        eyeBrowStyle: config.eyeBrowStyle,
        glassesStyle: config.glassesStyle,
        noseStyle: config.noseStyle,
        mouthStyle: config.mouthStyle,
        shirtStyle: config.shirtStyle,
        shirtColor: config.shirtColor,
        bgColor: config.bgColor,
        isGradient: config.isGradient ?? false,
    };
}
