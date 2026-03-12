"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Tiers = [
    {
        name: "Scale Foundation",
        price: "$1,499",
        setup: "One-time setup fee: $1,500",
        description: "The essential digital infrastructure for search and AI visibility.",
        features: [
            "Performance Web Architecture",
            "Technical SEO & Keyword Mapping",
            "GEO (AI Search Visibility)",
            "Lighthouse Speed Optimization",
            "Monthly Performance Reporting"
        ],
        cta: "Start Foundation",
        highlight: false
    },
    {
        name: "Authority Infrastructure",
        price: "$3,999",
        setup: "One-time setup fee: $2,500",
        description: "A complete content & automation engine built for market dominance in 2026.",
        features: [
            "Full Content Architecture (Lead-to-Deal)",
            "TOFU → MOFU → BOFU Strategy",
            "12 Authority Articles Monthly",
            "Cinematic Deal Breakdowns",
            "Lead Automations (Email/SMS)",
            "Priority AEO Citation Monitoring"
        ],
        cta: "Build Authority",
        highlight: true
    },
    {
        name: "Full Growth Engine",
        price: "$6,599",
        setup: "Custom onboarding plan",
        description: "The ultimate 24/7 sales & authority flywheel for high-volume firms.",
        features: [
            "AI Sales Agents (WhatsApp/Email)",
            "Automated Qualified Lead Scraping",
            "Cinematic Founder Video Systems",
            "Full CRM & Sales Workflow Sync",
            "Omnipresent Authority Mapping",
            "Dedicated Growth Manager"
        ],
        cta: "Go Full Scale",
        highlight: false
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background text-secondary">
            <Navbar />

            <section className="pt-40 pb-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-sans font-medium text-secondary tracking-tight mb-6">
                            Compounding Leverage
                        </h1>
                        <p className="text-lg md:text-xl font-sans font-light text-textDark/60 max-w-2xl mx-auto leading-relaxed">
                            We build digital infrastructure that acts as a secure moat for your business. Investment is calculated based on the technical complexity and authority depth required.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {Tiers.map((tier, idx) => (
                            <div
                                key={idx}
                                className={`relative p-8 md:p-10 flex flex-col border ${tier.highlight ? 'border-secondary bg-[#0D0D0D] text-white' : 'border-gray-100 bg-white text-secondary'} transition-all duration-300 hover:shadow-2xl`}
                            >
                                {tier.highlight && (
                                    <div className="absolute top-0 right-10 -translate-y-1/2 bg-secondary text-primary px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className={`text-2xl font-medium mb-4 ${tier.highlight ? 'text-white' : 'text-secondary'}`}>{tier.name}</h3>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl md:text-5xl font-sans font-semibold tracking-tighter">{tier.price}</span>
                                        {tier.price !== "Custom" && <span className={`text-sm ${tier.highlight ? 'text-white/40' : 'text-secondary/40'}`}>/month</span>}
                                    </div>
                                    <p className={`text-[11px] font-mono ${tier.highlight ? 'text-white/30' : 'text-secondary/30'}`}>{tier.setup}</p>
                                </div>

                                <p className={`text-sm leading-relaxed mb-8 ${tier.highlight ? 'text-white/60' : 'text-textDark/70'}`}>
                                    {tier.description}
                                </p>

                                <ul className="space-y-4 mb-10 flex-1">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <svg className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlight ? 'text-emerald-400' : 'text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span className={`text-[13px] ${tier.highlight ? 'text-white/80' : 'text-secondary/80'}`}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 rounded-md font-sans text-sm font-semibold tracking-wide transition-all duration-300 ${tier.highlight ? 'bg-primary text-secondary hover:bg-white' : 'bg-secondary text-primary hover:bg-textDark'}`}>
                                    {tier.cta}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-8 border border-gray-100 text-center bg-gray-50/30">
                        <p className="text-sm text-textDark/50 font-sans italic">
                            Custom pricing available for enterprise portfolios and multi-market developer groups. <a href="#" className="underline text-secondary font-medium decoration-gray-300 hover:decoration-secondary transition-all">Enquire for Enterprise</a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
