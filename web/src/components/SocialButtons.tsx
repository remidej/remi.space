import type { APIResponse, APIResponseCollection } from "@/types/types";
import { Icon } from "./Icon";

interface SocialButtonProps {
  socialNetworks: APIResponseCollection<"api::social-network.social-network">;
  small?: boolean;
}

export function SocialButtons({
  socialNetworks,
  small = false,
}: SocialButtonProps) {
  return (
    <div className="flex flex-row">
      {socialNetworks?.data.map((socialNetwork) => (
        <a
          href={socialNetwork.attributes.url}
          title={socialNetwork.attributes.name}
          target="_blank"
          rel="me"
          className={
            small
              ? "rounded-full text-gray-700 dark:text-gray-300 hover:black hover:bg-gray-200 dark:hover:bg-gray-700 p-3 ml-2"
              : "shadow-sm hover:shadow bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mr-2 py-2 px-3 rounded flex flex-row items-center"
          }
          key={socialNetwork.id}
        >
          <Icon icon={socialNetwork.attributes.icon} size={16} />
          {!small && (
            <span className="ml-2 inline-block">
              {socialNetwork.attributes.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
