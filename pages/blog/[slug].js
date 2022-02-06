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
    props: {
      title: "",
    },
  };
}

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

  console.log(JSON.stringify(data));

  return {
    paths: data.repository.issues.edges.map((_issue) => ({
      params: {
        slug: slugify(_issue.node.title, { lower: true }),
      },
    })),
    fallback: true, // false or 'blocking'
  };
}

export default ArticlePage;
