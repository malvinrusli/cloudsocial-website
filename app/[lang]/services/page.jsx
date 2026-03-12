"use client";
import React, { use, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ContactModal from '@/app/components/ContactModal';

export default function ServicesHubPage({ params }) {
    const { lang } = use(params);
    const containerRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.hub-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const categories = [
        {
            title: "Authority Infrastructure",
            desc: "Establish your firm as the unquestionable industry leader through compounding systems.",
            links: [
                { name: "Content Architecture", path: "/content-real-estate" },
                { name: "Executive Positioning", path: "/content-real-estate" },
                { name: "Authority Audits", path: "/content-real-estate" }
            ]
        },
        {
            title: "Search Domination",
            desc: "Capture high-intent commercial real estate traffic across platforms.",
            links: [
                { name: "Commercial SEO", path: "/seo-real-estate" },
                { name: "AEO (AI Engine Optimization)", path: "/aeo-geo-llms-real-estate" },
                { name: "GEO (Generative Engine Optimization)", path: "/aeo-geo-llms-real-estate" }
            ]
        },
        {
            title: "Authority Systems",
            desc: "High-retention media assets that capture attention and build trust.",
            links: [
                { name: "Content Architecture", path: "/content-real-estate" },
                { name: "Deal Breakdowns (BOFU)", path: "/content-real-estate" },
                { name: "Market Intelligence Systems", path: "/content-real-estate" }
            ]
        },
        {
            title: "Digital Infrastructure",
            desc: "Optimize your digital presence for maximum conversion.",
            links: [
                { name: "Web Architecture", path: "/web-architecture-real-estate" },
                { name: "Conversion Rate Optimization", path: "/web-architecture-real-estate" },
                { name: "Premium Branding", path: "/web-architecture-real-estate" }
            ]
        },
        {
            title: "AI Automations",
            desc: "Convert and qualify leads 24/7 without human intervention.",
            links: [
                { name: "WhatsApp AI Agents", path: "/ai-agent-real-estate" },
                { name: "Automated Lead Qualification", path: "/ai-agent-real-estate" },
                { name: "Instant CRM Sync", path: "/ai-agent-real-estate" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-background" ref={containerRef}>
            <Navbar lang={lang} />

            {/* Header Layer */}
            <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto text-center">
                <div className="inline-block bg-white rounded-sm px-4 py-2 border border-gray-200 mb-6 hub-anim">
                    <span className="text-xs font-semibold text-secondary">Our Ecosystem</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-sans font-medium text-secondary tracking-tight mb-8 hub-anim max-w-4xl mx-auto">
                    Compounding digital <span className="font-serif italic text-textDark">infrastructure</span> for commercial real estate.
                </h1>
                <p className="text-xl text-textDark/70 font-medium max-w-2xl mx-auto hub-anim leading-relaxed">
                    We do not run ad campaigns. We build, manage, and scale the core pillars of digital authority necessary to dominate your market.
                </p>
            </section>

            {/* Hub Grid */}
            <section className="py-12 px-8 max-w-7xl mx-auto mb-24 relative">
                {/* Optional Decorative Border at top of grid */}
                <div className="w-full h-px bg-gray-200 absolute top-0 left-0 hub-anim"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {categories.map((cat, i) => (
                        <div key={i} className="hub-anim bg-white rounded-md p-8 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-gray-200 transition-colors duration-200 h-full flex flex-col">
                            <h2 className="text-2xl font-sans font-semibold text-secondary mb-3">{cat.title}</h2>
                            <p className="text-sm text-textDark/70 mb-8 border-b border-gray-100 pb-6">{cat.desc}</p>

                            <ul className="space-y-4 mb-4 flex-1">
                                {cat.links.map((link, j) => (
                                    <li key={j}>
                                        <a href={`/${lang}${link.path}`} className="group flex items-center justify-between font-sans text-sm font-medium text-textDark hover:text-secondary transition-colors">
                                            <span>{link.name}</span>
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-secondary transition-colors" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Placeholder card to make it an even 6 in the grid for balance */}
                    <div className="hub-anim bg-gray-50 rounded-md p-8 border border-gray-200 border-dashed flex flex-col items-center justify-center text-center transition-colors duration-500 hover:bg-gray-100 hover:border-gray-300">
                        <h2 className="text-xl font-serif text-secondary mb-2">Bespoke Solutions</h2>
                        <p className="text-sm text-textDark/60 max-w-[200px]">Looking for something custom? Let's discuss your unique requirements.</p>
                        <a href="#contact" className="mt-6 text-sm font-semibold text-secondary underline underline-offset-4 decoration-gray-300 hover:decoration-secondary transition-colors">Contact Strategy Team</a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-8 max-w-4xl mx-auto relative z-10 hub-anim">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-sans font-medium text-secondary mb-4 tracking-tight">
                        Common Questions
                    </h2>
                    <p className="text-lg text-textDark/70 font-medium">
                        Everything you need to know about our infrastructure.
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            q: "Is this just traditional SEO?",
                            a: "No. Traditional search rankings are only one pillar. We optimize for Generative Engines (GEO) and AI platforms (AEO) to ensure you become the default referenced authority when institutional investors ask AI for recommendations."
                        },
                        {
                            q: "How long until I see real traction?",
                            a: "We build compounding infrastructure, not overnight ad campaigns. You’ll see verifiable movement in 30-60 days, but the exponential compounding of digital authority typically hits its stride between months 4 and 6."
                        },
                        {
                            q: "Do I need to manage the AI agents or content generation?",
                            a: "No. We handle the entire ecosystem end-to-end. Our systems operate autonomously—qualifying leads 24/7 and publishing high-retention content—while you focus entirely on closing deals and managing your properties."
                        },
                        {
                            q: "Do you work with residential real estate?",
                            a: "No. Our entire framework—from our linguistic models to our web architecture—is engineered exclusively for the high-ticket, long-sales-cycle environment of property developers, field service firms, and real estate professionals."
                        }
                    ].map((faq, idx) => {
                        const [isOpen, setIsOpen] = useState(false);
                        return (
                            <div
                                key={idx}
                                className="border border-gray-200 rounded-md bg-white overflow-hidden transition-all duration-300 hover:border-gray-300"
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className="font-sans font-semibold text-secondary text-lg">{faq.q}</span>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-textDark/80 leading-relaxed font-sans">{faq.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-24 px-8 bg-secondary text-white border-t border-white/5 text-center relative overflow-hidden z-10 hub-anim">

                <div className="max-w-3xl mx-auto relative z-20">
                    <h2 className="text-3xl md:text-5xl font-sans font-medium text-white mb-8 tracking-tight">
                        We make you the <span className="font-serif text-gray-300">default choice</span> in your market.
                    </h2>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-8 py-4 rounded-md font-sans text-sm font-semibold bg-white text-secondary hover:bg-gray-100 transition-colors duration-200 mt-6"
                    >
                        Request a Free Strategy Audit
                    </button>
                    <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source="Services Hub" />
                </div>
            </section>

            {/* Footer */}
            <div className="relative z-10">
                <Footer lang={lang} />
            </div>
        </main>
    );
}
