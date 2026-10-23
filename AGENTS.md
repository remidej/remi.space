# AGENTS.md

## Keep the agent-facing versions in sync

The site has markdown versions of its pages (`/index.md`, `/blog.md`, `/blog/<slug>.md`), plus `/llms.txt`, `/llms-full.txt` and JSON-LD. Some of this is written by hand on purpose, so it can drift from the HTML. When you change one side, update the other:

- **Homepage copy** (bio, Work section) lives in both `src/pages/index.astro` and `src/pages/index.md.ts`. Its summary is also repeated in:
  - the homepage meta description (`src/pages/index.astro`)
  - the `llms.txt` blockquote (`src/pages/llms.txt.ts`)
  - the `Person` description and `knowsAbout` (`src/utils/structured-data.ts`)
- **Blog index intro** is repeated in `src/pages/blog.md.ts` and the `Blog` JSON-LD in `src/pages/blog/index.astro`.
- **New page**: add a `<page>.md.ts` twin next to it, a link in `src/pages/llms.txt.ts`, and JSON-LD via the `jsonLd` prop on `BaseLayout`.
- **New MDX component in a post**: teach `postToMarkdown` in `src/utils/markdown.ts` how to turn it into markdown. Otherwise raw JSX ends up in the `.md` output. Check with `pnpm build` and read `dist/blog/<slug>.md`.
- **URLs**: Cloudflare serves pages with a trailing slash (`/blog/`), so canonical and JSON-LD URLs end with `/`. Markdown URLs don't (`/blog.md`, `/blog/<slug>.md`).

Post lists, titles, descriptions, dates and social links are generated from the content collection and `src/data/global.json`, so they don't need manual syncing.
