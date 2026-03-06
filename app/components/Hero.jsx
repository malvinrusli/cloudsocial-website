"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Stagger fade-up animation for text and badges
            gsap.fromTo('.hero-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
            );

            // Floating animation for the scroll circle
            gsap.to('.scroll-circle', {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: 'power1.inOut'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const badges = [
        "Serving CRE Globally",
        "Daily Social Content",
        "12 Monthly Blog"
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[100dvh] bg-background flex flex-col pt-32"
        >
            {/* Heavy Text Area (Top Section) */}
            <div className="w-full max-w-6xl mx-auto px-8 relative z-10">

                {/* Badges Row */}
                <div className="flex flex-wrap gap-3 mb-12">
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
                <h1 className="mb-8 leading-[1.05] tracking-tight relative">
                    <span className="block text-4xl md:text-6xl lg:text-[5rem] font-sans font-medium text-secondary hero-anim">
                        Inbound Marketing For
                    </span>
                    <span className="block text-4xl md:text-6xl lg:text-[5rem] mt-2 hero-anim">
                        <span className="font-serif italic text-textDark tracking-tight mr-4">Commercial</span>
                        <span className="font-sans font-medium text-secondary">Real Estate Companies</span>
                    </span>
                </h1>

                <p className="max-w-2xl text-lg md:text-xl font-sans font-medium text-textDark/80 mb-10 hero-anim">
                    We build digital authority that automatically attracts qualified investors and tenants
                </p>

                <div className="hero-anim mb-16">
                    <button className="group relative px-8 py-4 bg-secondary text-primary font-sans font-medium rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <span className="relative z-10">Book Free Audit</span>
                        <span className="absolute inset-0 bg-textDark translate-y-full transition-transform duration-300 group-hover:translate-y-0 rounded-md"></span>
                    </button>
                </div>
            </div>

            {/* Cinematic Architectural Image Block (Bottom Section) */}
            <div className="w-full h-[60vh] mt-auto relative overflow-hidden hero-anim px-4 md:px-8 pb-8">
                <div className="w-full h-full rounded-2xl md:rounded-[3rem] overflow-hidden relative shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                        alt="Modern Minimalist Architecture under Blue Sky"
                        className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-[20s] ease-out"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
