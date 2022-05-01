import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import clsx from "clsx";

interface Props {
  text: string;
  href: string;
  title: string;
  isExternal?: boolean;
  color?: "neutral" | "primary" | "work" | "blog";
}

const ButtonLink: React.FC<Props> = ({
  text,
  href,
  title,
  isExternal = false,
  color = "primary",
}) => {
  return (
    <Link href={href}>
      <a
        className={clsx(
          "mt-6",
          "px-4",
          "py-2",
          "text-lg",
          "font-semibold",
          "rounded-lg",
          "inline-block",
          "hover:shadow",
          // Can't dynamically generate the class names because they'll be purged by Tailwind
          color === "neutral" && "bg-neutral-200",
          color === "primary" && "bg-primary-200",
          color === "blog" && "bg-blog-200",
          color === "work" && "bg-work-200"
        )}
        target={isExternal ? "_blank" : "_self"}
        title={title}
      >
        {text} <FiArrowRight className="inline" size="1em" />
      </a>
    </Link>
  );
};

export default ButtonLink;
