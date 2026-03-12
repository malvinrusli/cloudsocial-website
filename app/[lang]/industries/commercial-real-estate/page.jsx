import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageHero from '@/app/components/PageHero';
import AlternatingSection from '@/app/components/AlternatingSection';
import Philosophy from '@/app/components/Philosophy';

export const metadata = {
    title: "Authority Hub for Commercial Real Estate | Promperty",
    description: "Compounding digital authority for institutional brokerage, syndication, and development firms.",
};

export default async function CommercialRealEstatePage({ params }) {
    const { lang } = await params;
    return (
        <main className="min-h-screen bg-background text-secondary">
            <Navbar lang={lang} />

            <PageHero
                title1="Commercial Real Estate"
                title2="Authority Hub"
                subtitle="We build compounding digital moats for CRE firms operating at scale—positioning you as the default choice for investors and tenants."
                badges={["Institutional Brokerage", "Capital Markets", "Industrial & Office"]}
            />

            <Philosophy
                title="The CRE Trust Gap"
                description="Traditional CRE marketing is too focused on vanity metrics. We focus on Authority Infrastructure—the digital assets that actually close institutional deals."
            />

            <AlternatingSection
                title="Digital Moats for Brokerage"
                description="Position your team as the primary authority in your market. Our content architecture ensures that when investors search for a specific asset class, your firm owns the narrative."
                image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                points={[
                    "Asset-Class Specific Authority",
                    "Investor-Intent Search Domination",
                    "AI Visibility for Capital Partners"
                ]}
            />

            <Footer lang={lang} />
        </main>
    );
}
