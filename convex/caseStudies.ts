import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        client_name: v.optional(v.string()),
        industry: v.optional(v.string()),
        services: v.optional(v.array(v.string())),
        content: v.string(),
        status: v.string(),
        featured_image_storageId: v.optional(v.id("_storage")),
        featured_image_alt: v.optional(v.string()),
        seo_title: v.optional(v.string()),
        meta_description: v.optional(v.string()),
        json_ld: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        return await ctx.db.insert("case_studies", {
            ...args,
            createdAt: now,
            updatedAt: now,
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("case_studies"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        client_name: v.optional(v.string()),
        industry: v.optional(v.string()),
        services: v.optional(v.array(v.string())),
        content: v.optional(v.string()),
        status: v.optional(v.string()),
        featured_image_storageId: v.optional(v.id("_storage")),
        featured_image_alt: v.optional(v.string()),
        seo_title: v.optional(v.string()),
        meta_description: v.optional(v.string()),
        json_ld: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
    },
});

export const remove = mutation({
    args: { id: v.id("case_studies") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("case_studies")
            .withIndex("by_slug", q => q.eq("slug", args.slug))
            .first();
    },
});

export const getById = query({
    args: { id: v.id("case_studies") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const listPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("case_studies")
            .withIndex("by_status", q => q.eq("status", "published"))
            .order("desc")
            .collect();
    },
});

export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("case_studies").order("desc").collect();
    },
});

export const togglePublish = mutation({
    args: { id: v.id("case_studies") },
    handler: async (ctx, args) => {
        const cs = await ctx.db.get(args.id);
        if (!cs) throw new Error("Case study not found");
        const isPublished = cs.status === "published";
        await ctx.db.patch(args.id, {
            status: isPublished ? "draft" : "published",
            publishedAt: isPublished ? undefined : Date.now(),
            updatedAt: Date.now(),
        });
    },
});
