/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      exsm: "340px",
      esm: "400px",
      sm: "480px",
      xsm: "660px",
      lsm: "756px",
      lmd: "860px",
      md: "950px",
      lg: "1176px",
      xl: "1440px",
    },
  },
  plugins: [],
};
