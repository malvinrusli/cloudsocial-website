import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        excerpt: v.optional(v.string()),
        status: v.string(),
        author: v.string(),
        funnel_stage: v.optional(v.string()),
        cluster: v.optional(v.string()),
        pillar: v.optional(v.string()),
        target_keyword: v.optional(v.string()),
        secondary_keywords: v.optional(v.array(v.string())),
        monthly_volume: v.optional(v.number()),
        keyword_difficulty: v.optional(v.number()),
        word_count_target: v.optional(v.number()),
        seo_title: v.optional(v.string()),
        meta_description: v.optional(v.string()),
        og_title: v.optional(v.string()),
        og_description: v.optional(v.string()),
        featured_image_storageId: v.optional(v.id("_storage")),
        featured_image_alt: v.optional(v.string()),
        featured_image_prompt: v.optional(v.string()),
        json_ld: v.optional(v.string()),
        key_takeaways: v.optional(v.array(v.string())),
        faqs: v.optional(v.array(v.object({ question: v.string(), answer: v.string() }))),
        ai_generated: v.optional(v.boolean()),
        queueItemId: v.optional(v.id("keyword_queue")),
        publishedAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        return await ctx.db.insert("posts", {
            ...args,
            createdAt: now,
            updatedAt: now,
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("posts"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        content: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        status: v.optional(v.string()),
        author: v.optional(v.string()),
        funnel_stage: v.optional(v.string()),
        cluster: v.optional(v.string()),
        pillar: v.optional(v.string()),
        target_keyword: v.optional(v.string()),
        secondary_keywords: v.optional(v.array(v.string())),
        monthly_volume: v.optional(v.number()),
        keyword_difficulty: v.optional(v.number()),
        word_count_target: v.optional(v.number()),
        seo_title: v.optional(v.string()),
        meta_description: v.optional(v.string()),
        og_title: v.optional(v.string()),
        og_description: v.optional(v.string()),
        featured_image_storageId: v.optional(v.id("_storage")),
        featured_image_alt: v.optional(v.string()),
        featured_image_prompt: v.optional(v.string()),
        json_ld: v.optional(v.string()),
        key_takeaways: v.optional(v.array(v.string())),
        faqs: v.optional(v.array(v.object({ question: v.string(), answer: v.string() }))),
        ai_generated: v.optional(v.boolean()),
        publishedAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
    },
});

export const remove = mutation({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("posts")
            .withIndex("by_slug", q => q.eq("slug", args.slug))
            .first();
    },
});

export const getById = query({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const listPublished = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("posts")
            .withIndex("by_status", q => q.eq("status", "published"))
            .order("desc")
            .collect();
    },
});

export const listAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("posts").order("desc").collect();
    },
});

export const getByKeyword = query({
    args: { keyword: v.string() },
    handler: async (ctx, { keyword }) => {
        return await ctx.db
            .query("posts")
            .filter(q => q.eq(q.field("target_keyword"), keyword))
            .first();
    },
});

export const togglePublish = mutation({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.id);
        if (!post) throw new Error("Post not found");
        const isPublished = post.status === "published";
        await ctx.db.patch(args.id, {
            status: isPublished ? "draft" : "published",
            publishedAt: isPublished ? undefined : Date.now(),
            updatedAt: Date.now(),
        });
    },
});
