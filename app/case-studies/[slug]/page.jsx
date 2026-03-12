import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const item = await fetchQuery(api.caseStudies.getBySlug, { slug });
    if (!item) return {};
    return {
        title: item.seo_title || item.title,
        description: item.meta_description,
    };
}

export async function generateStaticParams() {
    try {
        const items = await fetchQuery(api.caseStudies.listPublished, {});
        return items.map(i => ({ slug: i.slug }));
    } catch {
        return [];
    }
}

export default async function CaseStudyPage({ params }) {
    const { slug } = await params;
    const item = await fetchQuery(api.caseStudies.getBySlug, { slug });

    if (!item || item.status !== "published") {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {item.json_ld && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: item.json_ld }}
                />
            )}

            <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
                <nav className="text-sm text-stone-400 mb-8">
                    <Link href="/case-studies" className="hover:text-stone-600 transition-colors">Case Studies</Link>
                    <span className="mx-2">/</span>
                    <span className="text-stone-600">{item.title}</span>
                </nav>

                <div className="flex items-center gap-2 mb-6 flex-wrap">
                    {item.industry && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                            {item.industry}
                        </span>
                    )}
                    {(item.services || []).map(s => (
                        <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                            {s}
                        </span>
                    ))}
                </div>

                {item.featured_image_storageId && (
                    <div className="aspect-video bg-stone-100 rounded-xl mb-8 overflow-hidden">
                        <img
                            src={`/api/image/${item.featured_image_storageId}`}
                            alt={item.featured_image_alt || item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {item.client_name && (
                    <div className="mb-8 pb-8 border-b border-stone-100">
                        <div className="text-sm text-stone-400 mb-1">Client</div>
                        <div className="text-base font-medium text-stone-900">{item.client_name}</div>
                    </div>
                )}

                <div
                    className="prose prose-stone prose-lg max-w-none
                        prose-headings:font-bold prose-headings:text-stone-900
                        prose-p:text-stone-600 prose-p:leading-relaxed
                        prose-a:text-stone-900 prose-a:underline hover:prose-a:text-stone-600
                        prose-strong:text-stone-900
                        prose-ul:text-stone-600 prose-ol:text-stone-600"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                />

                <div className="mt-16 pt-8 border-t border-stone-100">
                    <Link
                        href="/case-studies"
                        className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
                    >
                        ← Back to case studies
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    );
}
