import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageHero from '@/app/components/PageHero';
import AlternatingSection from '@/app/components/AlternatingSection';
import VideoShowcase from '@/app/components/VideoShowcase';

export const metadata = {
    description: "Promperty builds structured content architecture for property and field service firms. We produce high-authority case studies, deal breakdowns, and market intelligence that build trust and drive inbound leads.",
};

// Video Metrics Mockup
const VideoMetricsMockup = () => (
    <div className="w-full bg-white  border border-stone-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="p-4 border-b border-stone-100">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Video Performance</h3>
                    <p className="text-xs text-stone-400 mt-0.5">Last 30 days · All platforms</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">+312% Views</span>
            </div>
        </div>
        {/* Platform breakdown */}
        <div className="p-4 space-y-3">
            {[
                { platform: 'Twitter / X', views: '84,200', watch: '62%', icon: '𝕏', color: 'black' },
                { platform: 'Instagram Reels', views: '142,800', watch: '71%', icon: '📱', color: 'pink' },
                { platform: 'YouTube Shorts', views: '38,400', watch: '58%', icon: '▶', color: 'red' },
            ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-stone-50 border border-stone-100">
                    <div className="flex items-center gap-3">
                        <span className="text-base">{p.icon}</span>
                        <div>
                            <p className="text-xs font-semibold text-stone-800">{p.platform}</p>
                            <p className="text-[10px] text-stone-500">{p.views} views</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-semibold text-stone-700">Avg watch: {p.watch}</p>
                        <div className="w-16 h-1.5 bg-stone-200 rounded-full mt-1.5 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-stone-600"
                                style={{ width: p.watch }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="px-4 pb-4 pt-1 flex items-center justify-between">
            <p className="text-[10px] text-stone-400">Total inbound DMs from content</p>
            <p className="text-xs font-bold text-emerald-600">+48 this month</p>
        </div>
    </div>
);

// Video Type Grid Mockup
const VideoTypeMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-5 pb-4 border-b border-stone-100">
            <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Content Asset Library</h3>
            <p className="text-xs text-stone-500 mt-0.5">Delivered monthly</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
            {[
                { title: 'Market Data Breakdown', tag: 'High-Share', desc: '60-90 sec data analysis with motion graphics' },
                { title: 'Property Walkthrough', tag: 'High-Intent', desc: 'Cinematic asset tours for serious investors' },
                { title: 'Founder Hot Take', tag: 'High-Reach', desc: 'Raw, direct market commentary — no polish' },
                { title: 'Deal Anatomy', tag: 'High-Trust', desc: 'Behind-the-scenes of a completed transaction' },
            ].map((v, i) => (
                <div key={i} className="bg-stone-50  p-3 border border-stone-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded bg-stone-800 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-white ml-0.5"></div>
                        </div>
                        <span className="text-[9px] font-semibold bg-white text-stone-600 border border-stone-200 px-1.5 py-0.5 rounded">{v.tag}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-stone-800 leading-tight mb-1">{v.title}</p>
                    <p className="text-[10px] text-stone-500 leading-snug">{v.desc}</p>
                </div>
            ))}
        </div>
    </div>
);

export default async function ContentRealEstatePage({ params }) {
    const { lang } = await params;
    const contentBlocks = [
        {
            type: 'centered',
            title: 'The Attention Economy Has Reached Commercial Real Estate',
            text: "High-net-worth investors and institutional allocators are consuming structured, authority-led content. They're watching market analyses, deal walkthroughs, and founder perspectives across every major platform. The question isn't whether your firm should be producing content. It's how long you can afford to wait."
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: 'Generic Real Estate Video Does Not Work',
            text: "The commercial real estate content that actually performs isn't polished corporate video. It's data-driven, direct, and specific. It shows a real transaction, a real market call, or a real insight that institutional investors can't get from a press release. Most CRE firms are producing neither.",
            list: [
                'Overproduced property tours with no market context generate zero engagement.',
                'Investors fast-forward past anything that feels scripted or promotional.',
                'One authentic 60-second market take outperforms a $10,000 corporate video.'
            ],
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><VideoMetricsMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[400px]'
        },
        {
            type: 'centered',
            title: 'How Promperty Builds Content Systems',
            text: "Promperty isn't a production house. We build structured content architecture that understands cap rates, deal cycles, and what institutional decision-makers actually want to watch. Every asset we produce is built to reach the right people and start real conversations."
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '1. Strategy-First Production',
            text: "Every video begins with a brief that defines the target audience, the core message, and the distribution channel. We don't shoot content and hope for engagement. We identify what your capital partners and deal targets want to see, and we produce exactly that.",
            list: [
                'Market data breakdowns targeting institutional investors.',
                'Deal anatomy content that builds operational credibility.',
                'Contrarian market takes engineered to drive shares from peers.'
            ],
            imageSrc: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: '2. Cinematic Quality, Real Estate Substance',
            text: 'Institutional investors judge your operational competence by the quality of everything you produce — including your content. We deliver cinematic production values that signal premium positioning, without the sterile corporate feel that repels authentic engagement on social platforms.',
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><VideoTypeMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[380px]'
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '3. Multi-Platform Distribution',
            text: "A single piece of content becomes multiple authority assets across Instagram Reels, YouTube Shorts, and your website. We handle all formatting, captioning, and platform-specific optimization so you get maximum reach from every hour of your time.",
            imageSrc: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'faq',
            title: 'Video Content Questions, Answered',
            faqs: [
                {
                    q: 'Do you handle filming, or do we need to provide footage?',
                    a: 'Both models work depending on your location and preferences. For clients in markets where we operate directly, we coordinate filming sessions at your office or on-site at active assets. For remote clients, we provide a detailed filming guide and brief that allows you to capture high-quality footage on a modern smartphone, which we then edit into professional content. We also produce motion-graphic videos that require no footage at all — these perform exceptionally well for market data content.'
                },
                {
                    q: 'Which platforms perform best for property and field service content?',
                    a: 'Instagram Reels delivers the broadest reach and is increasingly used by family offices and HNW individuals. YouTube Shorts provides compounding search discoverability over time. We prioritize Reels for immediate impact and YouTube for long-term organic growth — and we repurpose each piece of content into authority assets for your email list and website.'
                },
                {
                    q: 'How much of my time does video production require?',
                    a: 'After the initial onboarding, most clients commit two to four hours per month. This includes a monthly strategy brief, one or two filming sessions (30 to 60 minutes each), and a quick approval review. We handle everything else — scripting, editing, captioning, thumbnail design, and publishing.'
                },
                {
                    q: 'What makes your content architecture different from a video agency?',
                    a: 'The audience, the content, and the goal are entirely different. Generalist agencies focus on emotion and lifestyle. We focus on market intelligence, deal competence, and operational credibility. Our content is built for decision-makers who want data, specificity, and track record proof — not cinematic lifestyle footage.'
                },
                {
                    q: 'Can video content generate actual leads or is it purely a branding play?',
                    a: 'Both, and the two compound each other. Short-term, high-intent deal content — property walkthroughs, offering memorandum highlights, market opportunity posts — generates direct inbound inquiries. Long-term, thought leadership content builds the trust that converts cold contacts into warm relationships when you reach out. The most effective CRE video strategy combines both types on a consistent publishing cadence.'
                }
            ]
        },
        {
            type: 'pillar',
            title: 'Video Is the Capture Layer. Build the Full Authority System.',
            text: 'Video content drives reach and brand recall. Combine it with the channels that convert that awareness into investor meetings and deal flow.',
            links: [
                {
                    label: 'Lead Automations',
                    path: '/ai-agent-real-estate',
                    name: 'AI Lead Capture Systems',
                    desc: 'Pair your content with automated qualification agents that respond to inquiries 24/7 on WhatsApp and Email.'
                },
                {
                    label: 'Search Domination',
                    path: '/seo-real-estate',
                    name: 'Commercial Real Estate SEO',
                    desc: 'Turn your video topics into SEO-optimized articles that rank on Google and capture high-intent investor searches 24 hours a day.'
                },
                {
                    label: 'AI Visibility',
                    path: '/aeo-geo-llms-real-estate',
                    name: 'AEO & GEO for LLMs',
                    desc: 'Ensure that when investors ask ChatGPT or Perplexity for top CRE operators, your content library is part of what trains the answer.'
                }
            ]
        },
        {
            type: 'cta',
            title: 'Your competitors are already on camera.',
            text: 'Book a free content audit. We will show you exactly what types of video are performing in your asset class and market right now — and what your firm should be producing.',
            buttonText: 'Get Your Free Content Audit'
        }
    ];

    return (
        <main className="min-h-screen bg-background text-secondary">
            <Navbar lang={lang} />

            <PageHero
                title1="Content Architecture"
                highlight="Systems"
                title2="for Property & Field Services"
                subtitle="High-authority content systems engineered to move the needle. We produce market-moving deal breakdowns and case studies that build institutional authority across Instagram, YouTube, and Search."
                badges={["Content Architecture", "Multi-Platform Distribution", "Built Environment Authority"]}
                buttonText="Start Your Audit"
                imageSrc="/images/service_content_camera_rig_1772096888670.png"
            />

            <AlternatingSection blocks={contentBlocks} />
            <VideoShowcase />
            <Footer lang={lang} />
        </main>
    );
}
