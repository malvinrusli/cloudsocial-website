import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addToQueue = mutation({
    args: {
        target_keyword: v.string(),
        secondary_keywords: v.optional(v.array(v.string())),
        monthly_volume: v.optional(v.number()),
        keyword_difficulty: v.optional(v.number()),
        word_count_target: v.optional(v.number()),
        funnel_stage: v.optional(v.string()),
        cluster: v.optional(v.string()),
        pillar: v.optional(v.string()),
        featured_image_prompt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("keyword_queue", {
            ...args,
            status: "pending",
            createdAt: Date.now(),
        });
    },
});

export const updateQueueItem = mutation({
    args: {
        id: v.id("keyword_queue"),
        status: v.optional(v.string()),
        error_message: v.optional(v.string()),
        processedAt: v.optional(v.number()),
        postId: v.optional(v.id("posts")),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

export const removeFromQueue = mutation({
    args: { id: v.id("keyword_queue") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const getNextPending = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("keyword_queue")
            .filter(q => q.eq(q.field("status"), "pending"))
            .order("asc")
            .first();
    },
});

export const listQueue = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("keyword_queue").order("desc").collect();
    },
});

export const getByKeyword = query({
    args: { keyword: v.string() },
    handler: async (ctx, { keyword }) => {
        return await ctx.db
            .query("keyword_queue")
            .filter(q => q.eq(q.field("target_keyword"), keyword))
            .first();
    },
});
