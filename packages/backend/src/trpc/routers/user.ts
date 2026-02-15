import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
import {
    createUserSchema,
    updateUserSchema,
    syncUserSchema,
    checkSlugSchema,
    completeOnboardingSchema,
    type UpdateUserSchema,
} from "@lynkify/shared";
import { TRPCError } from "@trpc/server";
import type { Prisma } from "@prisma/client";

export const userRouter = router({
    list: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),

    byId: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { id: input.id },
            });
            if (!user) throw new TRPCError({ code: "NOT_FOUND" });
            return user;
        }),

    byLogtoId: publicProcedure
        .input(z.object({ logtoId: z.string() }))
        .query(async ({ ctx, input }) => {
            console.log("🔍 Fetching user by logtoId:", input.logtoId);

            const user = await ctx.prisma.user.findUnique({
                where: { logtoId: input.logtoId },
            });

            if (user) {
                console.log("✅ User found:", {
                    id: user.id,
                    email: user.email,
                    onboardingComplete: user.onboardingComplete,
                    displayName: user.displayName,
                    slug: user.slug
                });
            } else {
                console.log("❌ User not found for logtoId:", input.logtoId);
            }

            return user;
        }),

    bySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { slug: input.slug },
            });
            if (!user) throw new TRPCError({ code: "NOT_FOUND" });
            return user;
        }),

    checkSlug: publicProcedure
        .input(checkSlugSchema)
        .query(async ({ ctx, input }) => {
            const existing = await ctx.prisma.user.findUnique({
                where: { slug: input.slug },
            });
            return { available: !existing };
        }),

    sync: publicProcedure
        .input(syncUserSchema)
        .mutation(async ({ ctx, input }) => {
            console.log("🔐 User sync attempt:", {
                logtoId: input.logtoId,
                username: input.username,
                email: input.email,
                timestamp: new Date().toISOString()
            });

            const existingUser = await ctx.prisma.user.findUnique({
                where: { logtoId: input.logtoId },
            });

            if (existingUser) {
                console.log("✅ User already exists, updating:", {
                    id: existingUser.id,
                    oldUsername: existingUser.username,
                    newUsername: input.username,
                    oldEmail: existingUser.email,
                    newEmail: input.email
                });
            } else {
                console.log("🆕 Creating new user in database:", {
                    logtoId: input.logtoId,
                    username: input.username,
                    email: input.email
                });
            }

            const result = await ctx.prisma.user.upsert({
                where: { logtoId: input.logtoId },
                create: {
                    logtoId: input.logtoId,
                    username: input.username,
                    email: input.email,
                },
                update: {
                    username: input.username,
                    email: input.email,
                },
            });

            console.log("✅ User sync completed successfully:", {
                id: result.id,
                logtoId: result.logtoId,
                username: result.username,
                email: result.email,
                onboardingComplete: result.onboardingComplete
            });

            return result;
        }),

    completeOnboarding: publicProcedure
        .input(completeOnboardingSchema)
        .mutation(async ({ ctx, input }) => {
            // 1. Check if slug is taken (double check)
            const existingSlug = await ctx.prisma.user.findUnique({
                where: { slug: input.slug },
            });

            // Allow if it's the SAME user (updating their own slug), otherwise error
            if (existingSlug && existingSlug.logtoId !== input.logtoId) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Slug is already taken",
                });
            }

            // 2. Update user
            return ctx.prisma.user.update({
                where: { logtoId: input.logtoId },
                data: {
                    displayName: input.displayName,
                    slug: input.slug,
                    avatarConfig: input.avatarConfig as Prisma.InputJsonValue,
                    onboardingComplete: true,
                },
            });
        }),

    createTestUser: publicProcedure
        .input(createUserSchema)
        .mutation(async ({ ctx, input }) => {
            // This is a legacy/test endpoint, real users come via sync
            return ctx.prisma.user.create({
                data: {
                    logtoId: `test_${Date.now()}`,
                    email: input.email,
                    displayName: input.name,
                    avatarConfig: input.avatarConfig as Prisma.InputJsonValue,
                },
            });
        }),

    updateUser: publicProcedure
        .input(
            z.object({
                id: z.string(),
                data: updateUserSchema,
            })
        )
        .mutation(async ({ ctx, input }) => {
            const data = input.data as UpdateUserSchema;
            const updateData: Prisma.UserUpdateInput = {};
            if (data.name) updateData.displayName = data.name;
            if (data.email) updateData.email = data.email;
            if (data.avatarConfig) updateData.avatarConfig = data.avatarConfig as Prisma.InputJsonValue;
            
            return ctx.prisma.user.update({
                where: { id: input.id },
                data: updateData,
            });
        }),

    deleteUser: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.user.delete({
                where: { id: input.id },
            });
        }),
});
