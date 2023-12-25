import type { APIResponse, APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { Slices } from "@/components/Slices";
import { type Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = (await fetcher("/api/pages", {
    fields: ["slug"],
  })) as APIResponseCollection<"api::page.page">;

  return pages.data.map((page) => ({
    slug: page.attributes.slug === "_" ? [] : page.attributes.slug.split("_"),
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const pages = (await fetcher("/api/pages", {
    filters: {
      slug: {
        $eq: params.slug == null ? "_" : params.slug.join("_"),
      },
    },
    populate: {
      slices: {
        on: {
          "slices.home-hero": {
            populate: "*",
          },
          "slices.blog-section": {
            populate: "*",
          },
          "slices.work-section": {
            populate: "*",
          },
        },
      },
    },
  })) as APIResponseCollection<"api::page.page">;
  const page = pages.data[0];

  return (
    <>
      <Slices slices={page.attributes.slices} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const pages = (await fetcher("/api/pages", {
    filters: {
      slug: {
        $eq: params.slug == null ? "_" : params.slug.join("_"),
      },
    },
    // fields: ["metadata"],
    populate: ["metadata", "metadata.image"],
  })) as APIResponseCollection<"api::page.page">;
  const { metadata } = pages.data[0].attributes;

  const global = (await fetcher("/api/global", {
    fields: ["siteName"],
  })) as APIResponse<"api::global.global">;

  const title = `${metadata.title} | ${global.data.attributes.siteName}`;
  const description = metadata.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: global.data.attributes.siteName,
      ...(metadata.image && {
        images: [(metadata.image as any).url],
      }),
    },
  };
}
