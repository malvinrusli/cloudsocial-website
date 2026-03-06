import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import AlternatingSection from '../components/AlternatingSection';

export const metadata = {
    title: "Real Estate AI Chatbot for Commercial Firms | 24/7 Lead Qualification | CloudSocial",
    description: "CloudSocial builds real estate AI chatbots for commercial firms. Qualify investors on your website and WhatsApp, book meetings automatically, and sync every lead to your CRM.",
};

// WhatsApp Chat Mockup
const WhatsAppMockup = () => (
    <div className="w-full bg-white  border border-stone-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* WhatsApp Header */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 full bg-white/20 flex items-center justify-center">
                <div className="w-4 h-4 full bg-white/60"></div>
            </div>
            <div>
                <p className="text-white text-xs font-semibold">CloudSocial AI Agent</p>
                <p className="text-white/60 text-[10px]">Online · Responds instantly</p>
            </div>
            <div className="ml-auto w-2 h-2 full bg-emerald-400 animate-pulse"></div>
        </div>
        {/* Chat Body */}
        <div className="bg-[#ECE5DD] p-4 space-y-3 min-h-[280px]">
            {/* Agent message */}
            <div className="flex justify-start">
                <div className="bg-white  tl-none px-4 py-2.5 max-w-[75%] shadow-sm">
                    <p className="text-[11px] text-stone-800 leading-relaxed">Hi, I'm the Meridian Capital AI assistant. Are you looking to invest, lease, or sell a commercial property today?</p>
                    <p className="text-[9px] text-stone-400 mt-1 text-right">09:32 ✓✓</p>
                </div>
            </div>
            {/* User message */}
            <div className="flex justify-end">
                <div className="bg-[#DCF8C6]  tr-none px-4 py-2.5 max-w-[75%] shadow-sm">
                    <p className="text-[11px] text-stone-800 leading-relaxed">Looking to invest — multifamily in Texas, around $5M</p>
                    <p className="text-[9px] text-stone-400 mt-1 text-right">09:33 ✓✓</p>
                </div>
            </div>
            {/* Agent follow-up */}
            <div className="flex justify-start">
                <div className="bg-white  tl-none px-4 py-2.5 max-w-[75%] shadow-sm">
                    <p className="text-[11px] text-stone-800 leading-relaxed">Excellent. Are you targeting a specific market — DFW, Austin, Houston, or San Antonio? And what's your preferred minimum yield?</p>
                    <p className="text-[9px] text-stone-400 mt-1 text-right">09:33 ✓✓</p>
                </div>
            </div>
            {/* Qualified badge */}
            <div className="flex justify-center">
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 full border border-emerald-200">Lead Qualified · Routing to Calendar</span>
            </div>
        </div>
    </div>
);

