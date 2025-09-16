import { draftMode } from "next/headers";
import { strapi } from "@strapi/client";

export function getClient() {
  const getSourceMapHeader = () => {
    // draftMode can only be used in a server component or route handler.
    // If this function is called in a non-request context (e.g. generateStaticParams),
    // we assume draft mode is off.
    try {
      return draftMode().isEnabled ? "true" : "false";
    } catch {
      return "false";
    }
  };
  return strapi({
    baseURL: `${process.env.CMS_URL!}/api`,
    auth: process.env.CMS_API_TOKEN,
    headers: {
      "strapi-encode-source-maps": getSourceMapHeader(),
    },
  });
}
