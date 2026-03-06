"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Protocol = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const phases = [
        {
            step: '01',
            title: 'Short Form Content Engine',
            desc: 'Deploying high-retention, anti-boring video assets. We engineer cinematic property tours, data-driven market breakdowns, and direct-to-camera insights that capture investor attention.',
            type: 'geometric'
        },
        {
            step: '02',
            title: 'Search & AI Domination',
            desc: 'Ranking on Google and becoming the default answer for LLMs. Optimizing high-intent pages and AI citations so ChatGPT and Perplexity recommend your firm first.',
            type: 'laser'
        },
        {
            step: '03',
            title: 'Founder Positioning',
            desc: 'Establishing the principals as the market voice. Distributing structured, high-impact LinkedIn content that builds institution-grade trust and compounding capital inquiries.',
            type: 'waveform'
        }
    ];


    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = cardsRef.current;
            cards.forEach((card, i) => {
                if (i < cards.length - 1) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top+=100",
                        endTrigger: cards[i + 1],
                        end: "top top+=100",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                        animation: gsap.to(card, {
                            scale: 0.95,
                            filter: "blur(2px)",
                            ease: "none"
                        })
                    });
                }
            });

            gsap.to('.geo-rotation', { rotation: 360, repeat: -1, duration: 25, ease: "linear" });
            gsap.fromTo('.laser-scan', { y: 0 }, { y: 200, repeat: -1, yoyo: true, duration: 2.5, ease: "power1.inOut" });
            gsap.to('.waveform-path', { strokeDashoffset: 0, repeat: -1, duration: 4, ease: "linear" });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const renderAnimation = (type) => {
        if (type === 'geometric') {
            return (
                <svg className="w-full h-full opacity-10 geo-rotation" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#111" strokeWidth="1" strokeDasharray="4 8" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="#555" strokeWidth="0.5" />
                    <rect x="50" y="50" w="100" h="100" fill="none" stroke="#111" strokeWidth="0.5" transform="rotate(45 100 100)" />
                </svg>
            );
        }
        if (type === 'laser') {
            return (
                <div className="relative w-full h-full opacity-10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    <div className="laser-scan absolute top-0 left-0 w-full h-px bg-black shadow-[0_0_15px_#000]"></div>
                </div>
            );
        }
        if (type === 'waveform') {
            return (
                <svg className="w-full h-full opacity-20" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                        className="waveform-path"
                        d="M 0 50 Q 50 50 100 50 T 150 10 L 160 90 L 170 10 L 180 90 L 190 50 T 300 50 T 400 50"
                        fill="none"
                        stroke="#111"
                        strokeWidth="3"
                        strokeDasharray="400"
                        strokeDashoffset="400"
                    />
                </svg>
            );
        }
    };

    return (
        <section ref={containerRef} id="how" className="w-full bg-background relative pb-32">
            <div className="w-full max-w-5xl mx-auto pt-32 px-8 overflow-visible">
                <h2 className="text-3xl md:text-5xl font-sans font-medium text-secondary mb-16 text-center tracking-tight">
                    The 6-Month <span className="text-textDark italic font-serif">Authority Roadmap</span>
                </h2>

                <div className="flex flex-col relative w-full pb-[20vh]">
                    {phases.map((phase, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="w-full h-[60vh] min-h-[400px] bg-white border border-gray-200 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row shadow-[0_20px_60px_rgba(0,0,0,0.06)] origin-top mb-12 last:mb-0 relative overflow-hidden"
                            style={{ zIndex: index }}
                        >
                            <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block border-l border-gray-100 bg-[#FAFAFA]">
                                {renderAnimation(phase.type)}
                            </div>

                            <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center pr-8">
                                <div className="font-sans font-semibold text-textDark text-lg mb-6 flex items-center bg-gray-50 border border-gray-200 w-max px-4 py-1.5 rounded-full shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-secondary mr-3 animate-pulse"></span>
                                    Phase {phase.step}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-sans font-medium text-secondary mb-6 relative z-10 tracking-tight">
                                    {phase.title}
                                </h3>
                                <p className="text-lg text-textDark/80 font-medium leading-relaxed relative z-10">
                                    {phase.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Protocol;