// CRM Sync Mockup
const CRMSyncMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
            <div>
                <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Lead Pipeline — Today</h3>
                <p className="text-xs text-stone-500 mt-0.5">Auto-synced from AI Agent</p>
            </div>
            <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-2.5 py-1 d border border-blue-100">CRM Live</span>
        </div>
        <div className="space-y-3">
            {[
                { name: 'James H.', status: 'Qualified', intent: '$8M Multifamily · DFW', time: '2m ago', color: 'emerald' },
                { name: 'Sandra K.', status: 'Meeting Booked', intent: 'Industrial Lease · Chicago', time: '14m ago', color: 'blue' },
                { name: 'Raj M.', status: 'Nurturing', intent: 'Office Investment · NYC', time: '1h ago', color: 'amber' },
                { name: 'Lin C.', status: 'Qualified', intent: '$12M Retail · LA', time: '2h ago', color: 'emerald' },
            ].map((lead, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-stone-50 g border border-stone-100">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 full bg-stone-200 flex items-center justify-center text-[10px] font-semibold text-stone-600 flex-shrink-0">
                            {lead.name[0]}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-stone-800">{lead.name}</p>
                            <p className="text-[10px] text-stone-500">{lead.intent}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 full ${lead.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : lead.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                            {lead.status}
                        </span>
                        <p className="text-[9px] text-stone-400 mt-1">{lead.time}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function AIAgentRealEstatePage() {
    const agentBlocks = [
        {
            type: 'centered',
            title: 'The 5-Minute Response Window',
            text: 'Studies consistently show that responding to a real estate inquiry within five minutes increases conversion by over 400%. At 2 AM, on Sunday, during a conference — your AI agent is already responding, qualifying, and routing every single lead that comes in.'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: 'Every Missed Inquiry Is a Missed Transaction',
            text: "The average commercial real estate firm loses 60% of inbound leads to slow response times. Institutional investors and motivated buyers don't wait — they move on to the next firm that replies first. Your AI agent ends this permanently.",
            list: [
                'Responds to every website and WhatsApp inquiry within seconds, not hours.',
                'Engages in natural language — not robotic scripts that drive prospects away.',
                'Works across time zones, weekends, and market hours without interruption.'
            ],
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><WhatsAppMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[420px]'
        },
        {
            type: 'centered',
            title: 'How CloudSocial Builds Your AI Agent',
            text: "CloudSocial doesn't plug in an off-the-shelf chatbot. We train a dedicated AI agent on your firm, your asset classes, your markets, and your qualification criteria. The result: every conversation sounds like your best broker, not a help desk."
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '1. Intent-Based Lead Qualification',
            text: "Your AI agent doesn't just collect names and email addresses. It asks the right questions to determine deal size, asset preference, geography, timeline, and capital availability. It filters out tire-kickers before they reach your inbox.",
            list: [
                'Budget and equity position qualification.',
                'Asset class, submarket, and return threshold discovery.',
                'Timeline and decision-making authority verification.'
            ],
            imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: '2. Instant Calendar Routing',
            text: 'The moment a lead meets your qualification criteria, the agent books a meeting directly onto your calendar using Calendly or your preferred booking tool. No back-and-forth emails, no dropped balls. The lead goes from inquiry to confirmed meeting without human intervention.',
            imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '3. Automatic CRM Sync and Handoff',
            text: 'Every conversation is summarized, tagged, and pushed directly into your CRM. Your team receives a full briefing — budget, intent, timeline, and key qualifiers — before the first call. You walk into every meeting already knowing your prospect.',
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><CRMSyncMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[380px]'
        },
        {
            type: 'faq',
            title: 'AI Agent Questions, Answered',
            faqs: [
                {
                    q: 'Will my prospects know they are talking to an AI?',
                    a: 'That depends on your preference. We can configure your agent to be fully transparent about being an AI assistant, or to operate as a branded virtual concierge without explicit identification. Most of our clients opt for a branded persona — "Meridian Assistant" — which maintains a premium experience without the impersonal feel of a generic chatbot.'
                },
                {
                    q: 'Which platforms does the AI agent work on?',
                    a: 'We deploy your agent on your website (as a live chat widget), WhatsApp Business, and optionally on Instagram DMs and Facebook Messenger. WhatsApp is particularly effective for commercial real estate because it is the preferred communication channel for international investors and high-net-worth individuals.'
                },
                {
                    q: 'How does the agent handle complex or unusual questions?',
                    a: 'The agent is trained on your firm\'s specific knowledge base — including your deals, asset classes, market reports, and FAQs. For questions outside its knowledge scope, it gracefully escalates to a human team member rather than providing a wrong answer. It never guesses or fabricates information.'
                },
                {
                    q: 'Can the agent qualify leads in multiple languages?',
                    a: 'Yes. Our AI agents support multilingual conversations and automatically detect and respond in the language the prospect initiates contact in. This is particularly valuable for firms targeting international capital from Latin America, the Middle East, or Southeast Asia.'
                },
                {
                    q: 'What CRM systems do you integrate with?',
                    a: 'We integrate with all major CRM platforms including HubSpot, Salesforce, Pipedrive, Zoho, Follow Up Boss, and any system with a standard API or webhook support. All qualified lead data — including conversation summaries — is pushed automatically without manual data entry.'
                }
            ]
        },
        {
            type: 'pillar',
            title: 'One Piece of a Complete Authority System',
            text: 'Your AI agent qualifies the leads your digital presence generates. Make sure those leads are being generated at scale — through search, AI engines, and social authority.',
            links: [
                {
                    label: 'Search Domination',
                    path: '/seo-real-estate',
                    name: 'Commercial Real Estate SEO',
                    desc: 'Rank at the top of Google for the high-intent search terms institutional investors use to find CRE specialists in your market.'
                },
                {
                    label: 'AI Visibility',
                    path: '/aeo-geo-llms-real-estate',
                    name: 'AEO & GEO for LLMs',
                    desc: 'Ensure your firm is the answer ChatGPT, Perplexity, and Gemini give when investors ask who the top brokers are in your market.'
                },
                {
                    label: 'B2B Authority',
                    path: '/linkedin-real-estate',
                    name: 'LinkedIn Growth & Positioning',
                    desc: 'Build a LinkedIn presence that positions your firm as the default choice for institutional investors and family offices.'
                }
            ]
        },
        {
            type: 'cta',
            title: 'Stop letting qualified leads go cold.',
            text: 'We build and deploy your custom AI agent in two weeks. Book a strategy call to see a live demo.',
            buttonText: 'Book a Live Agent Demo'
        }
    ];

    return (
        <main className="min-h-screen bg-white text-secondary">
            <Navbar />

            <PageHero
                title1="Real Estate AI Chatbot"
                title2="for Commercial Firms"
                subtitle="A custom-built AI chatbot on your website and WhatsApp that responds to every investor inquiry in seconds, qualifies their intent, books meetings, and syncs to your CRM automatically."
                badges={["Real Estate AI Chatbot", "WhatsApp Lead Qualification", "24/7 Automation", "Instant CRM Sync"]}
                buttonText="Book a Live Agent Demo"
                imageSrc="/images/service_aeo_geo_1772097165825.png"
            />

            <AlternatingSection blocks={agentBlocks} />

            <Footer />
        </main>
    );
}
