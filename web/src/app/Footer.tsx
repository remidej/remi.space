"use client";

import { SocialButtons } from "@/components/SocialButtons";
import type { APIResponse } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = ({
  global,
}: {
  global: APIResponse<"api::global.global">;
}) => {
  return (
    <footer className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between">
        {/* Contact */}
        <div>
          <nav className="flex flex-row items-center my-2 mx-auto">
            <SocialButtons
              // @ts-ignore
              socialNetworks={global.data.attributes.footerSocialNetworks}
            />
          </nav>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-6 md:mt-0">
            {global.data.attributes.email}
          </p>
        </div>
        {/* Lists of links */}
        <div className="flex flex-row mt-6 md:mt-0">
          {global.data.attributes.footerSections?.map(
            (footerSection, index) => (
              <div className="w-1/2 md:w-auto md:mr-16" key={index}>
                <p className="uppercase tracking-wide font-semibold text-gray-500">
                  {footerSection.title}
                </p>
                <ul>
                  {footerSection.links.map((link, index) => (
                    <li className="mt-2" key={index}>
                      <Link
                        href={link.url}
                        target={link.openInNewTab ? "_blank" : "_self"}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </footer>
  );
};
