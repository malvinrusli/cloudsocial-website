import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "Blog | Promperty — Commercial Real Estate Digital Marketing",
    description: "Insights, strategies, and guides for commercial real estate professionals looking to grow their online presence and generate more qualified leads.",
};

export default async function BlogPage({ params }) {
    const { lang } = await params;

    return (
        <main className="min-h-screen bg-background">
            <Navbar lang={lang} />
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
                <div className="mb-14 max-w-2xl">
                    <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-4 leading-tight">
                        Commercial Real Estate Marketing Insights
                    </h1>
                    <p className="text-lg text-stone-500">
                        Insights for CRE brokers, owners, and investors.
                    </p>
                </div>

                <div className="text-center py-24 text-stone-400">
                    <p className="text-lg">No articles published yet. Check back soon.</p>
                </div>
            </div>
            <Footer lang={lang} />
        </main>
    );
}
