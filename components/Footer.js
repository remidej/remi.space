import Link from "next/link";
import React from "react";
import SocialButtons from "./SocialButtons";

const Footer = ({ social, footerLinks, navLinks }) => {
  return (
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
                  <Link href="/blog/slug">
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
  );
};

export default Footer;
