import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import nightOwlTheme from "./styles/night-owl.json";

const Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    title: {
      type: "enum",
      options: ["dev", "tips", "typescript", "graphql", "git", "javascript"],
      required: true,
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    tags: {
      type: "list",
      of: Tag,
      required: true,
    },
    // tags: {
    //   type: "nested",
    //   of: [Tag],
    //   default: [],
    // },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
  },
}));

const rehypePrettyCodeOptions = {
  theme: nightOwlTheme,
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

// TODO: fix mdx images
// TODO: header bio content
// TODO: readme
// TODO: seo stuff

export default makeSource({
  contentDirPath: "content/blog",
  documentTypes: [Post],
  mdx: { rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]] },
});
