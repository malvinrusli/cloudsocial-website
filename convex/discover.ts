"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";

const SEED_TOPICS = [
    // TOFU — broad informational
    "commercial real estate digital marketing",
    "real estate AI agent automation",
    "commercial real estate SEO strategy",
    "AEO for real estate brokers",
    "GEO optimization for CRE",
    "LinkedIn authority for real estate",
    // MOFU — strategy / how-to intent
    "real estate content marketing audit",
    "CRE lead generation systems",
    "AI lead scoring for real estate",
    // BOFU — buying intent / agency selection
    "best commercial real estate marketing agency",
    "real estate SEO services for firms",
    "CRE digital marketing consultant",
];

function classifyFunnel(keyword: string): "TOFU" | "MOFU" | "BOFU" {
    const kw = keyword.toLowerCase();
    const bofuTerms = ["agency", "company", "services", "hire", "cost", "pricing", "best ", "top ", "consultant", "firm"];
    const mofuTerms = ["how to", "guide", "strategy", "tips", "vs ", "comparison", "example", "checklist", "template", "lead generation"];
    if (bofuTerms.some(t => kw.includes(t))) return "BOFU";
    if (mofuTerms.some(t => kw.includes(t))) return "MOFU";
    return "TOFU";
}

const WORD_COUNT_BY_FUNNEL: Record<string, number> = {
    TOFU: 1000,
    MOFU: 1400,
    BOFU: 800,
};

export const discoverKeywords = action({
    args: {},
    handler: async (ctx) => {
        const semrushKey = process.env.SEMRUSH_API_KEY;
        if (!semrushKey) {
            throw new Error("SEMRUSH_API_KEY not set in Convex environment");
        }

        let added = 0;
        let skipped = 0;
        const errors: string[] = [];

        for (const topic of SEED_TOPICS) {
            try {
                const params = new URLSearchParams({
                    type: "phrase_related",
                    key: semrushKey,
                    phrase: topic,
                    database: "us",
                    display_limit: "50",
                    display_filter: "+|Ph|Co|Gt|100|+|Ph|Kd|Lt|31", // volume >= 100, KD <= 30
                    export_columns: "Ph,Nq,Kd",
                });

                const response = await fetch(`https://api.semrush.com/?${params.toString()}`);

                if (!response.ok) {
                    errors.push(`SEMrush API error for "${topic}": ${response.status}`);
                    continue;
                }

                const text = await response.text();
                const lines = text.trim().split("\n");

                // Collect all qualifying keywords from this batch
                const batchKeywords: Array<{ keyword: string; vol: number; kd: number }> = [];

                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    const [keyword, volume, kd] = line.split(";");
                    if (!keyword) continue;
                    const vol = parseInt(volume, 10);
                    const kdScore = parseFloat(kd);
                    if (isNaN(vol) || vol < 100) continue;
                    if (isNaN(kdScore) || kdScore > 30) continue;
                    batchKeywords.push({ keyword: keyword.trim(), vol, kd: kdScore });
                }

                // For each qualifying keyword, assign the next 4 from the batch as secondary keywords
                for (let i = 0; i < batchKeywords.length; i++) {
                    const { keyword, vol, kd } = batchKeywords[i];

                    // Deduplication: skip if already in queue or already published
                    const existingInQueue = await ctx.runQuery(api.queue.getByKeyword, { keyword });
                    if (existingInQueue) {
                        skipped++;
                        continue;
                    }
                    const existingPost = await ctx.runQuery(api.posts.getByKeyword, { keyword });
                    if (existingPost) {
                        skipped++;
                        continue;
                    }

                    // Secondary keywords: the next 4 different keywords from the same batch
                    const secondaryKeywords = batchKeywords
                        .filter((_, j) => j !== i)
                        .slice(i + 1, i + 5)
                        .map(k => k.keyword);

                    const funnelStage = classifyFunnel(keyword);
                    const wordCountTarget = WORD_COUNT_BY_FUNNEL[funnelStage];

                    await ctx.runMutation(api.queue.addToQueue, {
                        target_keyword: keyword,
                        secondary_keywords: secondaryKeywords.length > 0 ? secondaryKeywords : undefined,
                        monthly_volume: vol,
                        keyword_difficulty: kd,
                        word_count_target: wordCountTarget,
                        funnel_stage: funnelStage,
                        cluster: topic,
                        featured_image_prompt: `Professional commercial real estate photography. ${keyword}. Modern office building or property exterior. Natural light, architectural photography style. No people. Clean, high-end, editorial quality.`,
                    });

                    added++;
                }
            } catch (err) {
                errors.push(`Error processing "${topic}": ${String(err)}`);
            }
        }

        return { added, skipped, errors };
    },
});
