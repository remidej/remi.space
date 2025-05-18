import { client, fetcher } from "@/utils/cms";
import Link from "next/link";
import { Slices } from "@/components/Slices";
import { type Metadata } from "next";
import { url } from "@/utils/url";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await client.collection("pages").find({ fields: ["slug"] });

  return pages.data.map((page) => ({
    slug: page.slug === "_" ? [] : page.slug.split("_"),
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const pages = await client.collection("pages").find({
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
  });
  const page = pages.data[0];

  return (
    <>
      <Slices slices={page.slices} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [pages, global] = await Promise.all([
    client.collection("pages").find({
      filters: {
        slug: {
          $eq: params.slug == null ? "_" : params.slug.join("_"),
        },
      },
      populate: ["metadata", "metadata.image"],
    }),
    client.single("global").find({
      fields: ["siteName"],
    }),
  ]);

  const { metadata } = pages.data[0];
  const title = `${metadata.title} | ${global.data.siteName}`;
  const description = metadata.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: global.data.siteName,
      ...(metadata.image && {
        images: [metadata.image.url],
      }),
    },
    metadataBase: new URL(url),
  };
}
