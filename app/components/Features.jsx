"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WISTIA_VIDEO_IDS = ['uix5xvrenc', '00dzekol35', '4sayn9fmcp', 'xw9cpkxhcc'];

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: 'content', num: '/001', label: 'Content Architecture',
        title: 'Move beyond "Top-of-Funnel" noise',
        desc: 'Generic content is dead in 2026. We build a high-performance content architecture — TOFU insights, MOFU education, and BOFU deal breakdowns — designed to turn silent observers into active inquiries.',
        points: ['Case Study & Deal Breakdown focus', 'Strategic sequencing from interest to inquiry', 'Distribution engine across SEO, Social & AI'],
        link: '/industries/commercial-real-estate',
        linkLabel: 'Explore Authority Hub',
    },
    {
        id: 'seo', num: '/002', label: 'SEO & Search',
        category: 'Organic Dominance',
        title: '#1 rankings for the high-intent keywords',
        desc: 'We position your brand as the default choice in your market, capturing the traffic that belongs to you before it reaches the aggregators.',
        points: ['High-intent buyer & seller keyword mapping', 'E-E-A-T technical authority building', 'Direct deal attribution tracking'],
        link: '/industries/seo-for-high-ticket',
        linkLabel: 'Explore Search Systems',
    },
    {
        id: 'aeo', num: '/003', label: 'AEO & AI Citations',
        title: 'Be the answer in ChatGPT & Perplexity',
        desc: 'When clients ask AI "who are the best property developers or architects in [city]?" — your firm should be the answer. We engineer that outcome.',
        points: ['Generative Engine Optimization (GEO)', 'Entity-based authority building', 'Platform-wide citation audits'],
        link: '/industries/ai-citations',
        linkLabel: 'Explore AEO Systems',
    },
    {
        id: 'website', num: '/004', label: 'Web Architecture',
        category: 'Digital Moats',
        title: 'Websites that close, not explain',
        desc: 'We rebuild your digital home from a brochure into a conversion engine that qualifies visitors and builds authority before the first call.',
        points: ['Lighthouse performance optimized', 'Authority-led case study layouts', 'CRM & Automation integration'],
        link: '/web-architecture-real-estate',
        linkLabel: 'Explore Web Architecture',
    },
    {
        id: 'agent', num: '/005', label: 'Lead Automations',
        category: 'Growth Automation',
        title: 'Scale your follow-up to infinity',
        desc: 'Custom-trained AI workflows that scrape high-intent leads, personalize outreach, and qualify inquiries 24/7. Never leave a lead behind.',
        points: ['Automated Lead Scraping (High Intent)', 'Qualifies intent across WhatsApp & Email', 'Direct CRM & Calendar integration'],
        link: '/ai-agent-real-estate',
        linkLabel: 'Explore Lead Automations',
    },
];

// ─── Real Video Panel ─────────────────────────────────────────────────────────

const VideoItem = ({ url }) => {
    const ref = useRef(null);
    return (
        <div
            className="flex-shrink-0 h-full cursor-pointer"
            style={{ aspectRatio: '9/16' }}
            onMouseEnter={() => ref.current?.play()}
            onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
        >
            <div className="relative h-full rounded-lg overflow-hidden bg-[#1A1A1A]">
                <video ref={ref} src={url} muted loop playsInline preload="metadata" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

const VideoPanel = ({ videos }) => {
    if (!videos) return (
        <div className="w-full h-full bg-[#080808] flex items-center justify-center">
            <span className="text-[10px] text-white/20 font-mono">Loading...</span>
        </div>
    );
    return (
        <div className="w-full h-full bg-[#080808] flex flex-col p-5 gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <span className="text-[9px] font-semibold text-white/40 uppercase tracking-widest">Real examples — hover to play</span>
            </div>
            <div className="flex gap-3 overflow-x-auto flex-1 min-h-0" style={{ scrollbarWidth: 'none' }}>
                {videos.filter(v => v.url).map((v) => (
                    <VideoItem key={v._id} url={v.url} />
                ))}
            </div>
        </div>
    );
};

// ─── Wistia Video Panel ───────────────────────────────────────────────────────

const WistiaVideoPanel = () => {
    const scrollRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const addScript = (src, type) => {
            if (document.querySelector(`script[src="${src}"]`)) return;
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            if (type) s.type = type;
            document.head.appendChild(s);
        };
        addScript('https://fast.wistia.com/player.js');
        WISTIA_VIDEO_IDS.forEach(id => addScript(`https://fast.wistia.com/embed/${id}.js`, 'module'));
    }, []);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    return (
        <div className="w-full h-full bg-[#080808] flex flex-col p-5 gap-3">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <span className="text-[9px] font-semibold text-white/40 uppercase tracking-widest">Real examples — tap to play</span>
            </div>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-3 overflow-x-auto flex-1 min-h-0"
                style={{ scrollbarWidth: 'none' }}
            >
                {WISTIA_VIDEO_IDS.map(id => (
                    <div key={id} className="flex-shrink-0 h-full" style={{ aspectRatio: '9/16' }}>
                        <div className="relative h-full rounded-lg overflow-hidden bg-[#1A1A1A]">
                            {/* eslint-disable-next-line */}
                            <wistia-player media-id={id} aspect="0.5625" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                ))}
            </div>
            {/* Scroll progress bar */}
            <div className="h-px bg-white/10 relative flex-shrink-0 mx-1">
                <div
                    className="absolute top-0 left-0 h-full bg-white/50"
                    style={{ width: `${progress * 100}%`, transition: 'none' }}
                />
            </div>
        </div>
    );
};

