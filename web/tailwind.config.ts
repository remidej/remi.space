import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        blog: colors.teal,
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: `100%`,
          marginLeft: `auto`,
          marginRight: `auto`,
          paddingLeft: `1rem`,
          paddingRight: `1rem`,
          "@screen sm": {
            maxWidth: `600px`,
          },
          "@screen md": {
            maxWidth: `700px`,
          },
          "@screen lg": {
            maxWidth: `720px`,
          },
          "@screen xl": {
            maxWidth: `720px`,
          },
        },
      });
    }),
  ],
};
export default config;
