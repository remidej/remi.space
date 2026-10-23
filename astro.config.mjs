import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { cloudflare } from "@cloudflare/vite-plugin";
import slop from "astro-slop";

export default defineConfig({
  site: "https://remi.space",
  output: "static",
  vite: { plugins: [tailwindcss(), cloudflare()] },
  integrations: [
    sitemap(),
    mdx(),
    slop({
      siteName: "Rémi de Juvigny",
      siteDescription:
        "Personal website and blog of Rémi de Juvigny, a Product Engineer from France building Camox, an agent-native CMS framework. Writing about making products for the web, using technologies like TypeScript and AI.",
    }),
  ],
});
