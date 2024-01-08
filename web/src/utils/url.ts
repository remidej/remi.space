const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
const hostname =
  process.env.SITE_URL || process.env.VERCEL_URL || "localhost:3000";

export const url = `${protocol}://${hostname}`;
