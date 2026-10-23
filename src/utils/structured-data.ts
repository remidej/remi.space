import global from "../data/global.json";
import { SITE_URL } from "./markdown";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/blog/#blog`;

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: global.siteName,
  url: `${SITE_URL}/`,
  email: `mailto:${global.email}`,
  jobTitle: "Product Engineer",
  description:
    "Product Engineer from France building open-source apps for developers, now working on Camox, an agent-native CMS framework.",
  nationality: { "@type": "Country", name: "France" },
  knowsAbout: ["TypeScript", "AI", "Product engineering", "Content management systems", "Web development"],
  sameAs: global.footerSocialNetworks.map((network) => network.url),
};

export const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: global.siteName,
  inLanguage: "en",
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
};
