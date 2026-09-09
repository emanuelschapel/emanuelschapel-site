import type { Config } from "tailwindcss";

/**
 * Emanuel's Chapel — brand tokens (production palette, Sept 2026)
 *
 * MIGRATION NOTE
 * The prototype used `fuchsia` (#C4008F) and `plum` (#2B001F). Both are retired.
 * Search the codebase for `fuchsia`, `plum`, `#C4008F`, `#2B001F` and replace per
 * INTEGRATION.md. Legacy aliases are intentionally NOT provided so the build fails
 * loudly on any missed class rather than shipping the old color.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#141414", // primary text, primary CTA fill, dark surfaces
          soft: "#2A2628", // hover state for ink buttons
        },
        pink: {
          DEFAULT: "#FDA8BF", // brand accent. Always paired with `ink` text — never white.
          deep: "#F98CA9", // hover state
          wash: "#FDE3EA", // light tint for subtle highlights
        },
        blush: "#FBEEF1", // section backgrounds
        ivory: "#FCFAF9", // page background
        muted: "#5C5559", // secondary text (4.5:1+ on ivory/blush)
        rule: "#EBD8DE", // borders and dividers
        // Form errors. 6.6:1 on white — serious rather than alarming, and never the sole
        // signal: errors always carry text and an icon too.
        danger: "#B3261E",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        // Retained from Phase 1: `font-heading` is still used for sub-headings site-wide.
        heading: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ["Lato", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px", // buttons, inputs — restrained; a funeral home is not a SaaS card kit
      },
      maxWidth: {
        site: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
