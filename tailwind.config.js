/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black": "#1B1B1B",
        cyan: "#008B8A",
        "cyan-md": "#4CADAD",
        "cyan-sm": "#99D0D0",
        "cyan-xsm": "rgba(153, 208, 208, 0.22)",
        "dark-grayish-blue": "#53565A",
      },
    },
  },
  plugins: [],
};
