import React from "react";
import { Link } from "next";
import { useRouter } from "next/router";
import SocialButtons from "./SocialButtons";
import siteData from "../siteData";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { title, description, navLinks, social, footerLinks } = siteData;

  // console.log(navLinks);

  const router = useRouter();
  const isRootPage = router.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900">
      {/* Top section */}
      <div className="flex-1">
        {!isRootPage && <Navbar title={title} />}
        <main>{children}</main>
      </div>
      {/* Bottom section */}
      <Footer footerLinks={footerLinks} social={social} navLinks={navLinks} />
    </div>
  );
};

export default Layout;