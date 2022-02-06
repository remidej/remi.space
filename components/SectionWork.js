import React from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const SectionWork = () => {
  return (
    <section className="container mt-24">
      <p className="uppercase tracking-wide text-work-500 font-bold mb-6 text-lg">
        Work
      </p>
      {/* Text content */}
      <div className="text-xl text-gray-900 mt-6 leading-relaxed">
        <p>I'm a 4th year student at Hetic, where I'll graduate in 2021.</p>
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
          , a Silicon-Valley-based startup who makes predictive analytics
          software.
        </p>
        <p className="mt-4">
          In 2019, I co-founded and sold{` `}
          <a
            href="https://revoltgaming.co/"
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
          I'm now looking for my next challenge. As I'm wrapping up my studies,
          I'll be doing an internship from June to December 2020. So if your
          company:
        </p>
        <ul className="mt-4">
          <li>
            <FiCheckCircle className="inline text-work-500 transform translate-y-1" />{" "}
            is a fast-growing startup
          </li>
          <li>
            <FiCheckCircle className="inline text-work-500 transform translate-y-1" />{" "}
            has a strong engineering culture
          </li>
          <li>
            <FiCheckCircle className="inline text-work-500 transform translate-y-1" />{" "}
            is located in Europe, and can help with relocation
          </li>
        </ul>
        <p className="mt-4">Then I would love to have a chat with you 👋</p>
      </div>
      <div className="flex flex-row">
        <a
          href={`/Resume-Remi-de-Juvigny.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 px-4 py-2 text-blog-800 bg-work-200 text-lg font-semibold rounded-lg inline-block hover:shadow"
        >
          View my resume{" "}
          <FiArrowRight className="inline transform translate-y-1" size="1em" />
        </a>
      </div>
    </section>
  );
};
export default SectionWork;
