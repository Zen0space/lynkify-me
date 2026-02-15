import { z } from "zod";

export const createLinkSchema = z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().url("Must be a valid URL"),
    icon: z.string().optional(),
});

export const updateLinkSchema = z.object({
    id: z.string(),
    data: z.object({
        title: z.string().min(1).optional(),
        url: z.string().url().optional(),
        icon: z.string().optional(),
        archived: z.boolean().optional(),
    }),
});

export const reorderLinksSchema = z.object({
    items: z.array(z.object({
        id: z.string(),
        order: z.number()
    }))
});

export const linkSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    url: z.string(),
    icon: z.string().nullable(),
    order: z.number(),
    archived: z.boolean(),
    clicks: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
