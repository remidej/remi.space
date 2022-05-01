import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

interface Props {
  text: string;
  href: string;
  title: string;
  isExternal?: boolean;
  color?: "white" | "neutral" | "primary" | "work" | "blog";
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
        className={`mt-6 px-4 py-2 text-${color}-800 bg-${color}-200 text-lg font-semibold rounded-lg inline-block hover:shadow`}
        target={isExternal ? "_blank" : "_self"}
        title={title}
      >
        {text} <FiArrowRight className="inline" size="1em" />
      </a>
    </Link>
  );
};

export default ButtonLink;
