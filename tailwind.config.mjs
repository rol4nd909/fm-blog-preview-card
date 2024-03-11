/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const postcss = require("postcss");
const postcssJs = require("postcss-js");

const clampGenerator = require("./src/css-utils/clamp-generator.js");
const tokensToTailwind = require("./src/css-utils/tokens-to-tailwind.js");

// Raw design tokens
const colorTokens = require("./src/design-tokens/colors.json");
const fontTokens = require("./src/design-tokens/fonts.json");
// const spacingTokens = require("./src/design-tokens/spacing.json");
const textSizeTokens = require("./src/design-tokens/text-sizes.json");
const textLeadingTokens = require("./src/design-tokens/text-leading.json");
const textWeightTokens = require("./src/design-tokens/text-weights.json");
const viewportTokens = require("./src/design-tokens/viewports.json");

// Process design tokens
const colors = tokensToTailwind(colorTokens.items);
const fontFamily = tokensToTailwind(fontTokens.items);
const fontWeight = tokensToTailwind(textWeightTokens.items);
const fontSize = tokensToTailwind(clampGenerator(textSizeTokens.items));
const lineHeight = tokensToTailwind(textLeadingTokens.items);
// const spacing = tokensToTailwind(spacingTokens.items);


// Deafault tailwind config
// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // Add color classes to safe list so they are always generated
  safelist: [],
  theme: {
    screens: {
      sm: `${viewportTokens.sm}px`,
      md: `${viewportTokens.md}px`,
      lg: `${viewportTokens.lg}px`,
      xl: `${viewportTokens.xl}px`,
    },
    colors,
    spacing: {
      0: "0",
      4: "0.25rem",
      8: "0.5rem",
      12: "0.75rem",
      24: "1.5rem",
      32: "2rem",
      200: "12.5rem",
    },
    fontSize: {
      ...fontSize,
      "base-fixed": "0.875rem",
    },
    lineHeight,
    fontFamily,
    fontWeight,
    backgroundColor: ({ theme }) => theme("colors"),
    textColor: ({ theme }) => theme("colors"),
    margin: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
    }),
    padding: ({ theme }) => theme("spacing"),
    borderRadius: {
      none: '0',
      DEFAULT: '0.25rem',
      sm: "0.625rem",
      md: "1.25rem",
      full: '9999px',
      round: "50%",
      pill: "100vh",
    },
  },
  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "empty",
    "read-only",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "disabled",
  ],

  // Disables Tailwind's reset and usage of rgb/opacity
  corePlugins: {
    preflight: false,
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
  },

  // Prevents Tailwind's core components
  blocklist: ["container"],

  // Prevents Tailwind from generating that wall of empty custom properties
  experimental: {
    optimizeUniversalDefaults: true,
  },

  plugins: [
    // Generates custom property values from tailwind config
    plugin(function ({ addComponents, config }) {
      let result = "";

      const currentConfig = config();

      const groups = [
        { key: "colors", prefix: "color" },
        // { key: "spacing", prefix: "space" },
        { key: "fontSize", prefix: "size" },
        { key: "lineHeight", prefix: "leading" },
        { key: "fontFamily", prefix: "font" },
        { key: "fontWeight", prefix: "font" },
      ];

      groups.forEach(({ key, prefix }) => {
        const group = currentConfig.theme[key];

        if (!group) {
          return;
        }

        Object.keys(group).forEach((key) => {
          result += `--${prefix}-${key}: ${group[key]};`;
        });
      });

      addComponents({
        ":root": postcssJs.objectify(postcss.parse(result)),
      });
    }),
  ],
};
