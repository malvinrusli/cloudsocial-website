"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";

export const generateNextPost = action({
    args: {},
    handler: async (ctx): Promise<{ status: string; message?: string; postId?: string; slug?: string; title?: string }> => {
        const googleKey = process.env.GOOGLE_API_KEY;
        if (!googleKey) {
            throw new Error("GOOGLE_API_KEY not set in Convex environment");
        }

        // 1. Get next pending keyword
        const queueItem: any = await ctx.runQuery(api.queue.getNextPending, {});
        if (!queueItem) {
            return { status: "no_pending", message: "No pending keywords in queue" };
        }

        // 2. Mark as generating
        await ctx.runMutation(api.queue.updateQueueItem, {
            id: queueItem._id,
            status: "generating",
        });

        try {
            const wordCount: number = queueItem.word_count_target || 1500;
            const keyword: string = queueItem.target_keyword;
            const funnelStage: string = queueItem.funnel_stage || "TOFU";
            const cluster: string = queueItem.cluster || "commercial real estate";
            const pillar: string = queueItem.pillar || "";
            const imagePrompt = queueItem.featured_image_prompt ||
                `Professional commercial real estate, ${keyword}, high quality photography`;

            // 3. Generate article with Gemini 1.5 Pro
            const geminiResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${googleKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Write a ${wordCount}-word SEO article targeting the keyword "${keyword}" for a commercial real estate digital marketing audience.

Funnel stage: ${funnelStage}
Content cluster: ${cluster}
${pillar ? `Pillar topic: ${pillar}` : ""}

STRICTLY FOLLOW THESE WRITING RULES:
1. NEVER use em-dashes (—). Replace with a comma, colon, or split into two sentences.
2. NEVER use forced negatives like "It's not X, it's Y" or "Not A, not B, not C, but D." State what it IS directly.
3. Be specific. Use real numbers and concrete outcomes, not vague words like "streamline," "optimize," or "innovative."
4. Active voice only. Never passive constructions.
5. No exclamation points anywhere.
6. Lead with benefits and outcomes. Features come second.
7. Simple words over complex ones. "Use" not "utilize." "Help" not "facilitate."
8. Remove hedging words: "almost," "very," "really."

Article structure:
- H1 title targeting the keyword
- Introduction (100-150 words) that hooks with a specific pain point
- 4-6 H2 sections with meaty content
- A practical tips or steps section
- Conclusion with CTA directing readers to CloudSocial for commercial real estate digital marketing

Return ONLY valid JSON with these exact fields:
{
  "title": "string (H1, includes keyword)",
  "slug": "string (URL-safe, hyphen-separated)",
  "excerpt": "string (2-3 sentences, compelling summary)",
  "author": "CloudSocial Team",
  "content": "string (complete HTML article with H1, H2, H3, p, ul, ol tags — NO markdown)",
  "seo_title": "string (max 60 chars, includes keyword)",
  "meta_description": "string (max 155 chars, compelling, includes keyword)",
  "og_title": "string (engaging social title)",
  "og_description": "string (1-2 sentences for social sharing)",
  "featured_image_alt": "string (descriptive alt text for featured image)",
  "json_ld": "string (BlogPosting schema as JSON string)"
}`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 16384,
                            responseMimeType: "application/json",
                        },
                    }),
                }
            );

            if (!geminiResponse.ok) {
                const errText = await geminiResponse.text();
                throw new Error(`Gemini API error: ${geminiResponse.status} — ${errText}`);
            }

            const geminiData = await geminiResponse.json();
            const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawText) {
                throw new Error("Gemini returned empty response");
            }

            // Strip markdown code fences if present
            const jsonText = rawText.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
            const article = JSON.parse(jsonText);

            // 4. Generate featured image with Imagen 3
            let featuredImageStorageId: string | undefined;

            try {
                const imagenResponse = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${googleKey}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            instances: [{ prompt: imagePrompt }],
                            parameters: {
                                sampleCount: 1,
                                aspectRatio: "16:9",
                            },
                        }),
                    }
                );

                if (imagenResponse.ok) {
                    const imagenData = await imagenResponse.json();
                    const base64Image = imagenData?.predictions?.[0]?.bytesBase64Encoded;

                    if (base64Image) {
                        // Upload to Convex Storage
                        const imageBytes = Buffer.from(base64Image, "base64");
                        const uploadUrl = await ctx.storage.generateUploadUrl();

                        const uploadResponse = await fetch(uploadUrl, {
                            method: "POST",
                            headers: { "Content-Type": "image/jpeg" },
                            body: imageBytes,
                        });

                        if (uploadResponse.ok) {
                            const { storageId } = await uploadResponse.json();
                            featuredImageStorageId = storageId;
                        }
                    }
                }
            } catch (imgErr) {
                // Image generation failure is non-fatal — continue without image
                console.error("Image generation failed:", imgErr);
            }

            // 5. Insert published post
            const postId: string = await ctx.runMutation(api.posts.create, {
                title: article.title,
                slug: article.slug,
                content: article.content,
                excerpt: article.excerpt,
                status: "published",
                author: article.author || "CloudSocial Team",
                funnel_stage: funnelStage,
                cluster: cluster,
                pillar: pillar || undefined,
                target_keyword: keyword,
                secondary_keywords: queueItem.secondary_keywords,
                monthly_volume: queueItem.monthly_volume,
                keyword_difficulty: queueItem.keyword_difficulty,
                word_count_target: wordCount,
                seo_title: article.seo_title,
                meta_description: article.meta_description,
                og_title: article.og_title,
                og_description: article.og_description,
                featured_image_storageId: featuredImageStorageId as any,
                featured_image_alt: article.featured_image_alt,
                featured_image_prompt: imagePrompt,
                json_ld: article.json_ld,
                ai_generated: true,
                queueItemId: queueItem._id,
                publishedAt: Date.now(),
            });

            // 6. Update queue item
            await ctx.runMutation(api.queue.updateQueueItem, {
                id: queueItem._id,
                status: "published",
                processedAt: Date.now(),
                postId: postId as any,
            });

            return { status: "success", postId, slug: article.slug, title: article.title };

        } catch (err) {
            // Mark as failed
            await ctx.runMutation(api.queue.updateQueueItem, {
                id: queueItem._id,
                status: "failed",
                error_message: String(err),
                processedAt: Date.now(),
            });

            throw err;
        }
    },
});
