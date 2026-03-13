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

    return (
        <>
            <section
                ref={containerRef}
                className="relative w-full min-h-[85dvh] flex flex-col pt-28 pb-20 overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0 z-0 bg-background">
                    <div className="absolute top-[-15%] right-[-5%] w-[55%] h-[60%] bg-[#B38A4A]/35 blur-[140px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[100px] rounded-full"></div>
                    <div className="absolute top-[20%] left-[-5%] w-[30%] h-[30%] bg-[#B38A4A]/10 blur-[100px] rounded-full"></div>
                </div>

                {/* Text Area */}
                <div className="w-full max-w-7xl mx-auto px-8 relative z-10 flex flex-col items-start text-left">

                    {/* Eyebrow */}
                    <div className="hero-anim flex items-center gap-3 mb-10">
                        <div className="w-8 h-px bg-textDark/25"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-textDark/40">
                            Digital Marketing · Real Estate &amp; Design
                        </span>
                    </div>

                    {/* Headline — 3 intentional lines */}
                    <div className="mb-8 w-full">
                        <h1 className="leading-[1.0] tracking-tight">
                            <span className="hero-anim block text-5xl md:text-7xl lg:text-8xl font-sans font-medium uppercase text-secondary">
                                {dict.hero.tagline_line1}
                            </span>
                            <span className="hero-anim block text-5xl md:text-7xl lg:text-8xl font-sans font-medium uppercase text-secondary">
                                {dict.hero.tagline_line2}
                            </span>
                            <span className="hero-anim block">
                                <span className="text-5xl md:text-7xl lg:text-8xl font-sans font-medium uppercase text-secondary">
                                    {dict.hero.tagline_prefix}{' '}
                                </span>
                                <span className="rotating-word inline-block text-5xl md:text-7xl lg:text-8xl font-sans font-bold uppercase italic text-[#B38A4A]">
                                    {rotatingWords[wordIndex]}
                                </span>
                            </span>
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="hero-anim max-w-md text-lg font-sans font-normal text-textDark/70 leading-relaxed mb-10">
                        {dict.hero.description}
                    </p>

                    {/* CTA */}
                    <div className="hero-anim mb-16 flex flex-col sm:flex-row items-start gap-6">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="group relative px-10 py-5 bg-secondary text-primary font-sans font-bold text-sm uppercase tracking-widest rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg flex-shrink-0"
                        >
                            <span className="relative z-10 transition-colors duration-300">{dict.hero.cta_button}</span>
                            <span className="absolute inset-0 bg-textDark translate-y-full transition-transform duration-300 group-hover:translate-y-0 rounded-md"></span>
                        </button>
                        <a href="#how" className="text-xs font-bold uppercase tracking-widest text-textDark/40 hover:text-secondary transition-colors flex items-center gap-3 group self-center">
                            <span className="w-8 h-[1px] bg-textDark/20 group-hover:w-12 group-hover:bg-secondary transition-all"></span>
                            {dict.hero.cta_link}
                        </a>
                    </div>

                </div>

                {/* Hero Image */}
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 hero-anim">
                    <div className="w-full h-[55vh] rounded-md overflow-hidden relative shadow-xl border border-gray-100/50">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none"></div>
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                            alt="Modern Minimalist Architecture"
                            className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-[30s] ease-out"
                        />
                    </div>
                </div>
            </section>
            <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source="Hero — Book Free Audit" />
        </>
    );
};

export default Hero;
