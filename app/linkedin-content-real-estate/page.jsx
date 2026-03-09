import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import AlternatingSection from '../components/AlternatingSection';

export const metadata = {
    title: "Commercial Real Estate Digital Marketing",
    description: "CloudSocial is a specialist commercial real estate digital marketing agency for LinkedIn. We publish market-moving content that builds your authority and drives deal flow every week.",
};

// LinkedIn Post Performance Mockup
const PostPerformanceMockup = () => (
    <div className="w-full bg-white  border border-stone-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Post Preview */}
        <div className="p-4 border-b border-stone-100">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">JC</div>
                <div>
                    <p className="text-xs font-semibold text-stone-800">James Chen</p>
                    <p className="text-[10px] text-stone-400">Principal · Meridian Capital Group · 1d</p>
                </div>
            </div>
            <p className="text-[11px] text-stone-700 leading-relaxed">
                DFW industrial vacancy just hit 6.4% — the lowest in 8 years. Here's what that means for cap rate compression in Q2 2026...
            </p>
            <p className="text-[10px] text-blue-600 mt-1">See more</p>
        </div>
        {/* Metrics */}
        <div className="grid grid-cols-3 divide-x divide-stone-100">
            {[
                { label: 'Impressions', val: '24,840', delta: '+380%' },
                { label: 'Engagements', val: '1,203', delta: '+290%' },
                { label: 'Profile Clicks', val: '342', delta: '+410%' },
            ].map((m, i) => (
                <div key={i} className="p-3 text-center">
                    <p className="text-xs font-bold text-stone-800">{m.val}</p>
                    <p className="text-[9px] text-stone-400">{m.label}</p>
                    <p className="text-[9px] font-semibold text-emerald-500">{m.delta}</p>
                </div>
            ))}
        </div>
        {/* Top comments */}
        <div className="p-4 space-y-2 bg-stone-50 border-t border-stone-100">
            <p className="text-[9px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Notable Comments</p>
            {[
                { name: 'Sarah K.', role: 'CIO · Mesa Capital', text: 'Exactly what we needed. What submarkets are you bullish on?' },
                { name: 'Michael T.', role: 'MD · Brookfield RE', text: 'Great analysis James. Are you advising on acquisitions?' }
            ].map((c, i) => (
                <div key={i} className="bg-white p-2.5 border border-stone-100">
                    <p className="text-[10px] font-semibold text-stone-700">{c.name} <span className="font-normal text-stone-400">· {c.role}</span></p>
                    <p className="text-[10px] text-stone-600 mt-0.5">{c.text}</p>
                </div>
            ))}
        </div>
    </div>
);

