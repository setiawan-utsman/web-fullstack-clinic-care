/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2563eb",
                secondary: "#9333ea",
                accent: "#f59e0b",
                background: "#f9fafb",
                text: "#111827",
            },
        },
    },
    // plugins: [
    //     require('@tailwindcss/forms'),
    //     require('@tailwindcss/typography'),
    // ],
};

export default config;