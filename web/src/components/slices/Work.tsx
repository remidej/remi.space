"use client";

import type { GetValues } from "@/types/types";
import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import { clsx } from "clsx";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Props {
  slice: GetValues<"slices.work-section">;
}

export function Work({ slice }: Props) {
  return (
    <section className="container py-12">
      <p
        className={clsx("uppercase tracking-wide font-bold text-lg", {
          "text-green-400 dark:text-green-500": slice.color === "green",
          "text-blue-400 dark:text-blue-500": slice.color === "blue",
          "text-purple-400 dark:text-purple-500": slice.color === "purple",
          "text-rose-400 dark:text-rose-500": slice.color === "rose",
          "text-amber-400 dark:text-amber-500": slice.color === "amber",
        })}
      >
        {slice.title}
      </p>
      <div className="flex flex-col gap-3 md:text-lg text-gray-700 dark:text-gray-300 mt-6">
        <BlocksRenderer
          content={slice.content as BlocksContent}
          blocks={{
            list: ({ children }) => (
              <ul
                className={clsx("list-disc list-inside flex flex-col gap-2", {
                  "marker:text-green-500 dark:marker:text-green-400":
                    slice.color === "green",
                  "marker:text-blue-500 dark:marker:text-blue-400":
                    slice.color === "blue",
                  "marker:text-purple-500 dark:marker:text-purple-400":
                    slice.color === "purple",
                  "marker:text-rose-500 dark:marker:text-rose-400":
                    slice.color === "rose",
                  "marker:text-amber-500 dark:marker:text-amber-400":
                    slice.color === "amber",
                })}
              >
                {children}
              </ul>
            ),
          }}
        />
      </div>
      {slice.link && (
        <Link
          href={slice.link.url}
          className={clsx(
            "mt-6 px-4 py-2 text-lg font-semibold rounded-lg inline-block hover:shadow",
            {
              "text-green-800 dark:text-green-100 bg-green-200 dark:bg-green-800":
                slice.color === "green",
              "text-blue-800 dark:text-blue-100 bg-blue-200 dark:bg-blue-800":
                slice.color === "blue",
              "text-purple-800 dark:text-purple-100 bg-purple-200 dark:bg-purple-800":
                slice.color === "purple",
              "text-rose-800 dark:text-rose-100 bg-rose-200 dark:bg-rose-800":
                slice.color === "rose",
              "text-amber-800 dark:text-amber-100 bg-amber-200 dark:bg-amber-800":
                slice.color === "amber",
            }
          )}
        >
          {slice.link.text}{" "}
          <FiArrowRight className="inline -mt-[2px] ml-1" size="1em" />
        </Link>
      )}
    </section>
  );
}