// ─── Mockups ──────────────────────────────────────────────────────────────────

const VideoCompareMockup = () => (
    <div className="w-full h-full flex bg-[#080808]">
        <div className="flex-1 flex flex-col border-r border-white/10 p-5 gap-3">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                <span className="text-[9px] font-semibold text-white/25 uppercase tracking-widest">Typical CRE</span>
            </div>
            <div className="flex-1 bg-[#0D0D0D] relative flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover opacity-15"
                    alt=""
                />
                <div className="relative z-10 w-12 h-12 border border-white/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white/15 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                    <div className="h-px bg-white/10 w-full relative">
                        <div className="absolute top-0 left-0 h-full bg-white/20 w-[15%]"></div>
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-[7px] text-white/20 font-mono">0:12</span>
                        <span className="text-[7px] text-white/20 font-mono">1:54</span>
                    </div>
                </div>
            </div>
            <div className="space-y-1.5 pt-1 border-t border-white/5">
                {[['Views', '320', ''], ['Watch time', '8%', 'red'], ['Inquiries', '0', '']].map(([k, v, accent]) => (
                    <div key={k} className="flex justify-between">
                        <span className="text-[9px] text-white/20">{k}</span>
                        <span className={`text-[9px] font-mono font-semibold ${accent === 'red' ? 'text-red-400/60' : 'text-white/25'}`}>{v}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex-1 flex flex-col p-5 gap-3">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <span className="text-[9px] font-semibold text-white/60 uppercase tracking-widest text-[#00FF00]">Promperty 2026</span>
                <span className="ml-auto text-[7px] border border-emerald-500/20 text-emerald-400/50 px-1.5 py-0.5">WISTIA</span>
            </div>
            {/* Replace this block with your Wistia embed when video is ready:
                <div className="wistia_responsive_padding" style={{padding:'56.25% 0 0 0',position:'relative'}}>
                  <div className="wistia_responsive_wrapper" style={{height:'100%',left:0,position:'absolute',top:0,width:'100%'}}>
                    <div className="wistia_embed wistia_async_YOUR_VIDEO_ID" style={{height:'100%',position:'relative',width:'100%'}}></div>
                  </div>
                </div>
            */}
            <div className="flex-1 bg-[#0D0D0D] relative flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    alt=""
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 w-12 h-12 bg-white/15 border border-white/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                    <div className="h-px bg-white/20 w-full relative">
                        <div className="absolute top-0 left-0 h-full bg-white/80 w-[62%]"></div>
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-[7px] text-white/40 font-mono">1:04</span>
                        <span className="text-[7px] text-white/40 font-mono">1:44</span>
                    </div>
                </div>
            </div>
            <div className="space-y-1.5 pt-1 border-t border-white/5">
                {[['Views', '84.3K', ''], ['Watch time', '62%', 'emerald'], ['Inquiries', '+12 / mo', 'emerald']].map(([k, v, accent]) => (
                    <div key={k} className="flex justify-between">
                        <span className="text-[9px] text-white/40">{k}</span>
                        <span className={`text-[9px] font-mono font-semibold ${accent === 'emerald' ? 'text-emerald-400' : 'text-white'}`}>{v}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const SERPMockup = () => (
    <div className="w-full h-full bg-[#080808] p-6 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center gap-3 border border-white/10 bg-[#111] px-4 py-2.5 max-w-sm">
            <svg className="w-3.5 h-3.5 text-white/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" /></svg>
            <span className="text-[11px] text-white/40 font-mono">commercial real estate broker dubai</span>
        </div>
        <div className="space-y-2 flex-1">
            <div className="border border-emerald-500/25 bg-emerald-500/5 p-3 pl-5 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/40"></div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[7px] text-emerald-400 font-semibold border border-emerald-400/30 px-1 py-px">#1</span>
                    <span className="text-[8px] text-emerald-600/60 font-mono">yourclient.com › commercial-real-estate-dubai</span>
                </div>
                <div className="text-[11px] text-blue-300 mb-1 font-medium">Commercial Real Estate Dubai | #1 Broker for Institutional Deals</div>
                <div className="text-[9px] text-white/35 leading-relaxed">Trusted by 40+ institutional clients. Specialising in office, industrial and mixed-use commercial real estate across Dubai.</div>
            </div>
            {['Savills Dubai — Commercial Property & Office Space', 'CBRE UAE | Commercial Real Estate Advisory Services', 'JLL Dubai — Commercial Property & Investment'].map((title, i) => (
                <div key={i} className="p-3 pl-5 opacity-25 border border-white/5">
                    <div className="text-[8px] text-green-600/50 font-mono mb-0.5">{['savills.ae', 'cbre.ae', 'jll.ae'][i]} › commercial</div>
                    <div className="text-[11px] text-blue-300/60 mb-1">{title}</div>
                    <div className="text-[9px] text-white/30">Commercial real estate services across the UAE. Office, retail, industrial and investment advisory...</div>
                </div>
            ))}
        </div>
        <div className="pt-3 border-t border-white/5 flex gap-6">
            {[['340%', 'Organic traffic increase'], ['#1', 'Position for 12 keywords'], ['4.2mo', 'Avg. time to rank']].map(([v, l]) => (
                <div key={l}>
                    <div className="text-xs text-emerald-400 font-mono font-semibold">{v}</div>
                    <div className="text-[8px] text-white/25">{l}</div>
                </div>
            ))}
        </div>
    </div>
);

const AICitationMockup = () => (
    <div className="w-full h-full bg-[#080808] p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <div className="w-5 h-5 bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-3 h-3 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4l3 3" /></svg>
            </div>
            <span className="text-[9px] text-white/30 font-mono">Perplexity AI · Real-time web</span>
            <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[8px] text-emerald-400/60">cited</span>
            </div>
        </div>
        <div className="flex justify-end">
            <div className="bg-[#1A1A1A] border border-white/10 px-3 py-2.5 max-w-[75%]">
                <p className="text-[10px] text-white/60 leading-relaxed">"Who are the top commercial real estate brokers in Dubai for large office leasing?"</p>
            </div>
        </div>
        <div className="flex-1 text-[10px] text-white/40 leading-relaxed space-y-2.5">
            <p>Based on transaction volume and market presence, the leading commercial real estate brokers in Dubai for office leasing include:</p>
            <p>
                <span className="inline bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-1.5 py-px font-semibold">
                    [Your Firm Name]
                </span>
                {' '}is consistently recognised as a primary authority for institutional office transactions, with a strong track record in DIFC, Business Bay, and emerging industrial corridors. Their published market research is frequently cited by institutional investors.
            </p>
            <p className="text-white/20">Savills and CBRE also maintain significant presence, particularly for multinational occupier requirements and investment-grade acquisitions...</p>
        </div>
        <div className="pt-3 border-t border-white/5">
            <div className="flex gap-1 mb-2 flex-wrap">
                {['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Copilot'].map((ai, i) => (
                    <span key={ai} className={`text-[7px] px-1.5 py-0.5 border ${i < 3 ? 'border-emerald-500/20 text-emerald-400/60 bg-emerald-500/5' : 'border-white/5 text-white/15'}`}>{ai}</span>
                ))}
            </div>
            <span className="text-[8px] text-white/20">Cited in 3 of 5 monitored platforms · Updated this month</span>
        </div>
    </div>
);



const WebsiteMockup = () => (
    <div className="w-full h-full flex bg-[#080808]">
        <div className="flex-1 border-r border-white/10 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                <span className="text-[8px] text-white/20 uppercase tracking-widest">Before</span>
            </div>
            <div className="flex-1 p-3 flex flex-col gap-2 opacity-35">
                <div className="h-5 bg-[#1A1A1A] flex items-center px-2 gap-2">
                    <div className="w-8 h-1.5 bg-white/20 rounded-sm"></div>
                    <div className="flex gap-1.5 ml-auto">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-5 h-1 bg-white/10 rounded-sm"></div>)}
                    </div>
                </div>
                <div className="h-20 bg-[#111] flex flex-col items-center justify-center gap-1.5">
                    <div className="w-24 h-2 bg-white/10 rounded-sm"></div>
                    <div className="w-36 h-1.5 bg-white/5 rounded-sm"></div>
                    <div className="w-16 h-4 bg-white/10 mt-1 rounded-sm"></div>
                </div>
                <div className="grid grid-cols-3 gap-1 flex-1">
                    {[1, 2, 3].map(i => <div key={i} className="bg-[#111] min-h-[24px]"></div>)}
                </div>
                <div className="text-[7px] text-red-400/50 font-mono">Perf: 34 · SEO: 51 · Mobile: 62</div>
            </div>
        </div>
        <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <span className="text-[8px] text-white/50 uppercase tracking-widest">After</span>
            </div>
            <div className="flex-1 p-3 flex flex-col gap-2">
                <div className="h-5 bg-[#1A1A1A] border border-white/5 flex items-center px-2 gap-2">
                    <div className="w-10 h-1.5 bg-white/40 rounded-sm"></div>
                    <div className="flex gap-1.5 ml-auto">
                        {[1, 2, 3].map(i => <div key={i} className="w-5 h-1 bg-white/20 rounded-sm"></div>)}
                        <div className="w-10 h-3 bg-white flex items-center justify-center rounded-sm">
                            <div className="w-6 h-0.5 bg-black/70 rounded-sm"></div>
                        </div>
                    </div>
                </div>
                <div className="h-20 bg-[#0D0D0D] border border-white/5 relative overflow-hidden flex flex-col items-center justify-center gap-1">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
                    <div className="relative text-[9px] text-white font-medium">Commercial Real Estate Dubai</div>
                    <div className="relative text-[7px] text-white/40">Authority. Performance. Results.</div>
                    <div className="relative mt-1 px-3 py-1 bg-white text-black text-[7px] font-semibold">Book Consultation</div>
                </div>
                <div className="grid grid-cols-3 gap-1 flex-1">
                    {[['Portfolio', '40+', 'Transactions'], ['Case Studies', '12', 'Published'], ['Insights', '200+', 'Articles']].map(([title, val, label], i) => (
                        <div key={i} className="bg-[#111] border border-white/5 min-h-[24px] flex flex-col items-center justify-center gap-0.5 p-2">
                            <div className="text-[6px] text-white/30 uppercase tracking-widest mb-0.5">{title}</div>
                            <div className="text-[11px] text-white font-mono font-semibold">{val}</div>
                            <div className="text-[6px] text-white/20">{label}</div>
                        </div>
                    ))}
                </div>
                <div className="text-[7px] text-emerald-400 font-mono">Perf: 97 · SEO: 98 · Mobile: 100</div>
            </div>
        </div>
    </div>
);

const AIAgentMockup = () => (
    <div className="w-full h-full bg-[#080808] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 bg-[#0A0A0A] shrink-0">
            <div className="w-9 h-9 bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white font-medium">Promperty AI</div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[9px] text-emerald-400/70">Online · responds instantly</span>
                </div>
            </div>
            <span className="text-[7px] text-white/20 font-mono border border-white/10 px-1.5 py-0.5 shrink-0">WhatsApp</span>
        </div>

        {/* Chat messages */}
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden justify-end">
            {/* Inbound */}
            <div className="flex justify-end">
                <div className="bg-[#1A2A1A] border border-green-500/10 px-3 py-2 max-w-[72%]">
                    <p className="text-[10px] text-white/60 leading-relaxed">Hi, I'm looking at the DIFC Tower listing. We need ~2,000 sqm. Are you available this week?</p>
                    <span className="text-[7px] text-white/20 mt-1 block text-right">09:41</span>
                </div>
            </div>
            {/* AI response 1 */}
            <div className="flex gap-2 max-w-[80%]">
                <div className="w-5 h-5 bg-[#1A1A1A] border border-white/10 shrink-0 flex items-center justify-center text-[7px] text-white/30 font-bold mt-0.5">AI</div>
                <div className="bg-[#111] border border-white/8 px-3 py-2 flex-1">
                    <p className="text-[10px] text-white/55 leading-relaxed">Hi! Thanks for reaching out. Quick question — is this for your own occupancy or an investment acquisition?</p>
                    <span className="text-[7px] text-white/20 mt-1 block">09:41 · AI</span>
                </div>
            </div>
            {/* Inbound 2 */}
            <div className="flex justify-end">
                <div className="bg-[#1A2A1A] border border-green-500/10 px-3 py-2 max-w-[72%]">
                    <p className="text-[10px] text-white/60">Own occupancy. We're expanding from 600 sqm. Budget ~AED 600K/yr.</p>
                    <span className="text-[7px] text-white/20 mt-1 block text-right">09:42</span>
                </div>
            </div>
            {/* AI books tour */}
            <div className="flex gap-2 max-w-[80%]">
                <div className="w-5 h-5 bg-[#1A1A1A] border border-white/10 shrink-0 flex items-center justify-center text-[7px] text-white/30 font-bold mt-0.5">AI</div>
                <div className="flex-1 space-y-1.5">
                    <div className="bg-[#111] border border-white/8 px-3 py-2">
                        <p className="text-[10px] text-white/55 leading-relaxed">Perfect fit. I've flagged you as a priority lead for our DIFC specialist.</p>
                    </div>
                    <div className="bg-[#0D1A0D] border border-emerald-500/20 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <svg className="w-3 h-3 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            <span className="text-[9px] text-emerald-400">Book site tour → calendly.com/cre-firm</span>
                        </div>
                    </div>
                    <span className="text-[7px] text-white/20 pl-0">09:42 · <span className="text-emerald-400/60">AI · 47s response</span></span>
                </div>
            </div>
        </div>

        {/* Stats footer */}
        <div className="border-t border-white/10 px-5 py-3 flex gap-8 shrink-0">
            {[['< 5 min', 'Response time'], ['84%', 'Qualify rate'], ['31', 'Tours / mo']].map(([v, l]) => (
                <div key={l}>
                    <div className="text-xs text-emerald-400 font-mono font-semibold">{v}</div>
                    <div className="text-[8px] text-white/25">{l}</div>
                </div>
            ))}
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const Features = ({ lang = 'en' }) => {
    const [active, setActive] = useState('content');
    const scrollWrapperRef = useRef(null);
    const containerRef = useRef(null);
    const panelRef = useRef(null);
    const activeIdxRef = useRef(0);
    const isAnimatingRef = useRef(false);

    const changeTab = useCallback((id, idx) => {
        if (idx === activeIdxRef.current) return;
        activeIdxRef.current = idx;

        if (isAnimatingRef.current) {
            // Skip animation mid-flight — just swap
            setActive(id);
            return;
        }
        isAnimatingRef.current = true;

        if (panelRef.current) {
            gsap.to(panelRef.current, {
                opacity: 0, y: 8, duration: 0.15, ease: 'power2.in', overwrite: true,
                onComplete: () => {
                    setActive(id);
                    requestAnimationFrame(() => {
                        if (panelRef.current) {
                            gsap.fromTo(panelRef.current,
                                { opacity: 0, y: 8 },
                                {
                                    opacity: 1, y: 0, duration: 0.25, ease: 'power2.out',
                                    onComplete: () => { isAnimatingRef.current = false; }
                                }
                            );
                        } else {
                            isAnimatingRef.current = false;
                        }
                    });
                }
            });
        } else {
            setActive(id);
            isAnimatingRef.current = false;
        }
    }, []);

    const handleTab = (id) => {
        const idx = SERVICES.findIndex(s => s.id === id);
        changeTab(id, idx);
    };

    useEffect(() => {
        if (!containerRef.current || !scrollWrapperRef.current) return;

        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
            const numTabs = SERVICES.length;

            // Make wrapper tall so section can stick while user scrolls through tabs
            scrollWrapperRef.current.style.height = `${numTabs * 100}vh`;

            // Header entry animation
            gsap.fromTo('.feat-header',
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true }
                }
            );

            // One ScrollTrigger per tab — fires only on discrete enter/leave, no auto-scroll
            const triggers = SERVICES.map((service, i) => {
                const frac = 1 / numTabs;
                return ScrollTrigger.create({
                    trigger: scrollWrapperRef.current,
                    start: () => {
                        const range = scrollWrapperRef.current.offsetHeight - window.innerHeight;
                        return `top+=${i * frac * range} top`;
                    },
                    end: () => {
                        const range = scrollWrapperRef.current.offsetHeight - window.innerHeight;
                        return `top+=${(i + 1) * frac * range} top`;
                    },
                    onEnter: () => changeTab(service.id, i),
                    onEnterBack: () => changeTab(service.id, i),
                });
            });

            return () => {
                triggers.forEach(t => t.kill());
                if (scrollWrapperRef.current) {
                    scrollWrapperRef.current.style.height = '';
                }
            };
        });

        return () => mm.revert();
    }, [changeTab]);

    const service = SERVICES.find(s => s.id === active);
    const VISUALS = {
        content: <WistiaVideoPanel />,
        seo: <SERPMockup />,
        aeo: <AICitationMockup />,
        website: <WebsiteMockup />,
        agent: <AIAgentMockup />,
    };

    return (
        <div ref={scrollWrapperRef} className="bg-[#111111] relative">
            <section
                id="services"
                ref={containerRef}
                className="w-full bg-[#111111] relative z-10 overflow-hidden
                           py-16 px-6 md:px-10
                           lg:sticky lg:top-0 lg:h-screen lg:py-0 lg:px-0 lg:flex lg:flex-col"
            >
                <div className="w-full flex flex-col lg:h-full lg:px-14 xl:px-20 lg:py-10 xl:py-12 max-w-[1800px] mx-auto">

                    {/* Header */}
                    <div className="feat-header mb-5 shrink-0 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2 block">{lang === 'id' ? 'Bagaimana Kami Membantu Anda' : 'How We Help You'}</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
                                {lang === 'id' ? 'Ekosistem Otoritas Digital' : 'The Digital Authority Ecosystem'}
                            </h2>
                        </div>
                    </div>

                    {/* Tab Bar */}
                    <div className="flex border-b border-white/20 overflow-x-auto shrink-0">
                        {SERVICES.map(s => (
                            <button
                                key={s.id}
                                onClick={() => handleTab(s.id)}
                                className={`flex flex-col items-start px-5 py-4 shrink-0 border-b-2 transition-all duration-200 text-left ${active === s.id
                                    ? 'border-white text-white'
                                    : 'border-transparent text-white/50 hover:text-white/80 hover:border-white/30'
                                    }`}
                            >
                                <span className={`text-xs font-mono mb-1 ${active === s.id ? 'text-white/50' : 'text-white/25'}`}>{s.num}</span>
                                <span className="text-base font-medium whitespace-nowrap">{s.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Panel */}
                    <div
                        ref={panelRef}
                        className="feat-panel flex flex-col lg:flex-row border border-white/10 border-t-0 flex-1 min-h-0 overflow-hidden"
                        style={{ minHeight: '480px' }}
                    >
                        {/* Left Info */}
                        <div className="lg:w-[380px] xl:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 p-7 lg:p-8 xl:p-10 flex flex-col gap-5 bg-[#0D0D0D] overflow-y-auto">
                            <div>
                                <h3 className="text-xl lg:text-2xl font-medium text-white leading-snug">{service.title}</h3>
                            </div>
                            <p className="text-base text-white/50 leading-relaxed flex-1">{service.desc}</p>
                            <ul className="space-y-3">
                                {service.points.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                        <span className="text-sm text-white/60 leading-relaxed">{pt}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={`/${lang}${service.link}`}
                                className="flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors group mt-auto"
                            >
                                {service.linkLabel}
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M19 5H9M19 5v10" /></svg>
                            </a>
                        </div>

                        {/* Right Visual */}
                        <div className="flex-1 min-h-[400px] lg:min-h-0 overflow-hidden">
                            {VISUALS[active]}
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Features;
