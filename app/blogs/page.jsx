import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "Blog | Promperty — Commercial Real Estate Digital Marketing",
    description: "Insights, strategies, and guides for commercial real estate professionals looking to grow their online presence and generate more qualified leads.",
};

export default async function BlogPage() {
    const posts = await fetchQuery(api.posts.listPublished, {}).catch(() => []);

    const featured = posts[0] || null;
    const rest = posts.slice(1);

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">

                {/* Header */}
                <div className="mb-14 max-w-2xl">
                    <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-4 leading-tight">
                        Commercial Real Estate Marketing Insights
                    </h1>
                    <p className="text-lg text-stone-500">
                        Insights for CRE brokers, owners, and investors.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-24 text-stone-400">
                        <p className="text-lg">No articles published yet. Check back soon.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Hero Post */}
                        {featured && (
                            <div className="mb-16">
                                <Link href={`/blogs/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 items-center">
                                    <div className="aspect-video bg-stone-100 rounded-xl overflow-hidden">
                                        {featured.featured_image_storageId ? (
                                            <img
                                                src={`/api/image/${featured.featured_image_storageId}`}
                                                alt={featured.featured_image_alt || featured.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">Featured</span>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-stone-900 leading-snug mb-4 group-hover:text-stone-600 transition-colors">
                                            {featured.title}
                                        </h2>
                                        {featured.excerpt && (
                                            <p className="text-stone-500 leading-relaxed mb-6">
                                                {featured.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-3 text-xs text-stone-400">
                                            <span>{featured.author}</span>
                                            <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                                            <span>
                                                {featured.publishedAt
                                                    ? new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <div className="mt-12 border-t border-stone-100" />
                            </div>
                        )}

                        {/* Remaining Posts Grid */}
                        {rest.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {rest.map(post => (
                                    <article key={post._id} className="group flex flex-col bg-stone-50/50 rounded-2xl p-4 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-stone-100">
                                        <div className="aspect-[16/10] bg-stone-100 rounded-xl mb-6 overflow-hidden shadow-sm">
                                            {post.featured_image_storageId ? (
                                                <img
                                                    src={`/api/image/${post.featured_image_storageId}`}
                                                    alt={post.featured_image_alt || post.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                                            )}
                                        </div>

                                        <h2 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-stone-600 transition-colors leading-tight">
                                            <Link href={`/blogs/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        {post.excerpt && (
                                            <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-stone-400 mt-auto pt-5 border-t border-stone-100/50 uppercase">
                                            <span>{post.author}</span>
                                            <span className="w-1 h-1 rounded-full bg-stone-200"></span>
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
                    </>
                )}
            </div>
            <Footer />
        </main>
    );
}
