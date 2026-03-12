"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/app/lib/dictionaries';

const NavLink = ({ href, children }) => (
    <a
        href={href}
        className="hover:text-primary transition-colors duration-300 relative group py-2"
    >
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </a>
);

const NavButton = ({ children }) => (
    <span className="hover:text-primary transition-all duration-300 relative cursor-pointer">
        {children}
    </span>
);

const Navbar = ({ lang: propLang }) => {
    const params = useParams();
    const lang = propLang || params?.lang || 'en';
    const dict = getDictionary(lang);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const wrapperRef = useRef(null);
    const navRef = useRef(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Handle background blur/shrink
            if (currentScrollY > 50) {
                setIsScrolled(true);
                navRef.current?.classList.add('scrolled');
                wrapperRef.current?.classList.add('scrolled-wrapper');
            } else {
                setIsScrolled(false);
                navRef.current?.classList.remove('scrolled');
                wrapperRef.current?.classList.remove('scrolled-wrapper');
            }

            // Handle hide on scroll down, show on scroll up
            if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Trending Top Bar */}
            <a href={`/${lang}/aeo-geo-llms-real-estate`} className="absolute top-0 left-0 right-0 bg-[linear-gradient(90deg,#B38A4A,#D4AF37,#F9F0AC,#D4AF37,#B38A4A)] bg-[length:200%_auto] animate-gradient text-stone-900 py-2 px-4 flex justify-center items-center z-[60] font-sans text-xs md:text-sm font-medium tracking-wide shadow-md transition-all hover:opacity-90 cursor-pointer group">
                <span className="flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform duration-300">
                    <span className="w-2 h-2 rounded-full bg-stone-900 shadow-[0_0_8px_rgba(28,25,23,0.3)] animate-pulse"></span>
                    <span className="font-bold tracking-widest uppercase text-[10px] md:text-xs text-stone-900/90">{dict.nav.trending}:</span>
                    <span className="font-medium">{dict.nav.trending_text}</span>
                    <svg className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
            </a>

            {/* Navbar Container */}
            <div
                ref={wrapperRef}
                className={`fixed top-12 left-0 right-0 z-50 flex justify-center px-4 w-full transition-all duration-500 nav-wrapper ${isHidden ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
                <nav
                    ref={navRef}
                    className="flex items-center justify-between w-[95%] max-w-7xl px-8 py-4 transition-all duration-1000 ease-in-out bg-transparent border border-transparent nav-container text-secondary mx-auto"
                >
                    <a href={`/${lang}`} className="font-serif font-semibold tracking-wider text-2xl flex items-center hover:opacity-80 transition-opacity">
                        <div
                            className="relative w-7 h-7 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 text-secondary"
                            style={{ transform: 'scaleX(-1)' }}
                        >
                            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-sm">
                                <path d="M 50 100 L 100 100 L 100 50 A 50 50 0 0 1 50 100 Z" />
                                <path d="M 25 100 A 75 75 0 0 1 79 28 L 79 43.8 A 60 60 0 0 0 40 100 Z" />
                                <path d="M 0 100 A 100 100 0 0 1 56.4 10 L 56.4 27 A 85 85 0 0 0 15 100 Z" />
                            </svg>
                        </div>
                        <span className="hidden sm:inline">Promperty</span>
                    </a>

                    <div className="hidden md:flex space-x-12 font-sans text-sm tracking-wide font-medium items-center">
                        {/* Services dropdown */}
                        <div className="relative group/dropdown">
                            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity py-2">
                                <NavButton>{dict.nav.services}</NavButton>
                                <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover/dropdown:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-300 z-50">
                                <div className="w-72 bg-white shadow-2xl border border-gray-100 flex flex-col py-3 overflow-hidden text-textDark rounded-sm">
                                    <a href={`/${lang}/services`} className="px-6 py-3 hover:bg-gray-50 hover:text-secondary hover:pl-7 transition-all text-[13px] font-bold text-secondary uppercase tracking-widest border-b border-gray-50">{dict.nav.services} Overview</a>

                                    <div className="py-2">
                                        <p className="px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{lang === 'id' ? 'Industri' : 'Industries'}</p>
                                        <a href={`/${lang}/industries/commercial-real-estate`} className="px-6 py-2.5 hover:bg-gray-50 hover:text-secondary hover:pl-7 transition-all text-[13px] font-medium block">Commercial Real Estate</a>
                                        <a href={`/${lang}/industries/built-environment`} className="px-6 py-2.5 hover:bg-gray-50 hover:text-secondary hover:pl-7 transition-all text-[13px] font-medium block">Built Environment</a>
                                        <a href={`/${lang}/industries/architects`} className="px-6 py-2.5 hover:bg-gray-50 hover:text-secondary hover:pl-7 transition-all text-[13px] font-medium block">Architects & Interiors</a>
                                    </div>

                                    <div className="py-2 border-t border-gray-50">
                                        <p className="px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{lang === 'id' ? 'Solusi' : 'Solutions'}</p>
                                        <a href={`/${lang}/web-architecture-real-estate`} className="px-6 py-2.5 hover:bg-gray-50 hover:text-secondary hover:pl-7 transition-all text-[13px] block">Web Architecture</a>
                                        <a href={`/${lang}/seo-real-estate`} className="px-6 py-2.5 hover:bg-gray-50 hover:text-secondary hover:pl-7 transition-all text-[13px] block">Search Authority (SEO)</a>
                                        <a href={`/${lang}/aeo-geo-llms-real-estate`} className="px-6 py-2.5 hover:bg-gray-50 hover:text-secondary hover:pl-7 transition-all text-[13px] block">AI Visibility (GEO)</a>
                                        <a href={`/${lang}/ai-agent-real-estate`} className="px-6 py-2.5 hover:bg-gray-50 hover:text-secondary hover:pl-7 transition-all text-[13px] block">AI Lead Capture</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavLink href={`/${lang}#how`}>{lang === 'id' ? 'Strategi' : 'Philosophy'}</NavLink>
                        <NavLink href={`/${lang}/case-studies`}>{lang === 'id' ? 'Hasil' : 'Outcomes'}</NavLink>
                        <NavLink href={`/${lang}/pricing`}>{dict.nav.pricing}</NavLink>
                        <NavLink href={`/${lang}/blogs`}>{dict.nav.blogs}</NavLink>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            className="relative overflow-hidden px-8 py-3 rounded-md font-sans text-sm font-semibold tracking-wide bg-secondary text-primary transition-all duration-300 group hover:shadow-lg hidden sm:block"
                            onClick={() => window.location.href = `/${lang}/pricing`}
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">{lang === 'id' ? 'Konsultasi Gratis' : 'Book Free Audit'}</span>
                            <span className="absolute inset-0 bg-textDark translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0 rounded-md"></span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[60] relative group"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className={`w-6 h-0.5 bg-secondary rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
                            <span className={`w-6 h-0.5 bg-secondary rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`w-6 h-0.5 bg-secondary rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
                        </button>
                    </div>
                </nav>

                {/* Full Screen Mobile Menu */}
                <div className={`fixed inset-0 bg-white z-40 transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] flex flex-col ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col h-full pt-32 px-8 overflow-y-auto">
                        <div className="space-y-4 mb-12">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-6">{lang === 'id' ? 'Menu Utama' : 'Main Menu'}</p>
                            <a href={`/${lang}`} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-bold text-secondary flex items-baseline gap-4 group">
                                <span className="text-xs font-sans text-gray-300 group-hover:text-primary transition-colors">01</span>
                                {lang === 'id' ? 'Beranda' : 'Home'}
                            </a>
                            <a href={`/${lang}/services`} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-bold text-secondary flex items-baseline gap-4 group">
                                <span className="text-xs font-sans text-gray-300 group-hover:text-primary transition-colors">02</span>
                                {dict.nav.services}
                            </a>
                            <a href={`/${lang}/case-studies`} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-bold text-secondary flex items-baseline gap-4 group">
                                <span className="text-xs font-sans text-gray-300 group-hover:text-primary transition-colors">03</span>
                                {lang === 'id' ? 'Hasil' : 'Outcomes'}
                            </a>
                            <a href={`/${lang}/pricing`} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-bold text-secondary flex items-baseline gap-4 group">
                                <span className="text-xs font-sans text-gray-300 group-hover:text-primary transition-colors">04</span>
                                {dict.nav.pricing}
                            </a>
                            <a href={`/${lang}/blogs`} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-serif font-bold text-secondary flex items-baseline gap-4 group">
                                <span className="text-xs font-sans text-gray-300 group-hover:text-primary transition-colors">05</span>
                                {dict.nav.blogs}
                            </a>
                        </div>

                        <div className="grid grid-cols-1 gap-8 mt-auto pb-12 border-t border-gray-100 pt-8">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-4">{lang === 'id' ? 'Hubungi Kami' : 'Contact'}</p>
                                <p className="text-sm font-medium text-secondary">hello@promperty.io</p>
                            </div>
                            <button className="w-full py-4 rounded-md font-sans text-sm font-semibold tracking-wide bg-secondary text-primary shadow-xl">
                                {lang === 'id' ? 'Mulai Audit' : 'Start Free Audit'}
                            </button>
                        </div>
                    </div>
                </div>

                <style>{`
                    .scrolled.nav-container {
                        background-color: rgba(255, 255, 255, 0.9);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border-color: rgba(0, 0, 0, 0.08);
                        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
                        padding-top: 0.75rem;
                        padding-bottom: 0.75rem;
                        max-width: 64rem;
                        border-radius: 4px;
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }
                    .scrolled-wrapper {
                        top: 0.75rem;
                    }
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient {
                        animation: gradient 3s ease infinite;
                    }
                `}</style>
            </div>
        </>
    );
};

export default Navbar;
