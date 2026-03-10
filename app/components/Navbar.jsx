"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// NavLink with text-scroll hover effect (text slides up, clone slides in from below)
const NavLink = ({ href, children, onClick }) => (
    <a
        href={href}
        onClick={onClick}
        className="relative overflow-hidden flex items-center group/link hover:opacity-100 transition-opacity"
        style={{ height: '1.25rem' }}
    >
        {/* Original text — slides up on hover */}
        <span
            className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:-translate-y-full"
        >
            {children}
        </span>
        {/* Clone — slides in from below on hover */}
        <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:translate-y-0"
        >
            {children}
        </span>
    </a>
);

// NavButton (non-link, e.g. "Services" dropdown trigger) with same effect
const NavButton = ({ children, className = '' }) => (
    <button
        className={`relative overflow-hidden flex items-center gap-1 outline-none group/link ${className}`}
        style={{ height: '1.25rem' }}
    >
        <span
            className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:-translate-y-full"
        >
            {children}
        </span>
        <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/link:translate-y-0"
        >
            {children}
        </span>
    </button>
);

const Navbar = () => {
    const navRef = useRef(null);
    const wrapperRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Morphing logic: Transparent → Frost White border + shrink padding
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    targets: navRef.current,
                    className: 'scrolled'
                }
            });
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                toggleClass: {
                    targets: wrapperRef.current,
                    className: 'scrolled-wrapper'
                }
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Trending Top Bar */}
            <a href="/aeo-geo-llms-real-estate" className="absolute top-0 left-0 right-0 bg-[linear-gradient(90deg,#B38A4A,#D4AF37,#F9F0AC,#D4AF37,#B38A4A)] bg-[length:200%_auto] animate-gradient text-stone-900 py-2 px-4 flex justify-center items-center z-[60] font-sans text-xs md:text-sm font-medium tracking-wide shadow-md transition-all hover:opacity-90 cursor-pointer group">
                <span className="flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform duration-300">
                    <span className="w-2 h-2 full bg-stone-900 shadow-[0_0_8px_rgba(28,25,23,0.3)] animate-pulse"></span>
                    <span className="font-bold tracking-widest uppercase text-[10px] md:text-xs text-stone-900/90">Trending:</span>
                    <span className="font-medium">AI GEO & AEO for Real Estate Businesses in 2026</span>
                    <svg className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
            </a>

            {/* Navbar Container */}
            <div
                ref={wrapperRef}
                className="fixed top-12 left-0 right-0 z-50 flex justify-center px-4 w-full transition-all duration-500 nav-wrapper"
            >
                <nav
                    ref={navRef}
                    className="flex items-center justify-between w-[95%] max-w-7xl px-8 py-4  transition-all duration-1000 ease-in-out bg-transparent border border-transparent nav-container text-secondary mx-auto"
                >
                    <a href="/" className="font-serif font-semibold tracking-wider text-2xl flex items-center hover:opacity-80 transition-opacity">
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
                    </a>

                    <div className="hidden md:flex space-x-12 font-sans text-sm tracking-wide font-medium items-center">
                        {/* Services dropdown */}
                        <div className="relative group">
                            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                                <NavButton>Services</NavButton>
                                <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                            <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                                <div className="w-64 bg-white shadow-xl  border border-gray-100 flex flex-col py-2 overflow-hidden text-textDark">
                                    <a href="/services" className="px-5 py-2.5 hover:bg-gray-50 hover:text-secondary hover:pl-6 transition-all text-[13px] font-semibold">Overview</a>
                                    <div className="h-px bg-gray-100 my-1 mx-4"></div>
                                    <a href="/content-real-estate" className="px-5 py-2 hover:bg-gray-50 hover:text-secondary hover:pl-6 transition-all text-[13px]">Short Form Content</a>
                                    <a href="/linkedin-real-estate" className="px-5 py-2 hover:bg-gray-50 hover:text-secondary hover:pl-6 transition-all text-[13px]">LinkedIn Growth & Content</a>
                                    <a href="/seo-real-estate" className="px-5 py-2 hover:bg-gray-50 hover:text-secondary hover:pl-6 transition-all text-[13px]">SEO</a>
                                    <a href="/aeo-geo-llms-real-estate" className="px-5 py-2 hover:bg-gray-50 hover:text-secondary hover:pl-6 transition-all text-[13px]">AEO & GEO</a>
                                    <a href="/web-architecture-real-estate" className="px-5 py-2 hover:bg-gray-50 hover:text-secondary hover:pl-6 transition-all text-[13px]">Web Architecture</a>
                                    <a href="/ai-agent-real-estate" className="px-5 py-2 hover:bg-gray-50 hover:text-secondary hover:pl-6 transition-all text-[13px]">AI Agents & Automations</a>
                                </div>
                            </div>
                        </div>

                        <NavLink href="#how">How it Works</NavLink>
                        <NavLink href="#case">Case Studies</NavLink>
                        <NavLink href="/blogs">Blog</NavLink>
                    </div>

                    <button className="relative overflow-hidden px-8 py-3 rounded-md font-sans text-sm font-semibold tracking-wide bg-secondary text-primary transition-all duration-300 group hover:shadow-lg">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Book Free Audit</span>
                        <span className="absolute inset-0 bg-textDark translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0 rounded-md"></span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[60] relative group"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className={`w-6 h-0.5 bg-secondary full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
                        <span className={`w-6 h-0.5 bg-secondary full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`w-6 h-0.5 bg-secondary full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
                    </button>
                </nav>

                {/* Full Screen Mobile Menu */}
                <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] flex flex-col justify-center items-center ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col items-center space-y-8 text-2xl font-serif text-secondary mt-12">
                        <a href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-700 transition-colors duration-300">Services</a>
                        <a href="#how" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-700 transition-colors duration-300">How it Works</a>
                        <a href="#case" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-700 transition-colors duration-300">Case Studies</a>
                        <a href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-700 transition-colors duration-300">Blog</a>

                        <button className="mt-8 px-8 py-4 rounded-md font-sans text-sm font-semibold tracking-wide bg-secondary text-primary transition-all duration-300 shadow-xl">
                            Book Free Audit
                        </button>
                    </div>
                </div>

                <style>{`
        /* Scrolled state — Floating Box Animation */
        .scrolled.nav-container {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-color: rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          max-width: 56rem; /* Shorter/shrinks in width */
          border-radius: 0px; /* Sharp box */
          padding-left: 2rem;
          padding-right: 2rem;
        }
        /* Wrapper top offset shrinks slightly when scrolled for a tighter look */
        .scrolled-wrapper {
          top: 0.5rem;
        }
      `}</style>
            </div>
        </>
    );
};

export default Navbar;
