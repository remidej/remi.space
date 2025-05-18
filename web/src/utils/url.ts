const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const hostname =
  process.env.SITE_URL || process.env.VERCEL_URL || "localhost:3000";

export const url = `${protocol}://${hostname}`;

export function getFileUrl(file: { url: string; provider: string }) {
  if (file.provider === "local") {
    return `${process.env.CMS_URL}${file.url}`;
  }

  return file.url;
}
