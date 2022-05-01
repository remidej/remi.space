import { defineDocumentType, makeSource } from "contentlayer/source-files";

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
    // tags: {
    //   type: "list",
    //   description: "The tags of the post",
    //   required: true,
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
