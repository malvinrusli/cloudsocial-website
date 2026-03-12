"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/app/lib/dictionaries';

const Footer = ({ lang: propLang }) => {
    const params = useParams();
    const lang = propLang || params?.lang || 'en';
    const dict = getDictionary(lang);

    return (
        <footer className="w-full bg-[#08080A] text-white px-8 md:px-16 pt-32 pb-16 border-t border-white/5 relative z-20 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-[#B38A4A]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">

                    {/* Brand Section */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center mb-8 group cursor-pointer">
                            <div
                                className="relative w-8 h-8 mr-4 flex-shrink-0 text-white transition-transform duration-500 group-hover:scale-110"
                                style={{ transform: 'scaleX(-1)' }}
                            >
                                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                                    <path d="M 50 100 L 100 100 L 100 50 A 50 50 0 0 1 50 100 Z" />
                                    <path d="M 25 100 A 75 75 0 0 1 79 28 L 79 43.8 A 60 60 0 0 0 40 100 Z" />
                                    <path d="M 0 100 A 100 100 0 0 1 56.4 10 L 56.4 27 A 85 85 0 0 0 15 100 Z" />
                                </svg>
                            </div>
                            <h2 className="font-sans text-3xl font-semibold tracking-tight text-white uppercase italic">Promperty</h2>
                        </div>

                        <p className="font-sans text-lg text-gray-400 leading-relaxed mb-10 max-w-sm">
                            {dict.footer.tagline}
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">{dict.footer.contact_label}</span>
                                <a href="mailto:hello@promperty.io" className="text-sm font-medium hover:text-primary transition-colors">hello@promperty.io</a>
                            </div>

                            {/* Status Indicator */}
                            <div className="inline-flex items-center space-x-3 bg-white/[0.03] border border-white/[0.08] px-4 py-2 self-start rounded-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="font-sans font-medium text-[10px] text-gray-400 uppercase tracking-widest leading-none">{dict.footer.status_operational}</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="flex flex-col space-y-6">
                            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{dict.footer.expertise}</h4>
                            <nav className="flex flex-col space-y-4 text-[13px]">
                                <a href={`/${lang}/web-architecture-real-estate`} className="text-gray-400 hover:text-white transition-colors duration-300">Web Architecture</a>
                                <a href={`/${lang}/seo-real-estate`} className="text-gray-400 hover:text-white transition-colors duration-300">Search Authority</a>
                                <a href={`/${lang}/aeo-geo-llms-real-estate`} className="text-gray-400 hover:text-white transition-colors duration-300">AI Visibility (GEO)</a>
                                <a href={`/${lang}/content-real-estate`} className="text-gray-400 hover:text-white transition-colors duration-300">Content Engine</a>
                            </nav>
                        </div>

                        <div className="flex flex-col space-y-6">
                            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{dict.footer.company}</h4>
                            <nav className="flex flex-col space-y-4 text-[13px]">
                                <a href={`/${lang}#how`} className="text-gray-400 hover:text-white transition-colors duration-300">{lang === 'id' ? 'Peta Jalan' : 'Roadmap'}</a>
                                <a href={`/${lang}#case`} className="text-gray-400 hover:text-white transition-colors duration-300">{lang === 'id' ? 'Studi Kasus' : 'Case Studies'}</a>
                                <a href={`/${lang}/pricing`} className="text-gray-400 hover:text-white transition-colors duration-300">{lang === 'id' ? 'Harga Regional' : 'Regional Pricing'}</a>
                                <a href={`/${lang}/blogs`} className="text-gray-400 hover:text-white transition-colors duration-300">Journal</a>
                            </nav>
                        </div>

                        <div className="flex flex-col space-y-6 col-span-2 md:col-span-1">
                            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">{dict.footer.connect}</h4>
                            <nav className="flex flex-col space-y-4 text-[13px]">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Instagram</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Twitter</a>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium italic">
                            © {new Date().getFullYear()} Promperty. {dict.footer.all_rights}
                        </p>
                        <span className="hidden md:block w-1.5 h-1.5 bg-white/[0.05] rounded-full"></span>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                            {dict.footer.tagline}
                        </p>
                    </div>

                    <div className="flex items-center gap-12">
                        <a href="#" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-colors">{dict.footer.privacy}</a>
                        <a href="#" className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-colors">{dict.footer.terms}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
