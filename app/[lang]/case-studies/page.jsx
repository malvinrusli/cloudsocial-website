import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "Case Studies | Promperty — Commercial Real Estate Digital Marketing",
    description: "See how Promperty has helped commercial real estate firms grow their online presence, generate qualified leads, and close more deals.",
};

export default async function CaseStudiesPage({ params }) {
    const { lang } = await params;

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

                <div className="text-center py-24 text-stone-400">
                    <p className="text-lg">Case studies coming soon.</p>
                </div>
            </div>
            <Footer lang={lang} />
        </main>
    );
}
