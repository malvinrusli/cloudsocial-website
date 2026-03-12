import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "Case Studies | Promperty — Commercial Real Estate Digital Marketing",
    description: "See how Promperty has helped commercial real estate firms grow their online presence, generate qualified leads, and close more deals.",
};

export default async function CaseStudiesPage({ params }) {
    const { lang } = await params;
    const items = await fetchQuery(api.caseStudies.listPublished, {}).catch(() => []);

    return (
        <main className="min-h-screen bg-background">
            <Navbar lang={lang} />
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
                <div className="mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                        Client Results
                    </h1>
                    <p className="text-lg text-stone-500 max-w-2xl">
                        Real outcomes for commercial real estate firms. Numbers, timelines, and the strategies behind each result.
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-24 text-stone-400">
                        <p className="text-lg">Case studies coming soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {items.map(item => (
                            <article key={item._id} className="group border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-400 transition-colors">
                                {item.featured_image_storageId ? (
                                    <div className="aspect-video bg-stone-100 overflow-hidden">
                                        <img
                                            src={`/api/image/${item.featured_image_storageId}`}
                                            alt={item.featured_image_alt || item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200" />
                                )}

                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        {item.industry && (
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                                                {item.industry}
                                            </span>
                                        )}
                                        {(item.services || []).slice(0, 2).map(s => (
                                            <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-xl font-semibold text-stone-900 mb-2 group-hover:text-stone-600 transition-colors leading-snug">
                                        <Link href={`/${lang}/case-studies/${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </h2>

                                    {item.client_name && (
                                        <p className="text-stone-400 text-sm">{item.client_name}</p>
                                    )}

                                    <div className="mt-4 pt-4 border-t border-stone-100">
                                        <Link
                                            href={`/${lang}/case-studies/${item.slug}`}
                                            className="text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors"
                                        >
                                            Read case study →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            <Footer lang={lang} />
        </main>
    );
}
