const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

export const url = `${protocol}://${process.env.VERCEL_URL}`;
