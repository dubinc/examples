import sharedConfig from "@dub/tailwind-config/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        // Path to Dub module
        "./node_modules/@dub/ui/**/*.{mjs,js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          ...sharedConfig?.theme?.extend,
          backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
              "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          },
          keyframes: {
            "scale-in": {
              from: { opacity: "0", transform: "scale(0.9)" },
            },
          },
          animation: {
            "scale-in": "scale-in 0.5s ease-in-out",
          },
        },
      },
      plugins: [require("@tailwindcss/typography")],
    },
  ],
};

export default config;
