// 1. Import daisyui at the top of the file
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        sans: "'Inter', sans-serif",
        serif: "'Playfair Display', serif",
      }
    },
  },
  
  // 2. Use the imported 'daisyui' variable here instead of require()
  plugins: [
    daisyui,
  ],

  // Configure DaisyUI with your custom theme
  daisyui: {
    themes: [
      {
        elegantTheme: { 
          "primary": "#E53E3E",
          "secondary": "#4A5568",
          "accent": "#ECC94B",
          "neutral": "#2D3748",
          "base-100": "#F7FAFC",
          "base-200": "#EDF2F7",
          "base-300": "#E2E8F0",
          "info": "#63B3ED",
          "success": "#48BB78",
          "warning": "#F6E05E",
          "error": "#F56565",
        },
      },
    ],
  },
}