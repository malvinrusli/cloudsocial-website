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

    keyword_queue: defineTable({
        target_keyword: v.string(),
        secondary_keywords: v.optional(v.array(v.string())),
        monthly_volume: v.optional(v.number()),
        keyword_difficulty: v.optional(v.number()),
        word_count_target: v.optional(v.number()),
        funnel_stage: v.optional(v.string()), // "TOFU" | "MOFU" | "BOFU"
        cluster: v.optional(v.string()),
        pillar: v.optional(v.string()),
        featured_image_prompt: v.optional(v.string()),
        status: v.string(), // "pending" | "generating" | "published" | "failed"
        error_message: v.optional(v.string()),
        createdAt: v.number(),
        processedAt: v.optional(v.number()),
        postId: v.optional(v.id("posts")),
    }),

    posts: defineTable({
        title: v.string(),
        slug: v.string(),
        content: v.string(), // HTML
        excerpt: v.optional(v.string()),
        status: v.string(), // "draft" | "published"
        author: v.string(), // e.g. "Promperty Team"
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
        json_ld: v.optional(v.string()), // JSON string
        key_takeaways: v.optional(v.array(v.string())),
        faqs: v.optional(v.array(v.object({ question: v.string(), answer: v.string() }))),
        ai_generated: v.optional(v.boolean()),
        queueItemId: v.optional(v.id("keyword_queue")),
        // SEO metadata
        canonical_url: v.optional(v.string()),
        og_image_url: v.optional(v.string()),
        robots_meta: v.optional(v.string()), // e.g. "index, follow"
        publishedAt: v.optional(v.number()),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_slug", ["slug"])
        .index("by_status", ["status"]),

    bofu_pages: defineTable({
        title: v.string(),
        slug: v.string(),
        status: v.string(), // "draft" | "published"
        page_type: v.optional(v.string()), // "location" | "comparison" | "campaign" | etc.
        target_keyword: v.optional(v.string()),
        secondary_keywords: v.optional(v.array(v.string())),
        monthly_volume: v.optional(v.number()),
        keyword_difficulty: v.optional(v.number()),
        // PageHero props
        hero_badge: v.optional(v.string()),
        hero_title: v.optional(v.string()),
        hero_subtitle: v.optional(v.string()),
        // AlternatingSection blocks as JSON array string
        blocks: v.optional(v.string()),
        seo_title: v.optional(v.string()),
        meta_description: v.optional(v.string()),
        og_title: v.optional(v.string()),
        og_description: v.optional(v.string()),
        json_ld: v.optional(v.string()),
        // SEO metadata
        canonical_url: v.optional(v.string()),
        og_image_url: v.optional(v.string()),
        robots_meta: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_slug", ["slug"])
        .index("by_status", ["status"]),

    case_studies: defineTable({
        title: v.string(),
        slug: v.string(),
        client_name: v.optional(v.string()),
        industry: v.optional(v.string()),
        services: v.optional(v.array(v.string())),
        content: v.string(), // HTML
        status: v.string(), // "draft" | "published"
        featured_image_storageId: v.optional(v.id("_storage")),
        featured_image_alt: v.optional(v.string()),
        seo_title: v.optional(v.string()),
        meta_description: v.optional(v.string()),
        json_ld: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_slug", ["slug"])
        .index("by_status", ["status"]),

    discovery_logs: defineTable({
        source: v.string(), // "competitor" | "manual_seed"
        identifier: v.string(), // domain name or seed phrase
        keywords_found: v.number(),
        type: v.string(), // "semrush_organic" | "semrush_related"
        lastRunAt: v.number(),
    }).index("by_identifier", ["identifier"]),
});
