"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        month: 'Month 1',
        phase: 'Discovery & Foundation',
        deliverables: [
            'Full digital authority audit — search visibility, content gaps, competitor positioning',
            'Keyword architecture mapped to buyer intent (TOFU → MOFU → BOFU)',
            'Technical SEO foundation: site speed, schema, crawlability, canonical structure',
            'Content calendar designed around your market segments',
        ],
        outcome: 'You receive a complete 90-day authority roadmap with clear attribution targets.',
    },
    {
        month: 'Month 2',
        phase: 'Content Engine & Profile Authority',
        deliverables: [
            'First 4 short-form video assets produced and published',
            'Authority presence fully optimised for discovery across search and social',
            'First 3 SEO articles published with proper structure and internal links',
            'AI citation seeding begins — structured data and entity signals submitted',
        ],
        outcome: 'Content is live. Profiles are positioned. The engine is running.',
    },
    {
        month: 'Month 3',
        phase: 'Search Signal Building',
        deliverables: [
            '3 more SEO articles published — topical cluster forming (6 total)',
            'Structured data and schema markup fully implemented',
            'AI knowledge graph entity building — Google, Bing, Apple, Wikidata',
            'Video performance reviewed — top-performing formats doubled down on',
        ],
        outcome: 'First ranking signals appear. Citation tracking report delivered.',
    },
    {
        month: 'Month 4',
        phase: 'Authority Compounding Begins',
        deliverables: [
            '9 total SEO articles published — first pages begin ranking',
            'Authority content driving measurable engagement and interest',
            'AI platforms (ChatGPT, Perplexity, Gemini) beginning to cite your firm',
            'First inbound inquiries attributed to digital channels documented',
        ],
        outcome: 'First attributed inbound leads. The compound interest is starting to pay.',
    },
    {
        month: 'Month 5',
        phase: 'Optimisation & Scale',
        deliverables: [
            'Top-performing video formats scaled — 8+ assets now live',
            'SEO articles on page 1 positions for low-competition target keywords',
            'Content systems generating inbound interest from decision-makers',
            'Full AI citation audit — brand mentions across 8 AI platforms tracked',
        ],
        outcome: 'Full analytics dashboard delivered. Optimisation report with year-2 projections.',
    },
    {
        month: 'Month 6',
        phase: 'Compounding Authority Established',
        deliverables: [
            '12 SEO articles published — full topical authority across your market segments',
            'Organic search traffic showing meaningful, month-on-month growth',
            'AI platforms recommending your firm by name in relevant queries',
            'Authority infrastructure driving consistent deal flow conversations from qualified parties',
        ],
        outcome: 'Complete 6-month authority report + Year 2 strategy delivered.',
    },
];

const Protocol = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.protocol-header',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.protocol-header', start: 'top 80%' }
                }
            );
            gsap.fromTo('.protocol-step',
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out',
                    scrollTrigger: { trigger: '.protocol-steps', start: 'top 75%' }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="how" className="w-full bg-background py-24 md:py-32 px-6 md:px-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="protocol-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-textDark/30 mb-4">How It Works</p>
                        <h2 className="text-4xl md:text-6xl font-sans font-medium text-secondary tracking-tight leading-[1.05]">
                            The 6-Month<br />
                            <span className="font-sans italic text-textDark">Authority Roadmap</span>
                        </h2>
                    </div>
                    <p className="text-base text-textDark/50 font-light max-w-sm leading-relaxed md:text-right">
                        Every month has a specific goal, specific deliverables, and a measurable outcome. No vague retainers. No mystery.
                    </p>
                </div>

                {/* Vertical Steps List */}
                <div className="protocol-steps">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="protocol-step border-t border-gray-200 py-10 md:py-12 grid grid-cols-[4rem_1fr] md:grid-cols-[8rem_1fr] gap-6 md:gap-12"
                        >
                            {/* Left: step number + month label */}
                            <div className="pt-1">
                                <span className="block font-mono text-5xl md:text-7xl font-semibold text-textDark/8 leading-none select-none">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className="block text-[10px] font-semibold uppercase tracking-widest text-textDark/30 mt-2">
                                    {step.month}
                                </span>
                            </div>

                            {/* Right: content */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-sans font-medium text-secondary leading-snug mb-6">
                                    {step.phase}
                                </h3>

                                <ul className="space-y-3 mb-7">
                                    {step.deliverables.map((d, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="w-1 h-1 rounded-full bg-secondary mt-2.5 flex-shrink-0"></span>
                                            <span className="text-sm md:text-base text-textDark/60 font-light leading-relaxed">{d}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="font-sans italic text-textDark/50 text-sm md:text-base leading-relaxed border-l-2 border-gray-200 pl-4">
                                    {step.outcome}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Close border at bottom */}
                    <div className="border-t border-gray-200"></div>
                </div>

            </div>
        </section>
    );
};

export default Protocol;
