"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PageHero = ({
    title1,
    highlight,
    title2,
    subtitle,
    badges = [],
    buttonText = "Book Free Audit",
    imageSrc = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.page-hero-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[70dvh] bg-white flex flex-col pt-32 pb-16"
        >
            <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex-1 flex flex-col lg:flex-row items-center gap-16">

                {/* Left Text Side */}
                <div className="flex-1 w-full text-left pt-12 lg:pt-0">
                    {badges && badges.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {badges.map((badge, idx) => (
                                <div key={idx} className="page-hero-anim inline-flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded text-xs font-semibold tracking-widest uppercase text-stone-600 border border-stone-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-stone-800"></span>
                                    {badge}
                                </div>
                            ))}
                        </div>
                    )}

                    <h1 className="mb-6 leading-[1.1] tracking-tight relative max-w-2xl text-4xl md:text-5xl lg:text-[4rem] text-secondary">
                        {title1 && (
                            <span className="block font-sans font-normal page-hero-anim">
                                {title1}
                            </span>
                        )}
                        <span className="block mt-1 page-hero-anim font-normal">
                            {highlight && (
                                <span className="font-serif italic text-stone-600 tracking-tight mr-3">
                                    {highlight}
                                </span>
                            )}
                            {title2 && (
                                <span className="font-sans font-normal text-secondary">
                                    {title2}
                                </span>
                            )}
                        </span>
                    </h1>

                    {subtitle && (
                        <p className="max-w-xl text-lg font-sans font-light text-stone-500 mb-10 page-hero-anim leading-relaxed">
                            {subtitle}
                        </p>
                    )}

                    <div className="page-hero-anim mb-8 lg:mb-0">
                        <button className="group relative px-8 py-4 bg-secondary text-primary font-sans font-medium rounded-md overflow-hidden transition-all duration-300 shadow-md">
                            <span className="relative z-10">{buttonText}</span>
                            <span className="absolute inset-0 bg-stone-800 translate-y-full transition-transform duration-300 group-hover:translate-y-0 rounded-md"></span>
                        </button>
                    </div>
                </div>

                {/* Right Image Side */}
                <div className="flex-1 w-full relative page-hero-anim">
                    <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
                        {/* Browser Top Chrome Mockup */}
                        <div className="w-full h-8 bg-stone-100 border-b border-stone-200 flex items-center px-4 gap-2 absolute top-0 left-0 z-10">
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                        </div>
                        <img
                            src={imageSrc}
                            alt="Hero Visual"
                            className="w-full h-full object-cover object-center pt-8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageHero;
