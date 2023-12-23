import type { APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { Slices } from "@/components/Slices";

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
  console.log(params);
  const pages = (await fetcher("/api/pages", {
    filters: {
      slug: {
        $eq: params.slug == null ? "_" : params.slug.join("_"),
      },
    },
    populate: {
      slices: {
        populate: "*",
      },
    },
  })) as APIResponseCollection<"api::page.page">;
  const page = pages.data[0];

  return (
    <>
      <h1>{page.attributes.slug}</h1>
      <Slices slices={page.attributes.slices} />
    </>
  );
}
