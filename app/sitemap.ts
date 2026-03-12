import { fetchQuery } from "convex/nextjs";
import { api } from "../convex/_generated/api";

const BASE_URL = "https://www.promperty.io";

const STATIC_ROUTES = [
    "/",
    "/services",
    "/blogs",
    "/case-studies",
    "/seo-real-estate",
    "/aeo-geo-llms-real-estate",
    "/ai-agent-real-estate",
    "/content-real-estate",
];

export default async function sitemap() {
    const [posts, caseStudies, bofuPages] = await Promise.all([
        fetchQuery(api.posts.listPublished, {}).catch(() => [] as any[]),
        fetchQuery(api.caseStudies.listPublished, {}).catch(() => [] as any[]),
        fetchQuery(api.bofuPages.listPublished, {}).catch(() => [] as any[]),
    ]);

    const staticUrls = STATIC_ROUTES.map(route => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "/" ? "weekly" : "monthly" as const,
        priority: route === "/" ? 1.0 : 0.8,
    }));

    const blogUrls = posts.map(post => ({
        url: `${BASE_URL}/blogs/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const caseStudyUrls = caseStudies.map(cs => ({
        url: `${BASE_URL}/case-studies/${cs.slug}`,
        lastModified: cs.publishedAt ? new Date(cs.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const lpUrls = bofuPages.map(lp => ({
        url: `${BASE_URL}/lp/${lp.slug}`,
        lastModified: lp.publishedAt ? new Date(lp.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticUrls, ...blogUrls, ...caseStudyUrls, ...lpUrls];
}
