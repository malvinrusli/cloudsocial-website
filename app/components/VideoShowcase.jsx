"use client";
import React, { useRef } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const STORAGE_IDS = [
    'kg25azhxx8zz2ckvqbht0gr13s82n47r',
    'kg2em94p5f7x3p79tvfbe6g6ns82n0s5',
    'kg25whybpr0q0he0m7fzph54cx82n06h',
    'kg2aqrcwjfanercz1frx2gmrxn82n5a4',
];

const VideoCard = ({ video }) => {
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) videoRef.current.play();
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    if (!video.url) return null;

    return (
        <div
            className="flex-shrink-0 w-[200px] md:w-[220px] group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full rounded-xl overflow-hidden bg-gray-900" style={{ aspectRatio: '9/16' }}>
                <video
                    ref={videoRef}
                    src={video.url}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

const VideoShowcase = () => {
    const videos = useQuery(api.media.getVideosBatch, { storageIds: STORAGE_IDS });

    if (!videos) return null;

    return (
        <section className="w-full bg-background py-20 md:py-28 border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-textDark/30 mb-4">Content We Produce</p>
                <h2 className="text-4xl md:text-5xl font-sans font-medium text-secondary tracking-tight leading-[1.05]">
                    Short-form<br />
                    <span className="font-sans italic text-textDark">in the wild</span>
                </h2>
            </div>

            <div
                className="flex gap-4 px-6 md:px-12 overflow-x-auto pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </section>
    );
};

export default VideoShowcase;
