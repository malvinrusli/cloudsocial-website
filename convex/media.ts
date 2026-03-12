import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function requireAdmin(secret: string | undefined) {
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        throw new Error("Unauthorized");
    }
}

// Step 1: Get a short-lived upload URL from Convex storage
export const generateUploadUrl = mutation({
    args: { adminSecret: v.string() },
    handler: async (ctx, { adminSecret }) => {
        requireAdmin(adminSecret);
        return await ctx.storage.generateUploadUrl();
    },
});

// Step 2: Save the storageId + metadata after upload completes
export const saveMedia = mutation({
    args: {
        adminSecret: v.string(),
        storageId: v.id("_storage"),
        filename: v.string(),
        contentType: v.string(),
        category: v.optional(v.string()),
        label: v.optional(v.string()),
    },
    handler: async (ctx, { adminSecret, ...args }) => {
        requireAdmin(adminSecret);
        return await ctx.db.insert("media", {
            ...args,
            uploadedAt: Date.now(),
        });
    },
});

// Get all media files with their serving URLs (read-only, protected by page login)
export const listMedia = query({
    args: {},
    handler: async (ctx) => {
        const files = await ctx.db.query("media").order("desc").collect();
        return await Promise.all(
            files.map(async (file) => ({
                ...file,
                url: await ctx.storage.getUrl(file.storageId),
            }))
        );
    },
});

// Get videos only — matches category:"video" OR contentType starting with "video/"
export const listVideos = query({
    args: {},
    handler: async (ctx) => {
        const all = await ctx.db.query("media").order("desc").collect();
        const files = all.filter(
            (f) => f.category === "video" || f.contentType?.startsWith("video/")
        );
        return await Promise.all(
            files.map(async (file) => ({
                ...file,
                url: await ctx.storage.getUrl(file.storageId),
            }))
        );
    },
});

// Fetch URLs for a batch of storage IDs directly
export const getVideosBatch = query({
    args: { storageIds: v.array(v.string()) },
    handler: async (ctx, { storageIds }) => {
        return await Promise.all(
            storageIds.map(async (id) => ({
                _id: id,
                url: await ctx.storage.getUrl(id as any),
            }))
        );
    },
});

// Get a single file's URL by storageId
export const getUrl = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, { storageId }) => {
        return await ctx.storage.getUrl(storageId);
    },
});

// Delete a media file
export const deleteMedia = mutation({
    args: { adminSecret: v.string(), id: v.id("media"), storageId: v.id("_storage") },
    handler: async (ctx, { adminSecret, id, storageId }) => {
        requireAdmin(adminSecret);
        await ctx.storage.delete(storageId);
        await ctx.db.delete(id);
    },
});
