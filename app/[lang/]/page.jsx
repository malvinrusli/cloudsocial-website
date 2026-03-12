import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import CinematicVideo from '@/app/components/CinematicVideo'
import Philosophy from '@/app/components/Philosophy'
import WhoWeServe from '@/app/components/WhoWeServe'
import Features from '@/app/components/Features'
import Protocol from '@/app/components/Protocol'
import SocialProof from '@/app/components/SocialProof'
import Outcomes from '@/app/components/Outcomes'
import Footer from '@/app/components/Footer'

export const metadata = {
    title: {
        absolute: "Promperty | Commercial Real Estate Marketing Team",
    },
    description: "Promperty builds compounding digital authority infrastructure for commercial real estate firms operating at scale.",
};

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <CinematicVideo />
            <Philosophy />
            <WhoWeServe />
            <Features />
            <Protocol />
            <SocialProof />
            <Outcomes />
            <Footer />
        </main>
    )
}
