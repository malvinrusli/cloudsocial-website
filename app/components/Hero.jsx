"use client";
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/app/lib/dictionaries';
import ContactModal from '@/app/components/ContactModal';

const Hero = ({ lang: propLang }) => {
    const params = useParams();
    const lang = propLang || params?.lang || 'en';
    const dict = getDictionary(lang);
    const containerRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.hero-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
            );

            gsap.to('.scroll-circle', {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 2,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const rotatingWords = dict.hero.rotating_words;

    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            gsap.to('.rotating-word', {
                y: -10,
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    setWordIndex((prev) => (prev + 1) % rotatingWords.length);
                    gsap.fromTo('.rotating-word',
                        { y: 10, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' }
                    );
                }
            });
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const badges = dict.hero.badges;

    return (
        <>
            <section
                ref={containerRef}
                className="relative w-full min-h-[85dvh] flex flex-col pt-32 pb-24 overflow-hidden"
            >
                {/* Vibrant Background Gradient */}
                <div className="absolute inset-0 z-0 bg-background">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#B38A4A]/20 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full opacity-50"></div>
                </div>

                {/* Heavy Text Area */}
                <div className="w-full max-w-7xl mx-auto px-8 relative z-10 flex flex-col items-center text-center">

                    {/* ICP Qualifier Badges - Glassmorphism */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                        <span className="hero-anim text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/40 mr-2">{dict.hero.built_for}</span>
                        {badges.map((badge, idx) => (
                            <div key={idx} className="hero-anim group flex items-center bg-white border border-gray-100 px-4 py-2 rounded-md transition-all duration-300 shadow-sm hover:border-gray-200 cursor-default">
                                <div className="w-2.5 h-2.5 rounded-full bg-secondary flex items-center justify-center mr-2.5 group-hover:scale-110 transition-transform">
                                    <svg className="w-1.5 h-1.5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                                <span className="font-sans text-[12px] font-semibold text-secondary/80 tracking-tight">{badge}</span>
                            </div>
                        ))}
                    </div>

                    {/* Core Headline */}
                    <div className="mb-10 lg:mb-14 max-w-5xl w-full">
                        <h1 className="leading-[1.15] tracking-tight">
                            <span className="hero-anim block text-4xl md:text-5xl lg:text-5xl font-sans font-medium uppercase text-secondary whitespace-nowrap">
                                {dict.hero.tagline}
                            </span>
                            <span className="hero-anim block mt-1">
                                <span className="rotating-word inline-block text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-secondary uppercase italic">
                                    {rotatingWords[wordIndex]}
                                </span>
                            </span>
                        </h1>
                    </div>

                    <p className="hero-anim max-w-xl text-lg md:text-xl font-sans font-normal text-textDark/70 leading-relaxed mb-12 mt-10 mx-auto">
                        {dict.hero.description}
                    </p>

                    {/* CTA */}
                    <div className="hero-anim mb-20 flex flex-col sm:flex-row items-center justify-center gap-8">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="group relative px-10 py-5 bg-secondary text-primary font-sans font-bold text-sm uppercase tracking-widest rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg flex-shrink-0"
                        >
                            <span className="relative z-10 transition-colors duration-300">{dict.hero.cta_button}</span>
                            <span className="absolute inset-0 bg-textDark translate-y-full transition-transform duration-300 group-hover:translate-y-0 rounded-md"></span>
                        </button>
                        <a href="#how" className="text-xs font-bold uppercase tracking-widest text-textDark/40 hover:text-secondary transition-colors flex items-center gap-3 group">
                            <span className="w-8 h-[1px] bg-textDark/20 group-hover:w-12 group-hover:bg-secondary transition-all"></span>
                            {dict.hero.cta_link}
                        </a>
                    </div>

                </div>

                {/* Hero Image - More Premium Layout */}
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 hero-anim">
                    <div className="w-full h-[70vh] rounded-md overflow-hidden relative shadow-sm border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                            alt="Modern Minimalist Architecture under Blue Sky"
                            className="w-full h-full object-cover object-center transform scale-110 hover:scale-100 transition-transform duration-[30s] ease-out"
                        />
                    </div>
                </div>
            </section>
            <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source="Hero — Book Free Audit" />
        </>
    );
};

export default Hero;
