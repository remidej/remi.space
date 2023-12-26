"use client";

import * as React from "react";
import { useDebounce } from "@/hooks/useDebounce";
import type { APIResponseCollection } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";

interface Props {
  resultsCount: number;
  tags: APIResponseCollection<"api::tag.tag">;
}

export function Filters({ resultsCount, tags }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);
  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete("search");
    newSearchParams.set("search", debouncedSearch);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  }, [debouncedSearch, pathname, router, search, searchParams]);

  const selectedTags = searchParams.get("tags")?.split(",") ?? [];

  const toggleTag = (tagSlug: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // write tag slug to the query params
    if (selectedTags.includes(tagSlug)) {
      newSearchParams.delete("tags");
      newSearchParams.set(
        "tags",
        selectedTags.filter((t) => t !== tagSlug).join(",")
      );
    } else {
      newSearchParams.delete("tags");
      newSearchParams.set("tags", [...selectedTags, tagSlug].join(","));
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <section className="mt-8 pb-2 border-blog-500 border-l-4 pl-4">
      <p className="uppercase tracking-wide text-blog-500 font-bold text-lg">
        Filter ({resultsCount})
      </p>
      {/* Actual search */}
      <label className="block w-full md:w-1/2 mt-2">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Article name..."
          className="block px-3 placeholder-gray-600 dark:placeholder-gray-500 py-2 bg-gray-100 dark:bg-gray-900 rounded-md border-2 border-gray-200 dark:border-gray-700 text-lg w-full focus:border-gray-300 dark:focus:border-blog-700 outline-none"
        />
      </label>
      {/* Tags */}
      <div className="flex flex-row-gap-2 mt-2 gap-2">
        {tags.data.map((tag) => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag.attributes.slug)}
            className={clsx(
              "px-2 py-1 text-gray-400  font-semibold rounded border-2  dark:border-gray-700",
              {
                "dark:text-gray-500 border-gray-400": !selectedTags.includes(
                  tag.attributes.slug
                ),
                "text-blog-200 dark:text-blog-500 border-blog-500 dark:border-blog-800":
                  selectedTags.includes(tag.attributes.slug),
              }
            )}
          >
            #{tag.attributes.slug}
          </button>
        ))}
      </div>
    </section>
  );
}
