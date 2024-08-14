/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#3490dc",
        secondary: "#2ecc71",
        danger: "#e74c3c",
        success: "#27ae60",
        info: "#34495e",
        warning: "#f1c40f",
        light: "#ecf0f1",
        dark: "#34495e",
        gradient: "linear-gradient(180deg, #3490dc, #2ecc71)",
      }
    },
  },
  plugins: [],
};
