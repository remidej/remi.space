import React from "react";
import Link from "next/link";
import SocialButtons from "./SocialButtons";

const Navbar = ({ title }) => {
  return (
    <nav className="container mx-auto py-4 flex flex-row items-center justify-between text-gray-700">
      <Link href="/" className="hover:text-black">
        <a>
          <h3 className="inline-block font-bold text-xl">{title}</h3>
        </a>
      </Link>
      <SocialButtons small />
    </nav>
  );
};

export default Navbar;
