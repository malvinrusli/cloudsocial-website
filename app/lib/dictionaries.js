export const getDictionary = (lang) => {
    const dictionaries = {
        en: {
            nav: {
                home: "Home",
                services: "Services",
                pricing: "Pricing",
                blogs: "Blogs",
                trending: "What's Trending",
                trending_text: "AEO & GEO in 2026",
            },
            footer: {
                tagline: "Building digital moats for the built environment.",
                expertise: "Expertise",
                company: "Company",
                connect: "Connect",
                newsletter: "The Authority Report",
                newsletter_desc: "Monthly strategies for CRE & Field Service leaders.",
                contact_label: "Contact",
                status_operational: "System Operational",
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                all_rights: "All Rights Reserved.",
            },
            contact: {
                title: "Request a Free Strategy Audit",
                subtitle: "We will respond within one business day.",
                name: "Full Name",
                email: "Work Email",
                company: "Company",
                phone: "Phone",
                message_label: "What are you looking to achieve?",
                message_placeholder: "e.g. Build an authority content system, dominate Google for commercial SEO in Dallas...",
                submit: "Submit — Get Your Free Audit",
                sending: "Sending...",
                success_title: "Submission received.",
                success_desc: "Our strategy team will be in touch within one business day.",
                close: "Close",
                error: "Something went wrong. Please try again.",
                disclaimer: "No spam. No pressure. Strategy first.",
            },
            philosophy: {
                badge_words: ["Most", "premium", "service-led", "firms", "are", "invisible", "where it matters."],
                title_line1: ["Authority", "is", "not", "optional."],
                title_line2: ["It", "is", "compounding", "leverage."],
            },
            wws: {
                badge: "Our Clients",
                title_line1: "Who We",
                title_line2: "Work With",
                clients: [
                    { num: '01', label: 'Property Developers', tag: 'Capital-Grade Authority' },
                    { num: '02', label: 'Real Estate Firms', tag: 'Market-Dominant Visibility' },
                    { num: '03', label: 'Architects & Interiors', tag: 'Design-Led Appointment Flow' },
                    { num: '04', label: 'Built Environment', tag: 'Scalable Trust Systems' },
                ]
            },
            hero: {
                built_for: "Built for:",
                badges: [
                    "Property Developers",
                    "Real Estate Firms",
                    "Architects & Interiors",
                    "High-Ticket Home Services"
                ],
                tagline: "We build awesome Digital Presence for",
                rotating_words: [
                    "Realtors",
                    "Architect Firms",
                    "Furniture Stores",
                    "Interior Firms",
                    "Developers"
                ],
                description: "From SEO and AI citations to short-form content — we build the digital engine that brings high-value clients directly to you.",
                cta_button: "Book Free Audit",
                cta_link: "See how it works",
            },
            protocol: {
                badge: "How It Works",
                title_line1: "The 6-Month",
                title_line2: "Authority Roadmap",
                description: "Every month has a specific goal, specific deliverables, and a measurable outcome. No vague retainers. No mystery.",
                steps: [
                    {
                        month: 'Month 1',
                        phase: 'Discovery & Foundation',
                        deliverables: [
                            'Full digital authority audit — search visibility, content gaps, competitor positioning',
                            'Keyword architecture mapped to buyer intent (TOFU → MOFU → BOFU)',
                            'Technical SEO foundation: site speed, schema, crawlability, canonical structure',
                            'Content calendar designed around your market segments',
                        ],
                        outcome: 'You receive a complete 90-day authority roadmap with clear attribution targets.',
                    },
                    {
                        month: 'Month 2',
                        phase: 'Content Engine & Profile Authority',
                        deliverables: [
                            'First 4 short-form video assets produced and published',
                            'Authority presence fully optimised for discovery across search and social',
                            'First 3 SEO articles published with proper structure and internal links',
                            'AI citation seeding begins — structured data and entity signals submitted',
                        ],
                        outcome: 'Content is live. Profiles are positioned. The engine is running.',
                    },
                    {
                        month: 'Month 3',
                        phase: 'Search Signal Building',
                        deliverables: [
                            '3 more SEO articles published — topical cluster forming (6 total)',
                            'Structured data and schema markup fully implemented',
                            'AI knowledge graph entity building — Google, Bing, Apple, Wikidata',
                            'Video performance reviewed — top-performing formats doubled down on',
                        ],
                        outcome: 'First ranking signals appear. Citation tracking report delivered.',
                    },
                    {
                        month: 'Month 4',
                        phase: 'Authority Compounding Begins',
                        deliverables: [
                            '9 total SEO articles published — first pages begin ranking',
                            'Authority content driving measurable engagement and interest',
                            'AI platforms (ChatGPT, Perplexity, Gemini) beginning to cite your firm',
                            'First inbound inquiries attributed to digital channels documented',
                        ],
                        outcome: 'First attributed inbound leads. The compound interest is starting to pay.',
                    },
                    {
                        month: 'Month 5',
                        phase: 'Optimisation & Scale',
                        deliverables: [
                            'Top-performing video formats scaled — 8+ assets now live',
                            'SEO articles on page 1 positions for low-competition target keywords',
                            'Content systems generating inbound interest from decision-makers',
                            'Full AI citation audit — brand mentions across 8 AI platforms tracked',
                        ],
                        outcome: 'Full analytics dashboard delivered. Optimisation report with year-2 projections.',
                    },
                    {
                        month: 'Month 6',
                        phase: 'Compounding Authority Established',
                        deliverables: [
                            '12 SEO articles published — full topical authority across your market segments',
                            'Organic search traffic showing meaningful, month-on-month growth',
                            'AI platforms recommending your firm by name in relevant queries',
                            'Authority infrastructure driving consistent deal flow conversations from qualified parties',
                        ],
                        outcome: 'Complete 6-month authority report + Year 2 strategy delivered.',
                    },
                ]
            }
        },
        id: {
            nav: {
                home: "Beranda",
                services: "Layanan",
                pricing: "Harga",
                blogs: "Blog",
                trending: "Sedang Tren",
                trending_text: "AEO & GEO di 2026",
            },
            footer: {
                tagline: "Membangun benteng digital untuk sektor pembangunan.",
                expertise: "Keahlian",
                company: "Perusahaan",
                connect: "Hubungkan",
                newsletter: "Laporan Otoritas",
                newsletter_desc: "Strategi bulanan untuk pemimpin CRE & Layanan Lapangan.",
                contact_label: "Kontak",
                status_operational: "Sistem Operasional",
                privacy: "Kebijakan Privasi",
                terms: "Syarat Layanan",
                all_rights: "Hak Cipta Dilindungi Undang-Undang.",
            },
            contact: {
                title: "Permintaan Audit Strategi Gratis",
                subtitle: "Kami akan merespons dalam satu hari kerja.",
                name: "Nama Lengkap",
                email: "Email Kerja",
                company: "Perusahaan",
                phone: "Telepon",
                message_label: "Apa yang ingin Anda capai?",
                message_placeholder: "misal: Membangun sistem konten otoritas, mendominasi Google untuk SEO komersial di Jakarta...",
                submit: "Kirim — Dapatkan Audit Gratis",
                sending: "Mengirim...",
                success_title: "Permintaan diterima.",
                success_desc: "Tim strategi kami akan menghubungi Anda dalam satu hari kerja.",
                close: "Tutup",
                error: "Terjadi kesalahan. Silakan coba lagi.",
                disclaimer: "Tanpa spam. Tanpa tekanan. Strategi nomor satu.",
            },
            philosophy: {
                badge_words: ["Banyak", "perusahaan", "layanan", "premium", "tidak", "terlihat", "di tempat yang penting."],
                title_line1: ["Otoritas", "bukanlah", "pilihan."],
                title_line2: ["Otoritas", "adalah", "daya", "ungkit."],
            },
            wws: {
                badge: "Klien Kami",
                title_line1: "Siapa Yang",
                title_line2: "Bekerja Dengan Kami",
                clients: [
                    { num: '01', label: 'Pengembang Properti', tag: 'Otoritas Tingkat Modal' },
                    { num: '02', label: 'Firma Real Estat', tag: 'Visibilitas Dominan Pasar' },
                    { num: '03', label: 'Arsitek & Interior', tag: 'Alur Janji Temu Terpimpin Desain' },
                    { num: '04', label: 'Sektor Pembangunan', tag: 'Sistem Kepercayaan Terukur' },
                ]
            },
            hero: {
                built_for: "Dibuat untuk:",
                badges: [
                    "Pengembang Properti",
                    "Firma Real Estat",
                    "Arsitek & Interior",
                    "Layanan Rumah Mewah"
                ],
                tagline: "Kami membangun Digital Presence luar biasa untuk",
                rotating_words: [
                    "Agen Properti",
                    "Firma Arsitek",
                    "Toko Furniture",
                    "Firma Interior",
                    "Developer"
                ],
                description: "Dari SEO dan kutipan AI hingga konten video — kami membangun mesin digital yang membawa klien berkualitas langsung kepada Anda.",
                cta_button: "Audit Gratis",
                cta_link: "Lihat cara kerjanya",
            },
            protocol: {
                badge: "Cara Kerja",
                title_line1: "Roadmap Otoritas",
                title_line2: "6-Bulan",
                description: "Setiap bulan memiliki tujuan spesifik, hasil nyata, dan hasil terukur. Tanpa biaya misterius.",
                steps: [
                    {
                        month: 'Bulan 1',
                        phase: 'Penemuan & Fondasi',
                        deliverables: [
                            'Audit otoritas digital lengkap — visibilitas pencarian, kesenjangan konten, posisi kompetitor',
                            'Arsitektur kata kunci yang dipetakan ke niat pembeli (TOFU → MOFU → BOFU)',
                            'Fondasi SEO teknis: kecepatan situs, skema, kemampuan perayapan',
                            'Kalender konten yang dirancang sesuai segmen pasar Anda',
                        ],
                        outcome: 'Anda menerima roadmap otoritas 90 hari lengkap dengan target atribusi yang jelas.',
                    },
                    {
                        month: 'Bulan 2',
                        phase: 'Mesin Konten & Otoritas Profil',
                        deliverables: [
                            'Produksi dan publikasi 4 aset video pendek pertama',
                            'Kehadiran otoritas dioptimalkan sepenuhnya untuk penemuan di pencarian dan sosial',
                            'Publikasi 3 artikel SEO pertama dengan struktur dan tautan internal yang benar',
                            'Penyebaran entitas AI dimulai — pengiriman data terstruktur dan sinyal entitas',
                        ],
                        outcome: 'Konten aktif. Profil sudah diposisikan. Mesin mulai berjalan.',
                    },
                    {
                        month: 'Bulan 3',
                        phase: 'Membangun Sinyal Pencarian',
                        deliverables: [
                            'Publikasi 3 artikel SEO tambahan — pembentukan klaster topik (total 6)',
                            'Implementasi penuh data terstruktur dan skema markup',
                            'Pembangunan entitas graf pengetahuan AI — Google, Bing, Apple, Wikidata',
                            'Peninjauan performa video — format terbaik diperkuat',
                        ],
                        outcome: 'Sinyal peringkat pertama muncul. Laporan pelacakan sitasi diberikan.',
                    },
                    {
                        month: 'Bulan 4',
                        phase: 'Otoritas Mulai Berlipat Ganda',
                        deliverables: [
                            'Total 9 artikel SEO diterbitkan — halaman pertama mulai muncul di peringkat',
                            'Konten otoritas mendorong keterlibatan dan minat yang terukur',
                            'Platform AI (ChatGPT, Perplexity, Gemini) mulai mengutip firma Anda',
                            'Dokumentasi pertanyaan inbound pertama dari saluran digital',
                        ],
                        outcome: 'Inbound leads pertama diatribusikan. Investasi mulai membuahkan hasil.',
                    },
                    {
                        month: 'Bulan 5',
                        phase: 'Optimalisasi & Skala',
                        deliverables: [
                            'Format video terbaik diskalakan — 8+ aset sekarang aktif',
                            'Artikel SEO di posisi halaman 1 untuk kata kunci target kompetisi rendah',
                            'Sistem konten menghasilkan minat inbound dari pengambil keputusan',
                            'Audit sitasi AI lengkap — penyebutan merek di 8 platform AI dilacak',
                        ],
                        outcome: 'Dasbor analitik lengkap diberikan. Laporan optimasi dengan proyeksi tahun kedua.',
                    },
                    {
                        month: 'Bulan 6',
                        phase: 'Otoritas yang Berlipat Ganda Terbentuk',
                        deliverables: [
                            '12 artikel SEO diterbitkan — otoritas topik penuh di segmen pasar Anda',
                            'Lalu lintas pencarian organik menunjukkan pertumbuhan bulanan yang berarti',
                            'Platform AI merekomendasikan firma Anda berdasarkan nama dalam kueri terkait',
                            'Infrastruktur otoritas mendorong percakapan aliran kesepakatan yang konsisten',
                        ],
                        outcome: 'Laporan otoritas 6 bulan lengkap + Strategi Tahun 2 diberikan.',
                    },
                ]
            }
        }
    };
    return dictionaries[lang] || dictionaries.en;
};
