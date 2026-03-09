"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothAccordionItem = ({ faq }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border border-stone-200 rounded-md overflow-hidden bg-white transition-colors duration-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left cursor-pointer flex items-center justify-between p-5 hover:bg-stone-50 transition-colors focus:outline-none"
            >
                <span className="text-sm font-medium text-stone-800 pr-4 leading-snug">{faq.q}</span>
                <svg
                    className={`w-4 h-4 flex-shrink-0 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div
                className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1 bg-stone-50 text-stone-500 font-light text-sm leading-relaxed border-t border-stone-100">
                        {faq.a}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AlternatingSection = ({ blocks = [] }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.block-anim',
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [blocks]);

    return (
        <div ref={containerRef} className="w-full bg-white pb-24">

            {/* Render blocks sequentially */}
            <div className="flex flex-col gap-24">
                {blocks.map((block, idx) => {

                    if (block.type === 'centered') {
                        return (
                            <div key={idx} className="w-full max-w-4xl mx-auto px-6 text-center block-anim">
                                <h2 className="text-2xl md:text-3xl font-sans font-normal text-stone-800 mb-6 tracking-tight">
                                    {block.title}
                                </h2>
                                {block.text && (
                                    <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-3xl mx-auto">
                                        {block.text}
                                    </p>
                                )}
                            </div>
                        );
                    }

                    if (block.type === 'split') {
                        const imageLeft = block.imagePosition === 'left';
                        const layoutClass = imageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row';

                        return (
                            <div key={idx} className={`w-full max-w-6xl mx-auto px-6 flex flex-col ${layoutClass} items-center gap-16 lg:gap-24 block-anim`}>
                                {/* Text Side */}
                                <div className="flex-1 w-full text-left">
                                    <h3 className="text-2xl md:text-3xl font-sans font-normal text-stone-800 mb-6 tracking-tight">
                                        {block.title}
                                    </h3>
                                    <p className="text-stone-500 leading-relaxed font-light text-lg mb-6">
                                        {block.text}
                                    </p>
                                    {block.list && block.list.length > 0 && (
                                        <ul className="space-y-3 mb-6">
                                            {block.list.map((item, i) => (
                                                <li key={i} className="flex items-start text-stone-500 font-light text-base">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 mr-3 flex-shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Image Mockup Side */}
                                <div className="flex-1 w-full">
                                    <div className={`w-full ${block.aspect || 'aspect-[4/3]'} relative rounded-lg overflow-hidden border border-stone-200 bg-stone-50 group`}>
                                        {/* Browser Top Chrome Mockup */}
                                        <div className="w-full h-8 bg-stone-100 border-b border-stone-200 flex items-center px-4 gap-2 absolute top-0 left-0 z-10 transition-colors duration-200 group-hover:bg-stone-150">
                                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                                        </div>
                                        {block.visualComponent ? (
                                            block.visualComponent
                                        ) : block.imageSrc ? (
                                            <img
                                                src={block.imageSrc}
                                                alt={block.title}
                                                className="w-full h-full object-cover object-center pt-8"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center pt-8">
                                                <svg className="w-12 h-12 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    if (block.type === 'faq') {
                        return (
                            <div key={idx} className="w-full max-w-3xl mx-auto px-6 block-anim">
                                <div className="text-center mb-10">
                                    <h2 className="text-2xl md:text-3xl font-sans font-normal text-stone-800 tracking-tight">
                                        {block.title || 'Frequently Asked Questions'}
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    {(block.faqs || []).map((faq, i) => (
                                        <SmoothAccordionItem key={i} faq={faq} />
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    if (block.type === 'pillar') {
                        return (
                            <div key={idx} className="w-full max-w-6xl mx-auto px-6 block-anim">
                                <div className="text-center mb-10">
                                    <h2 className="text-2xl md:text-3xl font-sans font-normal text-stone-800 tracking-tight">
                                        {block.title || 'Connected Services'}
                                    </h2>
                                    {block.text && (
                                        <p className="text-stone-500 font-light mt-4 max-w-2xl mx-auto text-base leading-relaxed">{block.text}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {(block.links || []).map((link, i) => (
                                        <a key={i} href={link.path} className="group p-6 bg-white border border-stone-200 rounded-lg hover:border-stone-400 transition-colors duration-200 flex flex-col">
                                            <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">{link.label}</span>
                                            <h3 className="text-base font-medium text-stone-800 mb-2 group-hover:text-secondary transition-colors leading-snug">{link.name}</h3>
                                            <p className="text-sm text-stone-500 font-light flex-1 leading-relaxed">{link.desc}</p>
                                            <span className="mt-5 text-xs font-semibold text-stone-400 group-hover:text-secondary transition-colors flex items-center gap-1">
                                                Explore
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    if (block.type === 'cta') {
                        return (
                            <div key={idx} className="w-full bg-stone-50 py-24 px-6 border-t border-stone-200 block-anim mt-12 mb-0">
                                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                                    <h2 className="text-3xl md:text-5xl font-normal text-stone-800 mb-6 leading-tight max-w-2xl mx-auto">
                                        {block.title}
                                    </h2>
                                    {block.text && (
                                        <p className="text-stone-500 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
                                            {block.text}
                                        </p>
                                    )}
                                    <button className="relative overflow-hidden px-10 py-4 rounded-md font-medium tracking-wide bg-secondary text-primary transition-colors duration-200 group">
                                        <span className="relative z-10">{block.buttonText || 'Book Free Audit'}</span>
                                        <span className="absolute inset-0 bg-stone-800 translate-y-full transition-transform duration-200 group-hover:translate-y-0 text-white z-0 rounded-md"></span>
                                    </button>
                                </div>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
};

export default AlternatingSection;
