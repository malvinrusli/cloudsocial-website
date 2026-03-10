import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await fetchQuery(api.posts.getBySlug, { slug });
    if (!post) return {};
    return {
        title: post.seo_title || post.title,
        description: post.meta_description || post.excerpt,
        openGraph: {
            title: post.og_title || post.seo_title || post.title,
            description: post.og_description || post.meta_description || post.excerpt,
            type: "article",
            publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
        },
    };
}

export async function generateStaticParams() {
    try {
        const posts = await fetchQuery(api.posts.listPublished, {});
        return posts.map(p => ({ slug: p.slug }));
    } catch {
        return [];
    }
}

const RELATED_RESOURCES = [
    { label: "Commercial Real Estate SEO", href: "/seo-real-estate" },
    { label: "AEO & GEO for Real Estate", href: "/aeo-geo-llms-real-estate" },
    { label: "LinkedIn Growth for Real Estate", href: "/linkedin-real-estate" },
];

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await fetchQuery(api.posts.getBySlug, { slug });

    if (!post || post.status !== "published") {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Reading progress bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
                <div id="progress-bar" className="h-full bg-stone-900 origin-left scale-x-0 transition-transform duration-100 ease-out" />
            </div>

            <script dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener('scroll', () => {
                    const bar = document.getElementById('progress-bar');
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height);
                    if (bar) bar.style.transform = 'scaleX(' + scrolled + ')';
                });
            `}} />

            {post.json_ld && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: post.json_ld }}
                />
            )}

            <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
                {/* Breadcrumb */}
                <nav className="text-sm text-stone-400 mb-8">
                    <Link href="/blogs" className="hover:text-stone-600 transition-colors">Blog</Link>
                    <span className="mx-2">/</span>
                    <span className="text-stone-600">{post.title}</span>
                </nav>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Byline */}
                <div className="flex items-center gap-3 mb-10 pb-8 border-b border-stone-100">
                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-sm font-medium">
                        {post.author?.charAt(0) || "C"}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-stone-900">{post.author}</div>
                        <div className="text-xs text-stone-400">
                            Author{post.publishedAt
                                ? ` · ${new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                                : ""}
                        </div>
                    </div>
                </div>

                {/* Featured image */}
                <div className="aspect-video bg-stone-100 rounded-xl mb-10 overflow-hidden">
                    {post.featured_image_storageId ? (
                        <img
                            src={`/api/image/${post.featured_image_storageId}`}
                            alt={post.featured_image_alt || post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400 flex items-end p-8">
                            <span className="text-stone-600 text-xs font-medium tracking-widest uppercase">CloudSocial</span>
                        </div>
                    )}
                </div>

                {/* Key Takeaways */}
                {post.key_takeaways?.length > 0 && (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 mb-10">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-stone-400 mb-4">Key Takeaways</h2>
                        <ul className="space-y-2">
                            {post.key_takeaways.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-stone-700 text-sm leading-relaxed">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Article content — strip any H1 Gemini may have included */}
                <div
                    className="prose prose-stone prose-lg max-w-none
                        prose-headings:font-bold prose-headings:text-stone-900
                        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                        prose-p:text-stone-600 prose-p:leading-relaxed
                        prose-a:text-stone-900 prose-a:underline hover:prose-a:text-stone-600
                        prose-strong:text-stone-900
                        prose-ul:text-stone-600 prose-ol:text-stone-600
                        prose-li:my-1
                        prose-table:text-sm prose-table:border-collapse prose-table:my-8
                        prose-thead:bg-stone-50 prose-thead:border-b prose-thead:border-stone-200
                        prose-th:px-4 prose-th:py-3 prose-th:text-stone-900 prose-th:font-semibold prose-th:text-left
                        prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-stone-100 prose-td:text-stone-600"
                    dangerouslySetInnerHTML={{ __html: post.content.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, "") }}
                />

                {/* FAQ Section */}
                {post.faqs?.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-stone-100">
                        <h2 className="text-xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {post.faqs.map((faq, i) => (
                                <details key={i} className="group border border-stone-200 rounded-lg">
                                    <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium text-stone-900 hover:bg-stone-50 transition-colors">
                                        {faq.question}
                                        <span className="text-stone-400 group-open:rotate-45 transition-transform text-lg">+</span>
                                    </summary>
                                    <p className="px-5 pb-4 text-sm text-stone-600 leading-relaxed">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ JSON-LD */}
                {post.faqs?.length > 0 && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": post.faqs.map(f => ({
                                    "@type": "Question",
                                    "name": f.question,
                                    "acceptedAnswer": { "@type": "Answer", "text": f.answer }
                                }))
                            })
                        }}
                    />
                )}

                {/* CloudSocial CTA Block */}
                <div className="mt-16 rounded-xl bg-stone-900 px-8 py-10 text-white"
                    style={{ borderTop: "3px solid #D4AF37" }}>
                    <h3 className="text-2xl font-bold mb-3">Ready to grow your CRE business online?</h3>
                    <p className="text-stone-300 mb-6 text-sm leading-relaxed">
                        CloudSocial builds the digital marketing engine for commercial real estate professionals who want more qualified leads without wasting time on tactics that don't work.
                    </p>
                    <a
                        href="/#contact"
                        className="inline-block px-6 py-3 rounded-md font-semibold text-sm text-stone-900 transition-all duration-300 hover:opacity-90"
                        style={{ background: "linear-gradient(90deg,#B38A4A,#D4AF37,#F9F0AC,#D4AF37,#B38A4A)", backgroundSize: "200% auto" }}
                    >
                        Book a Free Audit
                    </a>
                </div>

                {/* Related Resources */}
                <div className="mt-12 pt-8 border-t border-stone-100">
                    <h4 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-5">Related Resources</h4>
                    <div className="flex flex-col gap-3">
                        {RELATED_RESOURCES.map(r => (
                            <Link
                                key={r.href}
                                href={r.href}
                                className="flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors group"
                            >
                                <span className="w-4 h-px bg-stone-300 group-hover:w-6 group-hover:bg-stone-600 transition-all duration-300"></span>
                                {r.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Back link */}
                <div className="mt-10">
                    <Link
                        href="/blogs"
                        className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
                    >
                        ← Back to all articles
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    );
}
