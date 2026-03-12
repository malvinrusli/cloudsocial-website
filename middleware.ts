import { NextResponse } from 'next/server';
import { i18n } from './app/lib/i18n-config';

export function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // // Skip public files, api routes, and convex related paths
    if (
        [
            '/manifest.json',
            '/favicon.ico',
            '/icon.svg',
            '/Services_template.webp',
            '/BOFU_template.webp',
        ].includes(pathname) ||
        pathname.includes('/.well-known') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next')
    ) {
        return;
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        // Robust Geo-detection:
        // 1. Check x-vercel-ip-country (Vercel)
        // 2. Fallback to defaultLocale
        const country = request.headers.get('x-vercel-ip-country') || '';
        const locale = country.toUpperCase() === 'ID' ? 'id' : i18n.defaultLocale;

        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
