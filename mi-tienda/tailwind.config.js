export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // El doble asterisco es clave para entrar en carpetas
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                "primary-container": "var(--color-primary-container)",
                background: "var(--color-background)",
                surface: "var(--color-surface)",
                "surface-lowest": "var(--color-surface-lowest)",
                "on-background": "var(--color-on-background)",
                "on-surface-variant": "var(--color-on-surface-variant)",
                outline: "var(--color-outline)",
                "outline-variant": "var(--color-outline-variant)",
                "on-primary": "var(--color-on-primary)",
            },
            fontFamily: {
                body: ["Inter", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};