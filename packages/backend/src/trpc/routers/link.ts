import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
import {
    createLinkSchema,
    updateLinkSchema,
    reorderLinksSchema,
} from "@lynkify/shared";
import { TRPCError } from "@trpc/server";

export const linksRouter = router({
    create: publicProcedure
        .input(z.object({ logtoId: z.string() }).merge(createLinkSchema))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { logtoId: input.logtoId },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            // Get max order to append to end
            const lastLink = await ctx.prisma.link.findFirst({
                where: { userId: user.id },
                orderBy: { order: "desc" },
            });

            const newOrder = lastLink ? lastLink.order + 1 : 0;

            return ctx.prisma.link.create({
                data: {
                    userId: user.id,
                    title: input.title,
                    url: input.url,
                    icon: input.icon,
                    order: newOrder,
                },
            });
        }),

    list: publicProcedure
        .input(z.object({ logtoId: z.string() }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { logtoId: input.logtoId },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            return ctx.prisma.link.findMany({
                where: { userId: user.id },
                orderBy: { order: "asc" },
            });
        }),

    update: publicProcedure
        .input(z.object({ logtoId: z.string() }).merge(updateLinkSchema))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { logtoId: input.logtoId },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const link = await ctx.prisma.link.findUnique({
                where: { id: input.id },
            });

            if (!link) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Link not found",
                });
            }

            if (link.userId !== user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "Not authorized to update this link",
                });
            }

            return ctx.prisma.link.update({
                where: { id: input.id },
                data: input.data,
            });
        }),

    delete: publicProcedure
        .input(z.object({ logtoId: z.string(), id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { logtoId: input.logtoId },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const link = await ctx.prisma.link.findUnique({
                where: { id: input.id },
            });

            if (!link) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Link not found",
                });
            }

            if (link.userId !== user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "Not authorized to delete this link",
                });
            }

            return ctx.prisma.link.delete({
                where: { id: input.id },
            });
        }),

    reorder: publicProcedure
        .input(z.object({ logtoId: z.string() }).merge(reorderLinksSchema))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { logtoId: input.logtoId },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            // Verify all links belong to user
            const linkIds = input.items.map((i) => i.id);
            const links = await ctx.prisma.link.findMany({
                where: {
                    id: { in: linkIds },
                    userId: user.id,
                },
            });

            if (links.length !== linkIds.length) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "Some links do not belong to user",
                });
            }

            // Update order in transaction
            return ctx.prisma.$transaction(
                input.items.map((item) =>
                    ctx.prisma.link.update({
                        where: { id: item.id },
                        data: { order: item.order },
                    })
                )
            );
        }),
});
