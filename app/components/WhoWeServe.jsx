"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
    { num: '01', label: 'Property Developers', tag: 'High-value development authority' },
    { num: '02', label: 'Real Estate Firms', tag: 'Institutional-grade visibility' },
    { num: '03', label: 'Architects & Interiors', tag: 'Design-led lead generation' },
    { num: '04', label: 'Built Environment Professionals', tag: 'Scaling through trust' },
];

const WhoWeServe = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.wws-row',
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-background py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-12">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-textDark/30 mb-4">Our Clients</p>
                    <h2 className="text-4xl md:text-6xl font-sans font-medium text-secondary tracking-tight leading-[1.05]">
                        Who We<br />
                        <span className="font-serif italic text-textDark">Work With</span>
                    </h2>
                </div>
                <div className="border-t border-gray-200">
                    {clients.map((client) => (
                        <div
                            key={client.num}
                            className="wws-row border-b border-gray-200 flex items-center justify-between py-6 md:py-8 gap-6"
                        >
                            <div className="flex items-center gap-6 md:gap-10">
                                <span className="font-mono text-xs font-semibold tracking-widest text-textDark/20 flex-shrink-0">
                                    {client.num}
                                </span>
                                <h3 className="text-2xl md:text-4xl lg:text-5xl font-sans font-medium text-secondary tracking-tight">
                                    {client.label}
                                </h3>
                            </div>
                            <span className="hidden lg:block text-xs font-semibold uppercase tracking-widest text-textDark/30 flex-shrink-0">
                                {client.tag}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoWeServe;
