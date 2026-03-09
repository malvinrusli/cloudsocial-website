import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "Blog | CloudSocial — Commercial Real Estate Digital Marketing",
    description: "Insights, strategies, and guides for commercial real estate professionals looking to grow their online presence and generate more qualified leads.",
};

export default async function BlogPage({ searchParams }) {
    const posts = await fetchQuery(api.posts.listPublished, {}).catch(() => []);
    const activeCategory = searchParams?.category || "all";

    // Derive unique categories from cluster field
    const categories = ["all", ...new Set(posts.map(p => p.cluster).filter(Boolean))];

    // Filter posts by active category
    const filtered = activeCategory === "all"
        ? posts
        : posts.filter(p => p.cluster === activeCategory);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
                <div className="mb-10">
                    <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Commercial Real Estate Marketing Insights
                    </h1>
                    <p className="text-lg text-stone-500 max-w-2xl">
                        Strategies, guides, and analysis for CRE brokers, owners, and investors who want to generate leads online.
                    </p>
                </div>

                {/* Category filter pills */}
                {categories.length > 1 && (
                    <div className="flex gap-2 flex-wrap mb-10">
                        {categories.map(cat => {
                            const isActive = cat === activeCategory;
                            const href = cat === "all" ? "/blogs" : `/blogs?category=${encodeURIComponent(cat)}`;
                            return (
                                <Link
                                    key={cat}
                                    href={href}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-stone-900 text-white"
                                            : "border border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900"
                                    }`}
                                >
                                    {cat === "all" ? "All" : cat}
                                </Link>
                            );
                        })}
                    </div>
                )}

                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-stone-400">
                        <p className="text-lg">No articles published yet. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map(post => (
                            <article key={post._id} className="group flex flex-col">
                                <div className="aspect-video bg-stone-100 rounded-xl mb-4 overflow-hidden">
                                    {post.featured_image_storageId ? (
                                        <img
                                            src={`/api/image/${post.featured_image_storageId}`}
                                            alt={post.featured_image_alt || post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    {post.cluster && (
                                        <Link
                                            href={`/blogs?category=${encodeURIComponent(post.cluster)}`}
                                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                                        >
                                            {post.cluster}
                                        </Link>
                                    )}
                                </div>

                                <h2 className="text-lg font-semibold text-stone-900 mb-2 group-hover:text-stone-600 transition-colors leading-snug">
                                    <Link href={`/blogs/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                {post.excerpt && (
                                    <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1">
                                        {post.excerpt}
                                    </p>
                                )}

                                <div className="flex items-center justify-between text-xs text-stone-400 mt-auto pt-4 border-t border-stone-100">
                                    <span>{post.author}</span>
                                    <span>
                                        {post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                                            : ""}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
