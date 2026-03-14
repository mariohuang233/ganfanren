import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 更高级的低饱和橙
        primary: {
          50: "#fff8f5",
          100: "#ffede6",
          200: "#ffd9cc",
          300: "#ffbba8",
          400: "#ff8f73",
          500: "#f97066",
          600: "#e85c4a",
          700: "#c44238",
          800: "#9c3a33",
          900: "#7d352f",
        },
        // 辅助色 - 深蓝灰
        secondary: {
          50: "#f8f9fc",
          100: "#f0f2f7",
          200: "#dde2ed",
          300: "#c4cbdc",
          400: "#a6afc6",
          500: "#8a94b0",
          600: "#6f7996",
          700: "#5a627a",
          800: "#4c5265",
          900: "#414554",
        },
        // 中性色 - 更柔和
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e8e8e8",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        // 成功色 - 柔和绿
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        // 警告色 - 柔和黄
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      boxShadow: {
        // 更精致的阴影层次
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.05)',
        'soft-xl': '0 20px 60px -15px rgba(0, 0, 0, 0.1), 0 40px 80px -20px rgba(0, 0, 0, 0.06)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        'glow': '0 0 40px -10px rgba(249, 112, 102, 0.3)',
        'glow-lg': '0 0 60px -15px rgba(249, 112, 102, 0.4)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
