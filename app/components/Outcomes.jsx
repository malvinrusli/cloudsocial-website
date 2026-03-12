"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactModal from './ContactModal';

gsap.registerPlugin(ScrollTrigger);

const auditPoints = [
    "We map your digital authority gaps vs competitors",
    "Show you exactly where your high-value clients are searching — and who's winning",
    "Deliver a 90-day authority roadmap, no obligation",
];

const Outcomes = () => {
    const containerRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.natugreen-cta',
                { scale: 0.95, opacity: 0, y: 30 },
                {
                    scale: 1, opacity: 1, y: 0, duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <section ref={containerRef} id="cta" className="w-full relative py-24 md:py-32 px-4 md:px-8 mt-0 bg-[#050505]">

                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        alt="Modern Authority Infrastructure"
                        className="w-full h-full object-cover object-center translate-y-[-10%]"
                    />
                </div>

                {/* Content */}
                <div className="relative z-20 max-w-5xl mx-auto flex justify-center">
                    <div className="natugreen-cta relative w-full backdrop-blur-sm bg-white/[0.08] border border-white/10 rounded-lg p-10 md:p-20 text-center">

                        {/* Top Badges */}
                        <div className="flex justify-center flex-wrap gap-4 mb-8">
                            {['No Sales Pitch', 'No Commitment', 'Clear Roadmap'].map((label) => (
                                <div key={label} className="flex items-center gap-2 bg-white flex-shrink-0 px-3 py-1.5 rounded-sm text-[10px] md:text-xs font-sans font-semibold tracking-wide text-black">
                                    <div className="bg-black text-white w-3 h-3 rounded-[2px] flex items-center justify-center">
                                        <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    {label}
                                </div>
                            ))}
                        </div>

                        {/* Headline */}
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-white mb-6 leading-[1.15] max-w-3xl mx-auto tracking-tight">
                            Start with a free{' '}
                            <span className="font-sans italic text-white/90">30-minute</span>
                            {' '}Authority Audit
                        </h3>

                        {/* Subheadline */}
                        <p className="text-sm md:text-base text-gray-300 font-light max-w-lg mx-auto mb-8 leading-relaxed">
                            In 30 minutes, we'll show you exactly where your firm is invisible and what it would take to fix it.
                        </p>

                        {/* Audit Points */}
                        <ul className="flex flex-col items-start max-w-sm mx-auto gap-3 mb-10 text-left">
                            {auditPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                                    <div className="w-4 h-4 rounded-sm bg-white/10 border border-white/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    {point}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                            onClick={() => setModalOpen(true)}
                            className="px-10 py-4 bg-white text-black font-sans font-bold text-sm rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 mx-auto"
                        >
                            Book My Free Audit
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" />
                            </svg>
                        </button>

                    </div>
                </div>

            </section>
            <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source="Outcomes CTA — Free Audit" />
        </>
    );
};

export default Outcomes;
