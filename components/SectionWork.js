import React from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import ButtonLink from "./ButtonLink";
import siteData from "../siteData";

const SectionWork = () => {
  return (
    <section className="container mt-24">
      <p className="uppercase tracking-wide text-work-500 font-bold mb-6 text-lg">
        Work
      </p>
      {/* Text content */}
      <div className="text-xl text-neutral-900 mt-6 leading-relaxed">
        <p>
          I'm a software engineer at{" "}
          <a
            href="https://strapi.io/"
            title="Strapi headless CMS"
            className="underline text-work-700 hover:text-work-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Strapi
          </a>
          , where I started working in 2020.
        </p>
        <p className="mt-4">
          There, I'm working on building the CMS for the future, with a focus on
          the{" "}
          <a
            href="https://discord.strapi.io/"
            title="Strapi Discord"
            className="underline text-work-700 hover:text-work-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            community
          </a>{" "}
          and its{" "}
          <a
            href="https://market.strapi.io/"
            title="Strapi Market"
            className="underline text-work-700 hover:text-work-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            ecosystem
          </a>
          .
        </p>
        <p className="mt-4">
          In 2019, I co-founded and developed{` `}
          <a
            href="https://app.revolt.club"
            alt="Revolt Influence"
            className="underline text-work-700 hover:text-work-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Revolt Influence
          </a>
          , a platform that helps brands build a presence and a community
          online.
        </p>
        <p className="mt-4">
          In 2018, I worked at{` `}
          <a
            href="https://www.madkudu.com/"
            alt="MadKudu"
            className="underline text-work-700 hover:text-work-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            MadKudu
          </a>
          , a Silicon-Valley-based startup that builds predictive analytics
          software.
        </p>
      </div>
      <ButtonLink
        href={`https://www.linkedin.com/in/${siteData.social.linkedin}`}
        text="View my resume"
        title="LinkedIn"
        color="work"
        isExternal={true}
      />
    </section>
  );
};
export default SectionWork;
