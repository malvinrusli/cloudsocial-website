"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Outcomes = () => {
    const containerRef = useRef(null);

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
        <section ref={containerRef} id="cta" className="w-full relative py-24 md:py-32 px-4 md:px-8 mt-12 bg-[#050505]">

            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                    alt="Luxury Real Estate Sunset"
                    className="w-full h-full object-cover object-center translate-y-[-10%]"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-5xl mx-auto flex justify-center">

                {/* Card */}
                <div className="natugreen-cta relative w-full backdrop-blur-sm bg-white/[0.08] border border-white/10 rounded-lg p-10 md:p-20 text-center">

                    {/* Top Badges */}
                    <div className="flex justify-center flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 bg-white flex-shrink-0 px-3 py-1.5 rounded-sm text-[10px] md:text-xs font-sans font-semibold tracking-wide text-black">
                            <div className="bg-black text-white w-3 h-3 rounded-[2px] flex items-center justify-center">
                                <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            No Sales Pitch
                        </div>
                        <div className="flex items-center gap-2 bg-white flex-shrink-0 px-3 py-1.5 rounded-sm text-[10px] md:text-xs font-sans font-semibold tracking-wide text-black">
                            <div className="bg-black text-white w-3 h-3 rounded-[2px] flex items-center justify-center">
                                <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            Clear Roadmap
                        </div>
                    </div>

                    {/* Headline */}
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-white mb-6 leading-[1.15] max-w-4xl mx-auto tracking-tight">
                        See if <span className="font-serif text-white/90">CloudSocial</span> is the right fit for you (it totally is)
                    </h3>

                    {/* Subheadline */}
                    <p className="text-sm md:text-base text-gray-200 font-medium max-w-lg mx-auto mb-10 leading-relaxed font-sans">
                        Schedule a quick, 15 minute guided tour through CloudSocial
                    </p>

                    {/* CTA Button */}
                    <button className="px-8 py-4 bg-white text-black font-sans font-bold text-sm rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2 mx-auto mt-4">
                        Schedule My Tour
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" /></svg>
                    </button>

                </div>
            </div>

        </section>
    );
};

export default Outcomes;
