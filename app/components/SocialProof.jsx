"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    { value: '84K+', label: 'Views on a single property video', context: 'First video published for a CRE client — zero ad spend.' },
    { value: '62%', label: 'Average video watch time', context: 'Industry sits at 8%. Our content is engineered to hold attention.' },
    { value: '12×', label: 'Strategic SEO articles per month', context: 'Published, optimised, attributed to your firm\'s topical authority.' },
    { value: '3×', label: 'Inbound lead increase by month 4', context: 'Across clients tracking attribution from organic channels.' },
];

// PLACEHOLDER — replace with real client quotes when available
const testimonials = [
    {
        quote: "They positioned us as the top CRE authority in our market before we even asked. Inbound inquiries are up 3x since month four.",
        name: "Aldi R.",
        title: "Managing Director",
        company: "Graha Kapital",
        initials: "AR",
    },
    {
        quote: "Our firm went from being invisible to generating real LP conversations within 90 days. The content is exactly how I'd want to speak but never found the time to write.",
        name: "Sarah K.",
        title: "Principal",
        company: "Pacific Gateway Investments",
        initials: "SK",
    },
    {
        quote: "First time in 8 years we're being found by tenants instead of chasing them. The ROI justified itself well before month three.",
        name: "James T.",
        title: "Senior Broker",
        company: "Atlas Commercial",
        initials: "JT",
    },
];

const Stars = () => (
    <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const SocialProof = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.metric-item',
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.metrics-bar',
                        start: 'top 80%',
                    }
                }
            );
            gsap.fromTo('.testimonial-card',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.testimonials-grid',
                        start: 'top 75%',
                    }
                }
            );
            gsap.fromTo('.proof-header',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.proof-header',
                        start: 'top 80%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="case" className="w-full bg-background">

            {/* Metrics — Editorial Typographic List */}
            <div className="metrics-bar w-full bg-[#0A0A0A] px-8 pt-20 pb-4">
                <div className="max-w-7xl mx-auto">

                    {/* Section label */}
                    <p className="metric-item text-[11px] font-semibold uppercase tracking-widest text-white/25 mb-12">
                        Performance Benchmarks
                    </p>

                    {/* Metric rows */}
                    {metrics.map((m, idx) => (
                        <div key={idx} className="metric-item border-t border-white/10 py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-0 last:border-b last:border-white/10">
                            {/* Number */}
                            <div className="md:w-48 flex-shrink-0">
                                <span className="font-sans font-semibold text-5xl md:text-7xl text-white tracking-tight leading-none">
                                    {m.value}
                                </span>
                            </div>
                            {/* Label */}
                            <div className="flex-1 md:px-12">
                                <p className="text-xl md:text-2xl font-sans font-medium text-white/80 leading-snug">
                                    {m.label}
                                </p>
                            </div>
                            {/* Context */}
                            <div className="md:w-72 flex-shrink-0">
                                <p className="text-sm font-light text-white/35 leading-relaxed">
                                    {m.context}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* Testimonials */}
            <div className="w-full py-24 md:py-32 px-6 md:px-12 bg-background border-t border-gray-100">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="proof-header mb-16 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-textDark/40 mb-4">Client Results</p>
                        <h2 className="text-3xl md:text-5xl font-sans font-medium text-secondary tracking-tight">
                            Firms that chose to be{' '}
                            <span className="font-sans italic text-textDark">found, not forgotten</span>
                        </h2>
                    </div>

                    {/* Testimonial Cards */}
                    {/* PLACEHOLDER — replace with real client quotes when available */}
                    <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <div
                                key={idx}
                                className="testimonial-card bg-white border border-gray-200 rounded-lg p-8 flex flex-col hover:border-stone-300 hover:shadow-sm transition-all duration-200"
                            >
                                <Stars />

                                <blockquote className="font-sans italic text-textDark/80 text-lg leading-relaxed mb-6 flex-1">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>

                                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                        <span className="font-sans text-xs font-bold text-primary">{t.initials}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-secondary">{t.name}</p>
                                        <p className="text-xs text-textDark/40 font-light">{t.title}, {t.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Case Studies Link */}
                    <div className="mt-12 text-center">
                        <a
                            href="/case-studies"
                            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-secondary border border-gray-200 px-6 py-3 rounded-md hover:border-stone-400 hover:bg-white transition-all duration-200"
                        >
                            View detailed case studies
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default SocialProof;
