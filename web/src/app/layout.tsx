import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import Link from "next/link";
import "./globals.css";
import { client } from "@/utils/cms";
import { SocialButtons } from "@/components/SocialButtons";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ServiceWorker } from "./ServiceWorker";
import { revalidatePath } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await client.single("global").find({
    populate: [
      "navbarSocialNetworks",
      "navbarSocialNetworks.icon",
      "footerSocialNetworks",
      "footerSections",
      "footerSections.links",
    ],
  });

  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <ServiceWorker />
      <body
        style={inter.style}
        className="flex flex-col min-h-screen text-gray-800 dark:text-gray-100 "
      >
        {/* Top section */}
        <div className="flex-1 flex flex-col dark:bg-gray-900">
          <Navbar isDraftMode={draftMode().isEnabled}>
            <nav className="container py-4 w-full flex flex-row items-center justify-between text-gray-700 dark:text-gray-300">
              <Link
                href="/"
                className="inline-block font-bold text-xl hover:text-black dark:hover:text-white"
              >
                {global.data.siteName}
              </Link>
              <SocialButtons
                // @ts-ignore
                socialNetworks={global.data.navbarSocialNetworks}
                small
              />
            </nav>
          </Navbar>
          <main className="flex-1 bg-white dark:bg-gray-900">{children}</main>
        </div>
        <Footer global={global} />
      </body>
    </html>
  );
}
