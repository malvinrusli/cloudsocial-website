import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { pricingData } from '@/app/lib/pricing-data';

export default async function PricingPage({ params }) {
    const { lang } = await params;
    const data = pricingData[lang] || pricingData.en;

    return (
        <main className="min-h-screen bg-white">
            <Navbar lang={lang} />

            <section className="pt-40 pb-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-sans font-medium text-secondary tracking-tight mb-6">
                            {lang === 'id' ? 'Daya Ungkit Eksponensial' : 'Compounding Leverage'}
                        </h1>
                        <p className="text-lg md:text-xl font-sans font-light text-textDark/60 max-w-2xl mx-auto leading-relaxed">
                            {lang === 'id'
                                ? 'Kami membangun infrastruktur digital yang bertindak sebagai benteng pertahanan bagi bisnis Anda. Investasi dihitung berdasarkan kompleksitas teknis dan kedalaman otoritas yang diperlukan.'
                                : 'We build digital infrastructure that acts as a secure moat for your business. Investment is calculated based on the technical complexity and authority depth required.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {data.tiers.map((tier, idx) => {
                            const isHighlight = idx === 1; // Middle tier is usually highlighted
                            return (
                                <div
                                    key={idx}
                                    className={`relative p-8 md:p-10 flex flex-col border ${isHighlight ? 'border-secondary bg-[#0D0D0D] text-white' : 'border-gray-100 bg-white text-secondary'} transition-all duration-300 hover:shadow-2xl`}
                                >
                                    {isHighlight && (
                                        <div className="absolute top-0 right-10 -translate-y-1/2 bg-secondary text-primary px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest">
                                            {lang === 'id' ? 'Paling Populer' : 'Most Popular'}
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className={`text-2xl font-medium mb-4 ${isHighlight ? 'text-white' : 'text-secondary'}`}>{tier.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-2xl font-sans font-medium opacity-60">{data.symbol}</span>
                                            <span className="text-4xl md:text-5xl font-sans font-semibold tracking-tighter">{tier.price}</span>
                                            <span className={`text-sm ${isHighlight ? 'text-white/40' : 'text-secondary/40'}`}>{data.suffix}</span>
                                        </div>
                                        <p className={`text-[11px] font-mono ${isHighlight ? 'text-white/30' : 'text-secondary/30'}`}>{tier.setup}</p>
                                    </div>

                                    <p className={`text-sm leading-relaxed mb-8 ${isHighlight ? 'text-white/60' : 'text-textDark/70'}`}>
                                        {tier.description}
                                    </p>

                                    <ul className="space-y-4 mb-10 flex-1">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <svg className={`w-4 h-4 mt-0.5 shrink-0 ${isHighlight ? 'text-emerald-400' : 'text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span className={`text-[13px] ${isHighlight ? 'text-white/80' : 'text-secondary/80'}`}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`w-full py-4 rounded-md font-sans text-sm font-semibold tracking-wide transition-all duration-300 ${isHighlight ? 'bg-primary text-secondary hover:bg-white' : 'bg-secondary text-primary hover:bg-textDark'}`}>
                                        {lang === 'id' ? 'Mulai Sekarang' : 'Start Now'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-20 p-8 border border-gray-100 text-center bg-gray-50/30">
                        <p className="text-sm text-textDark/50 font-sans italic">
                            {lang === 'id'
                                ? 'Harga kustom tersedia untuk portofolio perusahaan dan grup pengembang multi-pasar.'
                                : 'Custom pricing available for enterprise portfolios and multi-market developer groups.'}
                            {" "}
                            <a href="#" className="underline text-secondary font-medium decoration-gray-300 hover:decoration-secondary transition-all">
                                {lang === 'id' ? 'Hubungi untuk Enterprise' : 'Enquire for Enterprise'}
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer lang={lang} />
        </main>
    );
}
