"use client";

import type { GetValues } from "@/types/types";
import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Props {
  slice: GetValues<"slices.work-section">;
}

export function Work({ slice }: Props) {
  return (
    <section className="container py-12">
      <p className="uppercase tracking-wide text-work-500 dark:text-work-500 font-bold text-lg">
        {slice.title}
      </p>
      <div className="flex flex-col gap-3 text-lg text-gray-700 dark:text-gray-300 mt-6">
        <BlocksRenderer
          content={slice.content as BlocksContent}
          blocks={{
            list: ({ children }) => (
              <ul className="list-disc list-inside marker:text-work-500 dark:marker:text-work-400 flex flex-col gap-2">
                {children}
              </ul>
            ),
            // "list-item": ({ children }) => <li className="">{children}</li>,
          }}
        />
      </div>
      <Link
        href={slice.link.url}
        className="mt-6 px-4 py-2 text-work-800 dark:text-work-100 bg-work-200 dark:bg-work-800 text-lg font-semibold rounded-lg inline-block hover:shadow"
      >
        {slice.link.text} <FiArrowRight className="inline" size="1em" />
      </Link>
    </section>
  );
}
