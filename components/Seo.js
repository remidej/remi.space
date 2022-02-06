import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import siteData from "../siteData";

function Seo({ description, lang, meta, title, image, type }) {
  const { pathname } = useRouter();

  const metaDescription = description || siteData.description;
  const { siteUrl } = siteData;
  const ogImage = image || `${siteUrl}${siteData.defaultOpenGraphImage}`;

  const fullTitle = `${title} | ${siteData.title}`;
  const fullUrl = `${siteUrl}${pathname}`;
  const finalType = type || `website`;

  // Always wear a Helmet
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteData.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `og:url`,
          content: fullUrl,
        },
        {
          property: `og:title`,
          content: fullTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          name: `og:image`,
          content: ogImage,
        },
        {
          property: `og:type`,
          content: finalType,
        },
        {
          property: `og:url`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: siteData.author,
        },
        {
          name: `twitter:image`,
          content: ogImage,
        },
        {
          name: `twitter:title`,
          content: fullTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Seo;
