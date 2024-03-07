import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: { theme: "github-dark" },
    syntaxHighlight: "shiki",
  },
});
