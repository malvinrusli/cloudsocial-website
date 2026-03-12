/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#fffbf6',
                primary: '#fffbf6',
                secondary: '#111111',
                accent: '#1D1D24', // Use dark button color as accent
                textDark: '#55555A',
            },
            fontFamily: {
                sans: ['"Aeonik Arabic"', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                '2rem': '2rem',
                '3rem': '3rem',
                '4rem': '4rem',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                }
            },
            animation: {
                gradient: 'gradient 6s ease infinite',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
