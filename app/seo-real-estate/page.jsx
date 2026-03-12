import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import AlternatingSection from '../components/AlternatingSection';

export const metadata = {
    title: "Commercial Real Estate SEO Company",
    description: "Promperty is a specialist commercial real estate SEO company. We rank CRE firms on Google for high-intent, capital-generating search terms that drive investor inquiries.",
};

// Google SERP Position Tracker Mockup
const SERPMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
            <div>
                <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Keyword Rankings</h3>
                <p className="text-xs text-stone-500 mt-0.5">Google · United States</p>
            </div>
            <span className="text-[10px] font-medium bg-emerald-50 text-emerald-600 px-2.5 py-1 border border-emerald-100">Live Tracking</span>
        </div>
        <div className="space-y-3">
            {[
                { kw: 'Dallas industrial real estate broker', pos: 1, delta: '+6', vol: '480/mo' },
                { kw: 'NYC office space for lease', pos: 2, delta: '+11', vol: '1.2K/mo' },
                { kw: 'commercial real estate investment firm Texas', pos: 1, delta: '+8', vol: '320/mo' },
                { kw: 'multifamily syndicator Miami FL', pos: 3, delta: '+4', vol: '260/mo' },
                { kw: 'CRE capital markets advisory', pos: 2, delta: '+9', vol: '170/mo' },
            ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className={`text-[11px] font-bold w-6 h-6 flex items-center justify-center flex-shrink-0 ${row.pos === 1 ? 'bg-emerald-500 text-white' : row.pos <= 3 ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-stone-100 text-stone-500'}`}>
                            {row.pos}
                        </span>
                        <p className="text-xs text-stone-700 truncate font-medium">{row.kw}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                        <span className="text-[10px] text-stone-400">{row.vol}</span>
                        <span className="text-[11px] font-semibold text-emerald-500">{row.delta}</span>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
            <p className="text-[10px] text-stone-400">Avg. position improvement</p>
            <p className="text-xs font-bold text-emerald-600">+7.6 positions in 90 days</p>
        </div>
    </div>
);

// Organic Traffic Growth Chart Mockup
const TrafficChartMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
            <div>
                <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Organic Session Growth</h3>
                <p className="text-xs text-stone-500 mt-0.5">Month over month</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">+218% YoY</span>
        </div>
        <div className="flex items-end gap-2 h-24 mb-4">
            {[18, 24, 30, 28, 40, 52, 60, 68, 75, 80, 90, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                        className={`w-full transition-all ${i === 11 ? 'bg-emerald-500' : 'bg-stone-100'}`}
                        style={{ height: `${h}%` }}
                    ></div>
                </div>
            ))}
        </div>
        <div className="flex justify-between text-[9px] text-stone-400 px-0.5">
            <span>Feb</span><span>Apr</span><span>Jun</span><span>Aug</span><span>Oct</span><span>Jan</span>
        </div>
    </div>
);

