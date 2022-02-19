module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: { height: "height" },
      gridTemplateRows: {
        // Simple 8 row grid
        12: "repeat(12, minmax(0, 1fr))",

        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
      colors: {
        blue: { 10: "#f0fcfc", 550: "#00a8ff", 910: "#074685" },
        orange: { 450: "#FF7E00", 550: "#ff7e00" },
        gray: { 410: "#939393" },
      },
    },
  },
  plugins: [],
};
