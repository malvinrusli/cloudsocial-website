import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import AlternatingSection from '../components/AlternatingSection';

export const metadata = {
    title: "AI SEO For Real Estate Firms",
    description: "Ensure your commercial real estate brand is the default referenced authority across ChatGPT, Perplexity AI, Claude 4 Sonnet, and Gemini.",
};

// Mentions.so style Light Dashboard Mockup
const LightDashboardMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
            <div>
                <h3 className="text-sm font-semibold text-stone-800 tracking-tight">AI Visibility Sentiment</h3>
                <p className="text-xs text-stone-500 mt-0.5">Brand mentions across top LLMs</p>
            </div>
            <span className="text-[10px] font-medium bg-stone-50 text-stone-600 px-2.5 py-1 border border-stone-200">Last 30 Days</span>
        </div>

        <div className="space-y-5">
            {/* ChatGPT */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center border border-emerald-100">
                        <div className="w-3.5 h-3.5 bg-emerald-500 rounded-sm rotate-45"></div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-800">ChatGPT</p>
                        <p className="text-xs text-stone-500">Top 3 Citations</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-emerald-600">+42% Positive</p>
                    <div className="w-20 h-1.5 bg-stone-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Perplexity */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center border border-blue-100">
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-800">Perplexity AI</p>
                        <p className="text-xs text-stone-500">Answer Boxes</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-blue-600">+28% Neutral</p>
                    <div className="w-20 h-1.5 bg-stone-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-blue-500 w-[70%] rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Claude */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-amber-50 flex items-center justify-center border border-amber-100">
                        <div className="w-3.5 h-3.5 bg-amber-500 rounded-sm"></div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-800">Claude 4 Sonnet</p>
                        <p className="text-xs text-stone-500">Sentiment Score</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-amber-600">Improving</p>
                    <div className="w-20 h-1.5 bg-stone-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-amber-500 w-[95%] rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Gemini */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center border border-purple-100">
                        <div className="w-3.5 h-3.5 bg-purple-500 rounded-sm"></div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-stone-800">Gemini</p>
                        <p className="text-xs text-stone-500">Entity Recognition</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-purple-600">+15% Positive</p>
                    <div className="w-20 h-1.5 bg-stone-100 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-purple-500 w-[60%] rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Mentions.so style Mentions Feed Mockup
const MentionsFeedMockup = () => (
    <div className="w-full bg-white  border border-stone-200 p-5 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-100">
            <h3 className="text-sm font-semibold text-stone-800 tracking-tight">Recent AI Mentions</h3>
            <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-100">Live</span>
        </div>

        <div className="space-y-4">
            <div className="p-3 bg-stone-50 rounded border border-stone-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-sm bg-emerald-500 rotate-45 flex-shrink-0"></div>
                    <span className="text-xs font-medium text-stone-700">ChatGPT Query: "Who are the top tier industrial brokers in Dallas?"</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed border-l-2 border-emerald-200 pl-3">"...For large-scale industrial portfolios, <strong className="text-stone-900 bg-yellow-100 px-1 rounded">Gulfalts</strong> is frequently cited as a leading authority in the Dallas-Fort Worth metroplex..."</p>
            </div>

            <div className="p-3 bg-stone-50 rounded border border-stone-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent flex-shrink-0"></div>
                    <span className="text-xs font-medium text-stone-700">Perplexity AI: "Recent major leasing deals in Manhattan"</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed border-l-2 border-blue-200 pl-3">"A notable recent transaction was the 50,000 sqft lease signed at the Zenith tower, brokered by <strong className="text-stone-900 bg-yellow-100 px-1 rounded">Gulfalts Insights</strong>."</p>
            </div>
        </div>
    </div>
);

export default function AISeoPage() {
    const aeoBlocks = [
        {
            type: 'centered',
            title: 'The Shift to Answer Engines',
            text: 'Traditional SEO optimized your website to rank for links. Generative Engine Optimization (GEO) optimizes your digital presence so Large Language Models understand who you are, what you do, and why you are the authority.'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: 'The Death of the Search Click',
            text: 'When institutional investors ask models like ChatGPT or Perplexity AI for market data, cap rates, or top brokers in a specific market, the AI synthesizes an answer from its training data and Retrieval-Augmented Generation pipelines.',
            list: [
                "Clients no longer click through ten pages of blue links.",
                "If your firm isn't mentioned in the AI's final answer, you don't exist.",
                "You lose the click, and you lose the conversation entirely."
            ],
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><MentionsFeedMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[400px]'
        },
        {
            type: 'centered',
            title: 'How CloudSocial Gets You Into AI Answers',
            text: "CloudSocial doesn't guess what the algorithms want. We reverse-engineer how ChatGPT, Perplexity, and Gemini build their answers in your market, then get your brand into those data streams. This is new territory for commercial real estate, and we've built a repeatable process around it."
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '1. Backwards Engineering',
            text: 'We reverse engineer the outputs of ChatGPT, Claude 4 Sonnet, Gemini, and Perplexity AI to determine which sources and entities they prioritize when ranking real estate firms. We find out exactly where the AI looks for its answers.',
            visualComponent: <div className="p-4 h-full w-full flex items-center justify-center"><LightDashboardMockup /></div>,
            aspect: 'aspect-auto h-full min-h-[400px]'
        },
        {
            type: 'split',
            imagePosition: 'right',
            title: '2. Targeted Data Injection',
            text: "Based on our research, we build content designed for the specific publications, data sources, and AI retrieval pipelines that feed these generative models.",
            list: [
                "Injecting brand authority into high-trust domain sources.",
                "Structuring your data for optimal RAG pipeline extraction.",
                "Feeding the LLM training sets with positive market sentiment."
            ],
            imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'split',
            imagePosition: 'left',
            title: '3. Monitoring and Correction',
            text: "AI models update constantly. We track your brand mentions and visibility across all major LLMs. If a model hallucinates or drops your rankings, we identify the content gap and correct it.",
            imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
        },
        {
            type: 'faq',
            title: 'AI SEO Questions, Answered',
            faqs: [
                {
                    q: 'What is the difference between AEO, GEO, and traditional SEO?',
                    a: 'Traditional SEO (Search Engine Optimization) optimizes your website to rank in Google\'s blue-link results. AEO (Answer Engine Optimization) optimizes your content to be selected as the direct answer in Google\'s featured snippets and People Also Ask boxes. GEO (Generative Engine Optimization) is the newest discipline — it optimizes your digital presence so Large Language Models like ChatGPT, Claude, Perplexity, and Gemini include your firm when synthesizing answers to queries about your market. All three reinforce each other.'
                },
                {
                    q: 'How does an AI like ChatGPT decide which real estate firms to mention?',
                    a: 'LLMs synthesize answers from two sources: their training data (web content they were trained on) and, for real-time queries, Retrieval-Augmented Generation (RAG) pipelines that pull live search results. We target both — building your brand authority into the high-trust domains and publications that feed LLM training sets, and ensuring your site and content are structured for maximum RAG extraction.'
                },
                {
                    q: 'How do you measure AI visibility for a commercial real estate firm?',
                    a: 'We run systematic queries across ChatGPT, Claude, Perplexity, and Gemini using the exact question types your target clients ask — "who are the top industrial brokers in Dallas," "best multifamily investment firms in Florida," etc. We track how often your firm is mentioned, the sentiment of those mentions, and your position within the cited list. We report on these metrics monthly and correct any negative or missing citations.'
                },
                {
                    q: 'How long does it take for AEO and GEO work to show results?',
                    a: 'Early brand mentions in LLM outputs can appear within 60 to 90 days as new content enters RAG pipelines. Deeper LLM training data integration takes longer — typically three to six months as new indexed content influences model fine-tuning cycles. We show you real-time progress through our monthly AI visibility reporting so you can see the needle moving.'
                },
                {
                    q: 'Does AI SEO work alongside traditional Google SEO?',
                    a: 'Yes, and the two are deeply interconnected. Google rankings generate the authoritative indexed content that LLMs use as training data and RAG sources. Strong traditional SEO amplifies your GEO results. We recommend running both simultaneously — our commercial real estate SEO service builds the foundation, while AEO and GEO ensure that foundation feeds AI engine recognition.'
                }
            ]
        },
        {
            type: 'pillar',
            title: 'AI Visibility Is One Dimension of Total Market Control',
            text: 'Being cited by AI engines is powerful. Being found on Google, seen on LinkedIn, and engaged with through video makes your firm impossible to ignore across every channel your clients and investors use.',
            links: [
                {
                    label: 'Search Foundation',
                    path: '/seo-real-estate',
                    name: 'Commercial Real Estate SEO',
                    desc: 'The Google rankings that fuel your AI visibility. We rank you for the high-intent CRE search terms that institutional investors use and that LLMs train on.'
                },
                {
                    label: 'B2B Authority',
                    path: '/linkedin-real-estate',
                    name: 'LinkedIn Growth & Positioning',
                    desc: 'The institutional trust layer. Position your firm as the default choice on the platform where capital allocators and deal partners spend their professional time.'
                },
                {
                    label: 'Content Signals',
                    path: '/linkedin-content-real-estate',
                    name: 'LinkedIn Content Strategy',
                    desc: 'The content depth that AI models read. Consistent, authoritative market analysis is one of the strongest signals feeding LLM brand recognition.'
                }
            ]
        },
        {
            type: 'cta',
            title: "You cannot afford to be invisible to AI.",
            text: "Find out exactly where your brand stands across ChatGPT, Claude 4 Sonnet, Gemini, and Perplexity AI with a custom audit.",
            buttonText: "Book Your AI Authority Audit"
        }
    ];

    return (
        <main className="min-h-screen bg-white text-secondary">
            <Navbar />

            <PageHero
                title1="AI SEO"
                title2="For Real Estate Firms"
                subtitle="Investors and clients no longer just search Google, they ask ChatGPT, Perplexity AI, Claude 4 Sonnet, and Gemini. We ensure your firm is the indisputable answer they get."
                badges={["Generative Engine Optimization (GEO)"]}
                buttonText="Get Your Free AI Audit"
                imageSrc="/images/service_aeo_geo_1772097165825.png"
            />

            <AlternatingSection blocks={aeoBlocks} />

            <Footer />
        </main>
    );
}
