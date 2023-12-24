import * as React from "react";
import type { ApiArticleArticle, ApiPagePage } from "@/types/contentTypes";
import {
  type BlocksContent,
  BlocksRenderer,
} from "@strapi/blocks-react-renderer";
import { APIResponseData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { SocialButtons } from "./SocialButtons";
import { ArticlesSlice } from "./slices/Articles";
import { RichText } from "./slices/RichText";
import { HomeHero } from "./slices/HomeHero";

type ArticleSlices =
  APIResponseData<"api::article.article">["attributes"]["slices"];
type PageSlices = APIResponseData<"api::page.page">["attributes"]["slices"];

interface Props {
  slices: ArticleSlices | PageSlices;
}

export function Slices({ slices }: Props) {
  return (
    <div className="flex flex-col">
      {slices?.map((slice) => (
        <React.Fragment key={slice.id}>
          {(() => {
            switch (slice.__component) {
              case "article-slices.rich-text":
                return <RichText slice={slice} />;
              case "slices.home-hero":
                return <HomeHero slice={slice} />;
              case "slices.blog-section":
                return <ArticlesSlice slice={slice} />;
              default:
                return null;
            }
          })()}
        </React.Fragment>
      ))}
    </div>
  );
}
