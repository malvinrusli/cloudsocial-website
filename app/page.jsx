import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CinematicVideo from './components/CinematicVideo'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Outcomes from './components/Outcomes'
import Footer from './components/Footer'

export const metadata = {
    title: "Commercial Real Estate Marketing | Scale Your AUM | CloudSocial",
    description: "CloudSocial builds compounding digital authority infrastructure for commercial real estate firms operating at scale.",
};

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <CinematicVideo />
            <Features />
            <Philosophy />
            <Protocol />
            <Outcomes />
            <Footer />
        </main>
    );
}
