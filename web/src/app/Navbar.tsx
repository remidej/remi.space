"use client";

import * as React from "react";
import { SocialButtons } from "@/components/SocialButtons";
import type { APIResponse } from "@/types/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearDraftMode } from "./actions";
import { useFormStatus } from "react-dom";

const DisableDraftMode = () => {
  const { pending } = useFormStatus();
  const router = useRouter();

  React.useEffect(() => {
    if (!pending) {
      router.refresh();
    }
  }, [pending, router]);

  return <button type="submit">{pending ? "Disabling..." : "Disable"}</button>;
};

export const Navbar = ({
  children,
  isDraftMode,
}: {
  isDraftMode: boolean;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <>
      {isDraftMode && (
        <div className="bg-pink-800 text-pink-200 p-2 text-center font-mono uppercase">
          <form
            className="container flex justify-between"
            action={clearDraftMode}
          >
            <span>Draft Mode enabled</span>
            <DisableDraftMode />
          </form>
        </div>
      )}
      {pathname !== "/" && children}
    </>
  );
};
