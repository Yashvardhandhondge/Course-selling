/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Added src path for consistency
  ],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Define your dark mode colors here
        dark: {
          background: '#1a1a2e', // Example dark background color
          text: '#ffffff', // Example light text color for dark mode
        },
      },
    },
  },
  plugins: [],
};

export default config;
