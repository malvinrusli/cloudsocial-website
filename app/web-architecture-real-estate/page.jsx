import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import AlternatingSection from '../components/AlternatingSection';

export const metadata = {
    title: "Commercial Real Estate Website Design",
    description: "Promperty builds authoritative commercial real estate websites engineered for institutional credibility, fast performance, and investor-grade conversion. Get a free site audit.",
};

// Website Audit Scoring Mockup
const WebsiteAuditMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
            <div>
                <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Authority Site Audit</h3>
                <p className="text-xs text-stone-500 mt-0.5">Investor credibility score</p>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-stone-400 line-through">Before: 31/100</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">After: 94/100</span>
            </div>
        </div>
        <div className="space-y-3">
            {[
                { label: 'Page Speed (Core Web Vitals)', before: 38, after: 97, color: 'emerald' },
                { label: 'Trust Signals & Credibility', before: 20, after: 95, color: 'emerald' },
                { label: 'Mobile Responsiveness', before: 55, after: 100, color: 'emerald' },
                { label: 'CTA Clarity & Conversion Flow', before: 15, after: 90, color: 'emerald' },
                { label: 'Schema Markup & SEO Structure', before: 10, after: 92, color: 'emerald' },
            ].map((item, i) => (
                <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-stone-700 font-medium">{item.label}</span>
                        <div className="flex items-center gap-2 text-[10px]">
                            <span className="text-stone-400 line-through">{item.before}</span>
                            <span className="font-bold text-emerald-600">{item.after}</span>
                        </div>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-stone-300 full" style={{ width: `${item.before}%` }}></div>
                        <div className="absolute top-0 left-0 h-full bg-emerald-500 full transition-all duration-1000" style={{ width: `${item.after}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Website Conversion Flow Mockup (wireframe-style)
const ConversionFlowMockup = () => (
    <div className="w-full bg-white  border border-stone-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="p-4 border-b border-stone-100">
            <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Conversion Architecture</h3>
            <p className="text-xs text-stone-500 mt-0.5">Investor journey from arrival to inquiry</p>
        </div>
        <div className="p-4 space-y-3">
            {/* Step 1 */}
            <div className="border border-stone-200  p-3 bg-stone-50 relative">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Above the Fold</span>
                        <p className="text-xs font-semibold text-stone-800 mt-0.5">Authority Hero + Deal Volume Signal</p>
                        <p className="text-[10px] text-stone-500 mt-1">"$2.4B in transactions advised" — immediate trust anchor</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded flex-shrink-0">+340% CVR</span>
                </div>
            </div>
            {/* Arrow */}
            <div className="flex justify-center">
                <svg className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {/* Step 2 */}
            <div className="border border-stone-200  p-3 bg-stone-50">
                <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Deal Showcase</span>
                <p className="text-xs font-semibold text-stone-800 mt-0.5">Live Transaction Portfolio</p>
                <p className="text-[10px] text-stone-500 mt-1">Asset class, geography, deal size — builds operational credibility</p>
            </div>
            {/* Arrow */}
            <div className="flex justify-center">
                <svg className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            {/* Step 3 */}
            <div className="border border-emerald-200  p-3 bg-emerald-50">
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Primary CTA</span>
                <p className="text-xs font-semibold text-stone-800 mt-0.5">Friction-Free Inquiry Form</p>
                <p className="text-[10px] text-stone-500 mt-1">3 fields max → AI agent handoff → immediate calendar routing</p>
            </div>
        </div>
    </div>
);

export default function WebArchitecturePage() {
    const webBlocks = [
        {
            type: 'centered',
            title: 'Your Website Is the First Partner Vetting, Not the Last',
            text: 'Before a capital allocator returns your call, opens your email, or responds to an introduction — they Google your firm. What they find in those first fifteen seconds either confirms you operate at their level, or removes you from the consideration set permanently.'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: 'Most CRE Websites Fail Institutional Investors in Seconds',
            text: 'Generic templates, slow load times, no deal portfolio, unclear positioning, and no credibility signals. A firm managing $500M in assets that has a website that looks like it was built in 2016 is sending a signal — just not the one they intend.',
            list: [
                'Institutional investors spend an average of 8 seconds on a website before deciding to engage or leave.',
                'A slow, unstructured site signals operational mediocrity — regardless of your actual track record.',
                'The firms that close the most inbound capital have websites engineered to communicate authority instantly.'
            ],
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><WebsiteAuditMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[400px]'
        },
        {
            type: 'centered',
            title: 'How Promperty Builds CRE Websites',
            text: "Promperty doesn't build template websites. We design commercial real estate sites for one audience: the institutional investors, family offices, and deal partners who are vetting your firm before they pick up the phone. Every site we deliver is built to convert visitors into inquiries, not just look good."
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '1. Authority Architecture & Information Hierarchy',
            text: 'The order and weight of information on your website determines whether a visitor understands your positioning in five seconds or fifty. We architect every page to communicate your deal volume, asset class expertise, and market authority before a visitor has to look for it.',
            list: [
                'Above-the-fold trust anchors: AUM, deal count, target markets.',
                'Deal portfolio showcase structured for institutional readability.',
                'Team and track record presentation that signals operational depth.'
            ],
            imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: '2. Performance, Trust Engineering & SEO Foundation',
            text: 'Page speed, mobile performance, schema markup, SSL, and Core Web Vitals are not optional extras — they are the technical foundation that determines both your Google rankings and your institutional credibility score. We rebuild these from the ground up.',
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><ConversionFlowMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[400px]'
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '3. Conversion Infrastructure',
            text: 'A beautiful website that does not convert inquiries is a branding expense, not a business asset. We engineer your contact forms, CTA flow, and lead capture architecture to minimize friction and maximize the percentage of visitors who take the one action that matters: making contact.',
            list: [
                'Three-field maximum inquiry forms — every additional field costs you 20% of submissions.',
                'AI agent integration for instant response and qualification of every inquiry.',
                'Calendar booking embedded directly in the contact flow — no email back-and-forth.'
            ],
            imageSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'faq',
            title: 'Website Design Questions, Answered',
            faqs: [
                {
                    q: 'How is a commercial real estate website different from a standard business website?',
                    a: 'Commercial real estate websites serve a fundamentally different audience than most business sites. Your visitors are institutional investors, family offices, and senior capital allocators — not general consumers. They are vetting your operational credibility, deal track record, and market expertise before deciding whether to engage. Standard web design templates optimize for general engagement; we optimize specifically for the trust signals and information hierarchy that sophisticated CRE capital requires.'
                },
                {
                    q: 'Do you build on a specific platform or CMS?',
                    a: 'We build primarily in Next.js for maximum performance, scalability, and SEO capability — the same stack that powers the fastest enterprise websites in the world. For clients who need to manage content themselves, we also work with Webflow and integrate headless CMS solutions. We recommend the right platform based on your firm\'s specific content management needs and technical infrastructure.'
                },
                {
                    q: 'How long does it take to design and launch a commercial real estate website?',
                    a: 'A full authority-grade CRE website typically takes six to ten weeks from strategy kick-off to launch. This includes discovery, information architecture, design, development, content integration, and performance optimization. For firms that need a faster path, we offer an accelerated eight-week track that prioritizes the highest-impact pages first — homepage, deal portfolio, and contact — while completing supporting pages post-launch.'
                },
                {
                    q: 'Can you integrate an AI agent chatbot directly into the website you build?',
                    a: 'Yes, and we strongly recommend it. Our web architecture service integrates seamlessly with our AI Agent service — giving every visitor an instant-response AI concierge that qualifies their intent and routes them to your calendar. For clients who take both services, the AI agent is embedded natively into the contact architecture rather than bolted on as a third-party widget.'
                },
                {
                    q: 'Will the website be optimized for Google ranking?',
                    a: 'Yes. SEO is built into the architecture from day one — not added as an afterthought. We implement schema markup, Core Web Vitals optimization, semantic HTML structure, and technical SEO foundations that allow your content to rank. The website architecture we deliver is the same foundation we build our commercial real estate SEO campaigns on top of. The two services are designed to compound each other.'
                }
            ]
        },
        {
            type: 'pillar',
            title: 'A Great Website Needs Great Traffic and Great Conversion',
            text: 'Your website is the conversion layer. Make sure you have the traffic systems and the qualification tools to fill it with the right people.',
            links: [
                {
                    label: 'Organic Traffic',
                    path: '/seo-real-estate',
                    name: 'Commercial Real Estate SEO',
                    desc: 'Rank your new website at the top of Google for high-intent CRE search terms — and feed it a permanent stream of investor traffic.'
                },
                {
                    label: 'Lead Qualification',
                    path: '/ai-agent-real-estate',
                    name: 'Real Estate AI Chatbot',
                    desc: 'Install an AI agent that qualifies every visitor the moment they arrive — before they leave without making contact.'
                },
                {
                    label: 'AI Visibility',
                    path: '/aeo-geo-llms-real-estate',
                    name: 'AEO & GEO for LLMs',
                    desc: 'Ensure that when investors ask ChatGPT or Perplexity for top CRE firms in your market, your website is what they are directed to.'
                }
            ]
        },
        {
            type: 'cta',
            title: 'Your website should close investors before you say a word.',
            text: 'Book a free commercial real estate website audit. We will score your site across the ten criteria institutional investors use to vet firms — and show you exactly what needs to change.',
            buttonText: 'Get Your Free Site Audit'
        }
    ];

    return (
        <main className="min-h-screen bg-background text-secondary">
            <Navbar />

            <PageHero
                title1="Commercial Real Estate"
                highlight="Website Design"
                title2="& Development"
                subtitle="We build authoritative commercial real estate websites that pass the institutional investor vetting test in under eight seconds — engineered for credibility, speed, and conversion."
                badges={["Commercial Real Estate Website Design", "Authority Architecture", "Conversion Infrastructure"]}
                buttonText="Get Your Free Site Audit"
                imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            />

            <AlternatingSection blocks={webBlocks} />

            <Footer />
        </main>
    );
}
