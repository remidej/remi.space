import qs from "qs";
import { strapi } from "@strapi/client";

const client = strapi({
  baseURL: `${process.env.CMS_URL!}/api`,
  auth: process.env.CMS_API_TOKEN,
});

export { client };
