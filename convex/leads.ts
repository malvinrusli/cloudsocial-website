import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        company: v.optional(v.string()),
        phone: v.optional(v.string()),
        message: v.optional(v.string()),
        source: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const id = await ctx.db.insert("leads", {
            ...args,
            createdAt: Date.now(),
        });
        return id;
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("leads").order("desc").collect();
    },
});
