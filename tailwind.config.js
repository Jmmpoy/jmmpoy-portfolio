module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Neue-Regular", "Arial", "sans-serif"],
      mono: ["Lucida Console", "Courier", "monospace"],
      neueRegular: ["Neue-Regular"],
      neueBold: ["Neue-Bold"],
      sohneKraftig: ["Sohne-Kraftig"],
    },
    screens: {
      xsm: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "2000px",
    },
    extend: {
      colors: {
        fullBlack: "#000000",
        black: "#282828",
        white: "#fcfbfa",
        beige: "#FFFFFF",
        gray: "#888888",
        blue: "#2677bb",
      },
      height: (theme) => ({
        "50vh": "50vh",
        "75vh": "75vh",
      }),
    },
  },
  plugins: [],
};
