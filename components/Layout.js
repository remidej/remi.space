import React from "react";
import { Link } from "next";
import { useRouter } from "next/router";
import SocialButtons from "./SocialButtons";
import siteData from "../siteData";

const Layout = ({ children }) => {
  const { title, description, navLinks, social, footerLinks } = siteData;

  const router = useRouter();
  const isRootPage = router.pathname === "/";
  console.log(siteData);

  const navbar = (
    <nav className="container mx-auto py-4 flex flex-row items-center justify-between text-gray-700">
      <Link href={`/`} className="hover:text-black">
        <a>
          <h3 className="inline-block font-bold text-xl">{title}</h3>
        </a>
      </Link>
      <SocialButtons small />
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Top section */}
      <div className="flex-1">
        {!isRootPage && navbar}
        <main>{children}</main>
      </div>
      {/* Bottom section */}
      <footer className="mt-12 py-12  bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row md:justify-between">
          {/* Contact */}
          <div>
            <nav className="flex flex-row items-center my-2 mx-auto">
              <SocialButtons />
            </nav>
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 mt-6 md:mt-0">
              {social.email}
            </p>
          </div>
          {/* Lists of links */}
          <div className="flex flex-row mt-6 md:mt-0">
            <div className="w-1/2 md:w-auto md:mr-16">
              <p className="uppercase tracking-wide font-semibold text-gray-500">
                Pages
              </p>
              <ul>
                {navLinks.map((_navLink) => (
                  <li className="mt-2" key={_navLink.path}>
                    <Link href={_navLink.path}>
                      <a>{_navLink.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <p className="uppercase tracking-wide font-semibold text-gray-500">
                Site
              </p>
              <ul>
                {footerLinks.map((_footerLink) => (
                  <li className="mt-2" key={_footerLink.link}>
                    <a
                      href={_footerLink.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {_footerLink.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
