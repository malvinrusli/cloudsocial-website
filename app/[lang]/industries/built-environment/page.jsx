import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageHero from '@/app/components/PageHero';
import AlternatingSection from '@/app/components/AlternatingSection';

export const metadata = {
    title: "Authority Hub for Built Environment Professionals | Promperty",
    description: "Digital authority systems for property developers, planners, and construction firms.",
};

export default async function BuiltEnvironmentPage({ params }) {
    const { lang } = await params;
    return (
        <main className="min-h-screen bg-background text-secondary">
            <Navbar lang={lang} />

            <PageHero
                title1="Built Environment"
                title2="Authority Infrastructure"
                subtitle="Positioning property developers and construction firms as modern industry leaders through strategic digital assets."
                badges={["Property Development", "Urban Planning", "Construction Scale"]}
            />

            <AlternatingSection
                title="Scaling the Developer Brand"
                description="Move beyond localized reputation. We build global digital authority that attracts high-caliber partners and simplifies project approvals."
                image="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"
                points={[
                    "Digital Consensus Building",
                    "Talent & Partner Magnetism",
                    "Market Sentiment Domination"
                ]}
                reverse={true}
            />

            <Footer lang={lang} />
        </main>
    );
}
