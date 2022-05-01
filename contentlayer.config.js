import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";

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
  filePathPattern: `**/*.md`,
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
      resolve: (doc) => `/blog/${doc._raw.sourceFileDir}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content/blog",
  documentTypes: [Post],
});
