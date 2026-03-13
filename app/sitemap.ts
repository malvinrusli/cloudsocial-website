const BASE_URL = "https://www.promperty.co";

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

export default function sitemap() {
    return STATIC_ROUTES.map(route => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "/" ? "weekly" : ("monthly" as const),
        priority: route === "/" ? 1.0 : 0.8,
    }));
}
