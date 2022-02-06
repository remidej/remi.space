import Link from "next/link";
import React from "react";
import SocialButtons from "./SocialButtons";

const Header = () => {
  return (
    <header className="py-6 bg-gray-100">
      <div className="container">
        {/* Name link */}
        <Link href="/">
          <a className="inline-flex flex-row items-center">
            <div className="w-16 h-16 bg-teal-200 rounded-full"></div>
            <h1 className="font-bold -ml-10 text-3xl text-gray-800 hover:text-black">
              Rémi de Juvigny
            </h1>
          </a>
        </Link>
        {/* Bio */}
        <section className="text-2xl text-gray-700 mt-6 flex flex-col justify-center">
          <h2 className="inline">
            I'm a Product Developer from France. I study computer science,
            design and product management at Hetic in Paris.
          </h2>
          <p className="mt-2">
            I write about the open web, and how to make it better using tools
            like JavaScript, GraphQL and React.
          </p>
        </section>
        {/* Social buttons */}
        <div className="mt-6">
          <SocialButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
