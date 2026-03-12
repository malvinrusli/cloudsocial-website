import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

const SITE_URL = "https://www.promperty.io";

// Parse **bold** markdown syntax in Key Takeaways text
function parseMarkdownBold(text) {
    if (!text) return text;
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await fetchQuery(api.posts.getBySlug, { slug });
    if (!post) return {};

    const title = (post.seo_title || post.title || "").slice(0, 60);
    const description = post.meta_description || post.excerpt || "";
    const url = `${SITE_URL}/blogs/${slug}`;
    const ogImage = post.featured_image_storageId
        ? `${SITE_URL}/api/image/${post.featured_image_storageId}`
        : `${SITE_URL}/og-default.png`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        robots: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
        openGraph: {
            title: (post.og_title || title).slice(0, 60),
            description: post.og_description || description,
            type: "article",
            url,
            siteName: "Promperty",
            publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
            modifiedTime: post._creationTime ? new Date(post._creationTime).toISOString() : undefined,
            images: [{
                url: ogImage,
                width: 1200,
                height: 630,
                alt: post.featured_image_alt || post.title,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: (post.og_title || title).slice(0, 60),
            description: post.og_description || description,
            images: [ogImage],
        },
    };
}

export async function generateStaticParams() {
    try {
        const posts = await fetchQuery(api.posts.listPublished, {});
        // Return both lang and slug for the dynamic segments
        const params = [];
        ['en', 'id'].forEach(lang => {
            posts.forEach(p => {
                params.push({ lang, slug: p.slug });
            });
        });
        return params;
    } catch {
        return [];
    }
}

const getRelatedResources = (lang) => [
    { label: "Commercial Real Estate SEO", href: `/${lang}/seo-real-estate` },
    { label: "AEO & GEO for Real Estate", href: `/${lang}/aeo-geo-llms-real-estate` },
    { label: "AI Lead Capture & Automations", href: `/${lang}/ai-agent-real-estate` },
];

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await fetchQuery(api.posts.getBySlug, { slug });

    if (!post || post.status !== "published") {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar lang={lang} />

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

            <article className="max-w-4xl mx-auto px-6 pt-48 pb-24">
                {/* Breadcrumb */}
                <nav className="text-sm text-stone-400 mb-12 flex items-center gap-2">
                    <Link href={`/${lang}/blogs`} className="hover:text-stone-900 transition-colors">Blog</Link>
                    <span className="text-stone-200">/</span>
                    <span className="text-stone-600 truncate">{post.title}</span>
                </nav>

                {/* Title and Metadata */}
                <header className="mb-20">
                    <h1 className="text-5xl lg:text-7xl font-black text-stone-900 leading-[1.05] mb-12 tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 py-10 border-y border-stone-100 mb-16">
                        <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white text-base font-black shadow-sm">
                            {post.author?.charAt(0) || "C"}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="text-base font-black text-stone-900">By {post.author}</span>
                                <span className="text-stone-200">|</span>
                                <span className="text-[12px] font-bold text-stone-400 uppercase tracking-widest">
                                    {post.publishedAt
                                        ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                        : "Draft"}
                                </span>
                            </div>
                            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Verified Practitioner Article
                            </span>
                        </div>
                    </div>

                </header>

                {/* Featured image */}
                <div className="aspect-[21/9] bg-stone-100 rounded-[2rem] mb-16 overflow-hidden shadow-sm ring-1 ring-stone-900/5">
                    {post.featured_image_storageId ? (
                        <img
                            src={`/api/image/${post.featured_image_storageId}`}
                            alt={post.featured_image_alt || post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-stone-50 flex items-center justify-center">
                            <span className="text-stone-200 text-6xl font-black uppercase italic tracking-tighter opacity-10 select-none">Promperty</span>
                        </div>
                    )}
                </div>

                {/* Key Takeaways — after featured image */}
                {post.key_takeaways?.length > 0 && (
                    <div className="mb-16 bg-stone-50 border border-stone-100 rounded-2xl p-8 md:p-10">
                        <h2 className="text-[11px] font-black tracking-[0.3em] uppercase text-stone-500 mb-6 flex items-center gap-3">
                            <span className="w-5 h-[2px] bg-stone-400"></span>
                            KEY TAKEAWAYS
                        </h2>
                        <ul className="space-y-4 m-0 p-0">
                            {post.key_takeaways.slice(0, 3).map((item, i) => (
                                <li key={i} className="list-none flex items-start gap-4 p-0 m-0">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                                    <p className="text-stone-700 text-base font-medium m-0 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: parseMarkdownBold(item) }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Article body */}
                <div className="max-w-none">
                    <div className="prose prose-stone prose-lg
                        prose-headings:text-stone-900 prose-headings:tracking-tight prose-headings:font-bold
                        prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:leading-snug
                        prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                        prose-p:text-stone-700 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[17px]
                        prose-a:text-stone-900 prose-a:font-semibold prose-a:underline prose-a:decoration-stone-300 hover:prose-a:decoration-stone-900 prose-a:transition-all
                        prose-strong:text-stone-900 prose-strong:font-bold
                        prose-ul:text-stone-700 prose-ol:text-stone-700 prose-li:my-2 prose-li:pl-1
                        prose-table:w-full prose-table:overflow-x-auto prose-table:border-stone-200 prose-table:border prose-table:rounded-xl prose-table:my-10 prose-table:shadow-sm
                        prose-thead:bg-stone-50 prose-thead:border-b prose-thead:border-stone-200
                        prose-th:px-5 prose-th:py-3 prose-th:text-xs prose-th:font-bold prose-th:uppercase prose-th:tracking-wider prose-th:text-stone-500 prose-th:text-left
                        prose-td:px-5 prose-td:py-3 prose-td:text-sm prose-td:text-stone-700 prose-td:border-b prose-td:border-stone-100"
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

                {/* Promperty CTA Block */}
                <div className="mt-16 rounded-xl bg-stone-900 px-8 py-10 text-white"
                    style={{ borderTop: "3px solid #D4AF37" }}>
                    <h3 className="text-2xl font-bold mb-3">Ready to grow your CRE business online?</h3>
                    <p className="text-stone-300 mb-6 text-sm leading-relaxed">
                        Promperty builds the digital marketing engine for commercial real estate professionals who want more qualified leads without wasting time on tactics that don't work.
                    </p>
                    <a
                        href={`/${lang}#contact`}
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
                        {getRelatedResources(lang).map(r => (
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
                        href={`/${lang}/blogs`}
                        className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
                    >
                        ← Back to all articles
                    </Link>
                </div>
            </article>

            <Footer lang={lang} />
        </main>
    );
}
