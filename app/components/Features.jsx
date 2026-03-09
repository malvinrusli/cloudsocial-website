"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.natugreen-card',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 75%',
                    }
                }
            );

            gsap.fromTo('.natugreen-header',
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Mockup Components for the Cards
    const BrowserMockup = () => (
        <div className="w-full h-48 bg-[#1A1A1A] p-4 flex flex-col border-b border-white/5 relative overflow-hidden">
            <div className="flex bg-[#232323] p-2 rounded-md items-center mb-4">
                <div className="flex gap-1.5 mr-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="flex-1 bg-[#1A1A1A] rounded-md h-6 flex items-center justify-center text-[10px] text-white/50">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                    google.com/search
                </div>
            </div>
            <div className="flex-1 bg-gradient-to-b from-[#232323] to-transparent opacity-50 relative mt-2">
                <div className="absolute top-4 left-4 w-1/2 h-2 bg-white/10 rounded-full"></div>
                <div className="absolute top-8 left-4 w-3/4 h-2 bg-white/5 rounded-full"></div>
                <div className="absolute top-12 left-4 w-2/3 h-2 bg-white/5 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/5 rounded-md"></div>
            </div>
        </div>
    );

    const ComparisonMockup = () => (
        <div className="w-full h-48 bg-[#0A0A0A] border-b border-white/5 flex overflow-hidden">
            {/* Typical side */}
            <div className="flex-1 flex flex-col border-r border-white/10">
                <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60"></div>
                    <span className="text-[9px] font-semibold text-white/30 uppercase tracking-wide">Typical CRE</span>
                </div>
                <div className="flex-1 bg-[#111] mx-3 mb-2 flex items-center justify-center relative">
                    <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white/15 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                    <div className="absolute bottom-1.5 left-2 right-2 h-1 bg-white/5 rounded-full"></div>
                </div>
                <div className="px-3 pb-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] text-white/25">Views</span>
                        <span className="text-[9px] font-semibold text-white/30">320</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] text-white/25">Watch time</span>
                        <span className="text-[9px] font-semibold text-red-400/70">8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] text-white/25">Inquiries</span>
                        <span className="text-[9px] font-semibold text-white/30">0</span>
                    </div>
                </div>
            </div>
            {/* Ours side */}
            <div className="flex-1 flex flex-col">
                <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[9px] font-semibold text-white/60 uppercase tracking-wide">CloudSocial</span>
                </div>
                <div className="flex-1 mx-3 mb-2 relative overflow-hidden rounded-sm">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-50"
                        alt=""
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                    </div>
                    <div className="absolute bottom-1.5 left-2 right-2 flex gap-1">
                        <div className="h-1 w-2/3 bg-white/50 rounded-full"></div>
                        <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                    </div>
                </div>
                <div className="px-3 pb-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] text-white/50">Views</span>
                        <span className="text-[9px] font-semibold text-white">84K</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] text-white/50">Watch time</span>
                        <span className="text-[9px] font-semibold text-emerald-400">62%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] text-white/50">Inquiries</span>
                        <span className="text-[9px] font-semibold text-emerald-400">+12 this month</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const EditorMockup = () => (
        <div className="w-full h-48 bg-[#1A1A1A] p-4 flex flex-col border-b border-white/5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 opacity-70">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span className="text-[10px] text-white/70 font-mono">Short form video</span>
            </div>
            <div className="bg-[#232323] p-3 rounded-md flex-1 font-sans text-[10px] text-white/60 leading-relaxed border border-white/5 flex flex-col justify-end">
                <div className="w-full h-1 bg-white/10 rounded-full mb-2">
                    <div className="w-1/3 h-full bg-white rounded-full"></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-4 h-4 bg-white/10 rounded-full"></div>
                    <div className="w-4 h-4 bg-white/10 rounded-full"></div>
                </div>
            </div>
        </div>
    );

    const OrbitMockup = () => (
        <div className="w-full h-48 bg-[#1A1A1A] flex items-center justify-center border-b border-white/5 relative overflow-hidden">
            <div className="absolute w-40 h-40 border border-white/5 rounded-full"></div>
            <div className="absolute w-28 h-28 border border-white/10 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
            <div className="w-10 h-10 bg-[#0077b5] rounded-full flex items-center justify-center z-10">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </div>
            <div className="absolute w-6 h-6 bg-[#232323] border border-white/10 rounded-full p-1 top-6 right-12 flex items-center justify-center">
                <div className="w-3 h-3 bg-white/20 rounded-full"></div>
            </div>
            <div className="absolute w-8 h-8 bg-[#232323] border border-white/10 rounded-full p-1 bottom-8 left-10 flex items-center justify-center">
                <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            </div>
        </div>
    );

    const CodeMockup = () => (
        <div className="w-full h-48 bg-[#1A1A1A] p-4 flex flex-col border-b border-white/5 relative overflow-hidden font-mono text-[8px] text-white/40 leading-relaxed">
            <div><span className="text-[#FF5F56]">import</span> React <span className="text-[#FF5F56]">from</span> 'react';</div>
            <div><span className="text-[#FF5F56]">import</span> &#123; Architecture &#125; <span className="text-[#FF5F56]">from</span> './core';</div>
            <div className="mt-2"><span className="text-[#FFBD2E]">const</span> Platform = () =&gt; &#123;</div>
            <div className="ml-4"><span className="text-[#FF5F56]">return</span> (</div>
            <div className="ml-8">&lt;<span className="text-[#27C93F]">Architecture</span></div>
            <div className="ml-12 text-[#FFBD2E]">optimized=&#123;true&#125;</div>
            <div className="ml-12 text-[#FFBD2E]">conversionRate="max"</div>
            <div className="ml-8">/&gt;</div>
            <div className="ml-4">);</div>
            <div>&#125;;</div>
        </div>
    );

    const ChatMockup = () => (
        <div className="w-full h-48 bg-[#1A1A1A] p-4 flex flex-col border-b border-white/5 relative overflow-hidden justify-end">
            <div className="w-full flex justify-end mb-2">
                <div className="bg-[#25D366] text-black text-[9px] py-1.5 px-3 rounded-l-xl rounded-tr-xl">
                    Can I schedule a tour for the 50k sqft property?
                </div>
            </div>
            <div className="w-full flex justify-start">
                <div className="bg-[#232323] text-white/80 text-[9px] py-1.5 px-3 rounded-r-xl rounded-tl-xl border border-white/5">
                    Yes, I can arrange that. What day works best?
                </div>
            </div>
        </div>
    );

    return (
        <section id="services" className="w-full py-24 md:py-32 px-8 bg-background relative z-10" ref={containerRef}>
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="mb-20 text-center max-w-3xl mx-auto natugreen-header flex flex-col items-center">
                    <div className="flex items-center gap-2 bg-secondary text-primary px-4 py-1.5 rounded mb-6 text-xs font-semibold tracking-wide">
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                        Our Full Framework to build Authority in your area
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-secondary mb-6 tracking-tight leading-[1.1]">
                        The Digital Authority Ecosystem
                    </h2>

                    <p className="text-sm md:text-base text-textDark font-medium max-w-md mx-auto mb-10 leading-relaxed">
                        We deploy 5 core pillars of digital authority to dramatically scale your commercial real estate firm.
                    </p>
                </div>

                {/* Grid - 5 Cards (Top 3, Bottom 2 centered) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">

                    {/* Card 1: SEO & AEO */}
                    <div className="natugreen-card bg-[#111111] border border-[#222222] rounded-lg flex flex-col hover:border-white/20 transition-colors duration-300 overflow-hidden group">
                        <BrowserMockup />
                        <div className="p-8 flex flex-col flex-1">
                            <h3 className="text-xl font-sans font-regular text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors">SEO, AEO & GEO</h3>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-8 flex-1 pr-4">
                                Up to 12 Monthly Blogs designed to rank on Google and become the default referenced authority across all major Large Language Models.
                            </p>
                            <div className="flex flex-col gap-2">
                                <a href="/seo-real-estate" className="w-full py-3 bg-white text-black font-sans font-semibold text-xs text-center rounded hover:bg-gray-200 transition-colors flex justify-center items-center gap-1">
                                    Explore Traditional SEO <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" /></svg>
                                </a>
                                <a href="/aeo-geo-llms-real-estate" className="w-full py-3 bg-[#222222] border border-white/10 text-white font-sans font-semibold text-xs text-center rounded hover:bg-[#333333] transition-colors flex justify-center items-center gap-1">
                                    Explore AEO & GEO <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Short Form Content */}
                    <div className="natugreen-card bg-[#111111] border border-[#222222] rounded-lg flex flex-col hover:border-white/20 transition-colors duration-300 overflow-hidden group">
                        <ComparisonMockup />
                        <div className="p-8 flex flex-col flex-1">
                            <h3 className="text-xl font-sans font-regular text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors">Short Form Content</h3>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-8 flex-1 pr-4">
                                High-retention cinematic video content engineered to capture attention and build authority.
                            </p>
                            <a href="/content-real-estate" className="w-full py-4 bg-white text-black font-sans font-semibold text-xs text-center rounded hover:bg-gray-200 transition-colors flex justify-center items-center gap-1">
                                Explore Content <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Card 3: LinkedIn Growth */}
                    <div className="natugreen-card bg-[#111111] border border-[#222222] rounded-lg flex flex-col hover:border-white/20 transition-colors duration-300 overflow-hidden group">
                        <OrbitMockup />
                        <div className="p-8 flex flex-col flex-1">
                            <h3 className="text-xl font-sans font-regular text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors">LinkedIn Growth</h3>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-8 flex-1 pr-4">
                                High-impact positioning to establish you as the voice of authority among institutional investors.
                            </p>
                            <a href="/linkedin-real-estate" className="w-full py-4 bg-white text-black font-sans font-semibold text-xs text-center rounded hover:bg-gray-200 transition-colors flex justify-center items-center gap-1">
                                Explore Growth <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" /></svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Add-ons Header */}
                <div className="mt-16 mb-12 text-center max-w-2xl mx-auto natugreen-header flex flex-col items-center">
                    <div className="flex items-center gap-2 bg-gray-100 text-gray-500 px-3 py-1 rounded mb-3 text-[10px] font-semibold tracking-wide uppercase">
                        Free Included in Our Bundle
                    </div>
                    <h3 className="text-2xl md:text-3xl font-sans font-medium text-secondary tracking-tight">
                        Ecosystem Add-ons
                    </h3>
                </div>

                {/* Bottom 2 Cards (Centered Add-ons) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 lg:max-w-4xl lg:mx-auto">

                    {/* Card 4: Website */}
                    <div className="natugreen-card bg-[#111111] border border-[#222222] rounded-lg flex flex-col hover:border-white/20 transition-colors duration-300 overflow-hidden group">
                        <CodeMockup />
                        <div className="p-8 flex flex-col flex-1">
                            <h3 className="text-xl font-sans font-regular text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors">Professional Website</h3>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-8 flex-1 pr-4">
                                Transform underperforming sites into authoritative digital infrastructure engineered purely for conversion.
                            </p>
                            <a href="/services" className="w-full py-4 bg-white text-black font-sans font-semibold text-xs text-center rounded hover:bg-gray-200 transition-colors flex justify-center items-center gap-1">
                                Explore Tech <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Card 5: AI Agents */}
                    <div className="natugreen-card bg-[#111111] border border-[#222222] rounded-lg flex flex-col hover:border-white/20 transition-colors duration-300 overflow-hidden group">
                        <ChatMockup />
                        <div className="p-8 flex flex-col flex-1">
                            <h3 className="text-xl font-sans font-regular text-white mb-3 tracking-tight group-hover:text-gray-200 transition-colors flex items-center justify-between">
                                <span>AI Agent</span>
                                <div className="flex gap-2">
                                    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                            </h3>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-8 flex-1 pr-4">
                                AI Agent that responses to your leads in under 5 minutes. Qualify leads instantly 24/7 across WhatsApp and Email.
                            </p>
                            <a href="/ai-agent-real-estate" className="w-full py-4 bg-white text-black font-sans font-semibold text-xs text-center rounded hover:bg-gray-200 transition-colors flex justify-center items-center gap-1">
                                Explore AI Agents <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" /></svg>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Features;
