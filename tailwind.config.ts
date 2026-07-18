import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // HIPAA-compliant brand colors - professional healthcare palette
        primary: {
          DEFAULT: '#185FA5',
          dark: '#12497d',
          light: '#E6F1FB',
        },
        background: {
          DEFAULT: '#F8F7F5',
          card: '#FFFFFF',
          subtle: '#F1EFE8',
        },
        border: {
          DEFAULT: '#E1DFDD',
        },
        text: {
          DEFAULT: '#3D3D3A',
          muted: '#605E5C',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'button': '4px',
        'card': '8px',
        'pill': '99px',
      },
    },
  },
  plugins: [],
};

export default config;
