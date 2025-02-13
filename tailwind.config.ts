import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#fff',
        trans:'#ffffffcc',
        transDark:'#202025cc',
        dark:'#000',
        darkBg:'#202025',
        second:'#06a4ff',
        third:'#8756ff',
        persianPink:"#f991cc",
        lavenderPink:"#ffdafc",
        softGray:"#E5E7EB",
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'screen': '100vh',
      },
    },
  },
  darkMode: 'class', // Pastikan darkMode tidak berada di dalam extend
  plugins: [],
} satisfies Config;
