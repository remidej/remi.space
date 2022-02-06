import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const ButtonLink = ({
  text,
  href,
  title,
  isExternal = false,
  color = "primary",
}) => {
  return (
    <Link href={href} title={title}>
      <a
        className={`mt-6 px-4 py-2 text-blog-800 bg-${color}-200 text-lg font-semibold rounded-lg inline-block hover:shadow`}
        target={isExternal ? "_blank" : "_self"}
      >
        {text} <FiArrowRight className="inline" size="1em" />
      </a>
    </Link>
  );
};

export default ButtonLink;
