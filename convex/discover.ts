"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";

const SEED_TOPICS = [
    "commercial real estate marketing",
    "commercial real estate SEO",
    "commercial real estate digital marketing",
    "real estate AI chatbot",
    "commercial real estate LinkedIn",
    "commercial real estate video marketing",
];

export const discoverKeywords = action({
    args: {},
    handler: async (ctx) => {
        const semrushKey = process.env.SEMRUSH_API_KEY;
        if (!semrushKey) {
            throw new Error("SEMRUSH_API_KEY not set in Convex environment");
        }

        let added = 0;
        const errors: string[] = [];

        for (const topic of SEED_TOPICS) {
            try {
                // SEMrush Keyword Ideas API — phrase_related
                const params = new URLSearchParams({
                    type: "phrase_related",
                    key: semrushKey,
                    phrase: topic,
                    database: "us",
                    display_limit: "50",
                    display_filter: "+|Ph|Co|Gt|100|+|Ph|Kd|Lt|31", // volume >= 100, KD <= 30
                    export_columns: "Ph,Nq,Kd",
                });

                const response = await fetch(
                    `https://api.semrush.com/?${params.toString()}`
                );

                if (!response.ok) {
                    errors.push(`SEMrush API error for "${topic}": ${response.status}`);
                    continue;
                }

                const text = await response.text();
                const lines = text.trim().split("\n");

                // Skip header row
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;

                    const [keyword, volume, kd] = line.split(";");
                    if (!keyword) continue;

                    const vol = parseInt(volume, 10);
                    const kdScore = parseFloat(kd);

                    // Filter: volume >= 100, KD <= 30, local/CRE intent
                    if (isNaN(vol) || vol < 100) continue;
                    if (isNaN(kdScore) || kdScore > 30) continue;

                    // Check if keyword already exists in queue
                    // (We skip this check in the action and let duplicates be handled by admin review)

                    await ctx.runMutation(api.queue.addToQueue, {
                        target_keyword: keyword.trim(),
                        monthly_volume: vol,
                        keyword_difficulty: kdScore,
                        word_count_target: 1500,
                        funnel_stage: "TOFU",
                        cluster: topic,
                        featured_image_prompt: `Professional commercial real estate office building, modern architecture, ${keyword.trim()}, high quality photography`,
                    });

                    added++;
                }
            } catch (err) {
                errors.push(`Error processing "${topic}": ${String(err)}`);
            }
        }

        return { added, errors };
    },
});