export default function SEOPage() {
    const seoBlocks = [
        {
            type: 'centered',
            title: 'Why Google Still Generates Capital',
            text: "Institutional investors and capital allocators still open Google when they need to verify a firm, check market reach, or find a specialist broker. If your firm isn't on page one for terms that signal intent to transact, you're invisible to a significant segment of motivated capital."
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: 'Most CRE Firms Are Bleeding Rankings to Aggregators',
            text: 'LoopNet, CoStar, and Crexi dominate commercial real estate search results because they have invested millions in SEO infrastructure. Your brokerage or investment firm is being outranked on your own market, your own asset class, and your own geography.',
            list: [
                'Aggregators capture your high-intent traffic and sell it back to you as pay-per-lead.',
                "Generic marketing agencies don't understand cap rates, NOI, or how CRE capital moves.",
                'A single page-one ranking for one high-intent term can generate a seven-figure deal.'
            ],
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><SERPMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[380px]'
        },
        {
            type: 'centered',
            title: 'How Promperty Ranks CRE Firms on Google',
            text: "Promperty isn't a generalist agency. We're a commercial real estate SEO company that focuses exclusively on the search terms your investors and buyers actually type into Google. Every campaign is built around CRE keyword data, not frameworks borrowed from e-commerce or SaaS."
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '1. Deep Market Keyword Architecture',
            text: 'We map every commercially-relevant search term in your target market — from geographic modifiers to asset-class-specific long tail queries. We identify the gaps your competitors have ignored and build content that owns them permanently.',
            list: [
                'MSA-level and submarket keyword mapping for every target geography.',
                'Asset class specificity: industrial, multifamily, office, retail, mixed-use.',
                'Investment-intent terms: cap rates, IRR thresholds, value-add opportunities.'
            ],
            imageSrc: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: '2. Technical SEO Infrastructure',
            text: "Ranking isn't just about content. It's about whether Google can crawl, understand, and trust your site. We audit and rebuild your technical foundations — page speed, schema markup, internal linking, and crawl architecture — so every piece of content you publish has maximum ranking potential.",
            imageSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '3. Compounding Inbound Traffic',
            text: 'Unlike paid ads that disappear the moment you stop paying, organic rankings compound. A page we build for you today continues generating investor inquiries twelve months from now without any additional spend. We build moats, not billboards.',
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><TrafficChartMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[320px]'
        },
        {
            type: 'faq',
            title: 'SEO Questions, Answered',
            faqs: [
                {
                    q: 'How long does it take to see results from commercial real estate SEO?',
                    a: 'Most of our clients see measurable ranking movement within 60 to 90 days, with significant traffic gains by month four to six. Commercial real estate is a niche market — keyword difficulty is lower than most industries, which means well-executed SEO moves faster here than in e-commerce or SaaS.'
                },
                {
                    q: 'What makes Promperty different from a general SEO agency?',
                    a: 'General agencies do not understand CRE. They do not know the difference between a cap rate and a capitalization threshold, or how to target institutional investors versus retail buyers. Our entire strategy is built around the language, intent, and deal cycles specific to commercial real estate transactions.'
                },
                {
                    q: 'Do you handle local SEO for multiple markets simultaneously?',
                    a: 'Yes. We use programmatic landing page architecture to capture localized intent across multiple MSAs, submarkets, and asset classes at scale. Whether you operate in two markets or twenty, we build geo-targeted content infrastructure that ranks in each one.'
                },
                {
                    q: 'Can SEO generate actual deal flow for a CRE firm?',
                    a: 'Absolutely. The most valuable search terms in commercial real estate — things like "industrial warehouse for lease Dallas" or "multifamily investment firm Florida" — are searched by principals, family offices, and institutional allocators with real capital. A page-one position for a single high-intent term can generate a transaction worth millions in fees.'
                },
                {
                    q: 'Does SEO work alongside AEO and GEO for AI search?',
                    a: 'They work together. Google rankings build the domain authority and content depth that AI models like ChatGPT and Perplexity use when synthesizing answers. Strong traditional SEO is the foundation that feeds both Google visibility and AI engine recognition. We recommend running both together for maximum market coverage.'
                }
            ]
        },
        {
            type: 'pillar',
            title: 'Build a Complete Digital Authority System',
            text: 'SEO is one pillar of your market dominance. The firms that win combine organic search with AI visibility, authority infrastructure, and content that compounds across every channel.',
            links: [
                {
                    label: 'AI Search',
                    path: '/aeo-geo-llms-real-estate',
                    name: 'AEO & GEO for LLMs',
                    desc: 'Ensure ChatGPT, Perplexity, and Gemini recommend your firm when investors ask for the best CRE specialists in your market.'
                },
                {
                    label: 'Lead Automations',
                    path: '/ai-agent-real-estate',
                    name: 'AI Lead Capture Systems',
                    desc: 'Turn your inbound interest into qualified meetings 24/7 with custom WhatsApp and Email agents.'
                },
                {
                    label: 'Content Engine',
                    path: '/content-real-estate',
                    name: 'Content Architecture',
                    desc: 'Structured deal breakdowns and authority content that capture high-net-worth attention across Instagram, YouTube, and Search.'
                }
            ]
        },
        {
            type: 'cta',
            title: 'Find out exactly where your CRE firm stands on Google.',
            text: 'We run a free keyword gap audit to show you which high-intent search terms your competitors are ranking for — and you are not.',
            buttonText: 'Get Your Free SEO Audit'
        }
    ];

    return (
        <main className="min-h-screen bg-background text-secondary">
            <Navbar />

            <PageHero
                title1="Commercial Real Estate"
                highlight="SEO"
                title2="That Generates Deal Flow"
                subtitle="Rank at the top of Google for the high-intent search terms that institutional investors, family offices, and capital allocators actually use. We build rankings that compound."
                badges={["Commercial Real Estate SEO", "Local Search Domination", "Investor-Intent Keywords"]}
                buttonText="Get Your Free SEO Audit"
                imageSrc="/images/service_seo_graph_skyline_1772096852929.png"
            />

            <AlternatingSection blocks={seoBlocks} />

            <Footer />
        </main>
    );
}
