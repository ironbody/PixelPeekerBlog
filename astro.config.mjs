import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

import vercelStatic from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "github-dark",
    },
    syntaxHighlight: "shiki",
  },
  prefetch: true,
  output: "static",
  adapter: vercelStatic({
    webAnalytics: { enabled: true },
  }),
});
