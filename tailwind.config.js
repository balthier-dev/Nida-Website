module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "ecio-bg": "#111111",
      "ecio-container": "rgba(88, 88, 88, 0.2)",
      "ecio-pink": "#FE12B8",
      "ecio-green": "#E0FB16",
      "ecio-purple": "#9A66FF",
    }),
    fontFamily: {
      quantico: ["Quantico"],
      amiko: ["Amiko"],
    },
    textColor: (theme) => ({
      ...theme("colors"),
      "ecio-bg": "#111111",
      "ecio-container": "rgba(88, 88, 88, 0.2)",
      "ecio-pink": "#FE12B8",
      "ecio-green": "#E0FB16",
      "ecio-purple": "#9A66FF",
      "ecio-blue": "#00FFFF",
      "ecio-grey": "#D1D3D4",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
