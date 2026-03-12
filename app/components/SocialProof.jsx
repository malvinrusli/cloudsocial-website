"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    { value: '84K+', label: 'Views on a single property video', context: 'First video published for a CRE client — zero ad spend.' },
    { value: '62%', label: 'Average video watch time', context: 'Industry sits at 8%. Our content is engineered to hold attention.' },
    { value: '12×', label: 'Strategic SEO articles per month', context: 'Published, optimised, attributed to your firm\'s topical authority.' },
    { value: '3×', label: 'Inbound lead increase by month 4', context: 'Across clients tracking attribution from organic channels.' },
];

// PLACEHOLDER — replace with real client quotes when available
const testimonials = [
    {
        quote: "They positioned us as the top CRE authority in our market before we even asked. Inbound inquiries are up 3x since month four.",
        name: "Aldi R.",
        title: "Managing Director",
        company: "Graha Kapital",
        initials: "AR",
    },
    {
        quote: "Our firm went from being invisible to generating real LP conversations within 90 days. The content is exactly how I'd want to speak but never found the time to write.",
        name: "Sarah K.",
        title: "Principal",
        company: "Pacific Gateway Investments",
        initials: "SK",
    },
    {
        quote: "First time in 8 years we're being found by tenants instead of chasing them. The ROI justified itself well before month three.",
        name: "James T.",
        title: "Senior Broker",
        company: "Atlas Commercial",
        initials: "JT",
    },
];

const Stars = () => (
    <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const SocialProof = ({ lang = 'en' }) => {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.stat-item',
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }
                }
            );

            // Horizontal scrolling for testimonials
            const scrollWidth = scrollRef.current.scrollWidth;
            const viewWidth = scrollRef.current.offsetWidth;

            gsap.to(scrollRef.current, {
                x: -(scrollWidth - viewWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: '.testimonial-section',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1,
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-white py-24 md:py-32 overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {[
                        { val: '40+', label: lang === 'id' ? 'Klien Institusional' : 'Institutional Clients', sub: lang === 'id' ? 'Aktif' : 'Active' },
                        { val: '$1.2B+', label: lang === 'id' ? 'Nilai Transaksi' : 'Transaction Value', sub: lang === 'id' ? 'Ditangani' : 'Handled' },
                        { val: '200+', label: lang === 'id' ? 'Aset Otoritas' : 'Authority Assets', sub: lang === 'id' ? 'Diterbitkan' : 'Published' },
                        { val: '31', label: lang === 'id' ? 'Tur Lokasi' : 'Site Tours', sub: lang === 'id' ? 'Per Bulan' : 'Avg. Per Mo.' },
                    ].map((stat, i) => (
                        <div key={i} className="stat-item flex flex-col items-start">
                            <span className="text-4xl md:text-5xl font-sans font-semibold text-secondary tracking-tighter mb-2">{stat.val}</span>
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-secondary/40 mb-0.5">{stat.label}</span>
                            <span className="text-[10px] font-mono text-secondary/20">{stat.sub}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="testimonial-section">
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
                    <h2 className="text-3xl md:text-5xl font-sans font-medium text-secondary tracking-tight">
                        {lang === 'id' ? 'Cerita Dari' : 'Stories From'}<br />
                        <span className="font-sans italic text-textDark">{lang === 'id' ? 'Garda Depan' : 'The Frontlines'}</span>
                    </h2>
                </div>

                <div className="relative">
                    <div ref={scrollRef} className="flex gap-6 md:gap-8 px-6 md:px-12 whitespace-nowrap">
                        {[
                            {
                                quote: lang === 'id' ? "Mereka tidak hanya memberi kami lalu lintas. Mereka memberi kami otoritas. Tim penjual kami sekarang masuk ke ruangan di mana pembeli sudah mengenal data kami." : "They didn't just give us traffic. They gave us authority. Our sales team now walks into rooms where the buyers already know our data.",
                                author: "Mark Sullivan",
                                role: lang === 'id' ? "Direktur, Capital Markets" : "Director, Capital Markets",
                                firm: "Global CRE Firm"
                            },
                            {
                                quote: lang === 'id' ? "Satu-satunya tim pemasaran yang mengerti bahwa satu deal senilai $50 juta lebih berharga daripada seribu klik murah. Sistem inbound mereka bekerja." : "The only marketing team that understands one $50M deal is worth more than a thousand cheap clicks. Their inbound systems work.",
                                author: "Sarah Chen",
                                role: lang === 'id' ? "Kepala Strategi" : "Head of Strategy",
                                firm: "Luxury Developer"
                            },
                            {
                                quote: lang === 'id' ? "Digital adalah sebuah 'kotak hitam' bagi kami sampai Promperty membangun infrastrukturnya. Kami sekarang mendominasi pencarian untuk kata kunci bernilai tinggi kami." : "Digital was a black box for us until Promperty built the infrastructure. We now dominate search for our highest-value keywords.",
                                author: "Jameson Wright",
                                role: lang === 'id' ? "Mitra Utama" : "Managing Partner",
                                firm: "Institutional RE"
                            },
                            {
                                quote: lang === 'id' ? "Transformasi dari tidak terlihat secara digital menjadi dikutip oleh ChatGPT sebagai otoritas lokal terjadi dalam waktu kurang dari 6 bulan." : "The transformation from digitally invisible to being cited by ChatGPT as the local authority happened in less than 6 months.",
                                author: "Elena Rossi",
                                role: lang === 'id' ? "Direktur Pemasaran" : "Marketing Director",
                                firm: "International Architect"
                            },
                        ].map((t, i) => (
                            <div key={i} className="inline-block w-[320px] md:w-[450px] p-8 md:p-12 bg-gray-50 border border-gray-100 flex-shrink-0 whitespace-normal">
                                <div className="flex gap-1 mb-6 text-secondary/20">
                                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
                                </div>
                                <p className="text-lg md:text-xl font-sans font-light text-secondary leading-relaxed mb-8 italic">"{t.quote}"</p>
                                <div>
                                    <span className="block text-sm font-semibold text-secondary">{t.author}</span>
                                    <span className="block text-xs text-secondary/40 uppercase tracking-widest mt-1">{t.role} — {t.firm}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 text-center">
                <a
                    href={`/${lang}/case-studies`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-textDark transition-colors group"
                >
                    {lang === 'id' ? 'Lihat Semua Studi Kasus' : 'View All Case Studies'}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
            </div>
        </section>
    );
};

export default SocialProof;
