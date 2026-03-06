"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Maximize2, Minimize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CinematicVideo = () => {
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.video-wrapper',
                { scale: 0.95, opacity: 0, y: 50 },
                {
                    scale: 1, opacity: 1, y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section ref={containerRef} className="w-full py-24 px-4 md:px-8 bg-background relative z-20">
            <div className="max-w-6xl mx-auto flex flex-col items-center">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-sans font-medium text-secondary mb-4 tracking-tight">
                        Cinematic Content For <span className="font-serif italic text-textDark">CRE</span>
                    </h2>
                    <p className="text-textDark/80 max-w-2xl font-sans">
                        High-fidelity storytelling that builds institutional credibility and compounding deal flow.
                    </p>
                </div>

                {/* Video Player Container */}
                <div className={`video-wrapper relative w-full  overflow-hidden shadow-2xl transition-all duration-700 ease-in-out bg-[#0D0D12] ${isExpanded ? 'max-w-full aspect-[21/9]' : 'max-w-5xl aspect-video'}`}>

                    {/* Mock Video Thumbnail / Background */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                            alt="CRE Cinematic Preview"
                            className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-30 mix-blend-luminosity' : 'opacity-80'}`}
                        />
                        <div className="absolute inset-0 bg-secondary/20"></div>
                    </div>

                    {/* Centered Play Button (Visible when paused) */}
                    {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                onClick={handlePlay}
                                className="w-24 h-24 bg-white/10 backdrop-blur-md full border border-white/20 flex items-center justify-center group hover:bg-white/20 transition-all duration-300 hover:scale-105"
                            >
                                <Play className="w-10 h-10 text-white fill-white ml-2 opacity-90 group-hover:opacity-100" />
                            </button>
                        </div>
                    )}

                    {/* Playing State Mock UI */}
                    {isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-white/50 text-sm tracking-widest animate-pulse border border-white/20 px-4 py-2 d bg-black/40">
                                [ VIDEO PLAYING ]
                            </span>
                        </div>
                    )}

                    {/* Bottom Controls Bar */}
                    <div className={`absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                        <div className="flex gap-4">
                            <button onClick={handlePlay} className="text-white hover:text-accent transition-colors">
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                        </div>
                        <button onClick={handleExpand} className="text-white bg-white/10 p-2 g hover:bg-white/20 backdrop-blur-sm transition-all">
                            {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CinematicVideo;
