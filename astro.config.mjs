import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  site: "https://remi.space",
  output: "static",
  vite: { plugins: [tailwindcss(), cloudflare()] },
  integrations: [sitemap()],
});
