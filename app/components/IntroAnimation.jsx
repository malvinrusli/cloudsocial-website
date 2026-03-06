"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const IntroAnimation = () => {
    const [show, setShow] = useState(false);
    const overlayRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const taglineRef = useRef(null);
    const lineRef = useRef(null);

    // Only show once per browser session
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!sessionStorage.getItem('cs_intro')) {
            sessionStorage.setItem('cs_intro', '1');
            setShow(true);
        }
    }, []);

    // Run GSAP after component mounts with show=true
    useEffect(() => {
        if (!show || !overlayRef.current) return;

        // Lock scroll during intro
        document.body.style.overflow = 'hidden';

        // Initial hidden states
        gsap.set([logoRef.current, textRef.current, taglineRef.current], {
            autoAlpha: 0,
            y: 24
        });
        gsap.set(lineRef.current, {
            scaleX: 0,
            transformOrigin: 'center center'
        });

        const tl = gsap.timeline({
            defaults: { ease: 'power3.out' }
        });

        tl
            .to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.65 })
            .to(lineRef.current, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, '-=0.2')
            .to(textRef.current, { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.35')
            .to(taglineRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.3')
            .to({}, { duration: 0.85 }) // hold
            .to(overlayRef.current, {
                yPercent: -100,
                duration: 1.0,
                ease: 'power4.inOut',
                onComplete: () => {
                    setShow(false);
                    document.body.style.overflow = '';
                }
            });

        return () => {
            tl.kill();
            document.body.style.overflow = '';
        };
    }, [show]);

    if (!show) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[500] flex flex-col items-center justify-center"
            style={{ backgroundColor: '#080806' }}
        >
            {/* Subtle noise texture */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
                preserveAspectRatio="none"
            >
                <filter id="intro-noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#intro-noise)" />
            </svg>

            {/* Radial glow from center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)'
                }}
            />

            {/* Content */}
            <div className="flex flex-col items-center relative z-10">

                {/* Logo Mark */}
                <div ref={logoRef} className="mb-8">
                    <div
                        className="relative w-12 h-12 flex-shrink-0 mx-auto text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        style={{ transform: 'scaleX(-1)' }}
                    >
                        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                            <path d="M 50 100 L 100 100 L 100 50 A 50 50 0 0 1 50 100 Z" />
                            <path d="M 25 100 A 75 75 0 0 1 79 28 L 79 43.8 A 60 60 0 0 0 40 100 Z" />
                            <path d="M 0 100 A 100 100 0 0 1 56.4 10 L 56.4 27 A 85 85 0 0 0 15 100 Z" />
                        </svg>
                    </div>
                </div>

                {/* Horizontal rule */}
                <div
                    ref={lineRef}
                    className="w-20 mb-6"
                    style={{ height: '1px', background: 'rgba(255,255,255,0.18)' }}
                />

                {/* Brand Name */}
                <h1
                    ref={textRef}
                    className="font-serif italic text-white font-semibold tracking-tight leading-none"
                    style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
                >
                    CloudSocial
                </h1>

                {/* Tagline */}
                <p
                    ref={taglineRef}
                    className="font-sans font-semibold uppercase mt-6"
                    style={{
                        fontSize: '10px',
                        letterSpacing: '0.4em',
                        color: 'rgba(255,255,255,0.28)'
                    }}
                >
                    Authority Infrastructure
                </p>
            </div>
        </div>
    );
};

export default IntroAnimation;
