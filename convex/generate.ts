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
E-E-A-T ARTICLE STRUCTURE — BOFU (Decision-Stage / Conversion):
This reader is evaluating vendors. They are close to making a buying decision. Write to help them choose.

1. HOOK — 60-80 words
   Open with the cost of choosing the wrong agency or the cost of inaction. Use a specific number.

2. H2: What to Look for in a [Service Type]
   3-4 concrete criteria a CRE professional should use when evaluating options.
   Each criterion needs a reason: why does it matter for their business?

3. H2: What CloudSocial Does Differently
   Specific approaches, not generic claims. Mention: our specialization in CRE, the tactics we use, why generalist agencies fail CRE clients.

4. H2: Results You Should Expect
   Concrete, realistic outcomes with timeframes. Examples: "Within 90 days, expect X."
   Be honest — don't overpromise.

5. H2: Who This Is For (and Who It Isn't)
   Be direct. Ideal client: CRE brokers, owners, or investors with X. Not ideal: residential agents, anyone wanting overnight results.

6. CONCLUSION — 60-80 words
   Restate the single most important criterion. Link to the relevant CloudSocial service page.
   End with a mention of CloudSocial. Do NOT include an author sign-off line.`;
    } else if (funnelStage === "MOFU") {
        formatInstructions = `
E-E-A-T ARTICLE STRUCTURE — MOFU (Strategy / Deep Dive):
This reader knows the problem exists. They want a real strategy, not an intro. Write for someone mid-way through their research.

1. HOOK — 60-80 words
   Open with what "doing this wrong" looks like in CRE. Be specific — name the mistake or outcome.

2. H2: The Full Picture — What [Topic] Actually Requires
   Set realistic expectations. Name what people overlook. Use first-person: "In our work with CRE clients..."
   ${secondaryKwInstruction}

3. H2: [Core Strategy 1 — write a specific, keyword-rich H2 title]
   Deep dive into the first approach. Include data, timeframes, or real examples.

4. H2: [Core Strategy 2 — write a specific, keyword-rich H2 title]
   Second angle. Different tactic or complementary approach. Include another secondary keyword naturally.

5. H2: What Strong Execution Looks Like vs. What Fails
   Contrast. Be concrete about both sides. Frame it as patterns you see in the field.

6. H2: Next Steps — ordered list of 4-5 concrete actions
   Each step: action verb + specific outcome.

7. CONCLUSION — 60-80 words
   Recap the one insight that changes how they think about this. Mention CloudSocial. Link to the relevant service page.
   End with a mention of CloudSocial. Do NOT include an author sign-off line.`;
    } else {
        // TOFU default
        formatInstructions = `
E-E-A-T ARTICLE STRUCTURE — TOFU (Educational / How-To):
This reader is early in their awareness. They found you through a search. Write to educate and build trust.

1. HOOK — 60-80 words
   Open with a specific, uncomfortable fact or industry number about the problem.
   No "In today's digital landscape" openers. Ever.

2. H2: Why [This Problem] Is Bigger Than Most CRE Pros Realize
   Name the underlying cause, not just the symptom. Show industry knowledge.
   Use first-person: "In our work with CRE clients across multiple markets..."
   ${secondaryKwInstruction}

3. H2: [Tactic 1 — write a specific, keyword-rich H2 title]
   Specific tactic with concrete outcomes: timeframes, percentages, deal examples.
   No vague advice. "Publish consistently" means "2 posts per week for 90 days."

4. H2: [Tactic 2 — write a specific, keyword-rich H2 title]
   Second angle on the solution. A different tactic or a deeper layer of the first.

5. H2: [The Shortcut or Misconception — write a specific H2 title]
   One insight that separates brokers who get results from those who don't. Could be a common mistake, a counterintuitive truth, or an overlooked tactic.

6. H2: How to Start — ordered list of 4-5 concrete steps
   Each step: action verb + specific outcome. Make it immediately usable.

7. CONCLUSION — 60-80 words
   Recap the single most important insight.
   Mention CloudSocial by name. Link to the most relevant service page.
   End with a mention of CloudSocial. Do NOT include an author sign-off line.`;
    }

    return `You are a content strategist at CloudSocial, a digital marketing agency for commercial real estate. You write authoritative, E-E-A-T optimized blog articles that rank on Google and convert CRE professionals.

CRITICAL: This entire article MUST be written specifically about the topic: "${keyword}". Every section, every example, every H2 heading must be directly relevant to "${keyword}". Do not drift to other topics.

TARGET KEYWORD: "${keyword}"
${secondaryKwLine}
FUNNEL STAGE: ${funnelStage}
CONTENT CLUSTER: ${cluster}
${pillar ? `PILLAR TOPIC: ${pillar}` : ""}
AUTHOR: ${author}
TARGET WORD COUNT: ${wordCountTarget} words (stay within 50 words of this target — do not go over by more than 50)

---

CLOUDSOCIAL BRAND VOICE:
- We are practitioners, not commentators. Write from experience, not from theory.
- Authoritative and direct. CRE professionals close deals for a living — they have no patience for filler.
- Every claim needs a number, outcome, or concrete example behind it.
- Tone: confident, clear, no corporate jargon.
- Never use: "leverage," "synergy," "holistic," "innovative," "streamline," "game-changing," "utilize," "facilitate."
- Always name the reader's real pain: losing listings to competitors, empty pipeline, invisible on Google, chasing unqualified leads.

---
${formatInstructions}

---

KEYWORD RULES:
- Primary keyword "${keyword}": use in title, first paragraph, one H2 heading, and conclusion. 4-5 occurrences max. Never repeat the exact phrase twice in the same paragraph.
- ${secondaryKwInstruction}
- Do not keyword stuff. If it sounds unnatural, cut it and rephrase.

---

WRITING RULES:
1. Never use em-dashes (—). Use a comma, colon, or two separate sentences.
2. Never use forced negatives ("It's not X, it's Y"). State what it IS directly.
3. Active voice only. No passive constructions.
4. No exclamation points anywhere.
5. Simple words: "use" not "utilize," "help" not "facilitate," "show" not "demonstrate."
6. Remove all hedging: "almost," "very," "really," "quite," "somewhat."
7. H2 headings must be specific and keyword-informed — never generic phrases like "The Mistake Most CRE Professionals Make." Write H2s that could stand alone as search queries or compelling section titles.
8. Word count target: ${wordCountTarget} words. Count carefully. Do not exceed by more than 50 words.

---

KEY TAKEAWAYS:
Generate 3-5 concise, actionable takeaway bullet points that summarize the core insights of the article. Each should be one clear sentence that a reader can act on immediately.

FAQ:
Generate 5 frequently asked questions related to "${keyword}". Each answer should be 2-3 sentences, factual, and directly useful. Write questions that real CRE professionals would ask. These will appear as FAQ schema markup for SEO.

---

INTERNAL LINKS:
Include 2-3 anchor links to CloudSocial service pages within the body where they fit naturally:
- <a href="/seo-real-estate">commercial real estate SEO</a>
- <a href="/aeo-geo-llms-real-estate">AEO and GEO for real estate</a>
- <a href="/linkedin-real-estate">LinkedIn growth for real estate</a>
- <a href="/content-real-estate">short form video content for real estate</a>
- <a href="/ai-agent-real-estate">AI agents for real estate</a>

---

Return ONLY valid JSON with these exact fields (no markdown, no code fences):
{
  "title": "string (H1, includes primary keyword, compelling, no exclamation point, max 65 chars)",
  "slug": "string (URL-safe, hyphen-separated, 4-6 words, no stop words)",
  "excerpt": "string (2 sentences, includes primary keyword, compelling summary, under 160 chars)",
  "author": "${author}",
  "content": "string (complete HTML body — DO NOT include an H1 tag, start directly with the hook paragraph, then H2 sections as described above — use <p>, <h2>, <h3>, <ul>, <ol>, <li>, <a>, <strong>, <em> tags — NO markdown, NO em-dashes)",
  "seo_title": "string (max 60 chars, includes primary keyword)",
  "meta_description": "string (max 155 chars, includes primary keyword, action-oriented)",
  "og_title": "string (engaging social title, no exclamation point)",
  "og_description": "string (1-2 sentences for social sharing)",
  "featured_image_alt": "string (descriptive alt text, includes primary keyword)",
  "key_takeaways": ["string (3-5 actionable bullet points, each one sentence)"],
  "faqs": [{"question": "string", "answer": "string (2-3 sentences)"}],
  "json_ld": "string (valid BlogPosting JSON-LD schema as a JSON string, include author name ${author})"
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
            const wordCountTarget: number = queueItem.word_count_target || 1000;
            const author: string = pickAuthor();

            const imagePrompt = queueItem.featured_image_prompt ||
                `Professional commercial real estate photography. ${keyword}. Modern office building or property exterior. Natural light, architectural photography style. No people. Clean, high-end, editorial quality.`;

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

            // 5. Generate featured image — Nano Banana 2 (Gemini 3.1 Flash Image)
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

            // 6. Insert as DRAFT — admin reviews before publishing
            const postId: string = await ctx.runMutation(api.posts.create, {
                title: article.title,
                slug: article.slug,
                content: article.content,
                excerpt: article.excerpt,
                status: "draft",
                author: article.author || author,
                funnel_stage: funnelStage,
                cluster: cluster,
                pillar: pillar || undefined,
                target_keyword: keyword,
                secondary_keywords: queueItem.secondary_keywords,
                monthly_volume: queueItem.monthly_volume,
                keyword_difficulty: queueItem.keyword_difficulty,
                word_count_target: wordCountTarget,
                seo_title: article.seo_title,
                meta_description: article.meta_description,
                og_title: article.og_title,
                og_description: article.og_description,
                featured_image_storageId: featuredImageStorageId as any,
                featured_image_alt: article.featured_image_alt,
                featured_image_prompt: imagePrompt,
                json_ld: article.json_ld,
                key_takeaways: article.key_takeaways || undefined,
                faqs: article.faqs || undefined,
                ai_generated: true,
                queueItemId: queueItem._id,
            });

            // 7. Update queue item — mark as generated (not published — admin publishes manually)
            await ctx.runMutation(api.queue.updateQueueItem, {
                id: queueItem._id,
                status: "published", // "published" here means "processed" — the post itself is a draft
                processedAt: Date.now(),
                postId: postId as any,
            });

            return { status: "success", postId, slug: article.slug, title: article.title };

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
