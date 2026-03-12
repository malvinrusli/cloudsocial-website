import '@/app/globals.css';
import IntroAnimation from '@/app/components/IntroAnimation';
import Providers from '@/app/components/Providers';

export const metadata = {
    title: {
        template: '%s | Promperty',
        default: 'Promperty | Commercial Real Estate Marketing Team',
    },
    description: 'Promperty builds digital authority systems that position commercial real estate firms as the default choice when investors, tenants, and capital partners search or ask AI.',
};

export default function RootLayout({ children, params }) {
    const { lang } = params;

    return (
        <html lang={lang || "en"}>
            <body className="font-sans antialiased text-secondary bg-white selection:bg-primary selection:text-secondary">
                <Providers>
                    <IntroAnimation />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
