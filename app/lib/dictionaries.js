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
                newsletter: "The Authority Report",
                newsletter_desc: "Monthly strategies for CRE & Field Service leaders.",
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
                newsletter: "Laporan Otoritas",
                newsletter_desc: "Strategi bulanan untuk pemimpin CRE & Layanan Lapangan.",
            }
        }
    };
    return dictionaries[lang] || dictionaries.en;
};
