import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const post = await fetchQuery(api.posts.getBySlug, { slug: params.slug });
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

export default async function BlogPostPage({ params }) {
    const post = await fetchQuery(api.posts.getBySlug, { slug: params.slug });

    if (!post || post.status !== "published") {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

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

                {/* Tags */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                    {post.cluster && (
                        <Link
                            href={`/blogs?category=${encodeURIComponent(post.cluster)}`}
                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                            {post.cluster}
                        </Link>
                    )}
                    {post.target_keyword && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-500">
                            {post.target_keyword}
                        </span>
                    )}
                </div>

                {/* Featured image */}
                {post.featured_image_storageId && (
                    <div className="aspect-video bg-stone-100 rounded-xl mb-8 overflow-hidden">
                        <img
                            src={`/api/image/${post.featured_image_storageId}`}
                            alt={post.featured_image_alt || post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Byline */}
                <div className="flex items-center gap-3 mb-10 pb-8 border-b border-stone-100">
                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 text-sm font-medium">
                        {post.author?.charAt(0) || "C"}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-stone-900">{post.author}</div>
                        <div className="text-xs text-stone-400">
                            {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                : ""}
                        </div>
                    </div>
                </div>

                {/* Article content */}
                <div
                    className="prose prose-stone prose-lg max-w-none
                        prose-headings:font-bold prose-headings:text-stone-900
                        prose-p:text-stone-600 prose-p:leading-relaxed
                        prose-a:text-stone-900 prose-a:underline hover:prose-a:text-stone-600
                        prose-strong:text-stone-900
                        prose-ul:text-stone-600 prose-ol:text-stone-600
                        prose-li:my-1"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Back link */}
                <div className="mt-16 pt-8 border-t border-stone-100">
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
