"use client";

import * as React from "react";
import { SocialButtons } from "@/components/SocialButtons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearDraftMode } from "./actions";

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return <>{pathname !== "/" && children}</>;
};
