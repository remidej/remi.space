require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Rémi de Juvigny`,
    author: `Rémi de Juvigny`,
    description: `A blog by Rémi de Juvigny about the open web, and how to make it better using tools like JavaScript, GraphQL and React. `,
    siteUrl: `https://remi.space`,
    defaultOpenGraphImage: `/og-home.png`,
    social: {
      twitter: `remidej`,
      linkedin: `remi-de-juvigny`,
      github: `remi2j`,
      email: `hello@remi.space`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
              linkImagesToOriginal: false,
              backgroundColor: `transparent`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {},
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `nofollow`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="#000" stroke-width="1.366" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 8.7c1.1 1.5 3.3 1.8 4.8.7.1-.1.3-.2.4-.3l2-2c1.3-1.4 1.3-3.5-.1-4.8a3.32 3.32 0 0 0-4.7 0L7.8 3.4m1.5 3.9c-1.1-1.5-3.2-1.8-4.8-.6-.1 0-.2.2-.3.3l-2 2c-1.3 1.4-1.3 3.5.1 4.8a3.32 3.32 0 0 0 4.7 0l1.2-1.2"/></svg>`,
              maintainCase: false,
              removeAccents: true,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rémi de Juvigny | Personal website`,
        short_name: `Rémi`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-notify`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        whitelistPatternsChildren: [/token/, /namespace/, /pre/, /code/, /anchor/],
      },
    },
    {
      resolve: `gatsby-plugin-ackee-tracker`,
      options: {
        domainId: process.env.ACKEE_DOMAIN_ID,
        server: process.env.ACKEE_SERVER_URL,
        ignoreLocalhost: true,
        detailed: false,
      },
    },
  ],
}
