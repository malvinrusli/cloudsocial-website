import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageHero from '@/app/components/PageHero';
import AlternatingSection from '@/app/components/AlternatingSection';

export const metadata = {
    title: "Authority Hub for Architects & Interiors | Promperty",
    description: "Elevating design studios to category authorities through high-fidelity digital infrastructure.",
};

export default async function ArchitectsPage({ params }) {
    const { lang } = await params;
    return (
        <main className="min-h-screen bg-background text-secondary">
            <Navbar lang={lang} />

            <PageHero
                title1="Architects & Interiors"
                title2="Design Authority"
                subtitle="We translate your architectural vision into digital dominance—ensuring your studio is the only logical choice for high-end commissions."
                badges={["Luxury Residential", "Hospitality Design", "Commercial Interiors"]}
            />

            <AlternatingSection
                title="Beyond the Portfolio"
                description="Most architects rely on static portfolios. We build interactive authority systems that demonstrate project depth and engineering complexity."
                image="https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2062&auto=format&fit=crop"
                points={[
                    "Aesthetic Authority Scaling",
                    "High-Net-Worth Client Attraction",
                    "Design-Led Content Architecture"
                ]}
            />

            <Footer lang={lang} />
        </main>
    );
}
