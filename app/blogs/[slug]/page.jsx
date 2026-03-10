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

            <article className="max-w-2xl mx-auto px-6 pt-32 pb-24">
                {/* Breadcrumb */}
                <nav className="text-sm text-stone-400 mb-12 flex items-center gap-2">
                    <Link href="/blogs" className="hover:text-stone-900 transition-colors">Blog</Link>
                    <span className="text-stone-200">/</span>
                    <span className="text-stone-600 truncate">{post.title}</span>
                </nav>

                {/* Title and Metadata */}
                <header className="mb-20">
                    <h1 className="text-4xl lg:text-5xl font-black text-stone-900 leading-[1.1] mb-8 tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 py-8 border-y border-stone-100 mb-12">
                        <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-white text-sm font-black shadow-sm">
                            {post.author?.charAt(0) || "C"}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-stone-900">By {post.author}</span>
                                <span className="text-stone-200">|</span>
                                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                                    {post.publishedAt
                                        ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                        : "Draft"}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Verified Practitioner Article
                            </span>
                        </div>
                    </div>

                    {/* Highly Prominent "The Bottom Line" - Hims Style */}
                    {post.key_takeaways?.length > 0 && (
                        <div className="mb-16 bg-stone-50 border border-stone-100 rounded-3xl p-10 relative overflow-hidden">
                            <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-900 mb-8 flex items-center gap-4">
                                <span className="w-4 h-[2px] bg-stone-900"></span>
                                The Bottom Line
                            </h2>
                            <ul className="space-y-6 m-0 p-0">
                                {post.key_takeaways.slice(0, 3).map((item, i) => (
                                    <li key={i} className="list-none flex items-start gap-4 p-0 m-0">
                                        <span className="mt-2.5 w-1 h-1 rounded-full bg-stone-900 shrink-0" />
                                        <p className="text-stone-800 text-[16px] font-bold m-0 leading-relaxed tracking-tight leading-[1.6]">
                                            {item}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </header>

                {/* Featured image */}
                <div className="aspect-[16/9] bg-stone-100 rounded-3xl mb-24 overflow-hidden shadow-sm ring-1 ring-stone-900/5">
                    {post.featured_image_storageId ? (
                        <img
                            src={`/api/image/${post.featured_image_storageId}`}
                            alt={post.featured_image_alt || post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-stone-50 flex items-center justify-center">
                            <span className="text-stone-200 text-6xl font-black uppercase italic tracking-tighter opacity-10 select-none">CloudSocial</span>
                        </div>
                    )}
                </div>

                {/* Article body - Narow Column, Massive White Space */}
                <div className="max-w-none">
                    <div className="prose prose-stone prose-lg
                        prose-headings:text-stone-900 prose-headings:tracking-tight prose-headings:font-black
                        prose-h2:text-3xl prose-h2:mt-24 prose-h2:mb-12 prose-h2:leading-tight
                        prose-h3:text-2xl prose-h3:mt-16 prose-h3:mb-8
                        prose-p:text-stone-700 prose-p:leading-[1.8] prose-p:mb-12 prose-p:text-[18px] prose-p:font-medium
                        prose-a:text-stone-900 prose-a:font-black prose-a:underline prose-a:decoration-stone-300 hover:prose-a:decoration-stone-900 prose-a:transition-all
                        prose-strong:text-stone-900 prose-strong:font-black
                        prose-ul:text-stone-700 prose-ol:text-stone-700 prose-li:my-8 prose-li:pl-4
                        /* Fixed table layout for responsiveness */
                        prose-table:block prose-table:overflow-x-auto prose-table:whitespace-nowrap prose-table:border-stone-200 prose-table:border prose-table:rounded-3xl prose-table:my-20 prose-table:shadow-[0_10px_40px_rgba(0,0,0,0.03)]
                        prose-thead:bg-stone-50/80 prose-thead:border-b prose-thead:border-stone-200
                        prose-th:px-8 prose-th:py-6 prose-th:text-[10px] prose-th:font-black prose-th:uppercase prose-th:tracking-[0.2em] prose-th:text-stone-400
                        prose-td:px-8 prose-td:py-6 prose-td:text-[15px] prose-td:text-stone-700 prose-td:border-b prose-td:border-stone-50"
                        dangerouslySetInnerHTML={{ __html: post.content.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, "") }}
                    />
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
