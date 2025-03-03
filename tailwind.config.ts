import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "m-green": "#50C300",
        "m-indigo": "#4f46e5",
        "m-gray": "#374151",
        "m-light-yellow": "#F7F6EF",
      },
    },
  },
  plugins: [],
};
export default config;
