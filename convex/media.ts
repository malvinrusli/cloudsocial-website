import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Step 1: Get a short-lived upload URL from Convex storage
export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});

// Step 2: Save the storageId + metadata after upload completes
export const saveMedia = mutation({
    args: {
        storageId: v.id("_storage"),
        filename: v.string(),
        contentType: v.string(),
        category: v.optional(v.string()),
        label: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("media", {
            ...args,
            uploadedAt: Date.now(),
        });
    },
});

// Get all media files with their serving URLs
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

// Get a single file's URL by storageId
export const getUrl = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, { storageId }) => {
        return await ctx.storage.getUrl(storageId);
    },
});

// Delete a media file
export const deleteMedia = mutation({
    args: { id: v.id("media"), storageId: v.id("_storage") },
    handler: async (ctx, { id, storageId }) => {
        await ctx.storage.delete(storageId);
        await ctx.db.delete(id);
    },
});