// Content Calendar Mockup
const ContentCalendarMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
            <div>
                <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Content Calendar — March</h3>
                <p className="text-xs text-stone-500 mt-0.5">Managed by CloudSocial</p>
            </div>
            <span className="text-[10px] font-medium bg-stone-100 text-stone-600 px-2.5 py-1 border border-stone-200">12 posts scheduled</span>
        </div>
        <div className="space-y-2">
            {[
                { date: 'Mon Mar 3', title: 'Cap Rate Compression Report — DFW Q1', type: 'Market Data', status: 'Published' },
                { date: 'Wed Mar 5', title: 'Deal Breakdown: 320K sqft Industrial Lease', type: 'Case Study', status: 'Scheduled' },
                { date: 'Fri Mar 7', title: 'Why Multifamily Yields Are Compressing in Sunbelt', type: 'Opinion', status: 'Scheduled' },
                { date: 'Mon Mar 10', title: 'Q1 2026 Industrial Absorption Data [Infographic]', type: 'Visual Asset', status: 'In Draft' },
            ].map((post, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-100">
                    <div className="text-center flex-shrink-0">
                        <p className="text-[9px] text-stone-400 font-medium">{post.date}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-stone-800 truncate">{post.title}</p>
                        <span className="text-[9px] text-stone-500">{post.type}</span>
                    </div>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded flex-shrink-0 ${post.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : post.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                        {post.status}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export default function LinkedInContentRealEstatePage() {
    const linkedInContentBlocks = [
        {
            type: 'centered',
            title: 'The Firms That Publish, Win',
            text: "In commercial real estate, the operator who consistently publishes market intelligence becomes the first call when a deal crosses a capital allocator's desk. The operator who doesn't publish doesn't exist in the consideration set."
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: 'Silence on LinkedIn Is Costing You Deals You Will Never Know About',
            text: "Every week you're not publishing on LinkedIn, a competitor is. They're demonstrating market knowledge, building recall with family offices, and receiving inbound deal flow from investors who decided to trust them before the first conversation ever happened.",
            list: [
                'LinkedIn posts generate 6x more engagement than static profiles for CRE principals.',
                'Capital allocators follow content for 3 to 6 months before making contact.',
                'One viral market analysis post can generate 40 to 80 qualified connection requests in 48 hours.'
            ],
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><PostPerformanceMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[440px]'
        },
        {
            type: 'centered',
            title: 'How CloudSocial Builds Your Content Engine',
            text: "CloudSocial doesn't write generic real estate posts. We pull out your actual market perspective, turn it into the LinkedIn formats that drive engagement from institutional audiences, and publish consistently. All under your name, in your voice."
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '1. Market Intelligence Extraction',
            text: "We interview you monthly to extract your current market thesis, deal observations, and forward-looking analysis. We then transform your insights into the formats that perform best on LinkedIn: text posts, data carousels, deal breakdowns, and market commentary threads.",
            list: [
                'Monthly strategy calls to extract current market perspective.',
                'Deal analysis posts that demonstrate active, high-volume deal flow.',
                'Contrarian market takes that drive engagement from senior decision-makers.'
            ],
            imageSrc: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: '2. Data-Led Visual Content',
            text: "The highest-performing commercial real estate content on LinkedIn pairs original market data with custom-designed visual assets. We produce infographics, market trend carousels, and cap rate visualizations that institutional audiences share, extending your reach far beyond your existing network.",
            imageSrc: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '3. Full Calendar Management',
            text: 'We write, design, schedule, and publish everything. You review and approve on your own time — typically in under ten minutes per week. Every post is timed to LinkedIn\'s peak engagement windows for your specific audience and goes live without you touching a keyboard.',
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><ContentCalendarMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[380px]'
        },
        {
            type: 'faq',
            title: 'LinkedIn Content Questions, Answered',
            faqs: [
                {
                    q: 'How much of my time does this actually require?',
                    a: 'Typically 20 to 30 minutes per month. We handle everything from ideation, writing, and design to scheduling and publishing. Your involvement is a monthly strategy call where we extract your current market perspective, and a light approval review each week — usually done in under ten minutes from your phone.'
                },
                {
                    q: 'What types of content perform best for CRE principals on LinkedIn?',
                    a: 'In our experience, the three highest-performing formats for commercial real estate are: (1) data-driven market analysis posts with real numbers — vacancy rates, cap rate trends, absorption figures; (2) deal breakdown stories that walk through a specific transaction without revealing confidential terms; and (3) contrarian market takes that challenge conventional wisdom and generate debate from peers. All three build authority faster than generic thought leadership content.'
                },
                {
                    q: 'Can you write in my voice if you have never met me?',
                    a: 'Yes. Our onboarding process includes an in-depth voice calibration session where we study your existing communication style, preferred language, and market philosophy. We also review any previous posts or written communications you have produced. Most clients cannot tell the difference between our writing and their own after the first two weeks.'
                },
                {
                    q: 'Do you post on the firm\'s company page or just the founder\'s personal profile?',
                    a: 'Personal profiles consistently outperform company pages on LinkedIn — personal posts receive 10x more engagement on average. We focus on the founder or leading principal\'s profile as the primary authority vehicle. We can also manage the firm\'s company page as a secondary channel to republish and amplify the best-performing content.'
                },
                {
                    q: 'How does LinkedIn content strategy connect to deal flow?',
                    a: 'The mechanism is relationship compounding. When a capital allocator or deal partner follows your content for three months before ever speaking to you, they arrive at the first conversation already trusting your market judgment. We have seen clients generate co-GP interest, LP commitments, and exclusive acquisition introductions from investors who followed their LinkedIn for weeks before reaching out — without a single cold call.'
                }
            ]
        },
        {
            type: 'pillar',
            title: 'Content Is the Signal. Make Sure They Can Find It.',
            text: 'The content you publish builds authority with the people already following you. Combine it with the systems that put you in front of the people who are not following you yet.',
            links: [
                {
                    label: 'Audience Building',
                    path: '/linkedin-real-estate',
                    name: 'LinkedIn Growth & Positioning',
                    desc: 'Build the right audience to receive your content — institutional investors, family offices, and senior deal partners who move capital.'
                },
                {
                    label: 'Video Authority',
                    path: '/content-real-estate',
                    name: 'Short Form Video Content',
                    desc: 'Amplify your market expertise through cinematic short-form video that reaches beyond LinkedIn to Instagram and YouTube.'
                },
                {
                    label: 'Search Authority',
                    path: '/seo-real-estate',
                    name: 'Commercial Real Estate SEO',
                    desc: 'Capture the investors searching Google for CRE specialists — and make sure your firm is what they find at the top.'
                }
            ]
        },
        {
            type: 'cta',
            title: 'Your market expertise deserves an audience.',
            text: 'We build the content engine that makes you impossible to ignore. Book your LinkedIn content strategy session.',
            buttonText: 'Book Your Content Strategy Call'
        }
    ];

    return (
        <main className="min-h-screen bg-white text-secondary">
            <Navbar />

            <PageHero
                title1="LinkedIn Content Strategy"
                highlight="for Commercial Real Estate"
                title2="Firms"
                subtitle="We extract your market expertise and publish it as high-performing LinkedIn content that positions your firm as the definitive authority — consistently, every week, without demanding your time."
                badges={["Market Intelligence Content", "Data-Led Visual Assets", "Full Calendar Management"]}
                buttonText="Book Your Content Strategy Call"
                imageSrc="/images/service_linkedin_desk_1772096951622.png"
            />

            <AlternatingSection blocks={linkedInContentBlocks} />

            <Footer />
        </main>
    );
}
