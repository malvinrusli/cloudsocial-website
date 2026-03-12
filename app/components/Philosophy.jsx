"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.philosophy-word',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1,
                    stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );

            gsap.fromTo('.parallax-bg',
                { y: '-10%' },
                {
                    y: '10%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-40 overflow-hidden flex items-center justify-center min-h-[80vh] px-8 md:px-16 border-y border-gray-100 bg-background"
        >
            <div className="absolute inset-0 z-0 overflow-hidden mix-blend-overlay opacity-[0.03]">
                <img
                    src="https://images.unsplash.com/photo-1574621100236-d25f63fed559?q=80&w=2070&auto=format&fit=crop"
                    alt="Structural Texture"
                    className="w-full h-[120%] object-cover parallax-bg grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center">
                <p className="text-textDark/80 font-sans tracking-widest text-sm md:text-base mb-10 font-medium bg-white px-6 py-2 rounded border border-gray-100 shadow-sm">
                    <span className="philosophy-word inline-block mr-1">Most</span>
                    <span className="philosophy-word inline-block mr-1">commercial</span>
                    <span className="philosophy-word inline-block mr-1">real</span>
                    <span className="philosophy-word inline-block mr-1">estate</span>
                    <span className="philosophy-word inline-block mr-1">firms</span>
                    <span className="philosophy-word inline-block mr-1">are</span>
                    <span className="philosophy-word inline-block mr-1">invisible</span>
                    <span className="philosophy-word inline-block">where it matters.</span>
                </p>

                <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.1] text-secondary font-serif">
                    <span className="block mb-2 text-gray-400">
                        <span className="philosophy-word inline-block mr-3">Authority</span>
                        <span className="philosophy-word inline-block mr-3">is</span>
                        <span className="philosophy-word inline-block mr-3">not</span>
                        <span className="philosophy-word inline-block mr-3">optional.</span>
                    </span>
                    <span className="block text-secondary tracking-tight">
                        <span className="philosophy-word inline-block mr-3">It</span>
                        <span className="philosophy-word inline-block mr-3">is</span>
                        <span className="philosophy-word inline-block mr-3 italic text-textDark">compounding</span>
                        <span className="philosophy-word inline-block">leverage.</span>
                    </span>
                </h2>
            </div>
        </section>
    );
};

export default Philosophy;
