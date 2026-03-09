import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    leads: defineTable({
        name: v.string(),
        email: v.string(),
        company: v.optional(v.string()),
        phone: v.optional(v.string()),
        message: v.optional(v.string()),
        source: v.optional(v.string()), // which CTA button triggered this
        createdAt: v.number(),
    }),

    media: defineTable({
        storageId: v.id("_storage"),
        filename: v.string(),
        contentType: v.string(),
        category: v.optional(v.string()), // "image", "video", "document"
        label: v.optional(v.string()),    // human-readable name
        uploadedAt: v.number(),
    }),
});
