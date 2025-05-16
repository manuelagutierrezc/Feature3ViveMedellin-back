import { defaultConfig } from "next/dist/server/config-shared"
import type { Config } from "tailwindcss"

import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend.colors,
      colors: {
        primary: "#faae2b",
        secondary: "#475d5b",
        accent: "#fa5246",
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
      },
      fontSize: {
        "2.5xl": "1.75rem",
      },
      borderRadius: {
        ...defaultConfig.theme.extend.borderRadius,
        "4xl": "2rem",
      },
    },
  },
  plugins: [...defaultConfig.plugins, tailwindcssAnimate],
}
export default config
