import React from "react";
import { FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";
import siteData from "../siteData";

const SocialButtons = ({ small }) => {
  const { social } = siteData;
  const socialLinks = [
    {
      title: "GitHub",
      showIcon: () => (
        <>
          <FiGithub />
        </>
      ),
      link: `https://github.com/${social.github}`,
    },
    {
      title: "Twitter",
      showIcon: () => (
        <>
          <FiTwitter />
        </>
      ),
      link: `https://twitter.com/${social.twitter}`,
    },
    {
      title: "LinkedIn",
      showIcon: () => (
        <>
          <FiLinkedin />
        </>
      ),
      link: `https://www.linkedin.com/in/${social.linkedin}`,
    },
  ];

  return (
    <div className="flex flex-row">
      {socialLinks.map((_socialLink) => (
        <a
          key={_socialLink.title}
          href={_socialLink.link}
          title={_socialLink.title}
          target="_blank"
          rel="noopener noreferrer"
          className={
            small
              ? "rounded-full text-neutral-700 hover:black hover:bg-neutral-200 p-3 ml-2"
              : "shadow-sm hover:shadow bg-white text-neutral-900 mr-2 py-2 px-3 rounded flex flex-row items-center"
          }
        >
          {_socialLink.showIcon()}
          {!small && (
            <span className="ml-2 inline-block">{_socialLink.title}</span>
          )}
        </a>
      ))}
    </div>
  );
};

SocialButtons.defaultProps = {
  small: false,
};

export default SocialButtons;
