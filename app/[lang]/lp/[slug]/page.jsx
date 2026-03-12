import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageHero from "@/app/components/PageHero";
import AlternatingSection from "@/app/components/AlternatingSection";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const page = await fetchQuery(api.bofuPages.getBySlug, { slug });
    if (!page) return {};
    return {
        title: page.seo_title || page.title,
        description: page.meta_description,
        openGraph: {
            title: page.og_title || page.seo_title || page.title,
            description: page.og_description || page.meta_description,
        },
    };
}

export async function generateStaticParams() {
    try {
        const pages = await fetchQuery(api.bofuPages.listPublished, {});
        const params = [];
        ['en', 'id'].forEach(lang => {
            pages.forEach(p => {
                params.push({ lang, slug: p.slug });
            });
        });
        return params;
    } catch {
        return [];
    }
}

export default async function BofuLandingPage({ params }) {
    const { slug, lang } = await params;
    const page = await fetchQuery(api.bofuPages.getBySlug, { slug });

    if (!page || page.status !== "published") {
        notFound();
    }

    let blocks = [];
    if (page.blocks) {
        try {
            blocks = JSON.parse(page.blocks);
        } catch {
            blocks = [];
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar lang={lang} />

            {page.json_ld && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: page.json_ld }}
                />
            )}

            <PageHero
                title1={page.hero_title || page.title}
                highlight=""
                title2=""
                subtitle={page.hero_subtitle || ""}
                badges={page.hero_badge ? [page.hero_badge] : []}
            />

            {blocks.length > 0 && <AlternatingSection blocks={blocks} />}

            <Footer lang={lang} />
        </main>
    );
}
