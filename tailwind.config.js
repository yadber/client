/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
      },
      animation: {
        "bounce-slow": "bounce 300ms ease-in-out",
      },
    },
  },
  plugins: [],
};
