"use client";

import * as React from "react";
import type { ApiArticleArticle, ApiPagePage } from "@/types/contentTypes";
import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import { APIResponseData } from "@/types/types";
import Image from "next/image";

type ArticleSlices =
  APIResponseData<"api::article.article">["attributes"]["slices"];
type PageSlices = APIResponseData<"api::page.page">["attributes"]["slices"];

interface Props {
  slices: ArticleSlices | PageSlices;
}
export function Slices({ slices }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {slices?.map((slice) => {
        switch (slice.__component) {
          case "article-slices.rich-text":
            return (
              <div
                className="leading-relaxed py-4 flex flex-col gap-6 dark:text-gray-300"
                key={slice.id}
              >
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
                          className="rounded-md"
                        />
                      );
                    },
                    heading: ({ children, level }) => {
                      switch (level) {
                        case 1:
                          return (
                            <h1 className="text-4xl font-bold pt-4">
                              {children}
                            </h1>
                          );
                        case 2:
                          return (
                            <h2 className="text-3xl font-bold pt-2">
                              {children}
                            </h2>
                          );
                        case 3:
                          return (
                            <h3 className="text-xl font-bold">{children}</h3>
                          );
                        case 4:
                          return (
                            <h4 className="text-xl font-bold">{children}</h4>
                          );
                        case 5:
                          return (
                            <h5 className="text-lg font-bold">{children}</h5>
                          );
                        case 6:
                          return (
                            <h6 className="text-base font-bold">{children}</h6>
                          );
                        default:
                          return null;
                      }
                    },
                    code: ({ children }) => {
                      return (
                        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto">
                          <code>{children}</code>
                        </pre>
                      );
                    },
                  }}
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
