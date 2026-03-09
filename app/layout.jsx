import './globals.css';
import IntroAnimation from './components/IntroAnimation';
import Providers from './components/Providers';

export const metadata = {
    title: {
        template: '%s | CloudSocial',
        default: 'CloudSocial | Commercial Real Estate Marketing Team',
    },
    description: 'CloudSocial builds digital authority systems that position commercial real estate firms as the default choice when investors, tenants, and capital partners search or ask AI.',
    openGraph: {
        title: 'CloudSocial | Authority Infrastructure',
        description: 'CloudSocial builds digital authority systems that position commercial real estate firms as the default choice when investors, tenants, and capital partners search or ask AI.',
        type: 'website',
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-background text-secondary antialiased selection:bg-accent/30 selection:text-white font-sans">
                <svg className="noise-overlay" preserveAspectRatio="none">
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.6"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
                <IntroAnimation />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
