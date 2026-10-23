import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { cleanMdx, md } from "astro-slop";
import { getPostUrl, resolvePostAssets } from "../../utils/markdown";

export { getStaticPaths } from "./[slug].astro";

export const GET: APIRoute<{ post: CollectionEntry<"blog"> }> = ({ props: { post } }) => md`---
title: ${post.data.title}
description: ${post.data.description}
author: Rémi de Juvigny
date: ${post.data.date.toISOString().slice(0, 10)}
url: ${getPostUrl(post)}
---

${cleanMdx(resolvePostAssets(post))}`;
