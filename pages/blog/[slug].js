import { useRouter } from "next/router";
import { graphql } from "@octokit/graphql";
import slugify from "slugify";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Article: {slug}</p>;
};

export async function getStaticProps(context) {
  console.log("PARAMS", context.params);

  return {
    props: {
      title: "",
    },
  };
}

// TODO: use graymatter to parse issue metadata
// see https://github.com/sw-yx/swyxkit/blob/28d26056451217d92edd808513b0e4767bcd8484/src/lib/content.js#L108

export async function getStaticPaths() {
  const data = await graphqlWithAuth(`
    {
      repository(owner: "remidej", name: "remi.space") {
        issues(last: 3) {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `);

  return {
    paths: data.repository.issues.edges.map((_issue) => ({
      params: {
        slug: slugify(_issue.node.title, { lower: true }),
        title: _issue.node.title,
      },
    })),
    fallback: true, // false or 'blocking'
  };
}

export default ArticlePage;
