"use client";

import { SocialButtons } from "@/components/SocialButtons";
import type { APIResponse } from "@/types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = ({
  global,
}: {
  global: APIResponse<"api::global.global">;
}) => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="container py-4 w-full flex flex-row items-center justify-between text-gray-700 dark:text-gray-300">
      <Link
        href="/"
        className="inline-block font-bold text-xl hover:text-black dark:hover:text-white"
      >
        {global.data.attributes.siteName}
      </Link>
      <SocialButtons
        // @ts-ignore
        socialNetworks={global.data.attributes.navbarSocialNetworks}
        small
      />
    </nav>
  );
};
