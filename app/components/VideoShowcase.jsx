"use client";
import { useEffect } from 'react';

const WISTIA_IDS = ['uix5xvrenc', '00dzekol35', '4sayn9fmcp', 'xw9cpkxhcc'];

const WistiaCard = ({ mediaId }) => (
    <div className="flex-shrink-0 w-[200px] md:w-[220px]">
        <div className="relative w-full rounded-xl overflow-hidden bg-gray-900" style={{ aspectRatio: '9/16' }}>
            {/* eslint-disable-next-line */}
            <wistia-player media-id={mediaId} aspect="0.5625" style={{ width: '100%', height: '100%' }} />
        </div>
    </div>
);

const VideoShowcase = () => {
    useEffect(() => {
        const addScript = (src, type) => {
            if (document.querySelector(`script[src="${src}"]`)) return;
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            if (type) s.type = type;
            document.head.appendChild(s);
        };
        addScript('https://fast.wistia.com/player.js');
        WISTIA_IDS.forEach(id => addScript(`https://fast.wistia.com/embed/${id}.js`, 'module'));
    }, []);

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
                {WISTIA_IDS.map(id => (
                    <WistiaCard key={id} mediaId={id} />
                ))}
            </div>
        </section>
    );
};

export default VideoShowcase;
