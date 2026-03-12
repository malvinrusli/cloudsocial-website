"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/app/lib/dictionaries';

gsap.registerPlugin(ScrollTrigger);

const Protocol = ({ lang: propLang }) => {
    const params = useParams();
    const lang = propLang || params?.lang || 'en';
    const dict = getDictionary(lang);
    const containerRef = useRef(null);
    const steps = dict.protocol.steps;

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
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-textDark/30 mb-4">{dict.protocol.badge}</p>
                        <h2 className="text-4xl md:text-6xl font-sans font-medium text-secondary tracking-tight leading-[1.05]">
                            {dict.protocol.title_line1}<br />
                            <span className="font-sans italic text-textDark">{dict.protocol.title_line2}</span>
                        </h2>
                    </div>
                    <p className="text-base text-textDark/50 font-light max-w-sm leading-relaxed md:text-right">
                        {dict.protocol.description}
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
