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

            <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                {/* Breadcrumb */}
                <nav className="text-sm text-stone-400 mb-10 flex items-center gap-2">
                    <Link href="/blogs" className="hover:text-stone-900 transition-colors">Blog</Link>
                    <span className="text-stone-200">/</span>
                    <span className="text-stone-600 truncate">{post.title}</span>
                </nav>

                {/* Title and Metadata */}
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.15] mb-8 tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 py-6 border-y border-stone-100">
                        <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                            {post.author?.charAt(0) || "C"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-stone-900">{post.author}</span>
                            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                                {post.publishedAt
                                    ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                    : "Draft"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Featured image */}
                <div className="aspect-[21/9] bg-stone-100 rounded-2xl mb-12 overflow-hidden shadow-sm">
                    {post.featured_image_storageId ? (
                        <img
                            src={`/api/image/${post.featured_image_storageId}`}
                            alt={post.featured_image_alt || post.title}
                            className="w-full h-full object-cover shadow-inner"
                        />
                    ) : (
                        <div className="w-full h-full bg-stone-50 flex items-center justify-center">
                            <span className="text-stone-200 text-6xl font-black uppercase italic tracking-tighter opacity-10 select-none">CloudSocial</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        {/* Article body with responsive wrapper */}
                        <div className="overflow-x-visible">
                            <div
                                className="prose prose-stone prose-lg max-w-none
                                    prose-headings:font-bold prose-headings:text-stone-900 prose-headings:tracking-tight
                                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                    prose-p:text-stone-600 prose-p:leading-[1.8] prose-p:mb-6
                                    prose-a:text-stone-900 prose-a:font-bold prose-a:underline prose-a:decoration-stone-300 hover:prose-a:decoration-stone-900 prose-a:transition-all
                                    prose-strong:text-stone-900 prose-strong:font-bold
                                    prose-ul:text-stone-600 prose-ol:text-stone-600 prose-li:my-2
                                    /* Fixed table layout for responsiveness */
                                    prose-table:block prose-table:overflow-x-auto prose-table:whitespace-nowrap prose-table:border-stone-200 prose-table:border prose-table:rounded-xl prose-table:my-10 prose-table:shadow-sm
                                    prose-thead:bg-stone-50/80 prose-thead:border-b prose-thead:border-stone-200
                                    prose-th:px-6 prose-th:py-4 prose-th:text-xs prose-th:font-bold prose-th:uppercase prose-th:tracking-widest prose-th:text-stone-500
                                    prose-td:px-6 prose-td:py-4 prose-td:text-sm prose-td:text-stone-600 prose-td:border-b prose-td:border-stone-100"
                                dangerouslySetInnerHTML={{ __html: post.content.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, "") }}
                            />
                        </div>
                    </div>

                    <aside className="lg:col-span-4 space-y-10">
                        {/* Sticky sidebar content */}
                        <div className="sticky top-24 space-y-10">
                            {/* Key Takeaways moved to sidebar for better layout focus */}
                            {post.key_takeaways?.length > 0 && (
                                <div className="bg-stone-50/50 border border-stone-200 rounded-2xl p-6 shadow-sm">
                                    <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 mb-6 flex items-center gap-2">
                                        <span className="w-1 h-3 bg-stone-900 rounded-full"></span>
                                        Deep Insights
                                    </h2>
                                    <ul className="space-y-4">
                                        {post.key_takeaways.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 group">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-900 group-hover:scale-150 transition-transform shrink-0" />
                                                <span className="text-stone-600 text-[13px] font-medium leading-relaxed italic">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tags/Cluster Info */}
                            <div className="px-2">
                                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-300 mb-4">Topic Area</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-white border border-stone-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-stone-500 shadow-sm">
                                        {post.cluster || "Authority Content"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

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
