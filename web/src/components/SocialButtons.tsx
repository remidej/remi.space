import type { APIResponse, APIResponseCollection } from "@/types/types";
import { Icon } from "./Icon";
import clsx from "clsx";

interface SocialButtonProps {
  socialNetworks: APIResponseCollection<"api::social-network.social-network">;
  small?: boolean;
}

export function SocialButtons({
  socialNetworks,
  small = false,
}: SocialButtonProps) {
  return (
    <div className="flex flex-row gap-2">
      {socialNetworks.map((socialNetwork) => (
        <a
          href={socialNetwork.url}
          title={socialNetwork.name}
          target="_blank"
          rel="me"
          className={clsx(
            "flex flex-row items-center gap-2",
            small
              ? "rounded-full hover:black hover:bg-gray-200 dark:hover:bg-gray-700 p-3"
              : "shadow-sm hover:shadow bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 rounded"
          )}
          key={socialNetwork.id}
        >
          <Icon icon={socialNetwork.icon} size={16} />
          {!small && (
            <span className="ml-2 inline-block">{socialNetwork.name}</span>
          )}
        </a>
      ))}
    </div>
  );
}
