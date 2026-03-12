"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ContactModal from './ContactModal';

const Hero = () => {
    const containerRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.hero-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
            );

            gsap.to('.scroll-circle', {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 2,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const rotatingWords = [
        "Real Estate",
        "Built Environment",
        "Architects",
        "Interior Firms",
        "Realtors"
    ];

    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            gsap.to('.rotating-word', {
                y: -10,
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    setWordIndex((prev) => (prev + 1) % rotatingWords.length);
                    gsap.fromTo('.rotating-word',
                        { y: 10, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' }
                    );
                }
            });
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const badges = [
        "Property Developers",
        "Real Estate Firms",
        "Architects & Interiors",
        "High-Ticket Home Services"
    ];

    return (
        <>
            <section
                ref={containerRef}
                className="relative w-full min-h-[100dvh] bg-background flex flex-col pt-32"
            >
                {/* Heavy Text Area */}
                <div className="w-full max-w-6xl mx-auto px-8 relative z-10">

                    {/* ICP Qualifier Badges */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        <span className="hero-anim text-[11px] font-semibold uppercase tracking-widest text-textDark/40 flex items-center mr-1">Built for:</span>
                        {badges.map((badge, idx) => (
                            <div key={idx} className="hero-anim flex items-center bg-[#F5F5F7] px-4 py-2 rounded-md border border-gray-100">
                                <div className="w-4 h-4 rounded-md bg-secondary flex items-center justify-center mr-2">
                                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                                <span className="font-sans text-sm font-medium text-secondary/80">{badge}</span>
                            </div>
                        ))}
                    </div>

                    {/* Core Headline */}
                    <div className="mb-10 lg:mb-14">
                        <h1 className="leading-[1.05] tracking-tight relative">
                            <span className="block text-4xl md:text-6xl lg:text-[5.5rem] font-sans font-medium text-secondary hero-anim">
                                High Quality
                            </span>
                            <span className="block text-4xl md:text-6xl lg:text-[5.5rem] mt-2 hero-anim">
                                <span className="font-sans font-medium text-secondary/30 tracking-tight mr-4">Inbound System</span>
                                <span className="font-sans font-medium text-secondary">for</span>
                            </span>
                            <span className="block h-[1.2em] overflow-visible mt-2 hero-anim">
                                <span className="rotating-word inline-block text-4xl md:text-6xl lg:text-[5.5rem] font-sans font-medium text-secondary">
                                    {rotatingWords[wordIndex]}
                                </span>
                            </span>
                        </h1>
                    </div>

                    <p className="hero-anim max-w-2xl text-lg md:text-xl font-sans font-light text-textDark/60 leading-relaxed mb-10 mt-12">
                        We build compounding digital authority and lead systems for architects, developers, and high-ticket service businesses.
                    </p>

                    {/* CTA */}
                    <div className="hero-anim mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="group relative px-8 py-4 bg-secondary text-primary font-sans font-medium rounded-md overflow-hidden transition-colors duration-200 flex-shrink-0"
                        >
                            <span className="relative z-10">Book Free Audit</span>
                            <span className="absolute inset-0 bg-textDark translate-y-full transition-transform duration-200 group-hover:translate-y-0 rounded-md"></span>
                        </button>
                        <a href="#how" className="text-sm font-sans text-textDark/50 hover:text-textDark/80 transition-colors flex items-center gap-2 underline underline-offset-4">
                            See how it works
                        </a>
                    </div>

                </div>

                {/* Hero Image */}
                <div className="w-full h-[60vh] mt-auto relative overflow-hidden hero-anim px-4 md:px-8 pb-8">
                    <div className="w-full h-full rounded-lg overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                            alt="Modern Minimalist Architecture under Blue Sky"
                            className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-[20s] ease-out"
                        />
                    </div>
                </div>
            </section>
            <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source="Hero — Book Free Audit" />
        </>
    );
};

export default Hero;
