import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        status: v.string(),
        page_type: v.optional(v.string()),
        target_keyword: v.optional(v.string()),
        secondary_keywords: v.optional(v.array(v.string())),
        monthly_volume: v.optional(v.number()),
        keyword_difficulty: v.optional(v.number()),
        hero_badge: v.optional(v.string()),
        hero_title: v.optional(v.string()),
        hero_subtitle: v.optional(v.string()),
        blocks: v.optional(v.string()),
        seo_title: v.optional(v.string()),
        meta_description: v.optional(v.string()),
        og_title: v.optional(v.string()),
        og_description: v.optional(v.string()),
        json_ld: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        return await ctx.db.insert("bofu_pages", {
            ...args,
            createdAt: now,
            updatedAt: now,
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("bofu_pages"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        status: v.optional(v.string()),
        page_type: v.optional(v.string()),
        target_keyword: v.optional(v.string()),
        secondary_keywords: v.optional(v.array(v.string())),
        monthly_volume: v.optional(v.number()),
        keyword_difficulty: v.optional(v.number()),
        hero_badge: v.optional(v.string()),
        hero_title: v.optional(v.string()),
        hero_subtitle: v.optional(v.string()),
        blocks: v.optional(v.string()),
        seo_title: v.optional(v.string()),
        meta_description: v.optional(v.string()),
        og_title: v.optional(v.string()),
        og_description: v.optional(v.string()),
        json_ld: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
    },
});

export const remove = mutation({
    args: { id: v.id("bofu_pages") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("bofu_pages")
            .withIndex("by_slug", q => q.eq("slug", args.slug))
            .first();
    },
});

export const getById = query({
    args: { id: v.id("bofu_pages") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const listPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("bofu_pages")
            .withIndex("by_status", q => q.eq("status", "published"))
            .order("desc")
            .collect();
    },
});

export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("bofu_pages").order("desc").collect();
    },
});

export const togglePublish = mutation({
    args: { id: v.id("bofu_pages") },
    handler: async (ctx, args) => {
        const page = await ctx.db.get(args.id);
        if (!page) throw new Error("Page not found");
        const isPublished = page.status === "published";
        await ctx.db.patch(args.id, {
            status: isPublished ? "draft" : "published",
            publishedAt: isPublished ? undefined : Date.now(),
            updatedAt: Date.now(),
        });
    },
});
