import { action } from "./_generated/server";
import { api } from "./_generated/api";

const SEED_TOPICS = [
    "commercial real estate digital marketing",
    "real estate AI agent automation",
    "commercial real estate SEO strategy",
    "AEO for real estate brokers",
    "GEO optimization for CRE",
    "LinkedIn authority for real estate",
    "real estate content marketing audit",
    "CRE lead generation systems",
    "AI lead scoring for real estate",
    "best commercial real estate marketing agency",
    "real estate SEO services for firms",
    "CRE digital marketing consultant",
];

function classifyFunnel(keyword: string): "TOFU" | "MOFU" | "BOFU" {
    const kw = keyword.toLowerCase();
    const bofuTerms = ["agency", "company", "services", "hire", "cost", "pricing", "best ", "top ", "consultant", "firm", "expert"];
    const mofuTerms = ["how to", "guide", "strategy", "tips", "vs ", "comparison", "example", "checklist", "template", "lead generation", "audit"];
    if (bofuTerms.some(t => kw.includes(t))) return "BOFU";
    if (mofuTerms.some(t => kw.includes(t))) return "MOFU";
    return "TOFU";
}

const WORD_COUNT_BY_FUNNEL: Record<string, number> = {
    TOFU: 1000,
    MOFU: 1400,
    BOFU: 800,
};

async function expandWithAI(googleKey: string, competitorKeywords: string[]): Promise<string[]> {
    const prompt = `You are a world-class SEO strategist for Promperty.io, a premium agency specifically for Commercial Real Estate (CRE) firms. We specialize in AEO (Answer Engine Optimization), AI Agents, and LinkedIn Authority.

Given these keywords that a competitor is ranking for in our space:
${competitorKeywords.join(", ")}

Suggest 5 high-authority, unique "Seed Phrases" (3-5 words each) that Promperty should target to elevate our brand and establish us as the default choice for CRE firms.
Focus on:
1. AI and AEO (Answer Engine Optimization) for CRE.
2. Digital Authority systems for brokers and investors.
3. High-intent search terms that signal a readiness for digital transformation.

Return ONLY a comma-separated list of the 5 phrases. No other text.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${googleKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, topP: 0.95, topK: 40, maxOutputTokens: 1024 },
        }),
    });

    if (!response.ok) return [];
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text.split(",").map((t: string) => t.trim()).filter((t: string) => t.length > 0);
}

export const discoverKeywords = action({
    args: {},
    handler: async (ctx) => {
        const semrushKey = process.env.SEMRUSH_API_KEY;
        if (!semrushKey) throw new Error("SEMRUSH_API_KEY not set");

        let added = 0;
        let skipped = 0;
        const errors: string[] = [];

        for (const topic of SEED_TOPICS) {
            try {
                const res = await processTopic(ctx, semrushKey, topic);
                added += res.added;
                skipped += res.skipped;
            } catch (err) {
                errors.push(`Error processing "${topic}": ${String(err)}`);
            }
        }
        return { added, skipped, errors };
    },
});

export const autonomousDiscovery = action({
    args: {},
    handler: async (ctx) => {
        const semrushKey = process.env.SEMRUSH_API_KEY;
        const googleKey = process.env.GOOGLE_API_KEY;
        if (!semrushKey || !googleKey) throw new Error("API keys not set");

        // 1. Find competitors of promperty.io
        const competitorsRes = await fetch(`https://api.semrush.com/?type=domain_organic_organic&key=${semrushKey}&domain=promperty.io&database=us&display_limit=10&export_columns=Dn`);
        if (!competitorsRes.ok) {
            const errText = await competitorsRes.text();
            throw new Error(`Failed to fetch competitors from SEMrush: ${competitorsRes.status} - ${errText}`);
        }
        const competitorsText = await competitorsRes.text();
        const competitors = competitorsText.trim().split("\n").slice(1).map(d => d.trim());

        if (competitors.length === 0) return { status: "no_competitors_found" };

        // 2. Pick a competitor that hasn't been scanned recently
        let targetCompetitor = "";
        for (const comp of competitors) {
            const lastRun: any = await ctx.runQuery((api.discoveryLogs as any).getLastRun, { identifier: comp });
            if (!lastRun || lastRun.lastRunAt < Date.now() - 7 * 24 * 60 * 60 * 1000) {
                targetCompetitor = comp;
                break;
            }
        }
        if (!targetCompetitor) targetCompetitor = competitors[0];

        // 3. Harvest their top keywords
        const kwRes = await fetch(`https://api.semrush.com/?type=domain_organic&key=${semrushKey}&domain=${targetCompetitor}&database=us&display_limit=50&export_columns=Ph`);
        const kwText = await kwRes.text();
        const competitorKeywords = kwText.trim().split("\n").slice(1).map(k => k.trim());

        // 4. Use AI to expand into unique "Elevated Clusters"
        const elevatedClusters = await expandWithAI(googleKey, competitorKeywords.slice(0, 30));

        // 5. Run standard research loop on these new clusters
        let added = 0;
        let skipped = 0;
        for (const cluster of elevatedClusters) {
            const res = await processTopic(ctx, semrushKey, cluster);
            added += res.added;
            skipped += res.skipped;
        }

        // 6. Log the discovery run
        await ctx.runMutation((api.discoveryLogs as any).addLog, {
            source: "competitor",
            identifier: targetCompetitor,
            keywords_found: added,
            type: "semrush_organic_expanded",
        });

        return { status: "success", competitor: targetCompetitor, clusters: elevatedClusters, added, skipped };
    },
});

async function processTopic(ctx: any, semrushKey: string, topic: string) {
    const params = new URLSearchParams({
        type: "phrase_related",
        key: semrushKey,
        phrase: topic,
        database: "us",
        display_limit: "30",
        display_filter: "+|Ph|Co|Gt|100|+|Ph|Kd|Lt|31", // volume >= 100, KD <= 30
        export_columns: "Ph,Nq,Kd",
    });

    const response = await fetch(`https://api.semrush.com/?${params.toString()}`);
    if (!response.ok) return { added: 0, skipped: 0 };

    const text = await response.text();
    const lines = text.trim().split("\n");
    const batchKeywords: Array<{ keyword: string; vol: number; kd: number }> = [];

    for (let i = 1; i < lines.length; i++) {
        const [keyword, volume, kd] = lines[i].split(";");
        if (!keyword) continue;
        const vol = parseInt(volume, 10);
        const kdScore = parseFloat(kd);
        if (vol >= 100 && kdScore <= 30) {
            batchKeywords.push({ keyword: keyword.trim(), vol, kd: kdScore });
        }
    }

    let added = 0;
    let skipped = 0;
    for (let i = 0; i < batchKeywords.length; i++) {
        const { keyword, vol, kd } = batchKeywords[i];
        const existingInQueue = await ctx.runQuery(api.queue.getByKeyword, { keyword });
        if (existingInQueue) { skipped++; continue; }
        const existingPost = await ctx.runQuery(api.posts.getByKeyword, { keyword });
        if (existingPost) { skipped++; continue; }

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
            featured_image_prompt: `Professional cinematic commercial real estate photography. ${keyword}. High-end commercial property exterior or refined executive office detail. Warm sunset glow or crisp professional morning light. Architectural focus, shallow depth of field, premium editorial look. 8k resolution, photorealistic.`,
        });
        added++;
    }
    return { added, skipped };
}
