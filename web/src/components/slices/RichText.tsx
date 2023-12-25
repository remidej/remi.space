"use client";

import type { GetValues } from "@/types/types";
import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";

interface Props {
  slice: GetValues<"article-slices.rich-text">;
}
export function RichText({ slice }: Props) {
  return (
    <div className="leading-relaxed py-4 flex flex-col gap-6 dark:text-gray-300">
      <BlocksRenderer
        content={slice.content as BlocksContent}
        blocks={{
          image: ({ image }) => {
            return (
              <Image
                src={image.url}
                alt={image.alternativeText!}
                width={image.width}
                height={image.height}
                className="rounded-md max-w-full"
              />
            );
          },
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <h1 className="text-4xl font-bold pt-4">{children}</h1>;
              case 2:
                return <h2 className="text-3xl font-bold pt-2">{children}</h2>;
              case 3:
                return <h3 className="text-xl font-bold">{children}</h3>;
              case 4:
                return <h4 className="text-xl font-bold">{children}</h4>;
              case 5:
                return <h5 className="text-lg font-bold">{children}</h5>;
              case 6:
                return <h6 className="text-base font-bold">{children}</h6>;
              default:
                return null;
            }
          },
          code: ({ children }) => {
            return (
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto xl:-ml-4 xl:-mr-4">
                <code>{children}</code>
              </pre>
            );
          },
          list: ({ children }) => {
            return (
              <ul className="list-disc list-outside marker:text-gray-500 dark:marker:text-gray-400 flex flex-col gap-2">
                {children}
              </ul>
            );
          },
          link: ({ children, url }) => (
            <Link
              href={url}
              target="_blank"
              className="underline text-blog-700 dark:text-blog-100"
            >
              {children}
            </Link>
          ),
        }}
      />
    </div>
  );
}
