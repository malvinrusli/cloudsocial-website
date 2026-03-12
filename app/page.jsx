import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CinematicVideo from './components/CinematicVideo'
import Philosophy from './components/Philosophy'
import WhoWeServe from './components/WhoWeServe'
import Features from './components/Features'
import Protocol from './components/Protocol'
import SocialProof from './components/SocialProof'
import Outcomes from './components/Outcomes'
import Footer from './components/Footer'

export const metadata = {
    title: {
        absolute: "Promperty | Commercial Real Estate Marketing Team",
    },
    description: "Promperty builds compounding digital authority infrastructure for commercial real estate firms operating at scale.",
};

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
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
    );
}
