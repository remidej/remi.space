"use client";

import type { GetValues } from "@/types/types";
import { SocialButtons } from "../SocialButtons";
import Link from "next/link";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

interface Props {
  slice: GetValues<"slices.home-hero">;
}
export function HomeHero({ slice }: Props) {
  return (
    <header className="py-6 bg-gray-100 dark:bg-gray-800">
      <div className="container">
        {/* Name link */}
        <Link href="/" className="inline-flex flex-row items-center">
          <div className="w-16 h-16 bg-teal-200 dark:bg-teal-900 rounded-full"></div>
          <h1 className="font-bold -ml-10 text-3xl text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white">
            {slice.name}
          </h1>
        </Link>
        {/* Bio */}
        <section className="text-2xl text-gray-700 dark:text-gray-300 mt-6 flex flex-col gap-3 leading-normal justify-center">
          <BlocksRenderer
            content={slice.intro as BlocksContent}
            blocks={{
              link: ({ children, url }) => (
                <Link
                  className="underline decoration-teal-300 dark:decoration-teal-700 decoration-[3px]"
                  href={url}
                  target="_blank"
                >
                  {children}
                </Link>
              ),
            }}
          />
        </section>
        {/* Social buttons */}
        <div className="mt-6">
          {/* @ts-ignore */}
          <SocialButtons socialNetworks={slice.socialNetworks} />
        </div>
      </div>
    </header>
  );
}
