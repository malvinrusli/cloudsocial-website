"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/app/lib/dictionaries';

const Footer = ({ lang: propLang }) => {
    const params = useParams();
    const lang = propLang || params?.lang || 'en';
    const dict = getDictionary(lang);

    return (
        <footer className="w-full bg-[#050508] text-white px-8 md:px-16 pt-20 pb-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

                {/* Brand Column */}
                <div className="max-w-xs">
                    <div className="flex items-center mb-6">
                        <div
                            className="relative w-7 h-7 mr-3 flex-shrink-0 text-white"
                            style={{ transform: 'scaleX(-1)' }}
                        >
                            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                                <path d="M 50 100 L 100 100 L 100 50 A 50 50 0 0 1 50 100 Z" />
                                <path d="M 25 100 A 75 75 0 0 1 79 28 L 79 43.8 A 60 60 0 0 0 40 100 Z" />
                                <path d="M 0 100 A 100 100 0 0 1 56.4 10 L 56.4 27 A 85 85 0 0 0 15 100 Z" />
                            </svg>
                        </div>
                        <h2 className="font-serif text-2xl font-semibold">Promperty</h2>
                    </div>
                    {dict.footer.tagline}

                    {/* Status Indicator */}
                    <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 mt-6">
                        <div className="w-2 h-2 full bg-green-500 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                        <span className="font-sans font-medium text-xs text-gray-300 tracking-wide">{lang === 'id' ? 'Sistem Beroperasi' : 'System Operational'}</span>
                    </div>
                </div>

                {/* Navigation Grid */}
                <div className="flex gap-16 md:gap-32 font-sans text-sm">
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-sans font-semibold text-white mb-2">{dict.footer.expertise}</h4>
                        <a href={`/${lang}/web-architecture-real-estate`} className="text-gray-400 hover:text-white transition-colors">Web Architecture</a>
                        <a href={`/${lang}/seo-real-estate`} className="text-gray-400 hover:text-white transition-colors">Search Authority</a>
                        <a href={`/${lang}/aeo-geo-llms-real-estate`} className="text-gray-400 hover:text-white transition-colors">AI Visibility (GEO)</a>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-sans font-semibold text-white mb-2">{dict.footer.company}</h4>
                        <a href={`/${lang}#how`} className="text-gray-400 hover:text-white transition-colors">{lang === 'id' ? 'Peta Jalan' : 'Roadmap'}</a>
                        <a href={`/${lang}#case`} className="text-gray-400 hover:text-white transition-colors">{lang === 'id' ? 'Studi Kasus' : 'Case Studies'}</a>
                        <a href={`/${lang}/pricing`} className="text-gray-400 hover:text-white transition-colors">{lang === 'id' ? 'Harga Regional' : 'Regional Pricing'}</a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans">
                <p>© {new Date().getFullYear()} Promperty. Authority Infrastructure.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
