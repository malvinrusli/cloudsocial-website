import '@/app/globals.css';
import IntroAnimation from '@/app/components/IntroAnimation';
import Providers from '@/app/components/Providers';
import localFont from 'next/font/local';

const aeonik = localFont({
    src: '../../public/fonts/Aeonik/Aeonik-Regular.woff',
    variable: '--font-aeonik',
    display: 'swap',
});

export const metadata = {
    title: {
        template: '%s | Promperty',
        default: 'Promperty | Commercial Real Estate Marketing Team',
    },
    description: 'Promperty builds digital authority systems that position commercial real estate firms as the default choice when investors, tenants, and capital partners search or ask AI.',
};

export default async function RootLayout({ children, params }) {
    const { lang } = await params;

    return (
        <html lang={lang || "en"} className={`${aeonik.variable}`}>
            <body className="font-sans antialiased text-secondary bg-white selection:bg-primary selection:text-secondary">
                <Providers>
                    <IntroAnimation />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
