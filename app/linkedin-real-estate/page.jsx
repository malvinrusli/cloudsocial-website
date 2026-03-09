import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import AlternatingSection from '../components/AlternatingSection';

export const metadata = {
    title: "LinkedIn for Real Estate Firms",
    description: "CloudSocial builds LinkedIn authority systems for commercial real estate firms. Generate investor leads on LinkedIn by positioning your firm as the definitive market voice.",
};

// LinkedIn Profile Mockup
const LinkedInProfileMockup = () => (
    <div className="w-full bg-white  border border-stone-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Banner */}
        <div className="h-20 bg-slate-800 relative">
            <div className="absolute bottom-0 right-4 top-0 flex items-center">
                <div className="text-right">
                    <p className="text-white/80 text-[9px] font-semibold uppercase tracking-widest">$2.4B</p>
                    <p className="text-white/50 text-[8px]">Assets Under Advisory</p>
                </div>
            </div>
        </div>
        {/* Profile Info */}
        <div className="px-4 pb-4">
            <div className="flex items-end justify-between -mt-5 mb-3">
                <div className="w-12 h-12 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center">
                    <span className="text-sm font-semibold text-stone-600">JC</span>
                </div>
                <span className="text-[10px] font-semibold bg-blue-600 text-white px-3 py-1 rounded-sm">Connect</span>
            </div>
            <p className="text-xs font-bold text-stone-800 leading-tight">James Chen · Principal, Meridian Capital Group</p>
            <p className="text-[10px] text-stone-500 mt-0.5">Industrial & Logistics CRE · Dallas-Fort Worth</p>
            <p className="text-[10px] text-blue-600 mt-0.5">34,200 followers</p>
        </div>
        {/* Stats Row */}
        <div className="grid grid-cols-3 border-t border-stone-100 divide-x divide-stone-100">
            {[
                { label: 'Profile Views', val: '4,812', delta: '+340%' },
                { label: 'Search Appearances', val: '2,109', delta: '+180%' },
                { label: 'Post Impressions', val: '89K', delta: '+220%' },
            ].map((s, i) => (
                <div key={i} className="p-3 text-center">
                    <p className="text-xs font-bold text-stone-800">{s.val}</p>
                    <p className="text-[9px] text-stone-400">{s.label}</p>
                    <p className="text-[9px] text-emerald-500 font-semibold">{s.delta}</p>
                </div>
            ))}
        </div>
    </div>
);

// Network Growth Mockup
const NetworkGrowthMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
            <div>
                <h3 className="text-sm font-semibold text-stone-800 tracking-tight">New Connections This Month</h3>
                <p className="text-xs text-stone-500 mt-0.5">Target audience only</p>
            </div>
            <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-2.5 py-1 border border-blue-100">+182 this month</span>
        </div>
        <div className="space-y-3">
            {[
                { name: 'David Park', role: 'Managing Director · Blackstone Real Estate', tag: 'Family Office' },
                { name: 'Sarah Lin', role: 'CIO · Mesa Capital Partners', tag: 'Institutional' },
                { name: 'Omar Al-Rashid', role: 'Principal · Gulf Sovereign Fund', tag: 'International' },
                { name: 'Jennifer Wu', role: 'Partner · Bridge Multifamily REIT', tag: 'REIT' },
            ].map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 flex-shrink-0">
                            {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-stone-800">{c.name}</p>
                            <p className="text-[10px] text-stone-500 leading-tight">{c.role}</p>
                        </div>
                    </div>
                    <span className="text-[9px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded flex-shrink-0">{c.tag}</span>
                </div>
            ))}
        </div>
    </div>
);

