import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      xs: "320px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        "text-primary": "#0D6EFD",
        "bg-primary": "#0D6EFD",
      },
    },
  },
  plugins: [],
};
