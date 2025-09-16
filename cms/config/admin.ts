export default ({ env }) => {
  const frontendUrl = env("FRONTEND_URL");
  const frontendDraftSecret = env("FRONTEND_DRAFT_SECRET");

  return {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
    apiToken: {
      salt: env("API_TOKEN_SALT"),
    },
    transfer: {
      token: {
        salt: env("TRANSFER_TOKEN_SALT"),
      },
    },
    flags: {
      nps: env.bool("FLAG_NPS", true),
      promoteEE: env.bool("FLAG_PROMOTE_EE", true),
    },
    preview: {
      config: {
        allowedOrigins: [frontendUrl],
        async handler(uid, { documentId, locale, status }) {
          const document = await strapi
            .documents(uid)
            .findOne({ documentId, locale, status });

          if (!document) {
            return null;
          }

          const path = (() => {
            switch (uid) {
              case "api::article.article":
                return `/blog/${document.slug}`;
              case "api::page.page":
                return document.slug === "_" ? "/" : `/${document.slug}`;
              default:
                return null;
            }
          })();

          // Disable preview if the pathname is not found
          if (!path) {
            return null;
          }

          // Use Next.js draft mode
          const urlSearchParams = new URLSearchParams({
            path,
            secret: frontendDraftSecret,
            status,
          });

          return `${frontendUrl}/api/draft?${urlSearchParams}`;
        },
      },
    },
  };
};