export default function LinkedInRealEstatePage() {
    const profileBlocks = [
        {
            type: 'centered',
            title: 'The Real Estate Founders Who Win on LinkedIn',
            text: 'The commercial real estate principals generating consistent deal flow from LinkedIn are not the ones posting the most. They are the ones who have engineered a profile that communicates authority instantly — and a network composed entirely of the right people.'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: 'Your LinkedIn Profile Is Your Most Underused Capital Asset',
            text: "Institutional investors and family office allocators research LinkedIn before they pick up the phone. A weak profile — or worse, no profile — signals that your firm isn't operating at the level of capital they're deploying. The first impression costs you the conversation.",
            list: [
                'Capital allocators check LinkedIn before responding to any outreach.',
                'A generic headline and empty "About" section signals a mid-market operator.',
                'One precisely positioned profile can replace six months of conference attendance.'
            ],
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><LinkedInProfileMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[380px]'
        },
        {
            type: 'centered',
            title: 'How CloudSocial Engineers LinkedIn Authority',
            text: "CloudSocial rebuilds your LinkedIn from the ground up. We position your profile for the exact tier of capital and deal partners you want to reach, then grow a network that matches. When an investor lands on your profile, they should know within five seconds that you operate at their level."
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '1. Executive Profile Architecture',
            text: "We rewrite every element of your LinkedIn profile: headline, banner, featured section, about summary, and experience descriptions. Every word is chosen to communicate your market position, asset class expertise, and deal velocity to a sophisticated institutional audience.",
            list: [
                'Keyword-optimized headline for LinkedIn search visibility.',
                'Featured section that showcases market reports, press, and landmark deals.',
                'About summary that converts profile visitors into inbound inquiries.'
            ],
            imageSrc: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: '2. Surgical Network Expansion',
            text: 'Authority without the right audience is useless. We run a systematic, compliant outreach program to connect you directly with family offices, institutional LPs, synergistic deal partners, and senior decision-makers in your target capital stack — adding 150 to 250 high-quality connections per month.',
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><NetworkGrowthMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[380px]'
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '3. The Halo Effect on Your Firm',
            text: 'When the founder becomes the recognized voice of their asset class or market, every deal the firm touches benefits. Investors who have been following your content for six months respond differently to deal decks than cold prospects. The trust is already built before the conversation starts.',
            imageSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'faq',
            title: 'LinkedIn Growth Questions, Answered',
            faqs: [
                {
                    q: 'How long does it take to see results from LinkedIn positioning?',
                    a: 'Profile visibility and inbound message quality typically improve within the first 30 days of a profile rebuild. Network growth compounds over time — most clients see their first organic inbound from a target account within 60 to 90 days. The full authority flywheel, where inbound becomes consistent and predictable, typically activates between months three and six.'
                },
                {
                    q: 'Is LinkedIn actually used by institutional real estate investors?',
                    a: 'Heavily. Family offices, pension funds, REITs, and private equity real estate groups all use LinkedIn for market intelligence and to vet operators before committing capital. It is also the primary platform where CRE professionals announce major transactions, making it essential for deal flow visibility.'
                },
                {
                    q: 'Do you manage LinkedIn outreach on our behalf?',
                    a: 'Yes. We manage the full connection and follow-up outreach sequence on your behalf, using compliant methods within LinkedIn\'s Terms of Service. All messaging is written to sound natural and senior — not templated or salesy. Every message comes from your account in your voice.'
                },
                {
                    q: 'What is the difference between LinkedIn Growth and LinkedIn Content Strategy?',
                    a: 'LinkedIn Growth focuses on your profile architecture and network expansion — who knows you exist. LinkedIn Content Strategy is the ongoing publishing engine — what those people see from you every week. Both services work together: growth builds the audience, content builds the relationship. Most clients run both simultaneously.'
                },
                {
                    q: 'Can you help position multiple partners or principals at the same firm?',
                    a: 'Yes. We work with firms that want to build distributed authority across multiple partners or team members. We create differentiated positioning for each person so they own a distinct angle — one is the market data authority, another is the deal execution expert — creating a more robust institutional presence for the whole firm.'
                }
            ]
        },
        {
            type: 'pillar',
            title: 'LinkedIn is One Pillar of Total Market Dominance',
            text: 'The firms that become the default choice pair LinkedIn authority with content that drives reach, search rankings that generate inbound, and AI visibility that captures the next generation of search behavior.',
            links: [
                {
                    label: 'Content Engine',
                    path: '/linkedin-content-real-estate',
                    name: 'LinkedIn Content Strategy',
                    desc: 'Publish market insights, deal analysis, and thought leadership consistently to keep your growing network engaged and converting.'
                },
                {
                    label: 'Search Authority',
                    path: '/seo-real-estate',
                    name: 'Commercial Real Estate SEO',
                    desc: 'Capture high-intent organic search traffic from investors and brokers actively searching Google for CRE specialists in your market.'
                },
                {
                    label: 'AI Visibility',
                    path: '/aeo-geo-llms-real-estate',
                    name: 'AEO & GEO for LLMs',
                    desc: 'Become the firm ChatGPT and Perplexity AI cite when capital allocators ask AI for the top real estate operators in your space.'
                }
            ]
        },
        {
            type: 'cta',
            title: 'Your profile is being read right now by someone with capital.',
            text: 'Find out exactly what it says about your firm — and what it should say. Book a free LinkedIn Authority Audit.',
            buttonText: 'Get Your Free LinkedIn Audit'
        }
    ];

    return (
        <main className="min-h-screen bg-white text-secondary">
            <Navbar />

            <PageHero
                title1="LinkedIn for Real Estate Agents & Firms"
                title2="Build Authority. Generate Leads."
                subtitle="Position your firm as the definitive voice in your asset class. We engineer the profile, grow the right network, and build the content flywheel that turns LinkedIn into a consistent source of investor deal flow."
                badges={["LinkedIn for Real Estate", "Institutional Network Growth", "Authority Positioning"]}
                buttonText="Get Your Free LinkedIn Audit"
                imageSrc="/images/service_linkedin_profile_1772097044725.png"
            />

            <AlternatingSection blocks={profileBlocks} />

            <Footer />
        </main>
    );
}
