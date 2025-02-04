/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "space-mono": "SpaceMono",
      },
      colors: {
        primary: "#A2C8FF",
        "primary-50": "#C8E4FF",
        "primary-500": "#6499CC",
        success: "#A7E5A0",
        "success-500": "#7BBF6A",
        warning: "#FFDB6D",
        "warning-50": "#FFD57E",
        "warning-500": "#FF9A00",
        danger: "#FF6B6B",
        info: "#5A88D6",
        light: "#F0F9FF",
        dark: "#4A6B8C",
        "txt-primary": "#003366",
        "txt-secondary": "#004080",
        "txt-light": "#5D6D7E",
        "txt-dark": "#F0F9FF",
        "txt-muted": "#8C9BA5",
        "txt-info": "#1F618D",
        "txt-warning": "#A9C3D5",
        "txt-danger": "#2C3E50",
      },
    },
  },
  plugins: [],
};
