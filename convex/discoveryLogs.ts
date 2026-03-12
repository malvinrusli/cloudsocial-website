import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getLastRun = query({
    args: { identifier: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("discovery_logs")
            .withIndex("by_identifier", (q) => q.eq("identifier", args.identifier))
            .order("desc")
            .first();
    },
});

export const addLog = mutation({
    args: {
        source: v.string(),
        identifier: v.string(),
        keywords_found: v.number(),
        type: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("discovery_logs", {
            ...args,
            lastRunAt: Date.now(),
        });
    },
});
