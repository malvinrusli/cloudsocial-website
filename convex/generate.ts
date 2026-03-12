"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";

// Author alternates by calendar week — each author "owns" a full week of content
function pickAuthor(): string {
    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    return weekNumber % 2 === 0 ? "Patrick Y" : "Malvin R";
}

function buildPrompt(
    keyword: string,
    secondaryKeywords: string[],
    funnelStage: string,
    cluster: string,
    pillar: string,
    wordCountTarget: number,
    author: string,
): string {
    const secondaryKwLine = secondaryKeywords.length > 0
        ? `SECONDARY KEYWORDS: ${secondaryKeywords.join(", ")}`
        : "";

    const secondaryKwInstruction = secondaryKeywords.length > 0
        ? `Secondary keywords to weave in naturally (aim for one per H2 section): ${secondaryKeywords.join(", ")}.`
        : "Vary your language with semantic synonyms of the primary keyword.";

    // Format instructions differ per funnel stage
    let formatInstructions: string;

    if (funnelStage === "BOFU") {
        formatInstructions = `
ARTICLE STRUCTURE — BOFU (Decision-Stage):
This reader is evaluating options. They are close to a decision. Write to help them choose confidently.

1. HOOK — 60-80 words
   Open with the cost of choosing the wrong partner or the cost of inaction. Use a specific number or stat.

2. H2: What to Look for in a [Service Type]
   3-4 concrete criteria a CRE professional should use when evaluating options.
   Each criterion needs a reason: why does it matter for their bottom line?

3. H2: The Specialist vs. Generalist Problem
   Explain why CRE-specific expertise matters. Use concrete examples of what generalist agencies miss.
   Do NOT name any specific company. Keep it about the category.

4. H2: Results You Should Expect (With Realistic Timeframes)
   Concrete, realistic outcomes. Examples: "Within 90 days, expect X."
   Be honest. Overpromising destroys trust.

5. H2: Who This Is For (and Who It Isn't)
   Be direct. Ideal reader: CRE brokers, owners, or investors with X. Not ideal: residential agents, anyone wanting overnight results.

6. CLOSING H2: Write a unique, keyword-relevant closing heading (NOT "Conclusion"). Examples: "Your Next Move on [Topic]" or "Making [Topic] Work for Your Portfolio" — 60-80 words
   Restate the single most important criterion. Include one natural mention of Promperty with a link to the most relevant service page.`;
    } else if (funnelStage === "MOFU") {
        formatInstructions = `
ARTICLE STRUCTURE — MOFU (Strategy / Deep Dive):
This reader knows the problem exists. They want a real strategy. Write for someone mid-way through their research.

1. HOOK — 60-80 words
   Open with what "doing this wrong" looks like in CRE. Name the mistake or the outcome.

2. H2: What [Topic] Actually Requires
   Set realistic expectations. Name what people overlook.
   ${secondaryKwInstruction}

3. H2: [Core Strategy 1 — write a specific, keyword-rich H2]
   Deep dive into the first approach. Include data, timeframes, or real-world examples.

4. H2: [Core Strategy 2 — write a specific, keyword-rich H2]
   Second angle. Different tactic or complementary approach.

5. H2: What Strong Execution Looks Like vs. What Fails
   Contrast. Be concrete about both sides. Frame it as patterns you see in the industry.

6. H2: Next Steps — ordered list of 4-5 concrete actions
   Each step: action verb + specific outcome.

7. CLOSING H2: Write a unique, keyword-relevant closing heading (NOT "Conclusion"). Examples: "Where to Go From Here" or "Putting [Topic] Into Practice" — 60-80 words
   Recap the one insight that changes how they think about this. Include one natural mention of Promperty with a link to the most relevant service page.`;
    } else {
        // TOFU default
        formatInstructions = `
ARTICLE STRUCTURE — TOFU (Educational / How-To):
This reader is early in their awareness. They found you through a search. Write to educate, not sell.

1. HOOK — 60-80 words
   Open with a specific, uncomfortable fact or industry number about the problem.
   No "In today's digital landscape" openers. Ever.

2. H2: Why [This Problem] Is Bigger Than Most CRE Pros Realize
   Name the underlying cause, not just the symptom. Show deep industry knowledge.
   ${secondaryKwInstruction}

3. H2: [Tactic 1 — write a specific, keyword-rich H2]
   Specific tactic with concrete outcomes: timeframes, percentages, deal examples.
   No vague advice. "Publish consistently" means "2 posts per week for 90 days."

4. H2: [Tactic 2 — write a specific, keyword-rich H2]
   Second angle on the solution. A different tactic or a deeper layer of the first.

5. H2: [The Shortcut or Misconception — write a specific H2]
   One insight that separates brokers who get results from those who don't.

6. H2: How to Start — ordered list of 4-5 concrete steps
   Each step: action verb + specific outcome. Make it immediately usable.

7. CLOSING H2: Write a unique, keyword-relevant closing heading (NOT "Conclusion"). Examples: "Your First Week With [Topic]" or "The One Thing That Changes Everything" — 60-80 words
   Recap the single most important insight. Include one natural mention of Promperty with a link to the most relevant service page.`;
    }

    return `You are a senior content strategist writing for the commercial real estate industry. You write authoritative, experience-backed blog articles that rank on Google and genuinely help CRE professionals.

CURRENT YEAR: 2026. All data, trends, and references must reflect 2026 market conditions. Never reference 2024 or older years as current.

TARGET KEYWORD: "${keyword}"
${secondaryKwLine}
FUNNEL STAGE: ${funnelStage}
CONTENT CLUSTER: ${cluster}
${pillar ? `PILLAR TOPIC: ${pillar}` : ""}
AUTHOR: ${author}
TARGET WORD COUNT: ${wordCountTarget} words

CRITICAL: This entire article MUST be about "${keyword}". Every section, every example, every H2 must be directly relevant.

---

VOICE & TONE:
- Write like a senior industry expert talking to a peer. Direct, specific, no fluff.
- Use "you" and "your". Acknowledge the reader's real challenges (losing listings, empty pipeline, wasted ad spend).
- First-person experience is fine: "In practice..." or "What we see in the field..."
- If you use a technical CRE or marketing term (e.g., "Cap Rate" or "AEO"), follow it with a brief definition in parentheses.

BRANDING RULES:
- Do NOT mention "Promperty" anywhere in the article body.
- The ONLY place Promperty should appear is in the CONCLUSION — one natural sentence with a link to a relevant service page.
- Include 1-2 anchor links to these pages, woven naturally into the text:
  /seo-real-estate, /aeo-geo-llms-real-estate, /linkedin-real-estate, /content-real-estate, /ai-agent-real-estate

---

${formatInstructions}

---

WRITING STYLE:
1. Paragraphs should be 1-4 sentences. Vary length for natural rhythm. Short paragraphs (1-2 sentences) create impact. Longer ones (3-4) are fine for explanations.
2. Never use em-dashes (—). Use a comma, colon, or two separate sentences.
3. Active voice only. No passive constructions.
4. No exclamation points.
5. Simple words: "use" not "utilize," "help" not "facilitate," "show" not "demonstrate."
6. Remove all hedging: "almost," "very," "really," "quite," "somewhat."
7. Never use: "leverage," "synergy," "holistic," "innovative," "streamline," "game-changing," "fluff," "scripts," "authentic," "resonate," "journey," "unlock."
8. Bold the most important sentence in each H2 section for scannability.
9. H2 headings must be specific and keyword-informed. Never generic.
10. Content must be formatted in clean HTML (<h2>, <p>, <ul>, <ol>, <li>, <a>, <strong>).
11. When listing 3+ items, ALWAYS use bullet points or numbered lists. Never bury lists in paragraph prose.
12. Bold the lead-in phrase of each list item when it has an explanation.
13. Aim for at least one list per H2 section to break up dense text.

ANTI-AI WRITING RULES (CRITICAL):
- NEVER use the pattern "The kicker? [Statement]." Write: "The kicker is that [statement]."
- NEVER use "It's not X, it's Y." State what it IS directly.
- NEVER use "No X. No Y. Just Z." patterns.
- NEVER write "X matters." as a standalone sentence. Be specific about WHY.
- Be specific over vague: name the thing, give the number, cite the example.
- Earn your punchline: build to a point instead of teasing it.
- Vary sentence structure naturally.
- Write from a point of view. Take a stance.

TABLES:
- Include an HTML table ONLY if the content genuinely benefits from structured comparison data (metrics, timelines, feature comparison).
- If you include one, use semantic tags (<thead>, <tbody>, <th>, <td>). Keep it simple and focused.
- Do NOT force a table. If a bulleted list conveys the information better, use a list.

---

KEYWORD RULES:
- Primary keyword "${keyword}": use in title, first paragraph, one H2 heading, and conclusion. 4-5 occurrences max.
- Do not keyword stuff. If it sounds unnatural, rephrase.
- Use semantic synonyms and related terms throughout for LSI coverage.

---

KEY TAKEAWAYS:
- Generate 4-5 actionable takeaway bullet points.
- FORMAT: **Bold Heading**: One clear, punchy sentence.
- These MUST be derived from the article's specific content and the target keyword "${keyword}".
- Do NOT provide generic advice.

FAQ:
Generate 3-5 frequently asked questions related to "${keyword}". Answers should be 2-3 sentences.

---

Return ONLY valid JSON with these exact fields:
{
  "title": "string (H1, includes primary keyword, MAX 60 CHARACTERS. Do not include year or brand name in title.)",
  "slug": "string (URL-safe, hyphen-separated)",
  "excerpt": "string (2 sentences, under 160 chars)",
  "author": "${author}",
  "content": "string (complete HTML body — DO NOT include H1. Use <p>, <h2>, <h3>, <ul>, <ol>, <li>, <a>, <strong> tags. Only use <table> if genuinely needed. Do NOT use the word 'Conclusion' as an H2 heading.)",
  "seo_title": "string (max 60 chars, do NOT include brand name — it is appended automatically)",
  "meta_description": "string",
  "og_title": "string",
  "og_description": "string",
  "featured_image_alt": "string",
  "key_takeaways": ["string"],
  "faqs": [{"question": "string", "answer": "string"}],
  "json_ld": "string"
}`;
}

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
            const keyword: string = queueItem.target_keyword;
            const funnelStage: string = queueItem.funnel_stage || "TOFU";
            const cluster: string = queueItem.cluster || "commercial real estate";
            const pillar: string = queueItem.pillar || "";
            const secondaryKeywords: string[] = queueItem.secondary_keywords || [];
            const wordCountTarget: number = queueItem.word_count_target || 800;
            const author: string = pickAuthor();

            const imagePrompt = queueItem.featured_image_prompt ||
                `Professional cinematic commercial real estate photography. ${keyword}. Modern high-end office building or refined commercial property exterior. Warm sunset glow or crisp professional morning light. Architectural focus, shallow depth of field, premium editorial look. 8k resolution, photorealistic. No people.`;

            // 3. Build the intent-aware prompt
            const prompt = buildPrompt(keyword, secondaryKeywords, funnelStage, cluster, pillar, wordCountTarget, author);

            // 4. Generate article with Gemini
            const geminiResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${googleKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 8192,
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

            const jsonText = rawText.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
            let article: any;
            try {
                article = JSON.parse(jsonText);
            } catch {
                // Fallback: extract between outermost { } and sanitize
                const start = jsonText.indexOf('{');
                const end = jsonText.lastIndexOf('}');
                if (start >= 0 && end > start) {
                    const cleaned = jsonText.slice(start, end + 1)
                        // Replace literal newlines/CR with space (valid JSON whitespace between tokens,
                        // and harmless inside HTML string values where whitespace is collapsed)
                        .replace(/\r\n/g, ' ')
                        .replace(/\r/g, ' ')
                        .replace(/\n/g, ' ')
                        // Strip other control chars
                        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');
                    article = JSON.parse(cleaned);
                } else {
                    throw new Error(`Failed to parse Gemini JSON. Raw: ${jsonText.slice(0, 500)}`);
                }
            }

            // 5. Normalize article fields — case-insensitive getter to handle Gemini casing quirks
            const getField = (obj: any, key: string): any => {
                if (!obj || typeof obj !== "object") return undefined;
                // Exact match first
                if (obj[key] !== undefined) return obj[key];
                // Case-insensitive fallback
                const lowerKey = key.toLowerCase();
                for (const k of Object.keys(obj)) {
                    if (k.toLowerCase() === lowerKey) return obj[k];
                }
                return undefined;
            };

            // Log parsed keys for debugging
            console.log("[generate] Parsed article keys:", Object.keys(article));
            console.log("[generate] title value:", JSON.stringify(getField(article, "title")));
            console.log("[generate] slug value:", JSON.stringify(getField(article, "slug")));
            console.log("[generate] content length:", (getField(article, "content") || "").length);

            // Normalize with fallbacks — never allow required fields to be empty
            const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

            const finalTitle = getField(article, "title") || `Guide to ${keyword}`;
            const finalSlug = getField(article, "slug") || slugify(finalTitle);
            const finalContent = getField(article, "content") || "";
            const finalExcerpt = getField(article, "excerpt") || "";
            const finalAuthor = getField(article, "author") || author;
            const finalSeoTitle = getField(article, "seo_title") || getField(article, "seoTitle") || finalTitle;
            const finalMetaDesc = getField(article, "meta_description") || getField(article, "metaDescription") || finalExcerpt;
            const finalOgTitle = getField(article, "og_title") || getField(article, "ogTitle") || finalTitle;
            const finalOgDesc = getField(article, "og_description") || getField(article, "ogDescription") || finalExcerpt;
            const finalImageAlt = getField(article, "featured_image_alt") || getField(article, "featuredImageAlt") || `Featured image for ${keyword}`;
            const finalJsonLd = getField(article, "json_ld") || getField(article, "jsonLd") || undefined;
            const finalKeyTakeaways = getField(article, "key_takeaways") || getField(article, "keyTakeaways") || undefined;
            const finalFaqs = getField(article, "faqs") || undefined;

            if (!finalContent) {
                throw new Error(`Gemini returned empty content. Keys found: ${Object.keys(article).join(", ")}. Raw title: ${JSON.stringify(getField(article, "title"))}`);
            }

            console.log("[generate] Final title:", finalTitle);
            console.log("[generate] Final slug:", finalSlug);

            // 6. Generate featured image — Nano Banana 2 (Gemini 3.1 Flash Image)
            let featuredImageStorageId: string | undefined;

            try {
                const imagenResponse = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${googleKey}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: imagePrompt }] }],
                            generationConfig: {
                                responseModalities: ["TEXT", "IMAGE"],
                            },
                        }),
                    }
                );

                const imagenData = await imagenResponse.json();

                if (imagenResponse.ok) {
                    const parts = imagenData?.candidates?.[0]?.content?.parts || [];
                    const imagePart = parts.find((p: any) => p.inlineData);
                    const base64Image = imagePart?.inlineData?.data;
                    const mimeType = imagePart?.inlineData?.mimeType || "image/jpeg";

                    if (base64Image) {
                        const imageBytes = Buffer.from(base64Image, "base64");
                        const uploadUrl = await ctx.storage.generateUploadUrl();

                        const uploadResponse = await fetch(uploadUrl, {
                            method: "POST",
                            headers: { "Content-Type": mimeType },
                            body: imageBytes,
                        });

                        if (uploadResponse.ok) {
                            const { storageId } = await uploadResponse.json();
                            featuredImageStorageId = storageId;
                        }
                    }
                }
            } catch (imgErr) {
                console.error("Image generation failed:", imgErr);
                // Non-fatal — post is created without an image
            }

            // 7. Insert as DRAFT — admin reviews before publishing
            const SITE_URL = "https://www.promperty.io";
            const postId: string = await ctx.runMutation(api.posts.create, {
                title: finalTitle,
                slug: finalSlug,
                content: finalContent,
                excerpt: finalExcerpt || undefined,
                status: "draft",
                author: finalAuthor,
                funnel_stage: funnelStage,
                cluster: cluster,
                pillar: pillar || undefined,
                target_keyword: keyword,
                secondary_keywords: queueItem.secondary_keywords,
                monthly_volume: queueItem.monthly_volume,
                keyword_difficulty: queueItem.keyword_difficulty,
                word_count_target: wordCountTarget,
                seo_title: finalSeoTitle || undefined,
                meta_description: finalMetaDesc || undefined,
                og_title: finalOgTitle || undefined,
                og_description: finalOgDesc || undefined,
                featured_image_storageId: featuredImageStorageId as any,
                featured_image_alt: finalImageAlt || undefined,
                featured_image_prompt: imagePrompt,
                json_ld: typeof finalJsonLd === "string" ? finalJsonLd : (finalJsonLd ? JSON.stringify(finalJsonLd) : undefined),
                key_takeaways: Array.isArray(finalKeyTakeaways) ? finalKeyTakeaways : undefined,
                faqs: Array.isArray(finalFaqs) ? finalFaqs : undefined,
                ai_generated: true,
                queueItemId: queueItem._id,
                // New SEO metadata
                canonical_url: `${SITE_URL}/blogs/${finalSlug}`,
                og_image_url: featuredImageStorageId ? `${SITE_URL}/api/image/${featuredImageStorageId}` : `${SITE_URL}/og-default.png`,
                robots_meta: "index, follow",
            } as any);

            // 8. Update queue item — mark as generated (not published — admin publishes manually)
            await ctx.runMutation(api.queue.updateQueueItem, {
                id: queueItem._id,
                status: "published", // "published" here means "processed" — the post itself is a draft
                processedAt: Date.now(),
                postId: postId as any,
            });

            return { status: "success", postId, slug: finalSlug, title: finalTitle };

        } catch (err) {
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
