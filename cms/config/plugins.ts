export default ({ env }) => {
  return {
    "preview-button": {
      config: {
        contentTypes: [
          {
            uid: "api::article.article",
            draft: {
              url: `${env("FRONTEND_URL")}/api/draft`,
              query: {
                secret: env("FRONTEND_DRAFT_SECRET"),
                path: "/blog/{slug}",
              },
            },
            published: {
              url: `${env("FRONTEND_URL")}/blog/{slug}`,
            },
          },
        ],
      },
    },
  };
};
