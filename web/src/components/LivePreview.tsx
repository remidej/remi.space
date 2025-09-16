"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export default function LivePreview() {
  const router = useRouter();

  React.useEffect(() => {
    const handleMessage = async (message: MessageEvent<any>) => {
      const { origin, data } = message;

      if (origin !== process.env.NEXT_PUBLIC_API_URL) {
        return;
      }

      if (data.type === "strapiUpdate") {
        router.refresh();
      } else if (data.type === "strapiScript") {
        const script = window.document.createElement("script");
        script.textContent = data.payload.script;
        window.document.head.appendChild(script);
      }
    };

    // Add the event listener
    window.addEventListener("message", handleMessage);

    // Let Strapi know we're ready to receive the script
    window.parent?.postMessage({ type: "previewReady" }, "*");

    // Remove the event listener on unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return null;
}
