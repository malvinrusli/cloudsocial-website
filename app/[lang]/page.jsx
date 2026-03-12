import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import WhoWeServe from '@/app/components/WhoWeServe'
import Features from '@/app/components/Features'
import Protocol from '@/app/components/Protocol'
import SocialProof from '@/app/components/SocialProof'
import Footer from '@/app/components/Footer'

export const metadata = {
    title: {
        absolute: "Promperty | Commercial Real Estate Marketing Team",
    },
    description: "Promperty builds compounding digital authority infrastructure for commercial real estate firms operating at scale.",
};

export default async function Home({ params }) {
    const { lang } = await params;
    return (
        <main className="min-h-screen bg-white">
            <Navbar lang={lang} />
            <Hero />
            <WhoWeServe />
            <Features />
            <Protocol />
            <SocialProof />
            <Footer lang={lang} />
        </main>
    )
}
